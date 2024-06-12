import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../../src/shared/store/Themestore';
import axiosInstance from '../../features/auth/AuthInstance';
import './LikeBookList.scss';

const LikeBookList = () => {
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];
    const [sortOption, setSortOption] = useState('newest');
    const [likedBooks, setLikedBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const booksPerPage = 8; // 페이지 당 보여질 책의 개수


    useEffect(() => {
        const UserLikedBooks = async () => {
            try {
                const response = await axiosInstance.get('https://nost-stella.com/api/books/userlikedbooks/');
                setLikedBooks(response.data);
            } catch (error) {
                console.error('Error fetching liked books:', error);
            }
        };

        UserLikedBooks();
    }, []);

    useEffect(() => {
        sortBooks(sortOption);
    }, [sortOption]);

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortOption(value);
    };

    const sortBooks = (criteria) => {
        const sortedBooks = [...likedBooks];
        switch (criteria) {
            case 'newest':
                sortedBooks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'popular':
                sortedBooks.sort((a, b) => b.is_liked.length - a.is_liked.length);
                break;
            case 'rating':
                sortedBooks.sort((a, b) => b.average_rating - a.average_rating);
                break;
            default:
                break;
        }
        setLikedBooks(sortedBooks);
    };


    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentlikedBooks = likedBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(likedBooks.length / booksPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const generatePagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
    };


    return (
        <div className="likebook-list" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            <div className="header">
                <select value={sortOption} onChange={handleSortChange} style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Novel</th>
                        <th>Likes</th>
                        <th>Rating</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {currentlikedBooks.map((book) => (
                        <tr key={book.id} onClick={() => handleBookClick(book.id)}>
                            <td>{book.title}</td>
                            <td>{book.is_liked.length}</td>
                            <td>{book.average_rating}</td>
                            <td>{new Date(book.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => handleClick(1)} disabled={currentPage === 1}> &laquo; </button>
                <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}> &lt; </button>
                {generatePagination().map((page) => (
                    <button
                        key={page}
                        onClick={() => handleClick(page)}
                        className={currentPage === page ? 'active' : ''}>
                        {page}
                    </button>
                ))}
                <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}> &gt; </button>
                <button onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages}> &raquo; </button>
            </div>
        </div>
    );
};

export default LikeBookList;

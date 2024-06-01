import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../../shared/store/Themestore';
import './BookList.scss';

const BookList = () => {
    const { themes, currentSeason } = useThemeStore(); // 테마 설정 사용
    const currentTheme = themes[currentSeason]; // 현재 시즌 테마 색상
    const [sortOption, setSortOption] = useState('newest'); // 초기 정렬기준
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const booksPerPage = 8; // 페이지 당 보여질 책의 개수

    useEffect(() => {
        fetchNovels();
    }, []);

    useEffect(() => {
        sortNovels(sortOption); // 정렬 기준 변경 시 소설 목록 정렬
    }, [sortOption]);

    const fetchNovels = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/books/'); // 백엔드 API 호출
            console.log('Fetched novels:', response.data); // 응답 데이터 콘솔에 출력
            if (Array.isArray(response.data)) {
                setBooks(response.data);
            } else {
                console.error('Fetched data is not an array:', response.data);
                setBooks([]); // 응답 데이터가 배열이 아닌 경우 빈 배열로 설정
            }
        } catch (error) {
            console.error('Error fetching novels:', error);
            setBooks([]); // 오류 발생 시 빈 배열로 설정
        }
    };

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortOption(value); // 정렬 기준 변경
    };

    const sortNovels = (criteria) => {
        const sortedNovels = [...books];
        switch (criteria) {
            case 'newest':
                sortedNovels.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'popular':
                sortedNovels.sort((a, b) => b.is_liked.length - a.is_liked.length);
                break;
            case 'rating':
                sortedNovels.sort((a, b) => b.average_rating - a.average_rating);
                break;
            default:
                break;
        }
        setBooks(sortedNovels); // 정렬된 목록 설정
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(books.length / booksPerPage);

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
        <div className="book-list section" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
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
                        <th>Author</th>
                        <th>Likes</th>
                        <th>Rating</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBooks.map((book) => (
                        <tr key={book.id} onClick={() => handleBookClick(book.id)}>
                            <td>{book.title}</td>
                            <td>{book.user_nickname}</td>
                            <td>{book.is_liked.length}</td>  {/* 배열의 길이로 좋아요 수 출력 */}
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

export default BookList;

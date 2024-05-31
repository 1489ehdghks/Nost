import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../../shared/store/Themestore';
import './BookList.scss';

const BookList = () => {
    const { themes, currentSeason } = useThemeStore(); // 테마 설정 사용
    const currentTheme = themes[currentSeason]; // 현재 시즌 테마 색상
    const [sortOption, setSortOption] = useState('newest'); // 초기 정렬기준
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [books, setBooks] = useState([]);
    const booksPerPage = 5; // 페이지당 책 수
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

    useEffect(() => {
        fetchBooks(); // 컴포넌트 마운트 시 데이터 가져오기
    }, [sortOption]); // 정렬 기준 변경 시 재호출

    const fetchBooks = async (books) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/books/'); // 백엔드 API 호출
            console.log('Fetched novels:', response.data); // 응답 데이터 콘솔에 출력
            let sortedBooks = response.data.results;
            switch (sortOption) {
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
            setBooks(sortedBooks); // 정렬된 결과를 상태에 설정
        } catch (error) {
            console.error('Error fetching novels:', error);
            setBooks([]); // 오류 발생 시 빈 배열로 설정
        }
    };

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortOption(value); // 정렬 기준 변경
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                            <td>{book.user_id}</td>
                            <td>{book.is_liked.length}</td>
                            <td>{book.average_rating}</td>
                            <td>{new Date(book.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default BookList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useThemeStore from '../../../shared/store/Themestore';
import './BookList.scss';

const BookList = () => {
    const { themes, currentSeason } = useThemeStore(); // 테마 설정 사용
    const currentTheme = themes[currentSeason]; // 현재 시즌 테마 색상
    const [sortOption, setSortOption] = useState('newest'); // 초기 정렬기준
    
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        fetchNovels(); // 컴포넌트 마운트 시 데이터 가져오기
    }, []);

    useEffect(() => {
        sortNovels(sortOption); // 정렬 기준 변경 시 소설 목록 정렬
    }, [sortOption]);

    const fetchNovels = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/books/'); // 백엔드 API 호출
            console.log('Fetched novels:', response.data); // 응답 데이터 콘솔에 출력
            if (Array.isArray(response.data.results)) {
            setBooks(response.data.results); // results 배열로 설정
            } else {
                console.error('Fetched data is not an array:', response.data);
                setBooks([]); // 응답 데이터가 배열이 아닌 경우 빈 배열로 설정
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching novels:', error);
            setBooks([]); // 오류 발생 시 빈 배열로 설정
            setLoading(false);
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
                sortedNovels.sort((a, b) => b.is_liked - a.is_liked);
                break;
            case 'rating':
                sortedNovels.sort((a, b) => b.average_rating - a.average_rating);
                break;
            default:
                break;
        }
        setBooks(sortedNovels); // 정렬된 목록 설정
    };


    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시할 컴포넌트
    }

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
                    {books.map((book) => (
                        <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.user_id}</td>
                        <td>{book.is_liked}</td>
                        <td>{book.average_rating}</td>
                        <td>{new Date(book.created_at).toLocaleDateString()}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;

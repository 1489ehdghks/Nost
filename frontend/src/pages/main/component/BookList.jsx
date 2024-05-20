import React, { useState, useEffect } from 'react';
import useThemeStore from '../../../shared/store/Themestore';
import './BookList.scss';

const BookList = () => {
    const { themes, currentSeason } = useThemeStore(); // 테마 설정 사용
    const currentTheme = themes[currentSeason]; // 현재 시즌 테마 색상
    const [sortOption, setSortOption] = useState('newest'); // 초기 정렬기준
    const [novels, setNovels] = useState([
        { id: 1, novel: 'The Great Gatsby', author: 'F. Scott Fitzgerald', likes: 1500, rating: 4.5, created_at: '2022-01-01' },
        { id: 2, novel: 'To Kill a Mockingbird', author: 'Harper Lee', likes: 2000, rating: 4.8, created_at: '2021-05-15' },
        { id: 3, novel: '1984', author: 'George Orwell', likes: 1800, rating: 4.7, created_at: '2020-11-20' },
        { id: 4, novel: 'Pride and Prejudice', author: 'Jane Austen', likes: 1700, rating: 4.6, created_at: '2019-07-10' },
        { id: 5, novel: 'The Catcher in the Rye', author: 'J.D. Salinger', likes: 1600, rating: 4.4, created_at: '2018-03-25' },
    ]);

    useEffect(() => {
        sortNovels(sortOption); // 정렬 기준 변경 시 소설 목록 정렬
    }, [sortOption]);

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortOption(value); // 정렬 기준 변경
    };

    const sortNovels = (criteria) => {
        const sortedNovels = [...novels];
        switch (criteria) {
            case 'newest':
                sortedNovels.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'popular':
                sortedNovels.sort((a, b) => b.likes - a.likes);
                break;
            case 'rating':
                sortedNovels.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }
        setNovels(sortedNovels); // 정렬된 목록 설정
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
                    {novels.map((novel) => (
                        <tr key={novel.id}>
                            <td>{novel.novel}</td>
                            <td>{novel.author}</td>
                            <td>{novel.likes}</td>
                            <td>{novel.rating}</td>
                            <td>{novel.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;

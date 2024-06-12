import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookStore from '../../shared/store/BookStore';
import useThemeStore from '../../shared/store/Themestore';
import axiosInstance from '../../features/auth/AuthInstance';
import './Mybooklist.scss';

const Card = ({ id, image, header, likes, rating, onClick }) => {
  const title = useBookStore((state) => state.title);
  const formatTitle = (title) => title.split(' ').join('_');
  const defaultImage = 'https://cdn.discordapp.com/attachments/1235780830534570089/1249913786119229450/-_-001_2.png?ex=666a59ec&is=6669086c&hm=0e21c67e1f0c7d4d91bf4cb24a8b3eccf842b8063a4be83f45df6f3c8aefc10e&';
  const imageUrl = title ? `https://mynostbucket.s3.ap-northeast-2.amazonaws.com/books/${formatTitle(title)}.png` : defaultImage;

  return (
    <div className="card" style={{ backgroundImage: `url(${imageUrl})` }} onClick={() => onClick(id)}>
      <div className="card-header"><h1>{header}</h1></div>
      <div className="card-content">
        <p> ❤️ {likes}</p>
        <p>
          {'⭐'.repeat(Math.min(Math.floor(rating), 5))}
          {rating % 1 !== 0 ? (rating % 1 >= 0.5 ? '⭐' : '☆') : ''}
          {'☆'.repeat(Math.max(5 - Math.ceil(rating), 0))} {rating} / 5
        </p>
      </div>
    </div>
  );
};

const Mybooklist = () => {
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];

  const [mybooks, setMyBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axiosInstance.get('https://nost-stella.com/api/books/userbooks/');
        setMyBooks(response.data);
      } catch (error) {
        console.error('There was an error fetching the books!', error);
      }
    };

    fetchUserBooks();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = mybooks.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(mybooks.length / cardsPerPage);

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  const generatePagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(currentPage - halfPagesToShow, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="container" style={{ color: currentTheme.textColor }}>
      <h1 className="title">My Book List</h1>
      <div className="cardlist">
        {currentCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            header={card.title}
            likes={card.is_liked.length || 0}
            rating={card.average_rating || 0}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handleClick(1)} disabled={currentPage === 1}> &laquo; </button>
        <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}> &lt; </button>
        {generatePagination().map((page, index) => (
          <button
            key={index}
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

export default Mybooklist;

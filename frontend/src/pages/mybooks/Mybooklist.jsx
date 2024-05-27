import React, { useState } from 'react';
import useThemeStore from '../../shared/store/Themestore';
import Mybookcard from '../../widgets/card/Mybookcard';
import DetailPage from '../../widgets/card/DetailPage';
import './Mybooklist.scss';

const Mybooklist = () => {
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];
  const cards = [
    {
      image: 'https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=',
      header: 'Canyons',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
      image: 'https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=',
      header: 'Beaches',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
      image: 'https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=',
      header: 'Trees',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
      image: 'https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=',
      header: 'Lakes',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
      image: 'https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=',
      header: 'Lakes',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

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

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseDetail = () => {
    setSelectedCard(null);
  };

  return (
    <div className="container" style={{ color: currentTheme.textColor }}>
      <h1 className="title">My Book List</h1>
      <div className="cardlist">
        {currentCards.map((card, index) => (
          <Mybookcard 
          key={index}
          card={card}
          onClick={handleCardClick}
        />
        ))}
      </div>
      {selectedCard && (
        <DetailPage card={selectedCard} onClose={handleCloseDetail} />
      )}
      <div className="pagination" >
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

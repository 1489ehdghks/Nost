import React from 'react';

const Mybookcard = ({ card, onClick }) => {
  const handleCardClick = () => {
    onClick(card);
  };

  return (
    <div className="card" style={{ backgroundImage: `url(${card.image})` }} onClick={handleCardClick}>
      <div className="card-header"><h1>{card.header}</h1></div>
      <div className="card-content"><p>{card.content}</p></div>
    </div>
  );
};

export default Mybookcard;

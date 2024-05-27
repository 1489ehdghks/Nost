import React from 'react';

const DetailPage = ({ card, onClose }) => {
  return (
    <div className="detail-page">
      <h1>{card.header}</h1>
      <p>{card.content}</p>
      {/* 추가적인 정보 표시 */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DetailPage;

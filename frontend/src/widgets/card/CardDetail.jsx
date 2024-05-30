import React from 'react';
import { useParams } from 'react-router-dom';
import useThemeStore from '../../shared/store/Themestore';
import './CardDetail.scss';

const CardDetail = () => {
  const { id } = useParams();
  const { themes, currentSeason } = useThemeStore();
  const currentTheme = themes[currentSeason];
  
  // 예시 데이터
  const cardData = {
    1: {
      image: 'https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=',
      header: 'Canyons',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.',
      comments: [
        { user: 'User1', text: 'This is a comment about Canyons.This is a comment about Canyons.This is a comment about Canyons.This is a comment about Canyons.This is a comment about Canyons.This is a comment about Canyons.This is a comment about Canyons.This is a comment about Canyons.', date: 'March 5th, 2014' },
        { user: 'User2', text: 'Amazing view!', date: 'March 6th, 2014' },
        { user: 'User1', text: 'This is a comment about Canyons.', date: 'March 5th, 2014' },
        { user: 'User2', text: 'Amazing view!', date: 'March 6th, 2014' },
        { user: 'User1', text: 'This is a comment about Canyons.', date: 'March 5th, 2014' },
        { user: 'User2', text: 'Amazing view!', date: 'March 6th, 2014' },
        { user: 'User1', text: 'This is a comment about Canyons.', date: 'March 5th, 2014' },
        { user: 'User2', text: 'Amazing view!', date: 'March 6th, 2014' },
        { user: 'User1', text: 'This is a comment about Canyons.', date: 'March 5th, 2014' },
        { user: 'User2', text: 'Amazing view!', date: 'March 6th, 2014' },
        { user: 'User1', text: 'This is a comment about Canyons.', date: 'March 5th, 2014' },
        { user: 'User2', text: 'Amazing view!', date: 'March 6th, 2014' },
        { user: 'User1', text: 'This is a comment about Canyons.', date: 'March 5th, 2014' },
        { user: 'User2', text: 'Amazing view!', date: 'March 6th, 2014' }
      ]
    },
    2: {
      image: 'https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=',
      header: 'Beaches',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.',
      comments: [
        { user: 'User3', text: 'Beaches are my favorite!', date: 'March 7th, 2014' },
        { user: 'User4', text: 'Beautiful!', date: 'March 8th, 2014' }
      ]
    },
    3: {
      image: 'https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=',
      header: 'Trees',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.',
      comments: [
        { user: 'User5', text: 'I love trees!', date: 'March 9th, 2014' },
        { user: 'User6', text: 'So green!', date: 'March 10th, 2014' }
      ]
    },
    4: {
      image: 'https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=',
      header: 'Lakes',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eaque.',
      comments: [
        { user: 'User7', text: 'Lakes are so peaceful.', date: 'March 11th, 2014' },
        { user: 'User8', text: 'I want to visit this lake.', date: 'March 12th, 2014' }
      ]
    }
  };

  const card = cardData[id];

  return (
    <div className="card-detail" style={{ color: currentTheme.textColor }}>
      <div className="summary">
        <h1>{card.header}</h1>
        {/* <img src={card.image}/> */}
        <p>{card.content}</p>
      </div>
      <div className="comment-box" >
        <h2>Comment Box</h2>
        <div className="comments">
          {card.comments.map((comment, index) => (
            <div className="comment" key={index}>
              <img src="https://via.placeholder.com/50" alt="User" />
              <p>{comment.text} <br />{comment.user} <small>on {comment.date}</small></p>
            </div>
          ))}
        </div>
        <textarea placeholder="Your comments"></textarea>
        <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>Add</button>
      </div>
    </div>
  );
};

export default CardDetail;

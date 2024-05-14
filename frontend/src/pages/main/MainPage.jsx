import React from 'react';
import GenerateStory from '../../process/GenerateStory';
import './MainPage.scss'

const MainPage = () => {



    return (
        <div className="main-page">
            <div className="section">
                <h2>My Stories</h2>
                <p>Check your own stories here. (Feature coming soon)</p>
                {/* <ul>
                    {allStories.length > 0 ? (
                        allStories.map((story) => (
                            <li key={story.id}>
                                <strong>{story.storyInfo.title}</strong> - {story.storyInfo.genre}
                            </li>
                        ))
                    ) : (
                        <p>No stories available.</p>
                    )}
                </ul> */}
            </div>

            <div className="section">
                <GenerateStory />
            </div>
            <div className="section">
                {/* <GenerateBNP /> */}
            </div>
        </div>
    );
};

export default MainPage;

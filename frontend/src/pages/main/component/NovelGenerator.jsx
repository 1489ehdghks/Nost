import React, { useState } from 'react';
import './NovelGenerator.scss';
import useThemeStore from '../../../shared/store/Themestore';

const NovelGenerator = () => {
    const { themes, currentSeason } = useThemeStore();
    const currentTheme = themes[currentSeason];
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState(null);

    const handleRequestChange = (e) => {
        setRequest(e.target.value);
    };

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        // AI에게 소설 요청을 보내는 로직 추가
        // 가상의 AI 응답을 사용한 예시
        const aiResponse = await mockAIRequest(request);
        setResponse(aiResponse);
        window.history.pushState({}, '', '/interaction');
    };

    // 가상의 AI 요청 함수
    const mockAIRequest = async (request) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`AI 응답: ${request}`);
            }, 1000);
        });
    };

    return (
        <div className="novel-generator section" style={{ backgroundColor: currentTheme.mainpageBackgroundColor, color: currentTheme.textColor }}>
            <h1>New Novel</h1>
            <div className="genre-buttons">
                <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>Genre 1</button>
                <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>Genre 2</button>
                <button style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>Genre 3</button>
            </div>
            <form onSubmit={handleRequestSubmit}>
                <div className="user-request">
                    <textarea
                        placeholder="Enter your request"
                        value={request}
                        onChange={handleRequestChange}
                        style={{ backgroundColor: currentTheme.secondary, color: currentTheme.textColor }}
                    ></textarea>
                </div>
                <button type="submit" style={{ backgroundColor: currentTheme.buttonBackgroundColor, color: currentTheme.buttonTextColor }}>Submit</button>
            </form>
            {response && <div className="novel-response">{response}</div>}
        </div>
    );
};

export default NovelGenerator;

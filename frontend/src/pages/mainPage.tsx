// src/pages/MainPage.tsx
import React, { useState } from 'react';
import axios from 'axios';

function MainPage() {
    const [prompt, setPrompt] = useState<string>('');
    const [story, setStory] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);


    const handleGenerateStory = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create-story', { prompt });
            setStory(response.data.story);
            fetchSuggestions(prompt);
        } catch (error: any) {
            console.error('There was an error generating the story:', error?.response?.data);
        }
    };

    const fetchSuggestions = async (currentStory: string) => {
        try {
            const response = await axios.post('http://localhost:5000/suggest-story', { prompt: currentStory });
            console.log(response.data);
            setSuggestions(response.data.suggestions || []);
            console.log(suggestions);
        } catch (error: any) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };


    // 추천된 이야기를 선택하여 소설에 추가
    const handleSelectSuggestion = (suggestion: string) => {
        const newStory = story + ' ' + suggestion;
        setStory(newStory);
        fetchSuggestions(newStory);
    };

    //버튼 글자수 줄이기
    const shortenText = (text: string, maxLength = 50) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`; // 첫 maxLength 문자만 표시하고 "..." 추가
    };

    return (
        <div>
            <section>
                <h2>나의 소설</h2>
                <p>소유하고 있는 소설을 여기에 표시합니다. (추후 구현)</p>
                <p>스크롤을 하면 소설을 생성할 수 있습니다.</p>
            </section>
            <section>
                <h2>소설 생성하기</h2>
                <textarea
                    rows={4}
                    placeholder="Enter a story prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button onClick={handleGenerateStory}>Generate Story</button>
                {story && <div><h3>Generated Story</h3><p>{story}</p></div>}
                <div>
                    <h4>추천된 이어질 내용:</h4>
                    {suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => (
                            <button key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                                {shortenText(suggestion)}
                            </button>
                        ))
                    ) : (
                        <p>추천을 불러오는 중입니다...</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default MainPage;

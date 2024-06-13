import React, { useState } from 'react';
import useStore from './store/StateStore';
import { initialStoryInfo, initialStoryState, initialContestState } from './store/InitialState';
import useGlobalStore from '../../shared/store/GlobalStore';

const GenerateStory = () => {
    const [prompt, setPrompt] = useState('');
    const { isLoading, setIsLoading, error, setError } = useGlobalStore();
    const { setCurrentStory, addStory, currentStory } = useStore();


    const handleGenerate = async () => {
        if (!prompt) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://nost-stella.com/generate-story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            console.log("Server response:", data);
            if (response.ok) {
                const newStory = {
                    id: Math.floor(Math.random() * 10000),
                    storyInfo: {
                        ...initialStoryInfo,
                        title: 'Generated Story',
                        genre: 'Fantasy',
                        content: data.story,
                    },
                    storyState: initialStoryState,
                    contestState: initialContestState,
                    characters: [],
                    choices: [],
                };
                addStory(newStory);
                setCurrentStory(newStory);
                console.log(newStory);
            } else {
                setError(data.error || 'Failed to generate story.');
            }
        } catch (err) {
            setError(String(err));
        } finally {
            setIsLoading(false);
        }

        setPrompt('');
    };

    return (
        <div>
            <h2>Generate a New Story</h2>
            <textarea
                placeholder="Enter prompt to generate story"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Story'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {currentStory && (
                <div>
                    <h3>{currentStory.storyInfo.title}</h3>
                    <p>{currentStory.storyInfo.content}</p>
                </div>
            )}
        </div>
    );
};

export default GenerateStory;

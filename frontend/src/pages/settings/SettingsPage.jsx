import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsPage.scss';

const SettingsPage = () => {
    const [apiKey, setApiKey] = useState('');
    const [language, setLanguage] = useState('');
    const [charges, setCharges] = useState(0);
    const navigate = useNavigate();

    const handleSave = () => {
        // 추가 로직 필요 (예: 로컬 스토리지 저장, 백엔드 호출 등)
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        // 요금 정보 가져오는 로직 추가
        // setCharges(가져온 요금);
    }, []);

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <div className="settings-item">
                <label>OpenAI API Key</label>
                <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your OpenAI API Key"
                />
            </div>
            <div className="settings-item">
                <label>Language</label>
                <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="Enter preferred language"
                />
            </div>
            <div className="settings-item">
                <label>Incurred Charges</label>
                <div className="charges">
                    ${charges}
                </div>
            </div>
            <div className="button-group">
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default SettingsPage;

import React from 'react';
import useBookStore from '../../../shared/store/BookStore';
import './SynopsysResult.scss';

const SynopsysResult = () => {
    const { synopsis, title, genre, theme, tone, setting, characters } = useBookStore();

    return (
        <div className="section">
            <div className="SynopsysResult-letter">
                <p><strong>Title:</strong> {title}</p>
                <p><strong>Genre:</strong> {genre}</p>
                <p><strong>Theme:</strong> {theme}</p>
                <p><strong>Tone:</strong> {tone}</p>
                <p><strong>Setting:</strong> {setting}</p>
                <p><strong>Synopsis:</strong>{synopsis}</p>
                <p><strong>Characters:</strong> {characters}</p>

            </div>
        </div>
    );
};

export default SynopsysResult;
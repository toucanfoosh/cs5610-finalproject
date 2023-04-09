import React, { useState } from 'react';
import './button.css';

const BubblyButton = () => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 700);
    };

    return (
        <button className={`sf-bubbly-button ${isAnimating ? 'animate' : ''}`}
            onClick={handleClick} >
            Post
        </button>
    );
};

export default BubblyButton;

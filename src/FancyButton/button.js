import React, { useState } from 'react';
import './button.css';

const FancyButton = ({ text, onclick }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        onclick();
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 700);
    };

    return (
        <button className={`sf-bubbly-button ${isAnimating ? 'animate' : ''}`}
            onClick={handleClick} >
            {text}
        </button >
    );
};

export default FancyButton;

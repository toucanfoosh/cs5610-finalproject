import React, { useState } from 'react';
import './button.css';

const BubblyButton = ({ text, onclick }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 700);
    };

    return (
        <button className={`sf-bubbly-button ${isAnimating ? 'animate' : ''}`}
            onClick={onclick} >
            {text}
        </button >
    );
};

export default BubblyButton;

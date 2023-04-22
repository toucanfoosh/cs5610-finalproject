import React, { useState } from 'react';
import './button.css';

// const FancyButton = ({ text, onclick }) => {
//     const [isAnimating, setIsAnimating] = useState(false);

//     const handleClick = () => {
//         onclick();
//         setIsAnimating(true);
//         setTimeout(() => {
//             setIsAnimating(false);
//         }, 700);
//     };
//     return (
//         <button className={`sf-bubbly-button ${isAnimating ? 'animate' : ''}`}
//             onClick={handleClick} >
//             {text}
//         </button >
//     );
// };

function FancyButton({ text, onclick, color = "sf-bg-accent", textColor = "sf-button-text-default"}) {
    return (
      <div className="sf-hw-100 text-center">
        <button className={`sf-shadow ${color} ${textColor}`} onClick={onclick}><span>{text}</span></button>
      </div>
    )
  }
  
  export default FancyButton;
  

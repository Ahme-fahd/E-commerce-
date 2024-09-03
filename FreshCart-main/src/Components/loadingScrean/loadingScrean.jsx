import React from 'react';
import './LoadingScreen.css'; // Make sure to import the CSS file

export default function LoadingScreen() {
  return (
    <div className="loader">
      <span style={{ '--i': 1 }}>F</span>
      <span style={{ '--i': 2 }}>R</span>
      <span style={{ '--i': 3 }}>E</span>
      <span style={{ '--i': 4 }}>S</span>
      <span style={{ '--i': 5 }}>H</span>
      <span style={{ '--i': 6 }}>C</span>
      <span style={{ '--i': 7 }}>A</span>
      <span style={{ '--i': 8 }}>R</span>
      <span style={{ '--i': 9 }}>T</span>
      <span style={{ '--i': 10 }}><i className='fas fa-cart-shopping'></i></span>
    </div>
  );
}


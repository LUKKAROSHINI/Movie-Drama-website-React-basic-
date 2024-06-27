import React from 'react';

function HeartIcon({ filled, onClick, className }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      fill={filled ? 'red' : 'none'}
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21l-1-1C5.4 15.4 2 12.5 2 8.5 2 6 3.5 4 5.5 4c1.5 0 3 1 3.5 2.5C9.5 5 11 4 12.5 4 14.5 4 16 6 16 8.5c0 4-3.4 6.9-8 11.5l-1 1z" />
    </svg>
  );
}

export default HeartIcon;

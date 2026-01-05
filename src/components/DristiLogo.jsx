import React from 'react';

export const DristiLogo = ({ className = "h-10" }) => (
  <svg 
    viewBox="0 0 320 80" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(10, 10) scale(0.6)">
      {/* Left Bracket of Eye */}
      <path 
        d="M50 10 C20 10, 0 30, 0 30 C0 30, 20 50, 50 50" 
        stroke="#2563EB" 
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right Bracket of Eye */}
      <path 
        d="M50 10 C80 10, 100 30, 100 30 C100 30, 80 50, 50 50" 
        stroke="#2563EB" 
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Circuit Nodes/Lines */}
      <circle cx="15" cy="20" r="3" fill="#2563EB" />
      <circle cx="15" cy="40" r="3" fill="#2563EB" />
      <path d="M15 20 L25 25" stroke="#2563EB" strokeWidth="2" />
      <path d="M15 40 L25 35" stroke="#2563EB" strokeWidth="2" />

      <circle cx="85" cy="20" r="3" fill="#2563EB" />
      <circle cx="85" cy="40" r="3" fill="#2563EB" />
      <path d="M85 20 L75 25" stroke="#2563EB" strokeWidth="2" />
      <path d="M85 40 L75 35" stroke="#2563EB" strokeWidth="2" />

      {/* Central Iris Circle */}
      <circle cx="50" cy="30" r="16" stroke="#2563EB" strokeWidth="3" fill="white" />
      
      {/* Medical Cross (Green) */}
      <path 
        d="M50 20 V40 M40 30 H60" 
        stroke="#10B981" 
        strokeWidth="5" 
        strokeLinecap="round"
      />
    </g>

    {/* Text Logo */}
    <text x="80" y="52" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="48" fill="#1E3A8A" letterSpacing="-1">
      Dristi
    </text>
    <text x="210" y="52" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="32" fill="#2563EB">
      AI
    </text>
  </svg>
);

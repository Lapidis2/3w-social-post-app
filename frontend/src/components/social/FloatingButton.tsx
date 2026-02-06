import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <div className="position-fixed" style={{ bottom: 80, right: 20, zIndex: 100 }}>
      <button className="fab" onClick={onClick}>
        <i className="bi bi-plus-lg"></i>
      </button>
    </div>
  );
};

export default FloatingActionButton;

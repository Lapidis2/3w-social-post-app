import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="position-fixed bottom-0 start-0 end-0 bg-white d-flex justify-content-around align-items-center py-2 pb-3 shadow-lg" style={{ zIndex: 100 }}>
      <button
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <i className="bi bi-house"></i>
        <span>Home</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
        onClick={() => onTabChange('tasks')}
      >
        <i className="bi bi-check2-square"></i>
        <span>Tasks</span>
      </button>
      <button className="nav-item-center" onClick={() => {}}>
        <i className="bi bi-globe"></i>
      </button>
      <button
        className={`nav-item ${activeTab === 'social' ? 'active' : ''}`}
        onClick={() => onTabChange('social')}
      >
        <i className="bi bi-people"></i>
        <span>Social</span>
      </button>
      <button
        className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`}
        onClick={() => onTabChange('leaderboard')}
      >
        <i className="bi bi-trophy"></i>
        <span>Ranks</span>
      </button>
    </nav>
  );
};

export default BottomNav;

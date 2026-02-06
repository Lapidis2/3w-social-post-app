import React from 'react';
import { currentUser } from '../../data/mockData';

const SocialHeader: React.FC = () => {
  return (
    <header className="social-header bg-white p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="h4 fw-bold mb-0 text-dark">Social</h1>
        <div className="d-flex align-items-center gap-2">
        
          <button className="btn btn-light position-relative border-0 p-1">
            <i className="bi bi-bell fs-5"></i>
            <span className="notification-dot"></span>
          </button>
          <img
            src={currentUser.avatar}
            alt="Profile"
            className="rounded-circle border-primary border-2"
            style={{ width: 40, height: 40, objectFit: 'cover' }}
          />
        </div>
      </div>
    </header>
  );
};

export default SocialHeader;

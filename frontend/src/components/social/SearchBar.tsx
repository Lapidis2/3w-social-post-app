import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="bg-white px-3 py-2 border-bottom">
      <form onSubmit={handleSubmit} className="d-flex align-items-center bg-light rounded-pill px-3 py-2 gap-2 search-input-wrapper">
        <input
          type="text"
          className="form-control border-0 bg-transparent shadow-none"
          placeholder="Search promotions, users, posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: 36, height: 36, minWidth: 36 }}>
          <i className="bi bi-search"></i>
        </button>
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
          alt="User"
          className="rounded-circle"
          style={{ width: 36, height: 36 }}
        />
      </form>
    </div>
  );
};

export default SearchBar;

import React from 'react';
import { filterTabs } from '../../data/mockData';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="bg-white px-3 py-2 filter-tabs-scroll">
      <div className="d-flex gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            className={`filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
            onClick={() => onFilterChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;

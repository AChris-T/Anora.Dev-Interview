import React from 'react';

type Props = {
  selectedStatus: 'all' | 'pending' | 'completed' | 'overdue';
  onStatusChange: (status: 'all' | 'pending' | 'completed' | 'overdue') => void;
  onSearch: (query: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
};

const FilterBar: React.FC<Props> = ({ selectedStatus, onStatusChange, onSearch, isDark, toggleTheme }) => {
  const statusOptions = ['all', 'pending', 'completed', 'overdue'] as const;

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem',
    }}>
      {/* Filter Buttons */}
      <div>
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            style={{
              padding: '0.4rem 0.8rem',
              backgroundColor: selectedStatus === status ? '#3b82f6' : '#e5e7eb',
              color: selectedStatus === status ? '#fff' : '#1f2937',
              borderRadius: '6px',
              marginRight: '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {status[0].toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => onSearch(e.target.value)}
        style={{
          padding: '0.4rem 0.6rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '200px'
        }}
      />

      {/* Theme Toggle */}
      <button onClick={toggleTheme} style={{ marginLeft: '1rem' }}>
        {isDark ? '🌞 Light' : '🌙 Dark'}
      </button>
    </div>
  );
};

export default FilterBar;

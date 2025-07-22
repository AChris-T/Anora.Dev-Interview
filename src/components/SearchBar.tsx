import React from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
  style?: React.CSSProperties;
};

export default function SearchBar({ value, onChange, style }: Props) {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: 6,
        border: '1px solid #ccc',
        fontSize: '1rem',
        marginRight: 12,
        ...style,
      }}
      aria-label="Search tasks"
    />
  );
}

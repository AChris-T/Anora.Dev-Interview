import React from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
  style?: React.CSSProperties;
  className?: string;
};

export default function SearchBar({ value, onChange, style, className }: Props) {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        fontSize: '1rem',
        marginRight: 12,
        ...style,
      }}
      className={className}
      aria-label="Search tasks"
    />
  );
}

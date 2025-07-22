import '@testing-library/jest-dom';

if (typeof window !== 'undefined' && !window.localStorage) {
  window.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };
}

if (typeof global.fetch !== 'function') {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    } as Response)
  );
} 
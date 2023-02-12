import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders', () => {
  expect(() => render(<App />)).not.toThrow();
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

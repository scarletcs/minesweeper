import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameGrid } from './GameGrid';

it('renders', () => {
  expect(() => render(<GameGrid />)).not.toThrow();
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

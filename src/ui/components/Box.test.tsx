import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';

test('renders', () => {
  expect(() => render(<Box x={0} y={0} />)).not.toThrow();
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

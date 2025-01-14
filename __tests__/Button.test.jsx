import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Button from '../src/components/shared/button';

describe('Button Component', () => {
  it('renders the button with correct text', () => {
    render(<Button text="Add a card" />);
    
    const buttonElement = screen.getByRole('button', { name: /add a card/i });
    expect(buttonElement).toBeInTheDocument();
  });
});

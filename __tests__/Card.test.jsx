import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../src/components/ui/cards/card';

describe('Card Component', () => {
  it('renders the card with correct title', () => {
    render(<Card title="Test Card" />);
    
    const titleElement = screen.getByText(/test card/i);
    expect(titleElement).toBeInTheDocument();
  });
});

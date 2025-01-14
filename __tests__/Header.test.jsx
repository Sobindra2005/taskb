import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../src/components/ui/header';

describe('Header Component', () => {
  it('renders the header with correct title', () => {
    render(<Header />);
    
    const titleElement = screen.getByText(/board name/i);
    expect(titleElement).toBeInTheDocument();
  });
});

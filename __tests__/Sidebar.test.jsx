import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Sidebar from '../src/components/ui/sidebar';

describe('Sidebar Component', () => {
  it('renders the sidebar with correct items', () => {
    render(<Sidebar />);
    
    const boardsItem = screen.getByText(/boards/i);
    const membersItem = screen.getByText(/members/i);
    const cardsItem = screen.getByText(/cards/i);

    expect(boardsItem).toBeInTheDocument();
    expect(membersItem).toBeInTheDocument();
    expect(cardsItem).toBeInTheDocument();
  });
});

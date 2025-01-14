import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Task from '../src/components/ui/cards/task';

describe('Task Component', () => {
  it('renders the task with correct title and description', () => {
    const task = { id: '1', title: 'Test Task', description: 'This is a test task.' };
    render(<Task task={task} />);
    
    const titleElement = screen.getByText(/test task/i);
    const descriptionElement = screen.getByText(/this is a test task/i);
    
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});

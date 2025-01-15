 import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AddTask from '../src/components/forms/AddTask';

describe('AddTask Component', () => {
  it('renders the Add Task form', () => {
    render(<AddTask onCancelClick={() => {}} onSubmitClick={() => {}} />);
    
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const descriptionInput = screen.getByPlaceholderText(/enter description/i);

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

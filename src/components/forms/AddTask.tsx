import React, { useState } from 'react';
import { CancelButton, SubmitButton } from '../shared/button';

interface props {
    onCancelClick: () => void
    onSubmitClick: () => void
}

const AddTask: React.FC<props> = ({ onCancelClick, onSubmitClick }) => {
    return (
        <div className='flex flex-col justify-center gap-2 cursor-pointer text-gray-300 mt-9'>
            <input placeholder='Enter Title' type='text' className='outline-none bg-transparent border p-2 resize-none border-gray-400 focus:border-blue-600' />
            <textarea rows={3} placeholder='Enter description' className='outline-none bg-transparent border p-2 resize-none border-gray-400 focus:border-blue-600' />
            <div className='flex items-center justify-end gap-3 mt-1'>
                < CancelButton onClick={onCancelClick} />
                <SubmitButton onClick={onSubmitClick} />
            </div>
        </div>
    );
};

export default AddTask;
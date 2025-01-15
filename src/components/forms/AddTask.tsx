import React, { Dispatch, SetStateAction } from 'react';
import { CancelButton, SubmitButton } from '../shared/button';

interface props {
    onCancelClick: () => void
    onSubmitClick: () => void
    title: string
    setTitle: Dispatch<SetStateAction<string>>
    description: string
    setdescription: Dispatch<SetStateAction<string>>

}

const AddTask: React.FC<props> = ({ onCancelClick, onSubmitClick, title, setTitle, description, setdescription }) => {
    return (
        <div className='flex flex-col justify-center gap-2 cursor-pointer text-gray-300 mt-9'>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title' type='text' className='outline-none bg-transparent border p-2 resize-none border-gray-400 focus:border-blue-600' />
            <textarea value={description} onChange={(e) => setdescription(e.target.value)} rows={3} placeholder='Enter description' className='outline-none bg-transparent border p-2 resize-none border-gray-400 focus:border-blue-600' />
            <div className='flex items-center justify-end gap-3 mt-1'>
                < CancelButton onClick={onCancelClick} />
                <SubmitButton onClick={onSubmitClick} />
            </div>
        </div>
    );
};

export default AddTask;
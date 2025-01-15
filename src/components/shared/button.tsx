import React from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
interface props {
    onClick: () => void;
}



const AddItem: React.FC<props> = ({ onClick }) => {
    return (
        <div onClick={onClick} className='flex items-center gap-2 cursor-pointer py-2 hover:bg-gray-600 text-gray-300 mt-2'>
            <IoAddOutline size={22} />
            <p className='text-md'>Add a card</p>
        </div>
    );
};

export const CancelButton: React.FC<props> = ({ onClick }) => {
    return (

        <RxCross2 onClick={onClick} size={22} className='hover:bg-gray-600 p-2 w-10 h-10' />

    )
}



export const SubmitButton: React.FC<props> = ({ onClick }) => {
    return (<button type='button' onClick={onClick} className='p-2 rounded-md bg-blue-500 text-black text-md hover:bg-blue-600 px-3'>Save</button>)
}

export const DeleteButton: React.FC<props> = ({ onClick }) => {
    return (<button type='button' onClick={onClick} className=' rounded-md  text-black   p-1'><MdDelete size={22} className='h-6 w-6 text-gray-300 hover:text-gray-100' /></button>)
}

export default AddItem;
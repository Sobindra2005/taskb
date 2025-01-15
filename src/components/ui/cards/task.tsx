"use client"
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { TaskType } from '@/Types/types';
import { DeleteButton } from '@/components/shared/button';

interface props {
    task: TaskType
    onClick: () => void

}

const Task: React.FC<props> = ({ task, onClick }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };



    return (
        <div className='border border-gray-600 p-2 cursor-pointer hover:bg-gray-600'>
            <div ref={setNodeRef}
                style={style} {...attributes} {...listeners} className={`flex  relative  gap-2  items-center ${isDragging ? 'opacity-50' : ''}`}>
                <div className='flex flex-col gap-1'>
                    <h3 className="text-lg font-bold mb-1 text-gray-300">{task.title}</h3>
                    <p className="text-md text-gray-300">{task.description}</p>
                </div>

            </div>
            <div className='w-full flex items-center justify-end'>
                <DeleteButton onClick={onClick} />
            </div>
        </div>
    );
};

export default Task

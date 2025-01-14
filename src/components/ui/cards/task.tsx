"use client"
import dynamic from 'next/dynamic';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { TaskType } from '@/Types/types';

interface props {
    task: TaskType
}

const Task: React.FC<props> = ({ task }) => {
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
        <div ref={setNodeRef}
            style={style} {...attributes} {...listeners} className={`flex border border-gray-600 p-2 cursor-pointer hover:bg-gray-600 gap-2  ${isDragging ? 'opacity-50' : ''}`}>
            <div className='flex flex-col gap-1'>
                <h3 className="text-lg font-bold mb-1 text-gray-300">{task.title}</h3>
                <p className="text-md text-gray-300">{task.description}</p>
            </div>
        </div>
    );
};

export default Task

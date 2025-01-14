"use client"
import dynamic from 'next/dynamic';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';

interface TaskProps {
    id: number;
    title: string;
    description: string;
}

const Task: React.FC<TaskProps> = ({ id, title, description }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };
    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} key={id} className='flex border border-gray-600 p-2 cursor-pointer hover:bg-gray-600 gap-2'>
            <div className='flex flex-col gap-1'>
                <h3 className="text-lg font-bold mb-1 text-gray-300">{title}</h3>
                <p className="text-md text-gray-300">{description}</p>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Task), { ssr: false });

"use client";

import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from './task';
import { useDroppable } from '@dnd-kit/core';
import { ColumnType } from '@/Types/types';
import AddTask from "@/components/forms/AddTask"
import AddItem from "@/components/shared/button"

interface props {
    items: ColumnType;
    addTask: (categoryId: string, title: string, description: string) => void;
    deleteTask: (categoryId: string, taskId: string) => void;
}

const Card: React.FC<props> = ({ items, addTask, deleteTask }) => {
    const { setNodeRef } = useDroppable({
        id: items.id,
    });

    const [active, setActive] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')
    const [description, setdescription] = useState<string>('')



    return (
        <div className="card bg-gray-700 shadow-md rounded-lg p-4 mb-4 min-h-[20rem] ">
            <div className='min-w-[18rem]'>
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-bold mb-2 text-gray-300 capitalize flex items-center gap-1">{items.title}</h2>
                    <BsThreeDots className='cursor-pointer rounded-full hover:bg-gray-600 p-1 w-7 h-7' />
                </div>

                <div ref={setNodeRef} className='flex flex-col gap-4'>
                    <SortableContext items={items.tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                        {items.tasks.map((item, index) => (
                            <div key={index}>
                                <Task
                                    task={item}
                                    onClick={() => deleteTask(items.id, item.id)}
                                />
                            </div>
                        ))}
                    </SortableContext>

                </div>
                {active ? (
                    <AddTask title={title} setTitle={setTitle} description={description} setdescription={setdescription} onCancelClick={() => setActive(false)} onSubmitClick={() => { setTitle(''); setdescription(''); addTask(items.id, title, description) }} />
                ) : (
                    <AddItem onClick={() => setActive(true)} />
                )}
            </div>
        </div>
    );
};

export default Card;

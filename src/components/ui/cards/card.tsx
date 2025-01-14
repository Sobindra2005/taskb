"use client";

import React, { ReactNode, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoAddOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from './task';
import { useDroppable } from '@dnd-kit/core';
import { ColumnType } from '@/Types/types';

interface props {
    items: ColumnType;
}

const Card: React.FC<props> = ({ items }) => {
    const { setNodeRef } = useDroppable({
        id: items.id,
    });
    const [active, setActive] = useState<boolean>(false);
    return (
        <div className="card bg-gray-700 shadow-md rounded-lg p-4 mb-4 min-h-[20rem] ">
            <div className='min-w-[18rem]'>
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-bold mb-2 text-gray-300 capitalize flex items-center gap-1">{items.title}</h2>
                    <BsThreeDots className='cursor-pointer rounded-full hover:bg-gray-600 p-1 w-7 h-7' />
                </div>

                <div ref={setNodeRef} className='flex flex-col gap-4'>
                    <SortableContext items={items.tasks.map((task) => task.id)} strategy={verticalListSortingStrategy} >
                        {items.tasks.map((item,index) => (
                            <div key={ index} >  <Task task={item} /></div>
                        ))}
                    </SortableContext>
                </div>
                {active ? (
                    <div className='flex flex-col justify-center gap-2 cursor-pointer text-gray-300 mt-9'>
                        <input placeholder='Enter Title' type='text' className='outline-none bg-transparent border p-2 resize-none border-gray-400 focus:border-blue-600' />
                        <textarea rows={3} placeholder='Enter description' className='outline-none bg-transparent border p-2 resize-none border-gray-400 focus:border-blue-600' />
                        <div className='flex items-center gap-3'>
                            <button type='button' className='p-2 rounded-md bg-blue-500 text-black text-md hover:bg-blue-600 px-3'>Save</button>
                            <RxCross2 onClick={() => setActive(false)} size={22} className='hover:bg-gray-600 p-2 w-10 h-10' />
                        </div>
                    </div>
                ) : (
                    <div onClick={() => setActive(true)} className='flex items-center gap-2 cursor-pointer py-2 hover:bg-gray-600 text-gray-300 mt-2'>
                        <IoAddOutline size={22} />
                        <p className='text-md'>Add a card</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;

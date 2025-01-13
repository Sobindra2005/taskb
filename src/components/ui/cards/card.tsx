"use client";

import React, { ReactNode, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoAddOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

interface props {
    title: string,
    icon: ReactNode,
    items: item[],
}

interface item {
    title: string,
    smallDescription: string,
}

const Card: React.FC<props> = ({ title, icon, items }) => {
    const [Item, setItem] = useState();
    const [Active, setActive] = useState<Boolean>();
    return (
        <div className="card bg-gray-700 shadow-md rounded-lg p-4 mb-4 h-fit overflow-auto">
            <div className='min-w-[18rem]'>
                <div className='flex items-center justify-between  '>
                    <h2 className="text-xl font-bold mb-2 text-gray-300 capitalize flex items-center  gap-1 ">{title}{icon}</h2>
                    <BsThreeDots className='cursor-pointer rounded-full hover:bg-gray-600 p-1 w-7 h-7' />
                </div>

                <div className='flex flex-col gap-4'>
                    {items.map((item, index) => (
                        <div key={index} className='flex border border-gray-600 p-2 cursor-pointer hover:bg-gray-600  gap-2'>
                            <div className='flex flex-col gap-1'>
                                <h3 className="text-lg font-bold mb-1 text-gray-300">{item.title}</h3>
                                <p className="text-md text-gray-300">{item.smallDescription}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {Active ?
                    <div className='flex flex-col justify-center gap-2 cursor-pointer  text-gray-300 mt-9 '>
                        <input placeholder='Enter Title' type='text' className='outline-none bg-transparent border p-2 resize-none border-gray-400 focus:border-blue-600' />
                        <textarea rows={3} placeholder='Enter description' className='outline-none bg-transparent border p-2 resize-none border-gray-400 focus:border-blue-600' />
                        <div className='flex items-center gap-3' >
                            <button type='button' className='p-2 rounded-md bg-blue-500 text-black text-md hover:bg-blue-600 px-3 '>Save</button>
                            <RxCross2 onClick={() => setActive(false)} size={22} className='hover:bg-gray-600 p-2 w-10 h-10' />
                        </div>
                    </div>
                    :
                    <div onClick={() => setActive(true)} className='flex items-center gap-2 cursor-pointer   py-2 hover:bg-gray-600  text-gray-300 mt-2 '>
                        <IoAddOutline size={22} />
                        <p className='text-md '>Add a card</p>
                    </div>}

            </div>
        </div>
    );
};

export default Card;
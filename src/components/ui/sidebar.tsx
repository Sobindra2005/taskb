import React from 'react';
import { IoMdPeople, IoMdSettings } from 'react-icons/io';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import Image from 'next/image';
const Sidebar = () => {
    return (
        <main className="sidebar mr-2 min-h-screen fixed top-0 left-0  min-w-[14rem] bg-[#023047]  text-[#fb8500] p-2 pt-5 pr-5 border-r border-gray-600">
            <h1 className='text-3xl font-bold border-b border-yellow-700 text-[#ffb703]'>Kanban <span className='text-purple-500'>Board</span>  </h1>
            <div className='mt-10 text-gray-400  '>
                {[{ name: 'Boards', icon: <TbLayoutBoardSplit size={25} /> }, { name: 'members', icon: <IoMdPeople size={25} /> }, { name: 'Cards', icon: <IoMdSettings size={25} /> }].map((nav, index) => (
                    <div key={index} className='flex gap-1 py-2 cursor-pointer hover:bg-gray-700 px-1 '>{nav.icon} {nav.name}</div>
                ))}
                <h1 className='mt-4 text-xl font-semibold '>Your Boards</h1>
                {[{ name: 'Board 1', image: 'https://picsum.photos/200/300', active: true }, { name: 'Board 2', image: 'https://picsum.photos/200/301', active: false }, { name: 'Board 3', image: 'https://picsum.photos/200/302', active: false }].map((nav, index) => (
                    <div key={index} className={`flex gap-1 py-2 cursor-pointer ${nav.active === true ? 'bg-gray-700' : ""} relative hover:bg-gray-700 px-1 items-center`}><Image src={nav.image} alt={nav.name} width={25} height={25} className='objec-center object-cover h-6 w-6 ' /> {nav.name}</div>
                ))}
            </div>

        </main>
    );
};

export default Sidebar;
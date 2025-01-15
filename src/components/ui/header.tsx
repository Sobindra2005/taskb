import React, { Dispatch, SetStateAction } from 'react';
import { CiSearch, CiStar } from 'react-icons/ci';
import { IoFilterSharp } from 'react-icons/io5';

interface props {
    setisActive: Dispatch<SetStateAction<boolean>>
    isActive: boolean
}

const Header: React.FC<props> = ({ setisActive, isActive }) => {
    return (

        <header >

            <div className="flex justify-between gap-3 p-4 w-full  items-center text-[#fb8500] bg-[#003049] px-8">
                <div className='flex items-center gap-2 '>
                    <h1 className='font-bold text-xl '>Board Name</h1>
                    <CiStar className="text-2xl cursor-pointer " />
                </div>
                <div className='flex justify-center items-center gap-3 '>
                    <CiSearch size={23} className='cursor-pointer  hover:text-[#7c572d]' />
                    <div onClick={() => setisActive(!isActive)} className='  flex items-center justify-center p-2 gap-1 rounded-xl cursor-pointer hover:text-[#7c572d]'>
                        <IoFilterSharp size={23} className='cursor-pointer  ' /><span className=' text-lg  '>filter </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
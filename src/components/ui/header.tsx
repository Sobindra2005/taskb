import React from 'react';
import { FaCheckCircle, FaSpinner, FaRegCircle, FaTasks } from 'react-icons/fa';

interface props {
    completed: number,
    inProgress: number,
    notStarted: number,
    total: number,
}

const Header: React.FC<props> = ({ completed, inProgress, notStarted, total }) => {
    return (
        <header >
            <div className="flex gap-3 p-4 w-full justify-between items-center text-[#fb8500] bg-[#003049] rounded-3xl">
                {[
                    { label: 'Completed', value: completed, icon: <FaCheckCircle /> },
                    { label: 'In Progress', value: inProgress, icon: <FaSpinner size={30} /> },
                    { label: 'Not Started', value: notStarted, icon: <FaRegCircle size={30} /> },
                    { label: 'Total', value: total, icon: <FaTasks size={30} /> },
                ].map((item, index) => (
                    <div key={index} className="flex gap-3 border border-gray-600 rounded-md p-4">
                        <span>{item.label}: {item.value}</span>
                        {item.icon}
                    </div>
                ))}
            </div>
        </header>
    );
};

export default Header;
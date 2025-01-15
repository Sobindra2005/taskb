import React from 'react';

const Dropdown = ({ tasks, setFilterby }) => {
    return (
        <div className="bg-gray-600 p-4 rounded-lg shadow-md z-50 fixed top-14 right-2 ">
            <h2 className="text-white text-lg mb-4 font-bold ">Tasks</h2>
            <ul>
                <li key={'9888'} onClick={()=>setFilterby("All")} className="flex items-center justify-between mb-2 w-full">
                    <span className={`text-white cursor-pointer hover:bg-gray-500 w-full pl-2 `}>
                        {"All"}
                    </span>

                </li>
                {tasks.map((task) => (
                    <li key={task.id} onClick={()=>setFilterby(task.title)} className="flex items-center justify-between mb-2 w-full">
                        <span className={`text-white cursor-pointer hover:bg-gray-500 w-full pl-2 `}>
                            {task.title}
                        </span>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;
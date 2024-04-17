import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { sizes } from '../../utilities/size';

const TallasMenu = ({ onSelectSize }) => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState('Tamaño: ');
    const handleSize = (size) => {
        setSize(size);
        setOpen(!open);
        onSelectSize(size); 
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div className="relative w-full">
            <div
                onClick={handleToggle}
                className="flex text-gray-500 cursor-pointer border border-gray-800 justify-between rounded-md"
            >
                <div className='p-2 ml-2 border-gray-900'>
                    {size}
                </div>
                <div className='flex items-center mr-4'>
                    <div className='flex gap-x-2 text-black'>
                        <h6>
                            Todo
                        </h6>
                        {open ? (
                            <ChevronUpIcon className="w-6 h-6" />
                        ) : (
                            <ChevronDownIcon className="w-6 h-6" />
                        )}
                    </div>
                </div>
            </div>
            {open && (
                <div className="absolute top-10 right-10 z-10 bg-white border-gray-500 border w-[600px]">
                    <div className="grid grid-cols-3 gap-4 p-4">
                        {sizes.map((size) => {
                            return (
                                <button
                                    onClick={() => handleSize(size.size)}
                                    key={size.id}
                                    className="border border-gray-400 py-2 hover:bg-gray-200 duration-300"
                                >
                                    {size.size + ' ' + "CM"}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
export default TallasMenu;
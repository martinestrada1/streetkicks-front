import React from 'react'
import { HeartIcon } from '@heroicons/react/24/outline';
import { formatter } from '../../utilities/formatter';

export default function Card({ brand, name, price }) {
    const formattedPrices = formatter(price);

    return (
        <div className='relative flex flex-col items-center p-2 hover:cursor-pointer'>
            <button className='absolute top-0 right-0 p-2 active:bg-gray-200 active:scale-75 duration-300 ease-in-out rounded-full'>
                <HeartIcon className='h-5 w-5 text-black transform duration-300 ease-in-out' />
            </button>
            <div>
                <img src={`/sneakers/${brand}`} className='h-20 w-auto' alt={name} />
            </div>
            <div>
                <p className='font-light text-sm mt-6 '>{name }</p>
                <p className='font-light text-xs text-gray-500 mt-0.5'>Oferta Más baja</p>
                <p className='font-medium text-xl'>MXN {formattedPrices.formattedPrice}</p>
            </div>
        </div>
    );
}
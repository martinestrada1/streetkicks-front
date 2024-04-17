import React from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function ShoppingBag() {
    return (
        <Link
            to="/cart"
            className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-[#2d2d2d] hover:text-gray-500"
        >
            <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
        </Link>
    )
}
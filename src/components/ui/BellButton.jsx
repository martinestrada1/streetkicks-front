import React from 'react'
import { BellIcon } from '@heroicons/react/24/outline'

export default function BellButton() {
    return (
        <a
            href="#"
            className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-[#2d2d2d] hover:text-gray-500"
        >
            <BellIcon className="h-6 w-6" aria-hidden="true" />
        </a>
    )
}
import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonWhite(props) {
    return (
        <Link
            to="/login"
            className="ml-4  inline-flex items-center border bg-white border-[#1e1d1c] text-black px-4 py-2 text-sm font-medium shadow-sm hover:bg-black hover:text-[#e8e8e8] focus:outline-none focus:ring-[#2d2d2d] focus:ring-2 focus:ring-offset-2 duration-500"
        >
            {props.text}
        </Link>
    )
}
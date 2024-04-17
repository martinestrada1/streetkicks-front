import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonWhite(props) {
    return (
        <Link
            to="/login"
            className="ml-4  inline-flex items-center border bg-white border-[#25589f] text-[#25589f] px-4 py-2 text-sm font-medium shadow-sm hover:bg-[#25589f] hover:text-[#e8e8e8] focus:outline-none focus:ring-[#25589f] focus:ring-2 focus:ring-offset-2 duration-500"
        >
            {props.text}
        </Link>
    )
}
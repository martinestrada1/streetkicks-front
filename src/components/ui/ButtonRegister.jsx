import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonBlack(props) {
    return (
        <Link
            to="/register"
            className="ml-2 inline-flex items-center border border-transparent bg-[#25589f] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#25589f] focus:outline-none focus:ring-2 focus:ring-[#25589f] focus:ring-offset-2 duration-500"
        >
            {props.text}
        </Link>
    )
}
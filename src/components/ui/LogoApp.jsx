import React from 'react'
import { Link } from 'react-router-dom'

export default function LogoApp() {
    return (
        <div className="flex md:inset-y-0 md:left-0 lg:static xl:col-span-1">
            <div className="flex flex-shrink-0 items-center">
                <Link to="/">
                    <img
                        className="block h-16 w-auto my-3"
                        src="/logo-black.png"
                        alt="streetkicks-logo"
                    />
                </Link>
            </div>
        </div>
    )
}
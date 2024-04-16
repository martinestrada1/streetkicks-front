import React, { useContext, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { SearchContext } from '../../../context/SearchProvider'

export default function SearchInput() {
    const { searchTerm, setSearchTerm } = useContext(SearchContext)
    useEffect(()=>{ setSearchTerm('')},[])
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }
    return (
        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-5">
            <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <div className="w-full">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="search"
                            name="search"
                            autoComplete='off'
                            className="block w-full border border-gray-300 bg-gray-50 py-[0.70rem] my-3 pl-10 pr-3 placeholder-black focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-gray-200 sm:text-sm"
                            placeholder="Buscar sneaker"
                            type="search"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
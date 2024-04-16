import React, { useContext } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import { truncateText } from '../../utilities/truncateText';
import { SearchContext } from '../../context/SearchProvider';
import { useGetSneakers } from '../../hooks/useGetSneakers';

export default function ProductList() {
    const { searchTerm } = useContext(SearchContext);
    const { sneakers, error } = useGetSneakers();

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredSneakers = sneakers.filter((sneaker) => sneaker.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (sneakers.length === 0) {
        return (
            <div className='flex justify-center  items-center h-[400px] flex-grow text-gray-500 text-sm font-semibold my-12'>
                No tenemos sneakers para mostrarte, pero agregaremos más más adelante, ¡gracias por tu paciencia! :)
            </div>
        );
    }

    if (filteredSneakers.length === 0) {
        return (
            <div className='flex justify-center items-center h-[300px] flex-grow text-gray-500 text-sm font-semibold my-32'>
                No hay resultados disponibles:(
            </div>
        );
    }
    return (
        <div className='mx-auto mt-6'>
            <h3 className='text-lg font-medium'>Recomendados para ti</h3>
            <div className='mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-5 xl:gap-x-12 gap-y-4 overflow-x-auto'>
                {filteredSneakers.map((sneaker) => (
                    <Link key={sneaker._id} to={`/sneaker/${sneaker._id}`}>
                        <Card
                            brand={sneaker.brand}
                            name={truncateText(sneaker.name, 35)}
                            price={sneaker.price}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

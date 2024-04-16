import React from 'react'
import Navbar from "../ui/Navbar/Navbar"
import Footer from "../ui/Footer/Footer"
import Page404 from '../../components/pages/404';
import { useParams } from 'react-router-dom';
import { useGetReserves } from '../../hooks/useGetReserves';
import { useGetSneakers } from '../../hooks/useGetSneakers';
import ButtonWhite from '../ui/ButtonLogin';

export default function Reserve() {
    const { id } = useParams();
    const { sneakers } = useGetSneakers();
    const { reserves } = useGetReserves();
    const product = sneakers.find(item => item._id === id);
    const productReserves = reserves.filter(reserve => reserve.productId === id);
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
        return (
            <>
                <Navbar />
                <main className='py-60 px-3 sm:px-14 lg:px-20 xl:px-40 flex justify-center items-center flex-col space-y-6'>
                    <h3 className='text-gray-500'>Por favor inicia sesión para entrar en este apartado</h3>
                    <ButtonWhite text="Ingresar" />
                </main>
                <Footer />
            </>
        );
    }
    if (!product) {
        return <Page404 />;
    }
    return (
        <>
            <Navbar />
            <div className="px-4 sm:px-6 lg:px-16 pt-32">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Apartados</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Lista de los {product.name} que han sido apartados.
                        </p>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Sneaker
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Descripción
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Precio unitario
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Cantidad
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Talla
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {productReserves.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                                    No hay apartados disponibles para este producto
                                                </td>
                                            </tr>
                                        ) : (
                                            productReserves.map((sneaker, k) => (
                                                <tr key={k}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                        <div className="flex items-center">
                                                            <div className="h-auto w-24 flex-shrink-0">
                                                                <img className="h-auto w-24" src={`/sneakers/${product.brand}`} alt="" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="font-medium text-gray-900">{product.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <div className="text-gray-900">{sneaker.descripcion}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            {sneaker.precio.toLocaleString('es-MX', {
                                                                style: 'currency',
                                                                currency: 'MXN'
                                                            })}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <div className="text-gray-900">{sneaker.cantidad}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{sneaker.talla}</td>
                                                </tr>
                                            )))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

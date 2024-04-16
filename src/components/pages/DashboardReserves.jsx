import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    UserGroupIcon,
    BanknotesIcon,
    RectangleStackIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { classNames } from '../../utilities/classNames'
import { useGetUsers } from '../../hooks/useGetUsers'
import { useGetSneakers } from '../../hooks/useGetSneakers'
import { useGetReserves } from '../../hooks/useGetReserves'
import { Link } from 'react-router-dom'
import Page404 from '../pages/404'

const navigation = [
    { name: 'Usuarios registrados', href: '/dashboard/users', icon: UserGroupIcon, current: false },
    { name: 'Pujas', href: '/dashboard/bids', icon: BanknotesIcon, current: false },
    { name: 'Apartados', href: '/dashboard/reserves', icon: RectangleStackIcon, current: true },
]

export default function DashboardReserves() {
    const { reserves } = useGetReserves();
    const { user } = useGetUsers();
    const { sneakers } = useGetSneakers();

    const adminLogged = localStorage.getItem('adminLogged')

    if (!adminLogged) {
        return <Page404 />
    }


    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className='h-screen'>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                        <div className="flex flex-shrink-0 items-center px-4">
                                            <Link
                                                to='/'>
                                                <img
                                                    className="h-8 w-auto cursor-pointer"
                                                    src="/logo-black.png"
                                                    alt="Your Company"
                                                />
                                            </Link>
                                        </div>
                                        <nav className="mt-5 space-y-1 px-2">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                            'mr-4 flex-shrink-0 h-6 w-6'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                                        <div className="flex items-center">
                                            <div>
                                                <img
                                                    className="inline-block h-10 w-10 rounded-full"
                                                    src="/merr.jpeg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Merry</p>
                                                <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Administrador</p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
                <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                    <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
                        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                            <div className="flex justify-center items-center px-4 mb-4">
                                <Link
                                    to='/'>
                                    <img
                                        className="h-14 w-auto cursor-pointer"
                                        src="/logo-black.png"
                                        alt="Your Company"
                                    />
                                </Link>
                            </div>
                            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="inline-block h-9 w-9 rounded-full"
                                        src="/merr.jpeg"
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Merry</p>
                                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Administrador</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col md:pl-64">
                    <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
                        <button
                            type="button"
                            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <main className="flex-1">
                        <div className="py-6">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <h1 className="text-2xl mt-12 font-semibold text-gray-900">Reservas</h1>
                            </div>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <div className="mt-8 flex flex-col">
                                    <div className="-my-2 -mx-32 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-300">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                ID
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Sneaker
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Producto
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Descripción
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Talla
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Cantidad
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Usuario
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Precio a pagar
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {reserves.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="7" className="text-center py-4 text-gray-500">
                                                                    No hay reservas disponibles
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            reserves.map((reserves, index) => (
                                                                <tr key={index}>
                                                                    <td className="px-3 py-4 text-sm text-gray-500">
                                                                        <div className="text-gray-900">{reserves._id}</div>
                                                                    </td>
                                                                    <td className="px-3 py-4 text-sm text-gray-500">
                                                                        <img src={`/sneakers/${sneakers.find(sneaker => sneaker._id === reserves.productId)?.brand}`} alt="tenis" className='h-auto w-28' />
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                        <div className="text-gray-900">
                                                                            {sneakers.find(sneaker => sneaker._id === reserves.productId)?.name || "Sneaker no encontrado"}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-3 py-4 text-sm text-gray-500">
                                                                        <div className="text-gray-900">{reserves.descripcion}</div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                        <div className="text-gray-900">{reserves.talla}</div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                        <div className="text-gray-900">{reserves.cantidad}</div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                        <div className="text-gray-900">
                                                                            {user.find(user => user._id === reserves.userId)?.username || "Usuario no encontrado"}
                                                                        </div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                            {reserves.precio.toLocaleString('es-MX', {
                                                                                style: 'currency',
                                                                                currency: 'MXN'
                                                                            })}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

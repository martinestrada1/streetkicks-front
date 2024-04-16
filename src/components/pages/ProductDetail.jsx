import { Link, useParams } from 'react-router-dom';
import Navbar from '../ui/Navbar/Navbar';
import { HeartIcon, ArrowUpOnSquareIcon, ShoppingBagIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { PlayIcon } from '@heroicons/react/20/solid';
import Footer from '../ui/Footer/Footer';
import TallasMenu from '../ui/TallasMenu';
import { useState } from 'react';
import { useGetSneakers } from '../../hooks/useGetSneakers';
import Notificacion from '../ui/Notificacion';
import Page404 from './404';
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
    const { sneakers } = useGetSneakers();
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }
    const navigate = useNavigate();
    const { id } = useParams();
    const product = sneakers.find(sneaker => sneaker._id === id);
    const randomNumber = 33;
    const randomPrice = 245;
    const [notificaciones, setNotificaciones] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    const userLogged = JSON.parse(localStorage.getItem('loggedIn'));

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    };
    const [data, setData] = useState({
        nombre: "",
        precio: "",
        marca: "",
        talla: "27.5",
        cantidad: 1,
        descripcion: "",
        userId: "",
        productId: id,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedSize === null) {
            setShow(true);
            setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                title: "Seleccione una talla",
                subtitle: "Por favor seleccione una talla para continuar",
                icon: false
            }]);
            return;
        } else {
            setShow(true);
            setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                title: "Redireccionando a la confirmación del apartado",
                subtitle: "Por favor espere un momento...",
                icon: true
            }]);
            localStorage.setItem("productReserved", JSON.stringify({
                "nombre": product.name,
                "precio": product.price,
                "marca": product.name,
                "talla": selectedSize,
                "cantidad": data.cantidad,
                "descripcion": data.descripcion,
                "userId": userLogged.userId,
                "productId": data.productId
            }));
            setTimeout(() => {
                navigate(`/sneakers/confirmation/${id}`);
            }, 3000);
        }
    }

    if (!product) {
        return <Page404 />;
    }

    return (
        <>
            <Navbar />
            <main className='pt-32 px-3 sm:px-14 lg:px-20 xl:px-40' onLoad={() => window.scrollTo(0, 0)}>
                {notificaciones.map((notificacion, index) => (
                    <Notificacion
                        key={index}
                        isActive={show}
                        title={notificacion.title}
                        subtitle={notificacion.subtitle}
                        icon={notificacion.icon}
                    />
                ))}
                <div className='flex justify-between w-full'>
                    <div className='flex flex-col mt-14 w-1/2'>
                        <h1 className='text-[1.65rem]  font-medium text-gray-800'>{product.name}</h1>
                        <img className='w-full h-auto mt-24 pl-12' src={`/sneakers/${product.brand}`} alt={product.name} />
                    </div>
                    <div className='pl-16 w-1/2 flex flex-col'>
                        <div className='flex justify-end items-center'>
                            <button className='p-2 active:bg-gray-200 active:scale-75 duration-300 ease-in-out rounded-full'>
                                {clicked ? <HeartIconSolid className='h-6 w-auto text-red-500 transform duration-300 ease-in-out' onClick={handleClick} /> : <HeartIcon className='h-6 w-auto text-black transform duration-300 ease-in-out' onClick={handleClick} />}
                            </button>
                            <button className='p-2 active:bg-gray-200 active:scale-75 duration-300 ease-in-out rounded-full'>
                                <ArrowUpOnSquareIcon className='h-6 w-auto text-black transform duration-300 ease-in-out' />
                            </button>
                        </div>
                        <div className='bg-[#E9E8E2] p-2  mt-16 flex justify-start gap-x-4'>
                            <ShoppingBagIcon className='ml-3 h-7 w-auto' />
                            <p className='font-medium text-lg'>Precio Actualmente Bajo Del Retail</p>
                        </div>
                        <form className='mt-4 px-8 border border-gray-200 flex flex-col rounded-sm' onSubmit={handleSubmit}>
                            <div className='flex justify-center items-center mt-6'>
                                <TallasMenu onSelectSize={handleSelectSize} />
                            </div>
                            <div className='flex justify-between mt-6'>
                                <div className="w-full max-w-md flex justify-between">
                                    <input
                                        required
                                        type="number"
                                        className='w-1/2 mr-2 mb-4 focus:border-[#2d2d2d] focus:outline-none focus:ring-[#2d2d2d]'
                                        placeholder='Cantidad'
                                        id='cantidad'
                                        name='cantidad'
                                        autoComplete='off'
                                        min="1"
                                        max="100"
                                        onChange={handleChange}
                                    />
                                    <input
                                        required
                                        type="text"
                                        className='w-1/2 ml-2 mb-4 focus:border-[#2d2d2d] focus:outline-none focus:ring-[#2d2d2d]'
                                        placeholder='Añada una descripción'
                                        id='descripcion'
                                        name='descripcion'
                                        autoComplete='off'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-around items-center mt-4 gap-x-4 mb-8'>
                                <div className='w-full max-w-md flex justify-between'>
                                    <Link
                                        to={`/bids/${product._id}`}
                                        className="w-1/3 mr-4 items-center border bg-white border-[#1e1d1c] text-black px-4 py-2 text-lg truncate justify-center font-medium shadow-sm hover:bg-black hover:text-[#e8e8e8] focus:outline-none focus:ring-[#2d2d2d] focus:ring-2 focus:ring-offset-2 duration-500"
                                    >
                                        Hacer puja
                                    </Link>
                                    <button
                                        className="w-2/3 items-center border border-transparent bg-[#016240] px-4 py-2 text-lg  justify-center font-medium text-white shadow-sm hover:bg-[#016240] focus:outline-none focus:ring-2 focus:ring-[#016240] focus:ring-offset-2 duration-500"
                                    >
                                        {"Apartar por MXN " + product.price.toLocaleString('es-MX', {
                                            style: 'currency',
                                            currency: 'MXN'
                                        })}
                                    </button>
                                </div>
                            </div>
                            <div className='border-t mb-4'></div>
                            <div className='mb-4'>
                                <p className='w-full inline-flex items-center justify-center font-medium text-lg text-[#016240]'>Vende por MXN {product.price.toLocaleString('es-MX', {
                                    style: 'currency',
                                    currency: 'MXN'
                                })} u Ofrece más {"->"}</p>
                            </div>
                        </form>
                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='text-gray-900 text-sm font-light mt-6'>Última venta:</p>
                                <p className='font-medium text-[1.40rem] leading-8'>MXN {product.price.toLocaleString('es-MX', {
                                    style: 'currency',
                                    currency: 'MXN'
                                })}</p>
                                <div className='flex justify-start items-center gap-x-2'>
                                    <PlayIcon className='w-auto h-4 text-[#016240] -rotate-90' />
                                    <p className='text-[#016240] font-semibold text-sm'>MXN {randomPrice} ({randomNumber}%)</p>
                                </div>
                            </div>
                            <div className='flex gap-x-2 items-center justify-center'>
                                <Link
                                    to={`/bids/${product._id}`}
                                    className="inline-flex items-center border bg-white border-[#1e1d1c] text-black px-2 py-1 text-sm truncate justify-center font-medium shadow-sm hover:bg-black hover:text-[#e8e8e8] focus:outline-none focus:ring-[#2d2d2d] focus:ring-2 focus:ring-offset-2 duration-500"
                                >
                                    Ver pujas
                                </Link>
                                <Link
                                    to={`/reserve/${product._id}`}
                                    className="inline-flex items-center border bg-white border-[#1e1d1c] text-black px-2 py-1 text-sm truncate justify-center font-medium shadow-sm hover:bg-black hover:text-[#e8e8e8] focus:outline-none focus:ring-[#2d2d2d] focus:ring-2 focus:ring-offset-2 duration-500"
                                >
                                    Ver apartados
                                </Link>
                            </div>
                        </div>
                        <div className='border-t border-gray-200 mt-8'>
                            <div className='flex items-center justify-between pt-4'>
                                <div className='flex items-center gap-x-2 text-[#424141]'>
                                    <CheckBadgeIcon className='w-auto h-6' />
                                    <p className='text-sm font-medium'>Verificado por Street Kicks</p>
                                </div>
                                <div>
                                    <p className='text-xs'>Condición: <span className='text-[#016240]'>Nuevo</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

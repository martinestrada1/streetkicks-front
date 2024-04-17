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
                    <div className='pl-16 w-1/2 flex flex-col'>
                        <div className='flex justify-start flex-row-reverse items-center'>
                            <button className='p-2 active:bg-gray-200 active:scale-75 duration-300 ease-in-out '>
                                {clicked ? <HeartIconSolid className='h-6 w-auto text-red-500 transform duration-300 ease-in-out' onClick={handleClick} /> : <HeartIcon className='h-6 w-auto text-black transform duration-300 ease-in-out' onClick={handleClick} />}
                            </button>
                            <button className='p-2 active:bg-gray-200 active:scale-75 duration-300 ease-in-out '>
                                <ArrowUpOnSquareIcon className='h-6 w-auto text-black transform duration-300 ease-in-out' />
                            </button>
                        </div>
                        <div className='bg-[#25589f] p-2  mt-16 flex justify-start gap-x-4'>
                            <ShoppingBagIcon className='ml-3 h-7 w-auto text-white' />
                            <p className='font-medium text-lg text-gray-50 '>Compra ahora mismo</p>
                        </div>
                        <form className='mt-4 px-8 border border-gray-300 flex flex-col  pb-8 ' onSubmit={handleSubmit}>
                            <div className='text-center'>
                                <h1 className='text-3xl font-bold text-[#25589f] mt-12 my-4'>{product.name}</h1>
                            </div>
                            <div className='flex justify-center items-center mt-6'>
                                <TallasMenu onSelectSize={handleSelectSize} />
                            </div>
                            <div className='flex justify-between mt-6'>
                                <div className="w-full flex justify-between">
                                    <input
                                        required
                                        type="number"
                                        className='w-1/2 mr-2 mb-4 focus:border-[#2d2d2d] focus:outline-none focus:ring-[#2d2d2d] '
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
                                        className='w-1/2 ml-2 mb-4 focus:border-[#2d2d2d] focus:outline-none focus:ring-[#2d2d2d] '
                                        placeholder='Añada una descripción'
                                        id='descripcion'
                                        name='descripcion'
                                        autoComplete='off'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-around items-center mt-4 gap-x-4 mb-8'>
                                <div className='w-full flex flex-col gap-y-3'>
                                    <Link
                                        to={`/bids/${product._id}`}
                                        className="text-center items-center  border bg-white border-[#2d2d2d] text-[#2d2d2d] px-4 py-2 text-lg truncate justify-center font-medium shadow-sm hover:bg-[#25589f] hover:text-[#e8e8e8] focus:outline-none focus:ring-[#2d2d2d] focus:ring-2 focus:ring-offset-2 duration-500"
                                    >
                                        Hacer puja
                                    </Link>
                                    <button
                                        className="text-center items-center  border border-transparent bg-[#25589f] px-4 py-2 text-lg  justify-center font-medium text-white shadow-sm hover:bg-[#353e8f] focus:outline-none focus:ring-2 focus:ring-[#353e8f] focus:ring-offset-2 duration-500"
                                    >
                                        {"Apartar con " + product.price.toLocaleString('es-MX', {
                                            style: 'currency',
                                            currency: 'MXN'
                                        })}
                                    </button>
                                </div>
                            </div>
                            <div className='border-t mb-4'></div>
                            <div className='flex justify-between items-center flex-col'>
                                <div className='flex gap-x-2 items-center justify-between mt-6 w-full'>
                                    <Link
                                        to={`/bids/${product._id}`}
                                        className="w-full text-center items-center border bg-[#25589f]  border-[#25589f] text-white px-2 py-1 text-sm truncate justify-center font-medium shadow-sm hover:bg-[#353e8f] hover:text-[#e8e8e8] focus:outline-none focus:ring-[#2d2d2d] focus:ring-2 focus:ring-offset-2 duration-500"
                                    >
                                        Ver las pujas
                                    </Link>
                                    <Link
                                        to={`/reserve/${product._id}`}
                                        className="w-full text-center items-center border bg-[#25589f]  border-[#25589f] text-white px-2 py-1 text-sm truncate justify-center font-medium shadow-sm hover:bg-[#353e8f] hover:text-[#e8e8e8] focus:outline-none focus:ring-[#2d2d2d] focus:ring-2 focus:ring-offset-2 duration-500"
                                    >
                                        Ver los apartados
                                    </Link>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className='flex flex-col mt-14 w-1/2'>
                        <img className='w-full h-auto mt-24 pl-12' src={`/sneakers/${product.brand}`} alt={product.name} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

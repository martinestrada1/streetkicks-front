import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../ui/Navbar/Navbar';
import Page404 from '../../components/pages/404';
import Footer from '../ui/Footer/Footer';
import { useGetBids } from '../../hooks/useGetBids';
import { useGetSneakers } from '../../hooks/useGetSneakers';
import axios from '../../libs/axios.js';
import Notificacion from "../ui/Notificacion";
import ButtonWhite from '../ui/ButtonLogin.jsx';

export default function Bids() {
    const { id } = useParams();
    const { sneakers } = useGetSneakers();
    const { bids } = useGetBids();
    const product = sneakers.find(sneaker => sneaker._id === id);
    const productBids = bids.filter(bid => bid.productId === id);
    const isLoggedIn = localStorage.getItem("loggedIn");
    const userLogged = JSON.parse(localStorage.getItem('loggedIn'));
    const [data, setData] = useState({
        descripcion: "",
        oferta: "",
        userId: "",
        productId: id,
    });
    const [notificaciones, setNotificaciones] = useState([]);
    const [show, setShow] = useState(false);

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/comment/create', JSON.stringify({
            "descripcion": data.descripcion,
            "oferta": data.oferta,
            "userId": userLogged.userId,
            "productId": data.productId
        })).then(function (response) {
            setShow(true);
            setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                title: "Puja recibida con éxito",
                subtitle: "Gracias por realizar una puja, espere a que el vendedor la acepte.",
                icon: true
            }]);
            window.location.reload();
        }).catch(function (err) {
            setShow(true);
            setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                title: err.response.data.message,
                subtitle: "Inténtelo nuevamente",
                icon: false
            }]);
        });
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
                    <div className="mt-14">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">Pujas</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    Lanza una oferta por los {product.name} .
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
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Descripción
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Oferta
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {productBids.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="2" className="text-center py-4 text-gray-500">
                                                            No hay pujas disponibles para este producto
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    productBids.map((bid, index) => (
                                                        <tr key={index}>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <div className="text-gray-900">{bid.descripcion}</div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                    {parseInt(bid.oferta).toLocaleString('es-MX', {
                                                                        style: 'currency',
                                                                        currency: 'MXN'
                                                                    })}
                                                                </span>

                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                                <td colSpan="4" className="py-4">
                                                    <form className='flex justify-between mx-3' onSubmit={handleSubmit} >
                                                        <input
                                                            type="text"
                                                            id="descripcion"
                                                            name="descripcion"
                                                            placeholder="Ingrese su descripción"
                                                            required
                                                            onChange={handleChange}
                                                            autoComplete='off'
                                                            className="border border-gray-300 text-sm px-3 w-2/4 py-1 focus:border-[#2d2d2d] focus:outline-none focus:ring-[#2d2d2d] "
                                                        />
                                                        <input
                                                            type="number"
                                                            placeholder="Oferta"
                                                            id="oferta"
                                                            name="oferta"
                                                            required
                                                            onChange={handleChange}
                                                            className="border border-gray-300 text-sm px-3 w-1/4 py-1  focus:border-[#2d2d2d] focus:outline-none focus:ring-[#2d2d2d] "
                                                        />
                                                        <button
                                                            className="ml-2 inline-flex items-center border border-transparent bg-[#2d2d2d] px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] focus:ring-offset-2 duration-500"
                                                        >
                                                            Enviar puja
                                                        </button>
                                                    </form>
                                                </td>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

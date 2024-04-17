import { Link, useParams, useNavigate } from "react-router-dom"
import { useGetSneakers } from '../../hooks/useGetSneakers'
import Page404 from "./404";
import axios from "../../libs/axios";
import Notificacion from "../ui/Notificacion";
import { useState } from "react";

const products = [
    {
        id: 1,
        name: 'High Wall Tote',
        href: '#',
        price: '$210.00',
        color: 'White and black',
        size: '15L',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-07-product-01.jpg',
        imageAlt: 'Front of zip tote bag with white canvas, white handles, and black drawstring top.',
    },
]

export default function Confirmation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { sneakers } = useGetSneakers();
    const product = sneakers.find(sneaker => sneaker._id === id);
    const userLogged = JSON.parse(localStorage.getItem("loggedIn"))
    const productReserved = JSON.parse(localStorage.getItem("productReserved"))
    const [notificaciones, setNotificaciones] = useState([]);
    const [show, setShow] = useState(false);

    if (!product || !productReserved) {
        return <Page404 />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/apartado/create', productReserved).then(function (response) {
            setShow(true);
            setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                title: "Apartado creado con éxito",
                subtitle: "Gracias por realizar un apartado, espere a que el vendedor la acepte.",
                icon: true
            }]);
            setTimeout(() => {
                navigate('/');
                localStorage.removeItem('productReserved')
            }, 2000);
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
        <div className="bg-white">
            {notificaciones.map((notificacion, index) => (
                <Notificacion
                    key={index}
                    isActive={show}
                    title={notificacion.title}
                    subtitle={notificacion.subtitle}
                    icon={notificacion.icon}
                />
            ))}
            <div className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
            <div className="fixed top-0 right-0 hidden h-full w-1/2 bg-[#2d2d2d]  lg:block" aria-hidden="true" />
            <header className="relative mx-auto max-w-7xl bg-[#2d2d2d]  py-6 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pt-16 lg:pb-10">
                <div className="mx-auto justify-center flex max-w-2xl px-4 lg:w-full lg:max-w-lg lg:px-0">
                    <Link to="/">
                        <img
                            src="/logo-white.png"
                            alt=""
                            className="h-20 w-auto lg:hidden"
                        />
                        <img
                            src="/logo-black.png"
                            alt=""
                            className="hidden h-20 w-auto lg:block"
                        />
                    </Link>
                </div>
            </header>
            <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8">
                <h1 className="sr-only">Resumen</h1>
                <section
                    aria-labelledby="summary-heading"
                    className="bg-[#2d2d2d] pt-6 pb-12 text-[#25589f] md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24"
                >
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <dl>
                            <dt className="text-sm font-medium">Precio</dt>
                            <dd className="mt-1 text-3xl font-bold tracking-tight text-white">{product.price.toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                            })}</dd>
                        </dl>

                        <ul role="list" className="divide-y divide-white divide-opacity-10 text-sm font-medium">
                            {products.map((item) => (
                                <li key={product._id} className="flex items-start space-x-4 py-6">
                                    <img
                                        src={`/sneakers/${product.brand}`}
                                        alt={product.name}
                                        className="h-20 w-auto flex-none rounded-md object-cover object-center"
                                    />
                                    <div className="flex-auto space-y-1">
                                        <h3 className="text-white">{product.name}<span className="text-[#25589f]">  x  {productReserved.cantidad}</span></h3>
                                        <p>Talla: {productReserved.talla} MX</p>
                                    </div>
                                    <p className="flex-none text-base font-medium text-white">{product.price.toLocaleString('es-MX', {
                                        style: 'currency',
                                        currency: 'MXN'
                                    })}</p>
                                </li>
                            ))}
                        </ul>

                        <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
                            <div className="flex items-center justify-between">
                                <dt>Subtotal</dt>
                                <dd>{
                                    (productReserved.precio * productReserved.cantidad - 200).toLocaleString('es-MX', {
                                        style: 'currency',
                                        currency: 'MXN'
                                    })
                                }.00</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt>Impuestos</dt>
                                <dd>$200.00</dd>
                            </div>

                            <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">{
                                    (productReserved.precio * productReserved.cantidad).toLocaleString('es-MX', {
                                        style: 'currency',
                                        currency: 'MXN'
                                    })
                                }</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <section
                    className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24"
                >

                    <form>
                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                            <div>
                                <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                                    Información de contacto
                                </h3>

                                <div className="mt-6">
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                        Correo electrónico
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="off"
                                            required
                                            value={userLogged.email}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25589f] focus:ring-[#25589f] sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-lg font-semibold text-gray-900">Cantidad: {productReserved.cantidad}</h3>
                            </div>

                            <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="rounded-md border border-transparent bg-[#25589f] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#3f6395] focus:outline-none focus:ring-2 focus:ring-[#2e8667] focus:ring-offset-2 focus:ring-offset-gray-50 duration-300"
                                >
                                    Apartar
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
}

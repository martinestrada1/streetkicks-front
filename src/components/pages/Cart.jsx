import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import Navbar from '../ui/Navbar/Navbar'
import Footer from '../ui/Footer/Footer'
import { useGetSneakers } from '../../hooks/useGetSneakers'
import { useGetReserves } from '../../hooks/useGetReserves'
import { Link } from 'react-router-dom'
import axios from '../../libs/axios'
import Notificacion from '../ui/Notificacion'
import { useState } from 'react'
import ButtonWhite from '../ui/ButtonLogin'

export default function Cart() {
    const { sneakers } = useGetSneakers();
    const { reserves } = useGetReserves();
    const [notificaciones, setNotificaciones] = useState([]);
    const [show, setShow] = useState(false);
    const userLogged = JSON.parse(localStorage.getItem('loggedIn'));

    const reservesByUser = reserves.filter(reserve => reserve.userId === userLogged.userId);

    if (!userLogged) {
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

    const handleDelete = (id)=>{
        axios.delete(`/api/apartado/${id}`)
        .then(function(response){
            console.log(response)
            setShow(true);
            setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                title: response.data.message,
                subtitle: "Redireccionando, por favor espere un momento...",
                icon: true
            }]);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }).catch(function(error){
            setShow(true);
            setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                title: response.data.message,
                subtitle: "Inténtelo nuevamente...",
                icon: true
            }]);
        })
    }
    if(reservesByUser.length == 0){
        return(
            <>
                <Navbar/>
                <main className='h-screen flex items-center justify-center'>
                    <h3>Lo sentimos, aún no tienes apartados disponibles.</h3>
                </main>
                <Footer />
            </>
        )
    }


    return (
        <>
            <Navbar />
            <main className="bg-white h-screen">
            {notificaciones.map((notificacion, index) => (
                    <Notificacion
                        key={index}
                        isActive={show}
                        title={notificacion.title}
                        subtitle={notificacion.subtitle}
                        icon={notificacion.icon}
                    />
                ))}
                <div className="mx-32  px-4 sm:pt-32 sm:px-6 lg:px-0">
                    <h1 className="text-start text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Productos apartados</h1>
                    <div className="mt-12">
                        <section>
                            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                                {reservesByUser.map((product) => (
                                    <li key={product._id} className="flex py-6">
                                        <div className="flex-shrink-0">
                                            <img src={`/sneakers/${sneakers.find(sneaker => sneaker._id === product.productId)?.brand}`} alt="tenis" className='h-24 rounded-md object-cover object-center sm:h-28 w-auto' />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h4 className="text-sm">
                                                        <Link to={`/sneaker/${product.productId}`} className="font-medium text-gray-700 hover:text-gray-800">
                                                            {product.nombre}
                                                        </Link>
                                                    </h4>
                                                    <p className="ml-4 text-sm font-medium text-gray-900">{product.price}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{product.precio.toLocaleString('es-MX', {
                                                    style: 'currency',
                                                    currency: 'MXN'
                                                })}</p>
                                                <p className="mt-1 text-sm text-gray-500">{product.talla}</p>
                                            </div>

                                            <div className="mt-4 flex flex-1 items-end justify-between">
                                                <p className="flex items-center space-x-2 text-sm text-gray-700">
                                                    {product.inStock ? (
                                                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-[#25589f]" aria-hidden="true" />
                                                    ) : (
                                                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                                                    )}

                                                    <span>{product.inStock ? 'In stock' : `Apartado`}</span>
                                                </p>
                                                <div className="ml-4">
                                                    <button onClick={() => handleDelete(product._id)}  type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

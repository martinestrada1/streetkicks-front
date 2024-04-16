import { Link } from "react-router-dom";
import axios from "../../libs/axios";
import { useState } from "react";
import Notificacion from "../ui/Notificacion";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [show, setShow] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const validateEmail = (email) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    };

    const validatePassword = (password) => {
        const regexPassword = /^.{8,}$/;
        return regexPassword.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            validateEmail(data.email) &&
            validatePassword(data.password)
        ) {
            axios.post('/api/user/login', JSON.stringify({
                "email": data.email,
                "password": data.password
            })).then(function (response) {
                const userLogged = JSON.stringify(response.data);
                setShow(true);
                setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                    title: "Bienvenido de vuelta " + response.data.username,
                    subtitle: "Redireccionando a la pantalla de inicio.",
                    icon: true
                }]);
                localStorage.setItem("loggedIn", userLogged);
                localStorage.setItem("token", response.data.token)
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }).catch(function (err) {
                setShow(true);
                setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                    title: err.response.data.message,
                    subtitle: "Inténtelo nuevamente",
                    icon: false
                }]);
            });
        } else {
            setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                title: "Datos incorrectos",
                subtitle: "Por favor, revise los datos ingresados.",
                icon: false
            }]);
        }
    }


    return (
        <div className="h-screen">
            {notificaciones.map((notificacion, index) => (
                <Notificacion
                    key={index}
                    isActive={show}
                    title={notificacion.title}
                    subtitle={notificacion.subtitle}
                    icon={notificacion.icon}
                />
            ))}
            <div className="flex min-h-full">
                <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="flex justify-center items-center flex-col">
                            <div className="flex justify-center items-center">
                                <img
                                    className="h-24 w-auto"
                                    src="/logo-black.png"
                                    alt="Your Company"
                                />
                            </div>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Inicia sesión en tu cuenta</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                O{' '}
                                <Link to="/register" className="font-medium text-[#016240] hover:text-[#357c63] duration-300">
                                    regístrate ahora
                                </Link>
                            </p>
                        </div>
                        <div className="mt-8">
                            <div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Ingresa con:</p>
                                    <div className="mt-1 grid grid-cols-2 gap-3">
                                        <div>
                                            <a
                                                href="#"
                                                className="inline-flex w-full justify-center border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                            >
                                                <img src="facebook-logo.png" className="w-auto h-6" alt="facebook-logo" />
                                            </a>
                                        </div>
                                        <div>
                                            <a
                                                href="#"
                                                className="inline-flex w-full justify-center border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                            >
                                                <img src="google-logo.png" className="w-auto h-6" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mt-6">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">O continua con</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Correo electrónico
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="off"
                                                onChange={handleChange}
                                                required
                                                className="block w-full appearance-none  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#2d2d2d] focus:outline-none focus:ring-[#2d2d2d] sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Contraseña
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="off"
                                                onChange={handleChange}
                                                required
                                                className="block w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#2d2d2d] focus:outline-none focus:ring-[#2d2d2d] sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-center text-gray-600">
                                        <Link to="/login/admin" className="font-medium text-[#016240] hover:text-[#357c63] duration-300">
                                            ¿Eres administrador, haz click aquí?
                                        </Link>
                                    </p>
                                    <div>
                                        <button
                                            type="submit"
                                            className="items-center border border-transparent bg-[#2d2d2d] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] focus:ring-offset-2 duration-500 w-full"
                                        >
                                            Ingresar
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="login.jpeg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

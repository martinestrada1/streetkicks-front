import { Link } from "react-router-dom";
import axios from "../../libs/axios";
import { useState } from "react";
import Notificacion from "../ui/Notificacion";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [show, setShow] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
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

    const validateUser = (user) => {
        const regexUser = /^[a-zA-Z0-9_]{3,}$/;
        return regexUser.test(user);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            validateUser(data.username) &&
            validateEmail(data.email) &&
            validatePassword(data.password)
        ) {
            axios.post('/api/user/register', JSON.stringify({
                "username": data.username,
                "email": data.email,
                "password": data.password
            })).then(function (response) {
                setShow(true);
                setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                    title: response.data.message,
                    subtitle: "Inicia sesión para empezar",
                    icon: true
                }]);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }).catch(function (err) {
                setShow(true);
                setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                    title: err.response.data.message,
                    subtitle: "Ingrese sesión en su cuenta o intente otro correo electrónico.",
                    icon: false
                }]);
            });
        }else{
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
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="register.jpeg"
                        alt=""
                    />
                </div>
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
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Regístrate</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                ¿Ya tienes una cuenta? {' '}
                                <Link to="/login" className="font-medium text-[#016240] hover:text-[#357c63] duration-300">
                                    ingresa aquí
                                </Link>
                            </p>
                        </div>
                        <div className="mt-8">
                            <div className="mt-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Usuario
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                autoComplete="off"
                                                required
                                                onChange={handleChange}
                                                className="block w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#016240] focus:outline-none focus:ring-[#016240] sm:text-sm"
                                            />
                                        </div>
                                    </div>
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
                                                required
                                                onChange={handleChange}
                                                className="block w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#016240] focus:outline-none focus:ring-[#016240] sm:text-sm"
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
                                                required
                                                onChange={handleChange}
                                                className="block w-full appearance-none  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#016240] focus:outline-none focus:ring-[#016240] sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className=" border border-transparent bg-[#2d2d2d] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#2d2d2d] focus:ring-offset-2 duration-500 w-full text-center"
                                        >
                                            Ingresar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

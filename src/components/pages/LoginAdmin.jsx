import { Link } from "react-router-dom";
import axios from "../../libs/axios";
import { useState } from "react";
import Notificacion from "../ui/Notificacion";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
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
            axios.post('/api/admin/login', JSON.stringify({
                "email": data.email,
                "password": data.password
            })).then(function (response) {
                const userLogged = JSON.stringify(response.data);
                setShow(true);
                setNotificaciones(prevNotificaciones => [...prevNotificaciones, {
                    title: "Bienvenido usuario administrador " + response.data.admin.username,
                    subtitle: "Redireccionando al panel.",
                    icon: true
                }]);
                localStorage.setItem("adminLogged", userLogged);
                localStorage.setItem("loggedIn", userLogged);
                localStorage.setItem("token", response.data.token)
                setTimeout(() => {
                    navigate("/dashboard/users");
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
                title: "No existe ese usuario",
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
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Bienvenido administrador</h2>
                        </div>
                        <div className="mt-8">
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
                        src="/public/loginAdmin.jpeg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

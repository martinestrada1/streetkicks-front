import { Link } from "react-router-dom";
import Footer from "../ui/Footer/Footer";
import Navbar from "../ui/Navbar/Navbar";

export default function Page404() {
    return (
        <>
            <Navbar/>
            <div className="flex min-h-full flex-col bg-white pb-12 pt-32">
                <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
                    <div className="py-32">
                        <div className="text-center">
                            <p className="text-base font-semibold text-[#204216]">404</p>
                            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found.</h1>
                            <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                            <div className="mt-6">
                                <Link to="/" className="text-base font-medium text-[#2d2d2d] hover:text-[#2d2d2d]">
                                    Go back home
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer/>
        </>
    )
}

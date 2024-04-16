import Navbar from "../ui/Navbar/Navbar"
import Carousel from "../ui/Carrousel"
import { slidesMobile, slides } from "../../utilities/slides"
import ProductList from "../ui/ProductList"
import Footer from "../ui/Footer/Footer"
export default function Home() {
    return (
        <>
            <Navbar />
            <main className="px-3 sm:px-6 lg:px-14 xl:px-20">
                <div className="flex items-center justify-center w-full">
                    <div className="mt-32">
                        <div className="hidden sm:block">
                            <Carousel>
                                {slides.map((s, k) => (
                                    <img key={k} src={s} />
                                ))}
                            </Carousel>
                        </div>
                        <div className="sm:hidden">
                            <Carousel>
                                {slidesMobile.map((s, k) => (
                                    <img key={k} src={s} />
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
                <ProductList />
            </main>
            <Footer/>
        </>
    )
}
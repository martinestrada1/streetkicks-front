import Navbar from "../ui/Navbar/Navbar"
import ProductList from "../ui/ProductList"
import Footer from "../ui/Footer/Footer"

export default function AllSneakers() {
    return (
        <>
            <Navbar />
            <main className="px-3 sm:px-6 lg:px-14 xl:px-20 pt-32">
                <ProductList />
            </main>
            <Footer />
        </>
    )
}
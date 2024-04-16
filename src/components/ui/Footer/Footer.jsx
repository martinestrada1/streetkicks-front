export default function Footer() {
    return (
        <footer className="bg-[#252525] mt-32" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 ">
                <div className="flex justify-center">
                    <div className="flex justify-center flex-col items-center">
                        <div className="flex justify-center items-center">
                            <img
                                className="h-36 w-auto"
                                src="/logo-white.png"
                                alt="Company name"
                            />
                        </div>
                        <p className="text-sm leading-6 text-gray-400">
                            Making the world a better place through constructing elegant hierarchies.
                        </p>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-900/10 pt-8 flex justify-center">
                    <p className="text-xs leading-5 text-gray-500">&copy; 2020 Street kicks, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

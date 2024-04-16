import { useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { useCarousel } from "../../hooks/useCarrousel"

export default function Carousel({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) {
    const { curr, prev, next } = useCarousel(slides);
    useEffect(() => {
        if (!autoSlide) return;
        const intervalId = setInterval(() => {
            next();
        }, autoSlideInterval);
        return () => clearInterval(intervalId);
    }, [autoSlide, autoSlideInterval, next]);
    return (
        <div className="overflow-hidden relative">
            <div className="flex transition-transform ease-in duration-700 " style={{ transform: `translateX(-${curr * 100}%)` }}>
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prev}
                    className="p-1 rounded-full shadow text-white/80 bg-gray-800">
                    <ChevronLeftIcon className="w-auto h-7" />
                </button>
                <button
                    onClick={next}
                    className="p-1 rounded-full shadow text-white/80 bg-gray-800">
                    <ChevronRightIcon className="w-auto h-7" />
                </button>
            </div>
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <div key={i} className={`transition-all w-2 h-2 bg-white ${curr === i ? "" : "bg-opacity-20"}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}
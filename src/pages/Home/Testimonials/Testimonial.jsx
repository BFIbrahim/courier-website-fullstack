import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "./Testimonials.css";

const testimonials = [
    { name: "Awlod Hassin", title: "Senior Product Designer", text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine..." },
    { name: "Resal Ahamed", title: "CEO", text: "It helps maintain proper posture throughout the day." },
    { name: "Nasir Uddin", title: "Marketing Lead", text: "Gentle support and alignment make a big difference." },
    { name: "Mahmudul Hasan", title: "Engineer", text: "The design and comfort are top-notch. Loved it!" },
];

const Testimonials = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [navReady, setNavReady] = useState(false);

    // ✅ Wait until refs are rendered
    useEffect(() => {
        setNavReady(true);
    }, []);

    return (
        <div className="relative w-full flex justify-center items-center py-10">
            {navReady && (
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={3}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    className="w-11/12 pb-10"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="testimonial-card rounded-3xl">
                                <p className="text-6xl text-start mb-4 font-bold text-secondary">,,</p>
                                <p className="text-start text-accent border-b-2 border-accent border-dashed pb-4">"{item.text}"</p>
                                <div className="pt-4 flex gap-3 items-center">
                                    <p className="bg-secondary p-5 rounded-full w-2 h-2"></p>
                                    <div>
                                        <h4 className="text-start font-semibold">{item.name}</h4>
                                        <span className="text-start">{item.title}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* ✅ Custom Arrows */}
            <button
                ref={prevRef}
                className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-primary hover:text-white transition z-10"
            >
                <FaArrowLeft size={20} />
            </button>

            <button
                ref={nextRef}
                className="custom-next absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-primary hover:text-white transition z-10"
            >
                <FaArrowRight size={20} />
            </button>
        </div>
    );
};

export default Testimonials;

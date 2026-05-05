import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      id: 1,
      img: "https://i.ibb.co/LdgYjHrv/image.png",
      alt: "Друкарське обладнання",
    },
    {
      id: 2,
      img: "https://i.ibb.co/rfpsVRwt/image.png",
      alt: "Копіювальний центр",
    },
    {
      id: 3,
      img: "https://i.ibb.co/chcXkWWq/image.png",
      alt: "Поліграфічна продукція",
    },
    {
      id: 4,
      img: "https://i.ibb.co/H5gqrk9/image.png",
      alt: "Комп'ютерний центр",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // typing (НЕ ЧІПАЄМО)
  const title = "Комп'ютерно-діловий центр ТЕХНОМАКС";
  const subtitle = "Копіцентр у Стрию";

  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedTitle(title.slice(0, i));
      i++;
      if (i > title.length) clearInterval(interval);
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTypedSubtitle(subtitle.slice(0, i));
        i++;
        if (i > subtitle.length) clearInterval(interval);
      }, 50);
    }, 900);

    return () => clearTimeout(timeout);
  }, []);

  // slider (НЕ ЧІПАЄМО)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 SCROLL REVEAL
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen pt-20 overflow-hidden bg-[#07111C] scroll-mt-20"
      id="home"
    >
      {/* SLIDER (НЕ ЧІПАЄМО) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.img}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07111C]/95 via-[#07111C]/80 to-[#07111C]/95" />
          </div>
        ))}
      </div>

      {/* ARROWS (НЕ ЧІПАЄМО) */}
      <button
        onClick={() =>
          setCurrentIndex((p) => (p - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 bg-[#FFC400]/20 hover:bg-[#FFC400]/40 p-2 rounded-full"
      >
        <ChevronLeft className="text-[#FFC400]" />
      </button>

      <button
        onClick={() => setCurrentIndex((p) => (p + 1) % slides.length)}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 bg-[#FFC400]/20 hover:bg-[#FFC400]/40 p-2 rounded-full"
      >
        <ChevronRight className="text-[#FFC400]" />
      </button>

      {/* CONTENT + SCROLL ANIMATION */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-6 h-full flex flex-col justify-center text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {typedTitle}
          <span className="animate-pulse text-[#FFC400]">|</span>
          <br />
          <span className="text-xl md:text-3xl font-medium text-white/90">
            {typedSubtitle}
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-white/80">
          Друк, дизайн, реклама та поліграфія
        </p>

        <p className="mt-2 text-base md:text-xl text-[#FFC400] font-semibold">
          з доставкою по Україні
        </p>

        <p className="mt-6 text-sm md:text-lg text-white/70 max-w-2xl mx-auto">
          Друкуємо документи, фото, візитки, банери, таблички, наліпки та
          сувенірну продукцію.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#order"
            className="bg-[#FFC400] text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Замовити розрахунок
          </a>

          <a
            href="#services"
            className="border border-white/30 text-white px-6 py-3 rounded-lg hover:border-[#FFC400] hover:text-[#FFC400] transition"
          >
            Переглянути послуги
          </a>
        </div>
      </div>

      {/* INDICATORS (НЕ ЧІПАЄМО) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all rounded-full ${
              idx === currentIndex
                ? "w-8 h-2 bg-[#FFC400]"
                : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

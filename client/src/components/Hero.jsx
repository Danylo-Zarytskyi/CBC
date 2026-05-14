import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

const Hero = () => {
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
    {
      id: 5,
      img: "https://i.ibb.co/QznZbc4/photo-2026-05-05-20-44-22.jpg",
      alt: "Фасад",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // TYPING
  const title = "Комп'ютерно-Діловий Центр";
  const subtitle = "Копіцентр у Стрию";

  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setTypedTitle(title.slice(0, i));

      i++;

      if (i > title.length) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;

      const interval = setInterval(() => {
        setTypedSubtitle(subtitle.slice(0, i));

        i++;

        if (i > subtitle.length) {
          clearInterval(interval);
        }
      }, 45);
    }, 900);

    return () => clearTimeout(timeout);
  }, []);

  // AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // SCROLL
  const scrollTo = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#07111C]"
    >
      {/* SLIDES */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.img}
              alt={slide.alt}
              className="w-full h-full object-cover scale-105"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07111C]/95 via-[#07111C]/75 to-[#07111C]/95" />

            {/* EXTRA DARK */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* GLOW */}
      <div className="absolute top-[-250px] left-[-250px] w-[600px] h-[600px] bg-[#FFC400]/10 blur-[140px] rounded-full z-0" />

      <div className="absolute bottom-[-300px] right-[-200px] w-[500px] h-[500px] bg-yellow-300/10 blur-[140px] rounded-full z-0" />

      {/* ARROWS */}
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-[#FFC400] hover:text-black transition-all duration-300 flex items-center justify-center text-white"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-[#FFC400] hover:text-black transition-all duration-300 flex items-center justify-center text-white"
      >
        <ChevronRight size={22} />
      </button>

      {/* CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div className="max-w-4xl">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFC400]/10 border border-[#FFC400]/20 text-[#FFC400] text-sm font-semibold backdrop-blur-md mb-8 animate-[fadeIn_1s_ease]">
            <Sparkles size={16} />
            Копіцентр • Поліграфія • Дизайн
          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-[1.05] text-white">
            {typedTitle}
            <span className="text-[#FFC400] animate-pulse">|</span>

            <span className="block mt-5 text-2xl md:text-4xl xl:text-5xl text-white/85 font-semibold">
              {typedSubtitle}
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-8 text-lg md:text-2xl text-white/75 leading-relaxed max-w-2xl">
            Друк, поліграфія, дизайн,
            <span className="text-[#FFC400] font-semibold">
              {" "}
              продаж канцелярії
            </span>
            , рекламна продукція та доставка по Україні
          </p>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            {/* PRIMARY */}
            <button
              onClick={() => scrollTo("orderForm")}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#FFC400] hover:bg-yellow-300 text-black font-bold text-lg shadow-[0_10px_40px_rgba(255,196,0,0.25)] transition-all duration-300 hover:scale-[1.03]"
            >
              Замовити зараз
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>

            {/* SECONDARY */}
            <button
              onClick={() => scrollTo("services")}
              className="px-8 py-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md hover:border-[#FFC400]/40 hover:bg-[#FFC400]/10 text-white hover:text-[#FFC400] font-semibold text-lg transition-all duration-300"
            >
              Переглянути послуги
            </button>
          </div>

          {/* STATS */}
          <div className="mt-14 flex flex-wrap gap-8">
            <div>
              <h3 className="text-3xl font-black text-[#FFC400]">10+</h3>
              <p className="text-white/60 mt-1">років досвіду</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-[#FFC400]">5000+</h3>
              <p className="text-white/60 mt-1">виконаних замовлень</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-[#FFC400]">24/7</h3>
              <p className="text-white/60 mt-1">онлайн підтримка</p>
            </div>
          </div>
        </div>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-10 h-3 bg-[#FFC400]"
                : "w-3 h-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

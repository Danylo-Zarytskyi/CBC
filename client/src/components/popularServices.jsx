import { useEffect, useRef, useState } from "react";
import axios from "axios";

const PopularServices = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH FROM DB
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:4000/api/popular-services",
        );

        setServices(res.data);
      } catch (err) {
        console.log("POPULAR SERVICES ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // SCROLL REVEAL
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // LOADING STATE (ФІКС)
  if (loading) {
    return (
      <section className="bg-white py-20 text-center">
        <p className="text-gray-500">Завантаження...</p>
      </section>
    );
  }

  // EMPTY STATE (якщо нема даних)
  if (!services.length) {
    return (
      <section className="bg-white py-20 text-center">
        <p className="text-gray-400">Немає популярних послуг</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white py-20 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
      }`}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="absolute -top-40 -left-40 w-[700px] opacity-20 animate-[float_18s_ease-in-out_infinite]"
          viewBox="0 0 600 600"
        >
          <path
            d="M421,310Q402,370,352,402Q302,434,238,422Q174,410,140,355Q106,300,122,238Q138,176,194,146Q250,116,315,130Q380,144,413,197Q446,250,421,310Z"
            fill="none"
            stroke="#FFC400"
            strokeWidth="2"
          />
        </svg>

        <svg
          className="absolute -bottom-40 -right-40 w-[800px] opacity-10 animate-[floatReverse_22s_ease-in-out_infinite]"
          viewBox="0 0 600 600"
        >
          <path
            d="M412,312Q395,374,342,409Q289,444,222,430Q155,416,130,358Q105,300,125,241Q145,182,200,154Q255,126,318,138Q381,150,410,200Q439,250,412,312Z"
            fill="none"
            stroke="#FFC400"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] font-[Montserrat]">
            Популярні <span className="text-[#FFC400]">послуги</span>
          </h2>

          <p className="text-gray-500 mt-2 font-[Inter]">
            Найзатребуваніше серед клієнтів КДЦ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s._id}
              className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-700 hover:border-[#FFC400] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-100 translate-y-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1F2933] font-[Montserrat]">
                  {s.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2 font-[Inter]">
                  {s.desc}
                </p>

                <div className="flex justify-between items-center mt-5">
                  <span className="text-[#FFC400] font-bold text-lg">
                    {s.price}
                  </span>

                  <button
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-service", {
                          detail: s.serviceId,
                        }),
                      );

                      document
                        .getElementById("services")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-gray-400 group-hover:text-[#FFC400] text-sm transition"
                  >
                    Детальніше →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes float {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(40px, 30px) rotate(10deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }

        @keyframes floatReverse {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-40px, -20px) rotate(-10deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
      `}</style>
    </section>
  );
};

export default PopularServices;

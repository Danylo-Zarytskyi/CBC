import { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, ArrowRight, ShieldCheck, Clock3 } from "lucide-react";

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH SERVICES
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:4000/api/popular-services",
        );

        setServices(res.data || []);
      } catch (err) {
        console.log("POPULAR SERVICES ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // LOADING
  if (loading) {
    return (
      <section className="bg-[#F8FAFC] py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full border-4 border-[#FFC400]/20 border-t-[#FFC400] animate-spin"></div>

          <p className="text-gray-500 mt-5 text-lg">Завантаження послуг...</p>
        </div>
      </section>
    );
  }

  // EMPTY
  if (!services.length) {
    return (
      <section className="bg-[#F8FAFC] py-28">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="w-20 h-20 rounded-full bg-[#FFC400]/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="text-[#FFC400]" size={36} />
          </div>

          <h3 className="text-3xl font-bold text-[#111827]">
            Немає популярних послуг
          </h3>

          <p className="text-gray-500 mt-3">
            Додайте послуги через адмін-панель
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-28 bg-gradient-to-b from-[#F8FAFC] to-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#FFC400]/10 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-200px] right-[-150px] w-[450px] h-[450px] bg-yellow-300/10 blur-[120px] rounded-full"></div>

        <svg
          className="absolute top-10 left-10 opacity-[0.04]"
          width="400"
          height="400"
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="#FFC400"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFC400]/10 border border-[#FFC400]/20 text-[#FFC400] text-sm font-semibold mb-6">
            <Sparkles size={16} />
            Популярні послуги
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-[#111827] leading-tight">
            Те, що
            <span className="text-[#FFC400]"> обирають </span>
            найчастіше
          </h2>

          <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Найпопулярніші послуги КДЦ — сучасний підхід, швидке виконання та
            якісний результат
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={s._id}
              className="group relative bg-white rounded-[28px] overflow-hidden border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_rgba(255,196,0,0.18)] transition-all duration-500 hover:-translate-y-3"
              style={{
                animation: `fadeUp 0.7s ease forwards`,
                animationDelay: `${i * 120}ms`,
                opacity: 0,
              }}
            >
              {/* HOVER LIGHT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-[#FFC400]/5 via-transparent to-yellow-200/10 pointer-events-none z-0"></div>

              {/* IMAGE */}
              <div className="relative h-[260px] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                {/* PRICE */}
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg">
                  <span className="text-[#111827] font-bold text-sm">
                    {s.price}
                  </span>
                </div>

                {/* BADGES */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs">
                    <ShieldCheck size={12} />
                    Якість
                  </div>

                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs">
                    <Clock3 size={12} />
                    Швидко
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="relative z-10 p-7">
                <h3 className="text-2xl font-bold text-[#111827] group-hover:text-[#FFC400] transition">
                  {s.title}
                </h3>

                <p className="text-gray-500 mt-4 leading-relaxed text-sm">
                  {s.desc}
                </p>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-8 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                      Вартість
                    </p>

                    <p className="text-2xl font-black text-[#FFC400]">
                      {s.price}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-service", {
                          detail: s.serviceId,
                        }),
                      );

                      document.getElementById("services")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="group/btn flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#111827] hover:bg-[#FFC400] text-white hover:text-black transition-all duration-300 font-semibold flex-shrink-0"
                  >
                    Детальніше
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition"
                    />
                  </button>
                </div>
              </div>

              {/* BORDER EFFECT */}
              <div className="absolute inset-0 rounded-[28px] border border-transparent group-hover:border-[#FFC400]/30 transition duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default PopularServices;

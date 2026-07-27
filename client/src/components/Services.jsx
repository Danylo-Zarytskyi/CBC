import { useState, useEffect, useRef } from "react";
import api from "../api/api"; // ВИКОРИСТОВУЄМО налаштований api ЗАМІСТЬ прямого axios
import {
  ChevronRight,
  Package,
  DollarSign,
  Layers,
  AlertCircle,
  Printer,
  Camera,
  CreditCard,
  FolderOpen,
  RectangleHorizontal,
  Sticker,
  Gift,
  Brush,
  FileText,
  Image,
  BadgeCheck,
  Megaphone,
  Star,
} from "lucide-react";

const Services = () => {
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionRef = useRef(null);

  // Мапа іконок для різних типів послуг
  const getServiceIcon = (title) => {
    const titleLower = title.toLowerCase();

    if (titleLower.includes("друк") || titleLower.includes("print"))
      return <Printer size={18} />;
    if (titleLower.includes("фото") || titleLower.includes("photography"))
      return <Camera size={18} />;
    if (titleLower.includes("візитк") || titleLower.includes("card"))
      return <CreditCard size={18} />;
    if (titleLower.includes("банер") || titleLower.includes("banner"))
      return <RectangleHorizontal size={18} />;
    if (titleLower.includes("табличк") || titleLower.includes("sign"))
      return <FolderOpen size={18} />;
    if (titleLower.includes("наліпк") || titleLower.includes("sticker"))
      return <Sticker size={18} />;
    if (titleLower.includes("сувенір") || titleLower.includes("souvenir"))
      return <Gift size={18} />;
    if (titleLower.includes("дизайн") || titleLower.includes("design"))
      return <Brush size={18} />;
    if (titleLower.includes("брошур") || titleLower.includes("laminat"))
      return <FileText size={18} />;
    if (titleLower.includes("плакетк") || titleLower.includes("plaque"))
      return <BadgeCheck size={18} />;

    return <Star size={18} />;
  };

  // FETCH SERVICES
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // ВИКОРИСТОВУЄМО api ЗАМІСТЬ axios з хардкодним URL
        const res = await api.get("/api/services");
        setData(res.data);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Не вдалося завантажити послуги");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // OPEN SERVICE EVENT
  useEffect(() => {
    const handler = (e) => {
      const id = e.detail;

      const map = {
        printing: 0,
        photography: 1,
        "business-cards": 2,
        banners: 4,
        signs: 5,
        souvenirs: 7,
      };

      if (map[id] !== undefined) {
        setActive(map[id]);
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    window.addEventListener("open-service", handler);

    return () => {
      window.removeEventListener("open-service", handler);
    };
  }, []);

  // LOADING
  if (loading) {
    return (
      <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#FFC400] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 text-lg">Завантаження послуг...</p>
        </div>
      </section>
    );
  }

  // ERROR
  if (error) {
    return (
      <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50 text-center">
        <div className="flex flex-col items-center justify-center">
          <AlertCircle size={48} className="text-red-400 mb-4" />
          <p className="text-gray-500 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#FFC400] text-black rounded-lg font-medium hover:bg-[#FFC400]/90 transition"
          >
            Спробувати знову
          </button>
        </div>
      </section>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50 text-center">
        <div className="flex flex-col items-center justify-center">
          <Package size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Немає доступних послуг</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-gradient-to-b from-white to-gray-50 py-24 overflow-hidden scroll-mt-20"
    >
      {/* BACKGROUND ANIMATION */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <svg
          className="absolute w-[220%] h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path fill="none" stroke="#FFC400" strokeWidth="2" opacity="0.5">
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
              M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160;
              M0,180 C240,120 480,240 720,180 C960,120 1200,240 1440,180;
              M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160"
            />
          </path>
        </svg>

        <svg
          className="absolute w-[200%] h-full bottom-0"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path fill="none" stroke="#FFC400" strokeWidth="1.5" opacity="0.3">
            <animate
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              values="
              M0,200 C240,260 480,140 720,200 C960,260 1200,140 1440,200;
              M0,220 C240,160 480,280 720,220 C960,160 1200,280 1440,220;
              M0,200 C240,260 480,140 720,200 C960,260 1200,140 1440,200"
            />
          </path>
        </svg>
      </div>

      {/* DECORATIVE CIRCLES */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#FFC400]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFC400]/5 rounded-full blur-3xl" />

      {/* CONTENT */}
      <div className="relative max-w-6xl mx-auto px-4 z-10">
        {/* TITLE */}
        <div className="text-center mb-12">
          <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4" />

          <h2 className="text-3xl md:text-4xl font-bold font-[Montserrat] text-[#1F2933]">
            Наші <span className="text-[#FFC400]">послуги</span>
          </h2>

          <p className="text-gray-500 mt-2 font-[Inter] max-w-2xl mx-auto">
            Повний каталог послуг копіцентру. Оберіть необхідну категорію для
            детального ознайомлення
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* LEFT - CATEGORIES */}
          <div className="relative">
            <div className="sticky top-24 max-h-[70vh] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {data.map((cat, i) => (
                <button
                  key={cat._id}
                  onClick={() => setActive(i)}
                  className={`group w-full flex items-center justify-between gap-3 text-left px-4 py-3 rounded-xl border transition-all duration-300 font-[Inter] ${
                    active === i
                      ? "bg-gradient-to-r from-[#FFC400] to-[#FFD700] text-[#1F2933] border-[#FFC400] shadow-lg shadow-[#FFC400]/20"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#FFC400] hover:shadow-md hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        active === i
                          ? "bg-white/20 text-[#1F2933]"
                          : "bg-gray-100 text-gray-500 group-hover:bg-[#FFC400]/10 group-hover:text-[#FFC400]"
                      }`}
                    >
                      {getServiceIcon(cat.title)}
                    </div>
                    <span
                      className={`text-sm font-medium ${active === i ? "font-semibold" : ""}`}
                    >
                      {cat.title}
                    </span>
                  </div>

                  {active === i ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1F2933]" />
                  ) : (
                    <ChevronRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition text-gray-400"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - SERVICES LIST */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FFC400] to-[#FFD700] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-[#1F2933]">
                  {data[active] && getServiceIcon(data[active].title)}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-[Montserrat] text-[#1F2933]">
                    {data[active]?.title}
                  </h3>
                  {data[active]?.items?.length > 0 && (
                    <p className="text-[#1F2933]/70 text-sm mt-1">
                      Всього позицій: {data[active].items.length}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
              {data[active]?.items?.length > 0 ? (
                <div className="space-y-2">
                  {data[active].items.map((item, i) => (
                    <div
                      key={i}
                      className="group flex justify-between items-center p-4 rounded-xl border border-gray-100 hover:border-[#FFC400] hover:shadow-md transition-all duration-300 hover:translate-x-1 bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FFC400] opacity-0 group-hover:opacity-100 transition" />
                        <span className="font-[Inter] text-gray-700 group-hover:text-[#1F2933] transition">
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[#FFC400] font-bold text-lg">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package size={48} className="text-gray-300 mb-3" />
                  <p className="text-gray-400">Немає доступних позицій</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ffc400;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e6b000;
        }
      `}</style>
    </section>
  );
};

export default Services;

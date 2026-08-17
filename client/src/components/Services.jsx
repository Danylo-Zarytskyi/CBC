import { useState, useEffect, useRef, useMemo } from "react";
import api from "../api/api";
import {
  ChevronRight,
  ChevronDown,
  Package,
  AlertCircle,
  Star,
  Search,
  X,
} from "lucide-react";

const Services = () => {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const sectionRef = useRef(null);
  const mobileItemRefs = useRef([]);
  const chipRefs = useRef([]);

  const renderServiceIcon = (cat, size = 18) => {
    if (cat?.icon) {
      return (
        <img
          src={cat.icon}
          alt={cat.title}
          className="object-contain"
          style={{ width: size, height: size }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      );
    }
    return <Star size={size} />;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
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
        setQuery("");
        setActive(map[id]);
        setMobileOpen(map[id]);

        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setTimeout(() => {
          mobileItemRefs.current[map[id]]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          chipRefs.current[map[id]]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }, 400);
      }
    };

    window.addEventListener("open-service", handler);

    return () => {
      window.removeEventListener("open-service", handler);
    };
  }, []);

  const toggleMobileCategory = (i) => {
    setMobileOpen((prev) => (prev === i ? -1 : i));
  };

  const goToCategory = (i) => {
    setActive(i);
    setMobileOpen(i);
  };

  // Flat search across every category — matches either the service group
  // name ("Друк") or an individual item name ("ламінування А4"), so people
  // can search however they think about what they need.
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const groups = [];
    data.forEach((cat) => {
      const categoryMatches = cat.title?.toLowerCase().includes(q);
      const items = (cat.items || []).filter(
        (item) => categoryMatches || item.name?.toLowerCase().includes(q),
      );
      if (items.length > 0) {
        groups.push({ category: cat, items, categoryMatches });
      }
    });
    return groups;
  }, [query, data]);

  const searchResultCount = useMemo(
    () =>
      searchResults ? searchResults.reduce((n, g) => n + g.items.length, 0) : 0,
    [searchResults],
  );

  if (loading) {
    return (
      <section className="w-full py-24 bg-gradient-to-b from-[#FFFDF7] to-[#F6F1E7] text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#FFC400] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[#7A7267] text-lg font-['Manrope']">
            Завантаження послуг...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-24 bg-gradient-to-b from-[#FFFDF7] to-[#F6F1E7] text-center">
        <div className="flex flex-col items-center justify-center px-4">
          <AlertCircle size={48} className="text-red-400 mb-4" />
          <p className="text-[#2B2420] font-['Manrope'] font-semibold text-lg">
            {error}
          </p>
          <p className="text-[#8A8175] font-['Manrope'] text-sm mt-1 max-w-sm">
            Перевірте з'єднання з інтернетом і спробуйте ще раз.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 px-6 py-2.5 bg-[#FFC400] text-[#2B2420] rounded-full font-['Manrope'] font-bold hover:bg-[#e6b000] transition"
          >
            Спробувати знову
          </button>
        </div>
      </section>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <section className="w-full py-24 bg-gradient-to-b from-[#FFFDF7] to-[#F6F1E7] text-center">
        <div className="flex flex-col items-center justify-center">
          <Package size={48} className="text-[#C9C0B0] mb-4" />
          <p className="text-[#8A8175] font-['Manrope'] text-lg">
            Немає доступних послуг
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-gradient-to-b from-[#FFFDF7] to-[#F6F1E7] py-24 overflow-hidden scroll-mt-20"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #F1EAD9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FFC400; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e6b000; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .receipt-divider {
          background-image: linear-gradient(to right, #E4DBC8 55%, transparent 0%);
          background-position: bottom;
          background-size: 10px 1.5px;
          background-repeat: repeat-x;
        }

        .services-focus:focus-visible {
          outline: 2px solid #2B2420;
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .services-motion { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 overflow-hidden opacity-25 services-motion">
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

      <div className="absolute top-20 left-10 w-64 h-64 bg-[#FFC400]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFC400]/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 z-10">
        <div className="text-center mb-10">
          <span className="inline-block text-xs tracking-[0.2em] uppercase font-['JetBrains_Mono'] font-semibold text-[#B08E00] mb-3">
            Прайс-лист
          </span>

          <h2 className="text-3xl md:text-4xl font-bold font-['Unbounded'] text-[#2B2420] leading-tight">
            Наші <span className="text-[#FFC400]">послуги</span>
          </h2>

          <p className="text-[#8A8175] mt-3 font-['Manrope'] font-medium max-w-2xl mx-auto">
            Повний каталог послуг копіцентру. Знайдіть потрібну позицію через
            пошук або оберіть категорію нижче
          </p>
        </div>

        {/* SEARCH — works across every category, mobile and desktop alike */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0A68F]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Пошук послуги, напр. «ламінування А4»"
              className="services-focus w-full pl-11 pr-11 py-3.5 rounded-full border border-[#E4DBC8] bg-white font-['Manrope'] text-sm text-[#2B2420] placeholder:text-[#B0A68F] shadow-sm focus:border-[#FFC400] transition"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Очистити пошук"
                className="services-focus absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full text-[#B0A68F] hover:bg-[#F6F1E7] hover:text-[#2B2420] transition"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* SEARCH RESULTS */}
        {searchResults ? (
          <div className="max-w-2xl mx-auto">
            {searchResults.length > 0 ? (
              <>
                <p className="font-['Manrope'] text-sm text-[#8A8175] mb-4 px-1">
                  Знайдено{" "}
                  <span className="font-bold text-[#2B2420]">
                    {searchResultCount}
                  </span>{" "}
                  {searchResultCount === 1 ? "послугу" : "послуг"}
                  {searchResults.length > 1 && (
                    <>
                      {" "}
                      у{" "}
                      <span className="font-bold text-[#2B2420]">
                        {searchResults.length}
                      </span>{" "}
                      категоріях
                    </>
                  )}
                </p>

                <div className="space-y-5">
                  {searchResults.map(({ category, items, categoryMatches }) => (
                    <div
                      key={category._id}
                      className="bg-white border border-[#E4DBC8] rounded-2xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          const idx = data.findIndex(
                            (c) => c._id === category._id,
                          );
                          setQuery("");
                          goToCategory(idx);
                        }}
                        className="services-focus w-full flex items-center justify-between gap-3 px-5 py-3 bg-[#FFFBF0] hover:bg-[#FFF6DE] transition text-left"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 shrink-0 rounded-lg bg-white flex items-center justify-center text-[#B08E00]">
                            {renderServiceIcon(category, 15)}
                          </div>
                          <span className="font-['Manrope'] font-bold text-sm text-[#2B2420] truncate">
                            {category.title}
                          </span>
                          {categoryMatches && (
                            <span className="shrink-0 text-[10px] uppercase tracking-wide font-['JetBrains_Mono'] font-semibold text-[#B08E00] bg-[#FFC400]/15 px-2 py-0.5 rounded-full">
                              категорія
                            </span>
                          )}
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-[#B0A68F] shrink-0"
                        />
                      </button>

                      <div className="divide-y divide-[#F1EAD9]">
                        {items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-4 px-5 py-3.5"
                          >
                            <span className="font-['Manrope'] font-medium text-sm text-[#4A4438] truncate">
                              {item.name}
                            </span>
                            <span className="font-['JetBrains_Mono'] font-bold text-[#FFC400] shrink-0 tabular-nums">
                              {item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-[#E4DBC8] rounded-2xl">
                <Package size={44} className="text-[#D9D0BC] mb-3" />
                <p className="font-['Manrope'] font-semibold text-[#2B2420]">
                  Нічого не знайдено за запитом «{query}»
                </p>
                <p className="font-['Manrope'] text-sm text-[#8A8175] mt-1 max-w-xs">
                  Спробуйте коротший запит або перегляньте категорії нижче
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="services-focus mt-4 px-5 py-2 rounded-full border border-[#E4DBC8] font-['Manrope'] text-sm font-semibold text-[#2B2420] hover:border-[#FFC400] transition"
                >
                  Показати всі категорії
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* MOBILE CATEGORY CHIPS — quick jump without scrolling the accordion */}
            <div className="lg:hidden -mx-4 px-4 mb-5 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 w-max">
                {data.map((cat, i) => (
                  <button
                    key={cat._id}
                    ref={(el) => (chipRefs.current[i] = el)}
                    onClick={() => {
                      goToCategory(i);
                      mobileItemRefs.current[i]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    className={`services-focus shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border font-['Manrope'] text-sm font-semibold transition ${
                      mobileOpen === i
                        ? "bg-[#FFC400] border-[#FFC400] text-[#2B2420]"
                        : "bg-white border-[#E4DBC8] text-[#8A8175]"
                    }`}
                  >
                    {renderServiceIcon(cat, 15)}
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* DESKTOP: sidebar + panel */}
            <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-6">
              <div className="relative">
                <div className="sticky top-24 max-h-[70vh] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  {data.map((cat, i) => (
                    <button
                      key={cat._id}
                      onClick={() => goToCategory(i)}
                      className={`services-focus group w-full flex items-center justify-between gap-3 text-left px-4 py-3 rounded-xl border transition-all duration-300 font-['Manrope'] ${
                        active === i
                          ? "bg-gradient-to-r from-[#FFC400] to-[#FFD700] text-[#2B2420] border-[#FFC400] shadow-lg shadow-[#FFC400]/20"
                          : "bg-white text-[#6B6255] border-[#E4DBC8] hover:border-[#FFC400] hover:shadow-md hover:translate-x-1"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            active === i
                              ? "bg-white/30 text-[#2B2420]"
                              : "bg-[#F6F1E7] text-[#8A8175] group-hover:bg-[#FFC400]/10 group-hover:text-[#B08E00]"
                          }`}
                        >
                          {renderServiceIcon(cat, 18)}
                        </div>
                        <span
                          className={`text-sm font-semibold ${active === i ? "font-bold" : ""}`}
                        >
                          {cat.title}
                        </span>
                      </div>

                      {active === i ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2B2420]" />
                      ) : (
                        <ChevronRight
                          size={16}
                          className="opacity-0 group-hover:opacity-100 transition text-[#B0A68F]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#E4DBC8] rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#FFC400] to-[#FFD700] px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-[#2B2420]">
                      {data[active] && renderServiceIcon(data[active], 22)}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold font-['Unbounded'] text-[#2B2420]">
                        {data[active]?.title}
                      </h3>
                      {data[active]?.items?.length > 0 && (
                        <p className="text-[#2B2420]/70 text-sm font-['Manrope'] font-medium mt-1">
                          Всього позицій: {data[active].items.length}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                  {data[active]?.items?.length > 0 ? (
                    <div className="space-y-2">
                      {data[active].items.map((item, i) => (
                        <div
                          key={i}
                          className="receipt-divider group flex justify-between items-center pb-3 mb-1 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#FFC400] opacity-0 group-hover:opacity-100 transition" />
                            <span className="font-['Manrope'] font-semibold text-[#4A4438] group-hover:text-[#2B2420] transition">
                              {item.name}
                            </span>
                          </div>

                          <span className="font-['JetBrains_Mono'] text-[#FFC400] font-bold text-lg tabular-nums pl-4 bg-white">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Package size={48} className="text-[#D9D0BC] mb-3" />
                      <p className="text-[#B0A68F] font-['Manrope']">
                        Немає доступних позицій
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* MOBILE: акордеон */}
            <div className="lg:hidden space-y-3">
              {data.map((cat, i) => {
                const isOpen = mobileOpen === i;

                return (
                  <div
                    key={cat._id}
                    ref={(el) => (mobileItemRefs.current[i] = el)}
                    className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "border-[#FFC400] shadow-lg shadow-[#FFC400]/10"
                        : "border-[#E4DBC8]"
                    }`}
                  >
                    <button
                      onClick={() => toggleMobileCategory(i)}
                      aria-expanded={isOpen}
                      className="services-focus w-full flex items-center justify-between gap-3 px-4 py-4 text-left min-h-[64px]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-all ${
                            isOpen
                              ? "bg-[#FFC400] text-[#2B2420]"
                              : "bg-[#F6F1E7] text-[#8A8175]"
                          }`}
                        >
                          {renderServiceIcon(cat, 18)}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold font-['Unbounded'] text-[#2B2420] truncate">
                            {cat.title}
                          </h3>
                          {cat.items?.length > 0 && (
                            <p className="text-xs text-[#B0A68F] font-['Manrope'] font-medium">
                              {cat.items.length} позицій
                            </p>
                          )}
                        </div>
                      </div>

                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-[#B0A68F] transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#FFC400]" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-5 pt-1 border-t border-[#F1EAD9]">
                          {cat.items?.length > 0 ? (
                            <div className="divide-y divide-[#F1EAD9]">
                              {cat.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between gap-4 py-3.5"
                                >
                                  <span className="font-['Manrope'] font-medium text-sm text-[#4A4438] flex-1 min-w-0">
                                    {item.name}
                                  </span>

                                  <span className="font-['JetBrains_Mono'] font-bold text-sm text-[#FFC400] shrink-0 w-24 text-right tabular-nums">
                                    {item.price}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                              <Package
                                size={40}
                                className="text-[#D9D0BC] mb-3"
                              />
                              <p className="text-[#B0A68F] font-['Manrope'] text-sm">
                                Немає доступних позицій
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Services;

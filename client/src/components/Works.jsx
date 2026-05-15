import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/api"; // ВИКОРИСТОВУЄМО налаштований api ЗАМІСТЬ прямого axios

const Works = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true); // Додаємо стан завантаження

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        // ВИКОРИСТОВУЄМО api ЗАМІСТЬ axios з хардкодним URL
        const res = await api.get("/api/works");
        setWorks(res.data);
      } catch (err) {
        console.log("WORKS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  // Показуємо індикатор завантаження поки йде запит
  if (loading) {
    return (
      <section className="bg-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#FFC400] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">Завантаження робіт...</p>
          </div>
        </div>
      </section>
    );
  }

  // Якщо немає робіт, показуємо повідомлення
  if (!works.length) {
    return (
      <section
        className="bg-white py-24 text-center scroll-mt-24"
        id="portfolio"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] font-[Montserrat]">
              Наші <span className="text-[#FFC400]">роботи</span>
            </h2>
            <p className="text-gray-500 mt-2 font-[Inter]">
              Приклади виконаних замовлень
            </p>
          </div>
          <p className="text-gray-500">Немає робіт у портфоліо</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24 scroll-mt-24" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] font-[Montserrat]">
            Наші <span className="text-[#FFC400]">роботи</span>
          </h2>

          <p className="text-gray-500 mt-2 font-[Inter]">
            Приклади виконаних замовлень
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((w, i) => (
            <motion.div
              key={w._id}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden bg-gray-100">
                <img
                  src={
                    w.image ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={w.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
              </div>

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-6">
                <h3 className="text-white text-lg font-bold">{w.title}</h3>
                {w.desc && (
                  <p className="text-gray-200 text-sm mt-1">{w.desc}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;

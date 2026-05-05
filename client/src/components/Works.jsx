import { motion } from "framer-motion";

const Works = () => {
  const works = [
    {
      image: "https://i.ibb.co/4ZWjfdNY/photo-2026-05-04-21-43-11.jpg",
      title: "Табличка офісна",
      desc: "Акрил, гравірування",
    },
    {
      image: "https://i.ibb.co/p7s4gny/photo-2026-05-04-21-47-42.jpg",
      title: "Банер рекламний",
      desc: "Широкоформатний друк",
    },
    {
      image: "https://i.ibb.co/bYG1BWX/photo-2026-05-04-21-43-11.jpg",
      title: "Сувенірна продукція",
      desc: "Горнятка, футболки",
    },
    {
      image: "https://i.ibb.co/CkdCBCW/photo-2026-05-05-19-13-05.jpg",
      title: "Візитки",
      desc: "Двосторонній друк",
    },
    {
      image: "https://i.ibb.co/fYGXHRB3/photo-2026-05-05-19-11-41.jpg",
      title: "Фотодрук",
      desc: "Фото різних форматів",
    },
    {
      image: "https://i.ibb.co/cKRMrQmt/photo-2026-05-05-19-14-00.jpg",
      title: "Документи",
      desc: "Ч/б та кольоровий друк",
    },
  ];

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
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.97, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="h-64 overflow-hidden bg-gray-100">
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  loading="lazy"
                />
              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-6">
                <h3 className="text-white text-lg font-bold">{w.title}</h3>
                <p className="text-gray-200 text-sm">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;

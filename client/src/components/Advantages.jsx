import { motion } from "framer-motion";

const Advantages = () => {
  const advantages = [
    {
      icon: "📍",
      title: "Зручне розташування у Стрию",
      desc: "КДЦ знаходиться за адресою вул. Незалежності, 17 — легко знайти та швидко зайти",
      mapLink:
        "https://www.google.com/maps/place/%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%9D%D0%B5%D0%B7%D0%B0%D0%BB%D0%B5%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D1%96,+17,+%D0%A1%D1%82%D1%80%D0%B8%D0%B9,+%D0%9B%D1%8C%D0%B2%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+82400/@49.2571841,23.8513239,17z/data=!3m1!4b1",
    },
    {
      icon: "⚡",
      title: "Швидке виконання замовлень",
      desc: "Друк і виготовлення в короткі строки, термінові замовлення — у пріоритеті",
    },
    {
      icon: "🎨",
      title: "Допомога з макетом",
      desc: "Допомагаємо підготувати файл до друку, щоб результат був якісний",
    },
    {
      icon: "💰",
      title: "Чесні та прозорі ціни",
      desc: "Вартість узгоджується до запуску роботи — без прихованих платежів",
    },
    {
      icon: "🏢",
      title: "Для бізнесу і приватних клієнтів",
      desc: "Працюємо з компаніями, школами, ФОП та приватними замовленнями",
    },
    {
      icon: "🚚",
      title: "Доставка по Україні",
      desc: "Відправляємо Новою Поштою в будь-яке місто України",
    },
  ];

  const handleCardClick = (adv) => {
    if (adv.mapLink) {
      window.open(adv.mapLink, "_blank");
    }
  };

  return (
    <section
      className="relative py-24 bg-white overflow-hidden scroll-mt-25"
      id="about"
    >
      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4"></div>

          <h2 className="text-3xl md:text-4xl font-bold font-[Montserrat] text-[#1F2933]">
            Чому обирають <span className="text-[#FFC400]">КДЦ ТЕХНОМАКС</span>
          </h2>

          <p className="text-gray-500 mt-2 font-[Inter]">
            Надійний копіцентр у Стрию з повним спектром послуг
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              onClick={() => handleCardClick(adv)}
              initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
              className={`group border border-gray-200 rounded-2xl p-6 bg-white hover:border-[#FFC400] hover:shadow-lg transition-all duration-300 ${
                adv.mapLink ? "cursor-pointer" : ""
              }`}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {adv.icon}
              </div>

              <h3 className="text-lg font-bold text-[#1F2933] font-[Montserrat] mb-2">
                {adv.title}
              </h3>

              <p className="text-gray-500 text-sm font-[Inter]">{adv.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;

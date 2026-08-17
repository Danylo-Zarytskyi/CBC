import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

  return (
    <section
      className="relative py-24 bg-gradient-to-b from-[#FFFDF7] to-[#F6F1E7] overflow-hidden scroll-mt-25"
      id="about"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

        .adv-focus:focus-visible {
          outline: 2px solid #2B2420;
          outline-offset: 3px;
        }
      `}</style>

      <div className="absolute top-10 right-10 w-72 h-72 bg-[#FFC400]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FFC400]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs tracking-[0.2em] uppercase font-['Manrope'] font-bold text-[#B08E00] mb-3">
            Переваги
          </span>

          <h2 className="text-3xl md:text-4xl font-bold font-['Unbounded'] text-[#2B2420] leading-tight">
            Чому обирають{" "}
            <span className="text-[#FFC400]">Комп'ютерно-Діловий Центр</span>
          </h2>

          <p className="text-[#8A8175] mt-3 font-['Manrope'] max-w-xl mx-auto">
            Надійний копіцентр у Стрию з повним спектром послуг
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => {
            const CardTag = adv.mapLink ? motion.a : motion.div;
            const linkProps = adv.mapLink
              ? {
                  href: adv.mapLink,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <CardTag
                key={i}
                {...linkProps}
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 0.97,
                  filter: "blur(6px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.08,
                }}
                className={`adv-focus group relative flex flex-col border border-[#E4DBC8] rounded-2xl p-6 bg-white hover:border-[#FFC400] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${
                  adv.mapLink ? "cursor-pointer" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                    {adv.icon}
                  </div>

                  {adv.mapLink && (
                    <ArrowUpRight
                      size={18}
                      className="text-[#B0A68F] group-hover:text-[#FFC400] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#2B2420] font-['Unbounded'] mb-2 leading-snug">
                  {adv.title}
                </h3>

                <p className="text-[#8A8175] text-sm font-['Manrope'] leading-relaxed">
                  {adv.desc}
                </p>

                {adv.mapLink && (
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-['Manrope'] font-bold text-[#B08E00] group-hover:underline">
                    Відкрити на карті
                  </span>
                )}
              </CardTag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;

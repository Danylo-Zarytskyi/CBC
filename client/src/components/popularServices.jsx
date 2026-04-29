const PopularServices = () => {
  const services = [
    {
      image:
        "https://static.wixstatic.com/media/05e102_8d7899bfafa24e9aa68cc3b93157095e~mv2.webp",
      name: "Друк документів",
      price: "від 4 ₴",
      desc: "Ч/б та кольоровий друк А4, А3",
    },
    {
      image:
        "https://static.wixstatic.com/media/05e102_0fa2ad3acdcc4ef7ae870407b3853faa~mv2.webp",
      name: "Фотодрук",
      price: "від 7 ₴",
      desc: "Фото 10×15, 13×18, А4, А3",
    },
    {
      image:
        "https://static.wixstatic.com/media/05e102_8d2893b12df3434683a3f2ab84f6c134~mv2.webp",
      name: "Візитки",
      price: "від 150 ₴",
      desc: "Односторонні та двосторонні",
    },
    {
      image:
        "https://static.wixstatic.com/media/05e102_b46e69bb8239452b91a4ba83c6cfa1bb~mv2.webp",
      name: "Таблички",
      price: "від 80 ₴",
      desc: "Пластик, акрил, метал",
    },
    {
      image:
        "https://static.wixstatic.com/media/05e102_e24c1c7024884816a24d1e4bd0c2daef~mv2.webp",
      name: "Банери",
      price: "від 250 ₴",
      desc: "Будь-які розміри",
    },
    {
      image:
        "https://static.wixstatic.com/media/05e102_8f70a7587f1c4a8c9aff988edcd4dfd6~mv2.webp",
      name: "Сувеніри",
      price: "від 80 ₴",
      desc: "Горнятка, футболки, пазли",
    },
  ];

  return (
    <section className="relative bg-white py-20 overflow-hidden">

      {/* ===== WAVE BACKGROUND (new style) ===== */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* top wave */}
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

        {/* bottom wave */}
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

        {/* middle thin line flow */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[900px] opacity-10 animate-[drift_30s_linear_infinite]"
          viewBox="0 0 1200 200"
        >
          <path
            d="M0,100 C200,0 400,200 600,100 C800,0 1000,200 1200,100"
            fill="none"
            stroke="#FFC400"
            strokeWidth="2"
          />
        </svg>

      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2933] font-[Montserrat]">
            Популярні <span className="text-[#FFC400]">послуги</span>
          </h2>

          <p className="text-gray-500 mt-2 font-[Inter]">
            Найзатребуваніше серед клієнтів КДЦ
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((s, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-[#FFC400]"
            >

              <div className="h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">

                <h3 className="text-xl font-bold text-[#1F2933] font-[Montserrat]">
                  {s.name}
                </h3>

                <p className="text-gray-500 text-sm mt-2 font-[Inter]">
                  {s.desc}
                </p>

                <div className="flex justify-between items-center mt-5">

                  <span className="text-[#FFC400] font-bold text-lg">
                    {s.price}
                  </span>

                  <span className="text-gray-400 group-hover:text-[#FFC400] text-sm transition">
                    Детальніше →
                  </span>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ===== ANIMATIONS ===== */}
      <style jsx>{`
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

        @keyframes drift {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(10%); }
        }
      `}</style>

    </section>
  );
};

export default PopularServices;
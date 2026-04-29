const Advantages = () => {
  const advantages = [
    {
      icon: "📍",
      title: "Зручне розташування у Стрию",
      desc: "КДЦ знаходиться за адресою вул. Незалежності, 17 — легко знайти та швидко зайти",
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
    <section className="relative py-24 bg-white overflow-hidden scroll-mt-25" id="about">

      {/* ===== BACKGROUND LINES ===== */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* left flowing line */}
        <svg
          className="absolute -left-60 top-0 w-[600px] opacity-20 animate-[flow_20s_linear_infinite]"
          viewBox="0 0 600 600"
        >
          <path
            d="M0,300 C150,100 300,500 600,300"
            fill="none"
            stroke="#FFC400"
            strokeWidth="2"
          />
        </svg>

        {/* right flowing line */}
        <svg
          className="absolute -right-60 bottom-0 w-[650px] opacity-10 animate-[flowReverse_25s_linear_infinite]"
          viewBox="0 0 600 600"
        >
          <path
            d="M0,300 C200,50 400,550 600,300"
            fill="none"
            stroke="#FFC400"
            strokeWidth="2"
          />
        </svg>

        {/* subtle middle wave */}
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
      <div className="relative z-10 max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4"></div>

          <h2 className="text-3xl md:text-4xl font-bold font-[Montserrat] text-[#1F2933]">
            Чому обирають <span className="text-[#FFC400]">КДЦ</span>
          </h2>

          <p className="text-gray-500 mt-2 font-[Inter]">
            Надійний копіцентр у Стрию з повним спектром послуг
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {advantages.map((adv, i) => (
            <div
              key={i}
              className="group border border-gray-200 rounded-2xl p-6 bg-white hover:border-[#FFC400] hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {adv.icon}
              </div>

              <h3 className="text-lg font-bold text-[#1F2933] font-[Montserrat] mb-2">
                {adv.title}
              </h3>

              <p className="text-gray-500 text-sm font-[Inter]">
                {adv.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* ===== ANIMATIONS ===== */}
      <style jsx>{`
        @keyframes flow {
          0% { transform: translateX(-100px); }
          50% { transform: translateX(100px); }
          100% { transform: translateX(-100px); }
        }

        @keyframes flowReverse {
          0% { transform: translateX(100px); }
          50% { transform: translateX(-100px); }
          100% { transform: translateX(100px); }
        }

        @keyframes drift {
          0% { transform: translateX(-10%) translateY(0px); }
          50% { transform: translateX(10%) translateY(10px); }
          100% { transform: translateX(-10%) translateY(0px); }
        }
      `}</style>

    </section>
  );
};

export default Advantages;
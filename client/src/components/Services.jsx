import { useState } from "react";

const Services = () => {
  const [active, setActive] = useState(0);

  const data = [
    {
      title: "Друк документів",
      icon: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
      items: [
        { name: "Ч/б друк A4", price: "від 4 ₴" },
        { name: "Ч/б друк A3", price: "від 8 ₴" },
        { name: "Кольоровий A4", price: "від 20 ₴" },
        { name: "Кольоровий A3", price: "від 40 ₴" },
        { name: "Копіювання", price: "від 4 ₴" },
        { name: "Сканування", price: "від 5 ₴" },
      ],
    },
    {
      title: "Фотодрук",
      icon: "https://cdn-icons-png.flaticon.com/512/685/685655.png",
      items: [
        { name: "10×15 см", price: "від 7 ₴" },
        { name: "13×18 см", price: "від 15 ₴" },
        { name: "A4 фото", price: "від 45 ₴" },
        { name: "A3 фото", price: "від 90 ₴" },
        { name: "Холст 20×30", price: "від 280 ₴" },
        { name: "Холст 30×40", price: "від 380 ₴" },
      ],
    },
    {
      title: "Візитки",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
      items: [
        { name: "100 шт", price: "від 150 ₴" },
        { name: "200 шт", price: "від 220 ₴" },
        { name: "Двосторонні", price: "від 180 ₴" },
        { name: "Дизайн макету", price: "від 100 ₴" },
        { name: "Преміум папір", price: "від 250 ₴" },
      ],
    },
    {
      title: "Флаєри / буклети",
      icon: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
      items: [
        { name: "A6 флаєри", price: "від 200 ₴" },
        { name: "A5 флаєри", price: "від 250 ₴" },
        { name: "Буклети", price: "від 300 ₴" },
        { name: "Меню", price: "від 250 ₴" },
        { name: "Листівки", price: "від 100 ₴" },
      ],
    },
    {
      title: "Банери / реклама",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
      items: [
        { name: "Банер 1 м²", price: "від 250 ₴" },
        { name: "Вивіски", price: "від 400 ₴" },
        { name: "Постери", price: "від 120 ₴" },
        { name: "Широкоформат", price: "від 180 ₴/м²" },
        { name: "Рекламні матеріали", price: "від 200 ₴" },
      ],
    },
    {
      title: "Таблички",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828859.png",
      items: [
        { name: "Пластик", price: "від 120 ₴" },
        { name: "Акрил", price: "від 250 ₴" },
        { name: "Метал", price: "від 350 ₴" },
        { name: "Офісні", price: "від 150 ₴" },
        { name: "Фасадні", price: "від 400 ₴" },
      ],
    },
    {
      title: "Наліпки",
      icon: "https://cdn-icons-png.flaticon.com/512/4213/4213732.png",
      items: [
        { name: "Круглі", price: "від 80 ₴" },
        { name: "Фігурні", price: "від 100 ₴" },
        { name: "Брендовані", price: "від 120 ₴" },
        { name: "Для упаковки", price: "від 90 ₴" },
        { name: "На вітрини", price: "від 150 ₴" },
      ],
    },
    {
      title: "Сувеніри",
      icon: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
      items: [
        { name: "Горнятка", price: "від 180 ₴" },
        { name: "Футболки", price: "від 250 ₴" },
        { name: "Пазли", price: "від 160 ₴" },
        { name: "Брелки", price: "від 80 ₴" },
        { name: "Магніти", price: "від 90 ₴" },
        { name: "Шопери", price: "від 220 ₴" },
      ],
    },
    {
      title: "Поліграфія",
      icon: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
      items: [
        { name: "Буклети", price: "від 250 ₴" },
        { name: "Афіші", price: "від 120 ₴" },
        { name: "Календарі", price: "від 200 ₴" },
        { name: "Каталоги", price: "від 300 ₴" },
        { name: "Сертифікати", price: "від 150 ₴" },
      ],
    },
    {
      title: "Додатково",
      icon: "https://cdn-icons-png.flaticon.com/512/3524/3524636.png",
      items: [
        { name: "Ламінування", price: "від 25 ₴" },
        { name: "Брошурування", price: "від 55 ₴" },
        { name: "Плотерна порізка", price: "від 20 ₴" },
        { name: "Дизайн макетів", price: "від 100 ₴" },
      ],
    },
  ];

  return (
    <section className="relative w-full bg-white py-24 overflow-hidden scroll-mt-20" id="services">

      {/* WAVES BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute w-[220%] h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="none" stroke="#FFC400" strokeWidth="2" opacity="0.25">
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

          <path fill="none" stroke="#FFC400" strokeWidth="1" opacity="0.15">
            <animate
              attributeName="d"
              dur="18s"
              repeatCount="indefinite"
              values="
              M0,200 C200,100 400,300 600,200 C800,100 1000,300 1200,200 1440,200;
              M0,180 C200,260 400,120 600,180 C800,260 1000,120 1200,180 1440,180;
              M0,200 C200,100 400,300 600,200 C800,100 1000,300 1200,200 1440,200"
            />
          </path>
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative max-w-6xl mx-auto px-4 z-10">

        <div className="text-center mb-12">
          <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4"></div>
          <h2 className="text-4xl font-bold font-[Montserrat] text-[#1F2933]">
            Наші <span className="text-[#FFC400]">послуги</span>
          </h2>
          <p className="text-gray-500 mt-2 font-[Inter]">
            Повний каталог копіцентру
          </p>
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-8">

          {/* LEFT */}
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
            {data.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl border transition font-[Inter] ${
                  active === i
                    ? "bg-[#FFC400] text-[#1F2933] border-[#FFC400]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#FFC400]"
                }`}
              >
                <img src={cat.icon} className="w-6 h-6" />
                {cat.title}
              </button>
            ))}
          </div>

          {/* RIGHT */}
          <div className="border border-gray-200 rounded-2xl p-6 max-h-[70vh] overflow-y-auto bg-white/80 backdrop-blur-sm">

            <h3 className="text-2xl font-bold font-[Montserrat] mb-6 text-[#1F2933]">
              {data[active].title}
            </h3>

            <div className="space-y-3">
              {data[active].items.map((item, i) => (
                <div key={i} className="flex justify-between p-4 border rounded-xl hover:border-[#FFC400] transition">
                  <span className="font-[Inter] text-[#1F2933]">{item.name}</span>
                  <span className="text-[#FFC400] font-bold">{item.price}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
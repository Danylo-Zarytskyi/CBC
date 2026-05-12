import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Services = () => {
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);

  const sectionRef = useRef(null);

  // FETCH SERVICES
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/services");

        setData(res.data);
      } catch (err) {
        console.log(err);
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
      }
    };

    window.addEventListener("open-service", handler);

    return () => {
      window.removeEventListener("open-service", handler);
    };
  }, []);

  // LOADING
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <section className="w-full py-24 bg-white text-center">
        <p className="text-gray-500 text-lg">Завантаження послуг...</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-white py-24 overflow-hidden scroll-mt-20"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          className="absolute w-[220%] h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
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
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative max-w-6xl mx-auto px-4 z-10">
        {/* TITLE */}
        <div className="text-center mb-12">
          <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4"></div>

          <h2 className="text-4xl font-bold font-[Montserrat] text-[#1F2933]">
            Наші <span className="text-[#FFC400]">послуги</span>
          </h2>

          <p className="text-gray-500 mt-2 font-[Inter]">
            Повний каталог копіцентру
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-[260px_1fr] gap-8">
          {/* LEFT */}
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
            {data.map((cat, i) => (
              <button
                key={cat._id}
                onClick={() => setActive(i)}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl border transition font-[Inter] ${
                  active === i
                    ? "bg-[#FFC400] text-[#1F2933] border-[#FFC400]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#FFC400]"
                }`}
              >
                <img src={cat.icon} alt={cat.title} className="w-6 h-6" />

                {cat.title}
              </button>
            ))}
          </div>

          {/* RIGHT */}
          <div className="border border-gray-200 rounded-2xl p-6 max-h-[70vh] overflow-y-auto bg-white/80 backdrop-blur-sm">
            <h3 className="text-2xl font-bold font-[Montserrat] mb-6 text-[#1F2933]">
              {data[active]?.title}
            </h3>

            <div className="space-y-3">
              {data[active]?.items?.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between p-4 border rounded-xl hover:border-[#FFC400] transition"
                >
                  <span className="font-[Inter] text-[#1F2933]">
                    {item.name}
                  </span>

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

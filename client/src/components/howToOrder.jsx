import { useEffect, useState } from "react";
import { Package, FileUp, Calculator, CheckCircle2, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const HowToOrder = () => {
  const isRevealed = useScrollReveal();

  const steps = [
    {
      title: "Оберіть послугу",
      desc: "Виберіть, що вам потрібно",
      icon: <Package size={24} />,
    },
    {
      title: "Надішліть макет",
      desc: "Завантажте файл або опишіть ідею",
      icon: <FileUp size={24} />,
    },
    {
      title: "Отримайте розрахунок",
      desc: "Ми прорахуємо вартість і терміни",
      icon: <Calculator size={24} />,
    },
    {
      title: "Підтвердіть замовлення",
      desc: "Узгодимо деталі",
      icon: <CheckCircle2 size={24} />,
    },
    {
      title: "Отримайте замовлення",
      desc: "Самовивіз, доставка НП або іншими службами доставки",
      icon: <Truck size={24} />,
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section
      data-reveal="order-section"
      className={`relative py-24 bg-[#07111C] overflow-hidden scroll-mt-30 transition-all duration-700 ${
        isRevealed("order-section")
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      id="howToOrder"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          className="absolute -left-40 top-10 w-[600px] opacity-20 animate-[float_12s_ease-in-out_infinite]"
          viewBox="0 0 600 200"
        >
          <path
            d="M0,100 C150,0 300,200 450,100 C500,60 550,80 600,120"
            fill="none"
            stroke="#FFC400"
            strokeWidth="2"
          />
        </svg>

        <svg
          className="absolute -right-40 bottom-10 w-[700px] opacity-10 animate-[float_18s_ease-in-out_infinite_reverse]"
          viewBox="0 0 600 200"
        >
          <path
            d="M0,120 C120,200 300,0 420,120 C500,170 560,140 600,100"
            fill="none"
            stroke="#FFC400"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-[#FFC400]/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div
          data-reveal="order-header"
          className={`text-center mb-16 transition-all duration-700 ${
            isRevealed("order-header")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-16 h-0.5 bg-[#FFC400] mx-auto mb-4"></div>

          <h2 className="text-3xl md:text-4xl font-bold font-[Montserrat] text-white">
            Як зробити <span className="text-[#FFC400]">замовлення</span>
          </h2>

          <p className="text-gray-400 mt-2 font-[Inter]">
            5 простих кроків до результату
          </p>
        </div>

        <div
          data-reveal="order-steps"
          className={`relative flex items-center justify-between mb-12 transition-all duration-700 ${
            isRevealed("order-steps")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#1A2A3A] -translate-y-1/2" />

          <motion.div
            className="absolute top-1/2 left-0 h-[2px] bg-[#FFC400] -translate-y-1/2"
            animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="relative z-10 flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                ${
                  active === i
                    ? "bg-[#FFC400] border-[#FFC400] text-black scale-110"
                    : i < active
                      ? "bg-[#FFC400]/20 border-[#FFC400] text-[#FFC400]"
                      : "bg-[#0B1620] border-[#1A2A3A] text-gray-500"
                }`}
              >
                {step.icon}
              </div>

              <span
                className={`mt-3 text-xs text-center max-w-[90px] font-[Inter]
                ${active === i ? "text-white font-semibold" : "text-gray-500"}`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-[#FFC400] mb-3 font-[Montserrat]">
            {steps[active].title}
          </h3>

          <p className="text-gray-600 font-[Inter] text-lg">
            {steps[active].desc}
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
};

export default HowToOrder;

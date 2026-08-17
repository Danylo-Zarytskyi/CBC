import { useScrollReveal } from "../hooks/useScrollReveal";

const Footer = () => {
  const isRevealed = useScrollReveal();

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      data-reveal="footer"
      className={`bg-[#07111C] border-t border-[#FFC400]/20 py-12 antialiased transition-all duration-700 ${
        isRevealed("footer")
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* BRAND */}
          <div
            data-reveal="footer-col1"
            className={`transition-all duration-700 ${
              isRevealed("footer-col1")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h4 className="text-[#FFC400] font-bold mb-4 font-[Montserrat] tracking-wide">
              Комп'ютерно-Діловий Центр
            </h4>

            <p className="text-gray-400 text-sm font-[Inter] leading-relaxed tracking-wide">
              Друк, дизайн, реклама та сувеніри у Стрию з доставкою по Україні
            </p>
          </div>

          {/* SERVICES */}
          <div
            data-reveal="footer-col2"
            className={`transition-all duration-700 ${
              isRevealed("footer-col2")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h4 className="text-white font-bold mb-4 font-[Montserrat] tracking-wide">
              Послуги
            </h4>

            <ul className="space-y-2.5 text-sm text-gray-400 font-[Inter] leading-relaxed tracking-wide">
              <li
                onClick={() => handleScroll("services")}
                className="hover:text-[#FFC400] transition cursor-pointer"
              >
                Друк документів
              </li>

              <li
                onClick={() => handleScroll("services")}
                className="hover:text-[#FFC400] transition cursor-pointer"
              >
                Фотодрук
              </li>

              <li
                onClick={() => handleScroll("services")}
                className="hover:text-[#FFC400] transition cursor-pointer"
              >
                Візитки
              </li>

              <li
                onClick={() => handleScroll("services")}
                className="hover:text-[#FFC400] transition cursor-pointer"
              >
                Таблички
              </li>

              <li
                onClick={() => handleScroll("services")}
                className="hover:text-[#FFC400] transition cursor-pointer"
              >
                Банери
              </li>
            </ul>
          </div>

          {/* INFO */}
          <div
            data-reveal="footer-col3"
            className={`transition-all duration-700 ${
              isRevealed("footer-col3")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h4 className="text-white font-bold mb-4 font-[Montserrat] tracking-wide">
              Інформація
            </h4>

            <ul className="space-y-2.5 text-sm text-gray-400 font-[Inter] leading-relaxed tracking-wide">
              <li
                onClick={() => handleScroll("about")}
                className="hover:text-[#FFC400] transition cursor-pointer"
              >
                Про нас
              </li>
            </ul>
          </div>

          {/* CONTACTS */}
          <div
            data-reveal="footer-col4"
            className={`transition-all duration-700 ${
              isRevealed("footer-col4")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <h4
              onClick={() => handleScroll("contacts")}
              className="text-white font-bold mb-4 font-[Montserrat] tracking-wide hover:text-[#FFC400] transition cursor-pointer"
            >
              Контакти
            </h4>

            <ul className="space-y-2.5 text-sm text-gray-400 font-[Inter] leading-relaxed tracking-wide">
              <li className="hover:text-[#FFC400] transition">
                <a href="tel:+380994249545">📞 099 424 95 45</a>
              </li>

              <li className="hover:text-[#FFC400] transition">
                <a href="mailto:computer_center@ukr.net">
                  📧 computer_center@ukr.net
                </a>
              </li>

              <li className="text-gray-400">
                📍 м. Стрий, вул. Незалежності, 17
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div
          data-reveal="footer-copyright"
          className={`border-t border-[#FFC400]/10 pt-6 text-center transition-all duration-700 ${
            isRevealed("footer-copyright")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <p className="text-gray-500 text-sm font-[Inter] tracking-wide">
            © 2024 Комп'ютерно-Діловий Центр — Друк, дизайн, реклама у Стрию
          </p>
        </div>
      </div>

      {/* FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap');
      `}</style>
    </footer>
  );
};

export default Footer;

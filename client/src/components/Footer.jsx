import { useScrollReveal } from "../hooks/useScrollReveal"; // шлях до вашого хука

const Footer = () => {
  const isRevealed = useScrollReveal();

  return (
    <>
      <footer
        data-reveal="footer"
        className={`bg-[#07111C] border-t border-[#FFC400]/20 py-12 transition-all duration-700 ${
          isRevealed("footer")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div
              data-reveal="footer-col1"
              className={`footer-item transition-all duration-700 ${
                isRevealed("footer-col1")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h4 className="text-[#FFC400] font-bold mb-4 font-[Montserrat]">
                КДЦ ТЕХНОМАКС
              </h4>
              <p className="text-gray-400 text-sm font-[Inter]">
                Друк, дизайн, реклама та сувеніри у Стрию з доставкою по Україні
              </p>
            </div>

            <div
              data-reveal="footer-col2"
              className={`footer-item transition-all duration-700 ${
                isRevealed("footer-col2")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <h4 className="text-white font-bold mb-4 font-[Montserrat] transition-colors duration-300 hover:text-[#FFC400]">
                Послуги
              </h4>
              <ul className="space-y-2 text-sm text-gray-400 font-[Inter]">
                <li className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Друк документів
                </li>
                <li className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Фотодрук
                </li>
                <li className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Візитки
                </li>
                <li className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Таблички
                </li>
                <li className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Банери
                </li>
              </ul>
            </div>

            <div
              data-reveal="footer-col3"
              className={`footer-item transition-all duration-700 ${
                isRevealed("footer-col3")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h4 className="text-white font-bold mb-4 font-[Montserrat] transition-colors duration-300 hover:text-[#FFC400]">
                Інформація
              </h4>
              <ul className="space-y-2 text-sm text-gray-400 font-[Inter]">
                <li className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Доставка по Україні
                </li>
                <li className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Вимоги до макетів
                </li>
                <li className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Для бізнесу
                </li>
                <li className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  Про нас
                </li>
              </ul>
            </div>

            <div
              data-reveal="footer-col4"
              className={`footer-item transition-all duration-700 ${
                isRevealed("footer-col4")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <h4 className="text-white font-bold mb-4 font-[Montserrat] transition-colors duration-300 hover:text-[#FFC400]">
                Контакти
              </h4>
              <ul className="space-y-2 text-sm text-gray-400 font-[Inter]">
                <li className="hover:text-[#FFC400] transition-colors">
                  📞 099 424 95 45
                </li>
                <li className="hover:text-[#FFC400] transition-colors">
                  📧 info@kdc.com.ua
                </li>
                <li>📍 вул. Незалежності, 17, Стрий</li>
              </ul>
            </div>
          </div>

          <div
            data-reveal="footer-copyright"
            className={`border-t border-[#FFC400]/10 pt-6 text-center transition-all duration-700 ${
              isRevealed("footer-copyright")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="text-gray-500 text-sm font-[Inter]">
              © 2024 КДЦ «ТЕХНОМАКС» — Друк, дизайн, реклама у Стрию з доставкою
              по Україні
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer-item {
          transition:
            transform 0.25s ease,
            opacity 0.25s ease;
        }

        .footer-item:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </>
  );
};

export default Footer;

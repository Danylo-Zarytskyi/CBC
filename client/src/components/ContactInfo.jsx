import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  X,
  Camera,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal"; // шлях до вашого хука

const ContactInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isRevealed = useScrollReveal(); // використовуємо хук

  const phoneNumber = "+380994249545";
  const formattedPhone = "099 424 95 45";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePhoneClick = () => {
    setShowModal(true);
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
    setShowModal(false);
  };

  const handleTelegram = () => {
    window.open(`https://t.me/cbc_stryi`, "_blank");
    setShowModal(false);
  };

  const handleViber = () => {
    window.open(
      `viber://contact?number=%2B${phoneNumber.replace("+", "")}`,
      "_blank",
    );
    setShowModal(false);
  };

  return (
    <>
      <section className="py-12 md:py-24 bg-white scroll-mt-25" id="contacts">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* HEADER */}
          <div
            data-reveal="contact-header"
            className={`text-center mb-10 md:mb-14 transition-all duration-700 ${
              isRevealed("contact-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-12 md:w-16 h-[2px] bg-[#FFC400] mx-auto mb-3 md:mb-4"></div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[Montserrat] text-[#1F2933]">
              Наші <span className="text-[#FFC400]">контакти</span>
            </h2>

            <p className="text-gray-500 mt-2 font-[Inter] text-sm sm:text-base">
              Напишіть або зателефонуйте — відповідаємо швидко
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* PHONE */}
            <button
              data-reveal="contact-phone"
              onClick={handlePhoneClick}
              className={`group border border-gray-200 rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 w-full active:scale-95 md:active:scale-100 ${
                isRevealed("contact-phone")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-[#FFC400]/10 flex items-center justify-center group-hover:bg-[#FFC400]/20 transition">
                <Phone className="text-[#FFC400] w-5 h-5 md:w-6 md:h-6" />
              </div>

              <h3 className="text-base md:text-lg font-bold text-[#1F2933] mb-1 md:mb-2 font-[Montserrat]">
                Телефон / Viber / Telegram
              </h3>

              <div className="text-lg md:text-xl font-semibold text-[#FFC400] font-[Inter]">
                {formattedPhone}
              </div>

              <p className="text-gray-400 text-[11px] md:text-xs mt-1 md:mt-2 font-[Inter]">
                натисніть щоб обрати застосунок
              </p>
            </button>

            {/* EMAIL */}
            <a
              data-reveal="contact-email"
              href="mailto:computer_center@ukr.net"
              className={`group border border-gray-200 rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 block active:scale-95 md:active:scale-100 ${
                isRevealed("contact-email")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-[#FFC400]/10 flex items-center justify-center group-hover:bg-[#FFC400]/20 transition">
                <Mail className="text-[#FFC400] w-5 h-5 md:w-6 md:h-6" />
              </div>

              <h3 className="text-base md:text-lg font-bold text-[#1F2933] mb-1 md:mb-2 font-[Montserrat]">
                Email
              </h3>

              <div className="text-[#FFC400] font-[Inter] break-all text-sm md:text-base">
                computer_center@ukr.net
              </div>

              <p className="text-gray-400 text-[11px] md:text-xs mt-1 md:mt-2 font-[Inter]">
                відповідаємо протягом дня
              </p>
            </a>

            {/* ADDRESS WITH MAP */}
            <a
              data-reveal="contact-address"
              href="https://www.google.com/maps/search/?api=1&query=м.+Стрий,+вул.+Незалежності,+17"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 block col-span-1 sm:col-span-2 lg:col-span-1 ${
                isRevealed("contact-address")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {/* MAP */}
              <iframe
                src="https://www.google.com/maps?q=м.+Стрий,+вул.+Незалежності,+17&output=embed"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              ></iframe>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition"></div>

              {/* CONTENT */}
              <div className="relative z-10 p-4 md:p-6 text-center text-white">
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/30 transition">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                </div>

                <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 font-[Montserrat]">
                  Адреса
                </h3>

                <div className="font-[Inter] text-sm md:text-base">
                  м. Стрий, вул. Незалежності, 17
                </div>

                <p className="text-white/70 text-[11px] md:text-xs mt-1 md:mt-2 font-[Inter]">
                  натисніть щоб відкрити карту
                </p>
              </div>
            </a>
          </div>

          {/* SOCIALS */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mt-6">
            {/* INSTAGRAM */}
            <a
              data-reveal="contact-instagram"
              href="https://www.instagram.com/computer_center_stryi"
              target="_blank"
              rel="noopener noreferrer"
              className={`group w-full sm:max-w-xs border border-gray-200 rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 block active:scale-95 md:active:scale-100 ${
                isRevealed("contact-instagram")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17"
                    cy="7"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>

              <h3 className="text-base md:text-lg font-bold text-[#1F2933] mb-1 md:mb-2 font-[Montserrat]">
                Instagram
              </h3>

              <div className="text-[#1F2933] font-[Inter] text-xs md:text-sm break-all">
                @computer_center_stryi
              </div>
            </a>

            {/* TIKTOK */}
            <a
              data-reveal="contact-tiktok"
              href="https://www.tiktok.com/@computer_center_stryi"
              target="_blank"
              rel="noopener noreferrer"
              className={`group w-full sm:max-w-xs border border-gray-200 rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 block active:scale-95 md:active:scale-100 ${
                isRevealed("contact-tiktok")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>

              <h3 className="text-base md:text-lg font-bold text-[#1F2933] mb-1 md:mb-2 font-[Montserrat]">
                TikTok
              </h3>

              <div className="text-[#1F2933] font-[Inter] text-xs md:text-sm break-all">
                @computer_center_stryi
              </div>

              <p className="text-gray-400 text-[11px] md:text-xs mt-1 md:mt-2 font-[Inter]">
                відео та корисні поради
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-5 md:p-6 animate-modalIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold">Обрати дію</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCall}
                className="w-full border border-gray-200 hover:border-[#FFC400] hover:bg-[#FFC400]/5 p-3 md:p-4 rounded-xl transition-all font-medium text-sm md:text-base active:scale-98"
              >
                📞 Подзвонити
              </button>
              <button
                onClick={handleTelegram}
                className="w-full border border-gray-200 hover:border-[#26A5E4] hover:bg-[#26A5E4]/5 p-3 md:p-4 rounded-xl transition-all font-medium text-sm md:text-base active:scale-98"
              >
                💬 Telegram
              </button>
              <button
                onClick={handleViber}
                className="w-full border border-gray-200 hover:border-[#7360F2] hover:bg-[#7360F2]/5 p-3 md:p-4 rounded-xl transition-all font-medium text-sm md:text-base active:scale-98"
              >
                📱 Viber
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-modalIn {
          animation: modalIn 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
        }
      `}</style>
    </>
  );
};

export default ContactInfo;

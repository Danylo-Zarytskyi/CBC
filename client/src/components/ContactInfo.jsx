import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ContactInfo = () => {
  const isRevealed = useScrollReveal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
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
          <div className="w-12 md:w-16 h-[2px] bg-[#FFC400] mx-auto mb-3 md:mb-4" />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[Montserrat] text-[#1F2933]">
            Наші <span className="text-[#FFC400]">контакти</span>
          </h2>

          <p className="text-gray-500 mt-2 font-[Inter] text-sm sm:text-base">
            Напишіть або знайдіть нас у соцмережах
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* EMAIL */}
          <a
            data-reveal="contact-email"
            href="mailto:computer_center@ukr.net"
            className={`group border border-gray-200 rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 block ${
              isRevealed("contact-email")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-[#FFC400]/10 flex items-center justify-center">
              <Mail className="text-[#FFC400] w-5 h-5 md:w-6 md:h-6" />
            </div>

            <h3 className="text-base md:text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
              Email
            </h3>

            <div className="text-[#FFC400] font-[Inter] break-all text-sm md:text-base">
              computer_center@ukr.net
            </div>
          </a>

          {/* TELEGRAM */}
          <a
            data-reveal="contact-telegram"
            href="https://t.me/cbc_stryi"
            target="_blank"
            rel="noopener noreferrer"
            className={`group border border-gray-200 rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 block ${
              isRevealed("contact-telegram")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-[#26A5E4]/10 flex items-center justify-center">
              <Send className="text-[#26A5E4] w-5 h-5 md:w-6 md:h-6" />
            </div>

            <h3 className="text-base md:text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
              Telegram
            </h3>

            <div className="text-gray-700 font-[Inter] text-sm md:text-base">
              @cbc_stryi
            </div>
          </a>

          {/* VIBER */}
          <a
            data-reveal="contact-viber"
            href="viber://chat?number=%2B380994249545"
            className={`group border border-gray-200 rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 block ${
              isRevealed("contact-viber")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-[#7360F2]/10 flex items-center justify-center">
              <MessageCircle className="text-[#7360F2] w-5 h-5 md:w-6 md:h-6" />
            </div>

            <h3 className="text-base md:text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
              Viber
            </h3>

            <div className="text-gray-700 font-[Inter] text-sm md:text-base">
              Написати в Viber
            </div>
          </a>

          {/* INSTAGRAM (НЕ ТРОГАВ) */}
          <a
            data-reveal="contact-instagram"
            href="https://www.instagram.com/computer_center_stryi"
            target="_blank"
            rel="noopener noreferrer"
            className={`group border border-gray-200 rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 block ${
              isRevealed("contact-instagram")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <h3 className="text-base md:text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
              Instagram
            </h3>

            <div className="text-gray-700 font-[Inter] text-sm md:text-base">
              @computer_center_stryi
            </div>
          </a>

          {/* TIKTOK (ПОВЕРНУТО ЯК БУЛО — НЕ ЛАМАВ) */}
          <a
            data-reveal="contact-tiktok"
            href="https://www.tiktok.com/@computer_center_stryi"
            target="_blank"
            rel="noopener noreferrer"
            className={`group border border-gray-200 rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 block ${
              isRevealed("contact-tiktok")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-black flex items-center justify-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </div>

            <h3 className="text-base md:text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
              TikTok
            </h3>

            <div className="text-gray-700 font-[Inter] text-sm md:text-base">
              @computer_center_stryi
            </div>
          </a>

          {/* ADDRESS */}
          <a
            data-reveal="contact-address"
            href="https://www.google.com/maps/search/?api=1&query=м.+Стрий,+вул.+Незалежності,+17"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 block ${
              isRevealed("contact-address")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {/* MAP BACKGROUND */}
            <iframe
              src="https://www.google.com/maps?q=м.+Стрий,+вул.+Незалежності,+17&output=embed"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />

            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />

            {/* TEXT OVERLAY */}
            <div className="relative z-10 p-6 text-center text-white">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>

              <h3 className="text-base md:text-lg font-bold mb-2 font-[Montserrat]">
                Адреса
              </h3>

              <div className="text-sm md:text-base font-[Inter]">
                м. Стрий, вул. Незалежності, 17
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;

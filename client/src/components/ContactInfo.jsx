import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  X,
  Camera,
} from "lucide-react";
import { useState } from "react";

const ContactInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const phoneNumber = "+380994249545";
  const formattedPhone = "099 424 95 45";

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
      <section className="py-24 bg-white scroll-mt-25" id="contacts">
        <div className="max-w-6xl mx-auto px-6">
          {/* HEADER */}
          <div className="text-center mb-14">
            <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4"></div>

            <h2 className="text-3xl md:text-4xl font-bold font-[Montserrat] text-[#1F2933]">
              Наші <span className="text-[#FFC400]">контакти</span>
            </h2>

            <p className="text-gray-500 mt-2 font-[Inter]">
              Напишіть або зателефонуйте — відповідаємо швидко
            </p>
          </div>

          {/* GRID 1 (3 карточки) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* PHONE */}
            <button
              onClick={handlePhoneClick}
              className="group border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full cursor-pointer"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FFC400]/10 flex items-center justify-center group-hover:bg-[#FFC400]/20 transition">
                <Phone className="text-[#FFC400]" />
              </div>

              <h3 className="text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
                Телефон / Viber / Telegram
              </h3>

              <div className="text-xl font-semibold text-[#FFC400] font-[Inter]">
                {formattedPhone}
              </div>

              <p className="text-gray-400 text-xs mt-2 font-[Inter]">
                натисніть щоб обрати застосунок
              </p>
            </button>

            {/* EMAIL */}
            <a
              href="mailto:computer_center@ukr.net"
              className="group border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FFC400]/10 flex items-center justify-center group-hover:bg-[#FFC400]/20 transition">
                <Mail className="text-[#FFC400]" />
              </div>

              <h3 className="text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
                Email
              </h3>

              <div className="text-[#FFC400] font-[Inter] break-all">
                computer_center@ukr.net
              </div>

              <p className="text-gray-400 text-xs mt-2 font-[Inter]">
                відповідаємо протягом дня
              </p>
            </a>

            {/* ADDRESS */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=м.+Стрий,+вул.+Незалежності,+17"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FFC400]/10 flex items-center justify-center group-hover:bg-[#FFC400]/20 transition">
                <MapPin className="text-[#FFC400]" />
              </div>

              <h3 className="text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
                Адреса
              </h3>

              <div className="text-[#1F2933] font-[Inter]">
                м. Стрий, вул. Незалежності, 17
              </div>

              <p className="text-gray-400 text-xs mt-2 font-[Inter]">
                відкриється в Google Maps
              </p>
            </a>
          </div>

          {/* CENTERED SOCIALS */}
          <div className="flex justify-center gap-6 mt-6 flex-wrap">
            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/computer_center_stryi"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full max-w-xs border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition">
                <Camera className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
                Instagram
              </h3>

              <div className="text-[#1F2933] font-[Inter] text-sm">
                @computer_center_stryi
              </div>

              <p className="text-gray-400 text-xs mt-2 font-[Inter]">
                стежте за новинами та акціями
              </p>
            </a>

            {/* TIKTOK */}
            <a
              href="https://www.tiktok.com/@computer_center_stryi"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full max-w-xs border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
                TikTok
              </h3>

              <div className="text-[#1F2933] font-[Inter] text-sm">
                @computer_center_stryi
              </div>

              <p className="text-gray-400 text-xs mt-2 font-[Inter]">
                цікаві відео та корисні поради
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
            className="bg-white rounded-2xl max-w-sm w-full p-6 animate-[fadeIn_0.2s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-[Montserrat] text-[#1F2933]">
                Обрати дію
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-gray-500 text-sm mb-4 font-[Inter]">
              Номер:{" "}
              <span className="font-semibold text-[#1F2933]">
                {formattedPhone}
              </span>
            </p>

            <div className="space-y-3">
              <button
                onClick={handleCall}
                className="w-full flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-[#FFC400] hover:bg-[#FFC400]/5 transition"
              >
                <Phone className="text-green-600" />
                Подзвонити
              </button>

              <button
                onClick={handleTelegram}
                className="w-full flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-[#FFC400] hover:bg-[#FFC400]/5 transition"
              >
                <Send className="text-[#26A5E4]" />
                Telegram
              </button>

              <button
                onClick={handleViber}
                className="w-full flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-[#FFC400] hover:bg-[#FFC400]/5 transition"
              >
                <MessageCircle className="text-[#7360F2]" />
                Viber
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ContactInfo;

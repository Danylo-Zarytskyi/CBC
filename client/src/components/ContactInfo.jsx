import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const ContactInfo = () => {
  return (
    <section className="py-24 bg-white">
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

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* PHONE / VIBER / TELEGRAM */}
          <a
            href="tel:+380994249545"
            className="group border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FFC400]/10 flex items-center justify-center group-hover:bg-[#FFC400]/20 transition">
              <Phone className="text-[#FFC400]" />
            </div>

            <h3 className="text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
              Телефон / Viber / Telegram
            </h3>

            <div className="text-xl font-semibold text-[#FFC400] font-[Inter]">
              099 424 95 45
            </div>

            <p className="text-gray-400 text-xs mt-2 font-[Inter]">
              натисніть щоб зателефонувати
            </p>
          </a>

          {/* EMAIL */}
          <a
            href="mailto:info@kdc.com.ua"
            className="group border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FFC400]/10 flex items-center justify-center group-hover:bg-[#FFC400]/20 transition">
              <Mail className="text-[#FFC400]" />
            </div>

            <h3 className="text-lg font-bold text-[#1F2933] mb-2 font-[Montserrat]">
              Email
            </h3>

            <div className="text-[#FFC400] font-[Inter]">
              info@kdc.com.ua
            </div>

            <p className="text-gray-400 text-xs mt-2 font-[Inter]">
              відповідаємо протягом дня
            </p>
          </a>

          {/* ADDRESS (GOOGLE MAPS) */}
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
      </div>
    </section>
  );
};

export default ContactInfo;
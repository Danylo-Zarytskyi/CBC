import { useState } from "react";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "Друк документів",
    comment: "",
  });

  const services = [
    "Друк документів",
    "Фотодрук",
    "Візитки",
    "Таблички",
    "Банери",
    "Наліпки",
    "Сувеніри",
    "Плакетки та подяки",
    "Брошурування та ламінування",
    "Дизайн макетів",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="relative py-24 bg-[#07111C] overflow-hidden">

      {/* ===== BACKGROUND ANIMATIONS ===== */}
      <div className="absolute inset-0 pointer-events-none">

        {/* rotating squiggle */}
        <svg
          className="absolute top-[-120px] left-[-140px] w-[500px] opacity-20 animate-[spin_60s_linear_infinite]"
          viewBox="0 0 200 200"
        >
          <path
            fill="none"
            stroke="#FFC400"
            strokeWidth="2"
            d="M40,-70C52,-62,62,-52,70,-38C78,-24,84,-6,78,10C72,26,54,40,38,52C22,64,8,74,-10,78C-28,82,-50,80,-62,68C-74,56,-76,34,-74,14C-72,-6,-66,-24,-54,-38C-42,-52,-24,-62,-8,-68C8,-74,28,-78,40,-70Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* second wave reverse */}
        <svg
          className="absolute bottom-[-140px] right-[-160px] w-[600px] opacity-10 animate-[spin_80s_linear_infinite_reverse]"
          viewBox="0 0 200 200"
        >
          <path
            fill="none"
            stroke="#FFC400"
            strokeWidth="2"
            d="M35,-60C48,-52,62,-46,70,-32C78,-18,80,2,74,18C68,34,54,46,38,56C22,66,4,74,-14,76C-32,78,-50,74,-62,62C-74,50,-80,30,-78,12C-76,-6,-66,-22,-52,-36C-38,-50,-20,-62,-4,-66C12,-70,22,-68,35,-60Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* floating triangles */}
        <div className="absolute top-20 right-20 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-[#FFC400]/20 animate-pulse" />

        <div className="absolute bottom-32 left-32 w-6 h-6 rotate-45 bg-[#FFC400]/10 animate-[spin_25s_linear_infinite]" />

      </div>

      {/* ===== FORM ===== */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">

        <div className="rounded-2xl border border-[#FFC400]/30 bg-gradient-to-br from-[#1A1400] via-[#0F0B00] to-[#0A0700] shadow-2xl p-6 md:p-10">

          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="w-16 h-[2px] bg-[#FFC400] mx-auto mb-4"></div>

            <h2 className="text-3xl md:text-4xl font-bold font-[Montserrat] text-white">
              Залишити <span className="text-[#FFC400]">заявку</span>
            </h2>

            <p className="text-gray-300 mt-2 font-[Inter]">
              Ми швидко прорахуємо вартість і зв’яжемось з вами
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid md:grid-cols-2 gap-4">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ваше ім'я"
                className="w-full p-3 rounded-xl bg-[#0F0B00] border border-[#FFC400]/30 text-white placeholder-gray-400 focus:border-[#FFC400] outline-none font-[Inter]"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Номер телефону"
                className="w-full p-3 rounded-xl bg-[#0F0B00] border border-[#FFC400]/30 text-white placeholder-gray-400 focus:border-[#FFC400] outline-none font-[Inter]"
              />

            </div>

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[#0F0B00] border border-[#FFC400]/30 text-white focus:border-[#FFC400] outline-none font-[Inter]"
            >
              {services.map((s, i) => (
                <option key={i} value={s} className="text-black">
                  {s}
                </option>
              ))}
            </select>

            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              rows={5}
              placeholder="Опишіть замовлення або залиште посилання на макет"
              className="w-full p-3 rounded-xl bg-[#0F0B00] border border-[#FFC400]/30 text-white placeholder-gray-400 focus:border-[#FFC400] outline-none font-[Inter]"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#FFC400] text-[#1F2933] py-3 rounded-xl font-bold font-[Montserrat] hover:brightness-110 active:scale-[0.98] transition"
            >
              <Send size={18} />
              Надіслати заявку
            </button>

            <p className="text-center text-xs text-gray-400 font-[Inter]">
              Дані використовуються тільки для зворотного зв’язку
            </p>

          </form>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;
import {
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Phone,
  Clock,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

/* 🔥 FIX: компонент винесений з render (ЦЕ ЄДИНА ЗМІНА) */
const Card = ({
  title,
  value,
  sub,
  href,
  icon,
  color = "yellow",
  external,
  onCopy,
  copyable,
  copied,
}) => {
  const colors = {
    yellow: "text-[#FFC400] bg-[#FFC400]/10",
    green: "text-green-400 bg-green-500/10",
    blue: "text-sky-400 bg-sky-500/10",
    purple: "text-purple-400 bg-purple-500/10",
    pink: "text-pink-400 bg-pink-500/10",
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-500 hover:border-[#FFC400]/40"
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${colors[color]}`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80">{value}</p>
      <p className="text-white/40 text-sm mt-1">{sub}</p>

      <div className="flex items-center gap-2 mt-5 text-[#FFC400] text-sm">
        Відкрити <ExternalLink size={14} />
      </div>

      {copyable && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onCopy(value);
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      )}
    </motion.div>
  );

  return external ? (
    <a href={href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <a href={href}>{content}</a>
  );
};

const ContactInfo = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const sectionRef = useRef(null);

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contacts"
      className="relative py-20 bg-[#07111C] text-white overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold">
            Наші <span className="text-[#FFC400]">контакти</span>
          </h2>
          <p className="text-white/60 mt-4">
            Зв'яжіться з нами будь-яким способом
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Email"
            value="computer_center@ukr.net"
            sub="Відповідаємо швидко"
            href="mailto:computer_center@ukr.net"
            icon={<Mail />}
            color="yellow"
            copyable
            onCopy={copyEmail}
            copied={copiedEmail}
          />

          <Card
            title="Телефон"
            value="+38 (099) 424-95-45"
            sub="Пн-Пт 9:00 - 18:00"
            href="tel:+380994249545"
            icon={<Phone />}
            color="green"
          />

          <Card
            title="Telegram"
            value="@cbc_stryi"
            sub="Швидка відповідь"
            href="https://t.me/cbc_stryi"
            external
            icon={<Send />}
            color="blue"
          />

          <Card
            title="Viber"
            value="Написати в Viber"
            sub="Миттєві повідомлення"
            href="viber://chat?number=%2B380994249545"
            icon={<MessageCircle />}
            color="purple"
          />

          <Card
            title="Instagram"
            value="@computer_center_stryi"
            sub="Фото та роботи"
            href="https://www.instagram.com/computer_center_stryi"
            external
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="4" stroke="currentColor" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
            }
            color="pink"
          />

          <Card
            title="TikTok"
            value="@computer_center_stryi"
            sub="Цікавий контент"
            href="https://www.tiktok.com/@computer_center_stryi"
            external
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2H12v13.6a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.4a6.3 6.3 0 1 0 0 12.6 6.3 6.3 0 0 0 6.3-6.3V9.2a8.2 8.2 0 0 0 3.3 1.5V6.7z" />
              </svg>
            }
            color="yellow"
          />
        </div>

        <div className="mt-10 rounded-3xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.google.com/maps?q=м.+Стрий,+вул.+Незалежності,+17&output=embed"
            className="w-full h-[300px]"
            loading="lazy"
            title="Google Maps"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;

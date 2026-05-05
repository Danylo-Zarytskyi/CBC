import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Send, MessageCircle } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isVisible = useScrollReveal();

  const items = [
    { label: "Головна", id: "home" },
    { label: "Послуги", id: "services" },
    { label: "Наші роботи", id: "portfolio" },
    { label: "Як замовити", id: "order" },
    { label: "Про нас", id: "about" },
    { label: "Контакти", id: "contacts" },
  ];

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  // close mobile menu on scroll
  useEffect(() => {
    if (!mobileOpen) return;

    const onScroll = () => setMobileOpen(false);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  return (
    <header
      data-reveal="header"
      className={`fixed top-0 w-full z-50 bg-[#07111C]/90 backdrop-blur-md border-b border-[#FFC400]/20 transition-all duration-700 ${
        isVisible("header")
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* LOGO */}
        <div onClick={() => handleScroll("home")} className="cursor-pointer">
          <img
            src="https://i.ibb.co/zHnvcYg5/image.png"
            className="h-24 md:h-28 hover:scale-105 transition"
            alt="logo"
          />
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="text-white/70 hover:text-[#FFC400] transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* ORDER */}
          <a
            href="#order"
            className="bg-[#FFC400] text-black px-4 py-2 rounded-lg font-semibold hidden sm:block"
          >
            Замовити
          </a>

          {/* PHONE + SOCIALS */}
          <div className="flex flex-col items-center">
            <a
              href="tel:+380994249545"
              className="text-white border border-white/20 px-3 py-2 rounded-lg text-sm"
            >
              📞 099 42 49 545
            </a>

            {/* FILLED SOCIAL BUTTONS */}
            <div className="flex items-center gap-3 mt-2">
              {/* Telegram (filled) */}
              <button
                onClick={() => window.open("https://t.me/cbc_stryi", "_blank")}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#26A5E4] hover:scale-110 transition"
                title="Telegram"
              >
                <Send className="w-4 h-4 text-white" />
              </button>

              {/* Viber (filled + proper icon) */}
              <button
                onClick={() =>
                  window.open(
                    "viber://contact?number=%2B380994249545",
                    "_blank",
                  )
                }
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#7360F2] hover:scale-110 transition"
                title="Viber"
              >
                {/* Viber SVG */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                >
                  <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.75.45 3.46 1.31 4.98L2 22l5.22-1.37c1.46.8 3.1 1.23 4.82 1.23 5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.4 13.66c-.23.65-1.28 1.24-1.77 1.31-.48.07-1.08.1-1.75-.1-.4-.12-.92-.27-1.59-.57-2.8-1.22-4.62-4.01-4.76-4.2-.14-.19-1.14-1.52-1.14-2.9 0-1.38.73-2.05 1-2.34.27-.29.6-.36.8-.36.2 0 .4 0 .58.01.19.01.44-.07.69.53.23.57.78 1.96.85 2.1.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.32.38-.46.51-.15.14-.3.29-.13.59.17.29.75 1.24 1.61 2.01 1.1.98 2.02 1.28 2.32 1.42.3.14.48.12.66-.07.18-.19.76-.88.97-1.18.21-.29.43-.24.72-.14.29.1 1.84.87 2.16 1.03.32.16.54.24.62.37.08.13.08.75-.15 1.4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-[#07111C] border-t border-[#FFC400]/20 px-6 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleScroll(item.id)}
            className="block text-white/80 py-2"
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

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
          />
        </div>

        {/* DESKTOP */}
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

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <a
            href="#order"
            className="bg-[#FFC400] text-black px-4 py-2 rounded-lg font-semibold hidden sm:block"
          >
            Замовити
          </a>

          <a
            href="tel:+380994249545"
            className="text-white border border-white/20 px-3 py-2 rounded-lg text-sm"
          >
            📞 099 42 49 545
          </a>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE */}
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

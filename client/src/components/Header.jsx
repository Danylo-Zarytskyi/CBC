import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header className="fixed top-0 w-full z-50 bg-[#07111C]/90 backdrop-blur-md border-b border-[#FFC400]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <div
          onClick={() => handleScroll("home")}
          className="cursor-pointer flex items-center gap-2"
        >
          <img
            src="https://i.ibb.co/zHnvcYg5/image.png"
            alt="logo"
            className="h-24 md:h-28 hover:scale-105 transition"
          />
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-8">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="text-white/70 hover:text-[#FFC400] transition font-medium text-lg"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          <a
            href="#order"
            className="bg-[#FFC400] text-black px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition hidden sm:block"
          >
            Замовити друк
          </a>

          <a
            href="tel:+380994249545"
            className="text-white border border-white/20 px-3 py-2 rounded-lg hover:border-[#FFC400] transition text-sm"
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

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-[#07111C] border-t border-[#FFC400]/20 px-6 py-4 flex flex-col gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="text-white/80 text-left hover:text-[#FFC400] text-lg"
            >
              {item.label}
            </button>
          ))}

          <a
            href="#order"
            className="mt-2 bg-[#FFC400] text-black px-4 py-2 rounded-lg text-center font-semibold"
          >
            Замовити друк
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
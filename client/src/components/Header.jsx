import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Send, MessageCircle, X, Menu, Phone } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isVisible = useScrollReveal();

  const items = [
    { label: "Головна", id: "home" },
    { label: "Послуги", id: "services" },
    { label: "Наші роботи", id: "portfolio" },
    { label: "Як замовити", id: "howToOrder" },
    { label: "Про нас", id: "about" },
    { label: "Контакти", id: "contacts" },
  ];

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onScroll = () => setMobileOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  return (
    <>
      <header
        data-reveal="header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#07111C]/95 backdrop-blur-xl border-b border-white/10 shadow-xl"
            : "bg-[#07111C] border-b border-white/5"
        } ${
          isVisible("header")
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-[72px] md:h-[88px]">
          {/* LOGO */}
          <button
            onClick={() => handleScroll("home")}
            className="focus:outline-none focus:ring-2 focus:ring-[#FFC400]/40 rounded-lg hover:scale-105 transition"
          >
            <img
              src="https://i.ibb.co/zHnvcYg5/image.png"
              className="h-[78px] md:h-[96px] object-contain"
              alt="Computer Center Stryi Logo"
            />
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="relative px-4 py-2 rounded-lg text-white/70 hover:text-[#FFC400] hover:bg-white/5 transition-all duration-300 font-medium group"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 w-0 h-[2px] bg-[#FFC400] transition-all duration-300 group-hover:w-6 group-hover:-translate-x-1/2" />
              </button>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* ORDER BUTTON */}
            <button
              onClick={() => handleScroll("orderForm")}
              className="hidden sm:block bg-gradient-to-r from-[#FFC400] to-[#FFD84D] text-black px-5 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Замовити
            </button>

            {/* PHONE DESKTOP */}
            <div className="hidden lg:flex flex-col items-end">
              <a
                href="tel:+380994249545"
                className="text-white font-medium text-sm hover:text-[#FFC400] transition flex items-center gap-1"
              >
                <Phone size={14} />
                +38 (099) 424-95-45
              </a>

              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() =>
                    window.open("https://t.me/cbc_stryi", "_blank")
                  }
                  className="w-7 h-7 rounded-full bg-[#26A5E4] flex items-center justify-center hover:scale-110 transition"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>

                <button
                  onClick={() =>
                    window.open("viber://chat?number=%2B380994249545", "_blank")
                  }
                  className="w-7 h-7 rounded-full bg-[#7360F2] flex items-center justify-center hover:scale-110 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                </button>

                {/* INSTAGRAM FIXED ICON */}
                <button
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/computer_center_stryi",
                      "_blank",
                    )
                  }
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FEDA77] via-[#D62976] to-[#962FBF] flex items-center justify-center hover:scale-110 transition shadow-md"
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                  </svg>
                </button>

                <button
                  onClick={() =>
                    window.open(
                      "https://www.tiktok.com/@computer_center_stryi",
                      "_blank",
                    )
                  }
                  className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:scale-110 transition"
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25H12.3v13.67a2.89 2.89 0 1 1-2.9-2.9c.3 0 .6.05.88.13V9.4A6.33 6.33 0 1 0 16 15.7V8.7a8.16 8.16 0 0 0 3.59-2.01z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* MOBILE BTN */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE OVERLAY */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity md:hidden ${
            mobileOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* MOBILE MENU */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-[#07111C] shadow-2xl z-50 transition-transform duration-300 md:hidden ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <img
              src="https://i.ibb.co/zHnvcYg5/image.png"
              className="h-12 object-contain"
              alt="logo"
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white/70 hover:text-white p-2"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="p-6">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="block w-full text-left py-4 text-white/80 hover:text-[#FFC400] border-b border-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-8 left-6 right-6">
            <a
              href="tel:+380994249545"
              className="flex items-center justify-center gap-2 w-full bg-[#FFC400] text-black py-3 rounded-xl font-semibold hover:bg-[#FFD84D] transition"
            >
              <Phone size={18} />
              Зателефонувати
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#07111C] text-white fixed left-0 top-0 shadow-xl mt-16 border-r border-[#FFC400]/20">
      <div className="p-4">
        {/* Профіль користувача */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#FFC400]/30">
          <div className="w-10 h-10 bg-[#FFC400] rounded-full flex items-center justify-center text-[#07111C] font-bold">
            А
          </div>
          <div>
            <div className="font-semibold font-[Montserrat]">Адмін Панель</div>
            <div className="text-sm text-[#FFC400]/70 font-[Inter]">admin@tehnomax.ua</div>
          </div>
        </div>

        {/* Меню адмінки */}
        <nav className="flex flex-col gap-1">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFC400]/10 hover:text-[#FFC400] transition-all duration-200 font-[Inter]"
          >
            📊 <span>Дашборд</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFC400]/10 hover:text-[#FFC400] transition-all duration-200 font-[Inter]"
          >
            👥 <span>Користувачі</span>
            <span className="ml-auto bg-[#FFC400]/20 px-2 rounded text-sm text-[#FFC400]">12</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFC400]/10 hover:text-[#FFC400] transition-all duration-200 font-[Inter]"
          >
            💼 <span>Замовлення</span>
            <span className="ml-auto bg-[#FFC400]/20 px-2 rounded text-sm text-[#FFC400]">8</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFC400]/10 hover:text-[#FFC400] transition-all duration-200 font-[Inter]"
          >
            💰 <span>Фінанси</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFC400]/10 hover:text-[#FFC400] transition-all duration-200 font-[Inter]"
          >
            📝 <span>Блог</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFC400]/10 hover:text-[#FFC400] transition-all duration-200 font-[Inter]"
          >
            🎨 <span>Дизайн</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFC400]/10 hover:text-[#FFC400] transition-all duration-200 font-[Inter]"
          >
            ⚙️ <span>Налаштування</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFC400]/10 hover:text-[#FFC400] transition-all duration-200 font-[Inter]"
          >
            🖼️ <span>Галерея робіт</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFC400]/10 hover:text-[#FFC400] transition-all duration-200 font-[Inter]"
          >
            💬 <span>Заявки</span>
            <span className="ml-auto bg-red-500/80 px-2 rounded text-sm">3</span>
          </a>
        </nav>

        {/* Вихід */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 text-left font-[Inter]">
            🚪 <span>Вийти</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
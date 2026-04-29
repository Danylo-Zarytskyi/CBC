const Footer = () => {
  return (
    <footer className="bg-[#07111C] border-t border-[#FFC400]/20 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-[#FFC400] font-bold mb-4 font-[Montserrat]">КДЦ ТЕХНОМАКС</h4>
            <p className="text-gray-400 text-sm font-[Inter]">Друк, дизайн, реклама та сувеніри у Стрию з доставкою по Україні</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 font-[Montserrat]">Послуги</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-[Inter]">
              <li className="hover:text-[#FFC400] transition-colors cursor-pointer">Друк документів</li>
              <li className="hover:text-[#FFC400] transition-colors cursor-pointer">Фотодрук</li>
              <li className="hover:text-[#FFC400] transition-colors cursor-pointer">Візитки</li>
              <li className="hover:text-[#FFC400] transition-colors cursor-pointer">Таблички</li>
              <li className="hover:text-[#FFC400] transition-colors cursor-pointer">Банери</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 font-[Montserrat]">Інформація</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-[Inter]">
              <li className="hover:text-[#FFC400] transition-colors cursor-pointer">Доставка по Україні</li>
              <li className="hover:text-[#FFC400] transition-colors cursor-pointer">Вимоги до макетів</li>
              <li className="hover:text-[#FFC400] transition-colors cursor-pointer">Для бізнесу</li>
              <li className="hover:text-[#FFC400] transition-colors cursor-pointer">Про нас</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 font-[Montserrat]">Контакти</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-[Inter]">
              <li className="hover:text-[#FFC400] transition-colors">📞 099 424 95 45</li>
              <li className="hover:text-[#FFC400] transition-colors">📧 info@kdc.com.ua</li>
              <li>📍 вул. Незалежності, 17, Стрий</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FFC400]/10 pt-6 text-center">
          <p className="text-gray-500 text-sm font-[Inter]">
            © 2024 КДЦ «ТЕХНОМАКС» — Друк, дизайн, реклама у Стрию з доставкою по Україні
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
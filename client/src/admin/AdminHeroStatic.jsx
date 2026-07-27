import { LayoutDashboard, ShieldCheck, FolderKanban } from "lucide-react";

const AdminHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#07111C] border-b border-white/10">
      {/* BG GLOW */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-150px] left-[-120px] w-[400px] h-[400px] bg-yellow-400/10 blur-3xl rounded-full" />

        <div className="absolute bottom-[-180px] right-[-150px] w-[500px] h-[500px] bg-yellow-400/5 blur-3xl rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-34">
        {/* TOP */}
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <ShieldCheck size={16} />
            Admin Panel
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            CBC
            <span className="text-[#FFC400]"> CMS</span>
          </h1>

          <p className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Панель керування сайтом для редагування послуг, популярних
            пропозицій, портфоліо та заявок клієнтів.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
          {/* CARD */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-4">
              <LayoutDashboard className="text-[#FFC400]" />
            </div>

            <h3 className="text-white font-semibold text-lg">Управління</h3>

            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Швидке редагування контенту сайту без необхідності змінювати код
              вручну.
            </p>
          </div>

          {/* CARD */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-4">
              <FolderKanban className="text-[#FFC400]" />
            </div>

            <h3 className="text-white font-semibold text-lg">Контент</h3>

            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Додавання нових робіт, послуг, фото, описів та оновлення
              інформації в реальному часі.
            </p>
          </div>

          {/* CARD */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-4">
              <ShieldCheck className="text-[#FFC400]" />
            </div>

            <h3 className="text-white font-semibold text-lg">Замовлення</h3>

            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Контроль заявок клієнтів, статусів замовлень та історії виконаних
              робіт.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminHero;

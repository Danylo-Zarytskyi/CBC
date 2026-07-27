import { useEffect, useRef, useState } from "react";
import api from "../api/api";
import { Save, RefreshCw, FileText, TrendingUp } from "lucide-react";

const AdminHero = () => {
  const [form, setForm] = useState({
    description: "",
    highlightedText: "",
    statYears: "",
    statYearsLabel: "",
    statOrders: "",
    statOrdersLabel: "",
    statSupport: "",
    statSupportLabel: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetched = useRef(false);

  const fetchHero = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/hero");
      setForm(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchHero();
  }, []);

  const change = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await api.put("/api/hero", form);
      setForm(res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.log(err);
      alert("Помилка при збереженні");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07111C] text-white flex flex-col items-center justify-center">
        <RefreshCw size={32} className="text-yellow-400 animate-spin mb-3" />
        <p className="text-gray-400">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07111C] text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Головний блок (Hero)
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Опис та статистика на головній сторінці сайту
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/10 to-white/5 border border-yellow-400/30 rounded-2xl p-6 shadow-xl space-y-6">
          {/* DESCRIPTION */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <FileText size={14} />
              Опис
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={change}
              rows={3}
              placeholder="Друк, поліграфія, дизайн..."
              className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition resize-none"
            />
          </div>

          {/* HIGHLIGHTED TEXT */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <FileText size={14} />
              Виділений фрагмент опису (жовтим)
            </label>
            <input
              name="highlightedText"
              value={form.highlightedText}
              onChange={change}
              placeholder="продаж канцелярії"
              className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition"
            />
            <p className="text-gray-500 text-xs mt-1">
              Цей текст має точно збігатися з частиною опису вище — він буде
              підсвічений жовтим кольором.
            </p>
          </div>

          {/* STATS */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <TrendingUp size={14} />
              Статистика (3 показники)
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Years */}
              <div className="space-y-2">
                <input
                  name="statYears"
                  value={form.statYears}
                  onChange={change}
                  placeholder="10+"
                  className="w-full p-2 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50"
                />
                <input
                  name="statYearsLabel"
                  value={form.statYearsLabel}
                  onChange={change}
                  placeholder="років досвіду"
                  className="w-full p-2 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50"
                />
              </div>

              {/* Orders */}
              <div className="space-y-2">
                <input
                  name="statOrders"
                  value={form.statOrders}
                  onChange={change}
                  placeholder="5000+"
                  className="w-full p-2 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50"
                />
                <input
                  name="statOrdersLabel"
                  value={form.statOrdersLabel}
                  onChange={change}
                  placeholder="виконаних замовлень"
                  className="w-full p-2 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50"
                />
              </div>

              {/* Support */}
              <div className="space-y-2">
                <input
                  name="statSupport"
                  value={form.statSupport}
                  onChange={change}
                  placeholder="24/7"
                  className="w-full p-2 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50"
                />
                <input
                  name="statSupportLabel"
                  value={form.statSupportLabel}
                  onChange={change}
                  placeholder="онлайн підтримка"
                  className="w-full p-2 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50"
                />
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={submit}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            {submitting ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {submitting
              ? "Збереження..."
              : saved
                ? "Збережено ✓"
                : "Зберегти зміни"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;

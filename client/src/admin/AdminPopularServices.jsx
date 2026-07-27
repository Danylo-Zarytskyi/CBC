import { useEffect, useState, useRef } from "react";
import api from "../api/api"; // Імпортуємо налаштований axios
import {
  X,
  Plus,
  Edit,
  Trash2,
  Save,
  Image as ImageIcon,
  DollarSign,
  Tag,
  AlignLeft,
  RefreshCw,
  Star,
  Search,
  Link2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const AdminPopularServices = () => {
  const [items, setItems] = useState([]);
  const [services, setServices] = useState([]); // для зв'язку з реальною послугою
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', text }

  const [form, setForm] = useState({
    title: "",
    desc: "",
    price: "",
    image: "",
    serviceId: "",
  });

  const [errors, setErrors] = useState({});

  const fetched = useRef(false);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/popular-services");
      setItems(res.data || []);
    } catch (err) {
      console.log(err);
      showToast("error", "Не вдалося завантажити список");
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await api.get("/api/services");
      setServices(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchItems();
    fetchServices();
  }, []);

  const change = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((p) => ({ ...p, [e.target.name]: null }));
    }
  };

  const reset = () => {
    setForm({
      title: "",
      desc: "",
      price: "",
      image: "",
      serviceId: "",
    });
    setErrors({});
    setEditId(null);
    setShowForm(false);
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Вкажіть назву послуги";
    if (form.image && !/^https?:\/\/.+/i.test(form.image.trim())) {
      next.image = "Посилання має починатись з http:// або https://";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (editId) {
        await api.put(`/api/popular-services/${editId}`, form);
        showToast("success", "Зміни збережено");
      } else {
        await api.post("/api/popular-services", form);
        showToast("success", "Послугу додано");
      }

      reset();
      fetchItems();
    } catch (err) {
      console.log(err);
      showToast("error", "Помилка при збереженні. Спробуйте ще раз");
    } finally {
      setSubmitting(false);
    }
  };

  const edit = (s) => {
    setForm({
      title: s.title || "",
      desc: s.desc || "",
      price: s.price || "",
      image: s.image || "",
      serviceId: s.serviceId || "",
    });
    setErrors({});
    setEditId(s._id);
    setShowForm(true);
  };

  const confirmRemove = (id) => setDeleteConfirmId(id);

  const remove = async (id) => {
    try {
      await api.delete(`/api/popular-services/${id}`);
      showToast("success", "Послугу видалено");
      fetchItems();
    } catch (err) {
      console.log(err);
      showToast("error", "Не вдалося видалити");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      searchQuery === "" ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#07111C] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* TOAST */}
        {toast && (
          <div
            className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl border animate-[fadeIn_0.2s_ease] ${
              toast.type === "success"
                ? "bg-green-500/10 border-green-400/30 text-green-300"
                : "bg-red-500/10 border-red-400/30 text-red-300"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            <span className="text-sm">{toast.text}</span>
          </div>
        )}

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Популярні послуги
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Керування послугами, які відображаються на головній сторінці
            </p>
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus size={18} />
              Додати послугу
            </button>
          )}
        </div>

        {/* SEARCH */}
        {!showForm && items.length > 0 && (
          <div className="relative mb-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пошук за назвою..."
              className="w-full pl-9 pr-9 py-2.5 bg-black/50 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}

        {/* FORM */}
        {showForm && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-yellow-400/30 rounded-2xl p-6 mb-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-yellow-400">
                {editId ? "Редагувати послугу" : "Нова послуга"}
              </h2>
              <button
                onClick={reset}
                className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                  <Tag size={14} />
                  Назва послуги <span className="text-red-400">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  placeholder="Наприклад: Друк візиток"
                  className={`w-full p-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition ${
                    errors.title
                      ? "border-red-400/60 focus:border-red-400"
                      : "border-white/10 focus:border-yellow-400/50"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                  <AlignLeft size={14} />
                  Опис
                </label>
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={change}
                  placeholder="Короткий опис послуги..."
                  rows="3"
                  maxLength={180}
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition resize-none"
                />
                <p className="text-gray-500 text-xs mt-1 text-right">
                  {form.desc.length}/180
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <DollarSign size={14} />
                    Ціна
                  </label>
                  <input
                    name="price"
                    value={form.price}
                    onChange={change}
                    placeholder="Від 100 грн"
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                  <ImageIcon size={14} />
                  URL зображення
                </label>
                <input
                  name="image"
                  value={form.image}
                  onChange={change}
                  placeholder="https://..."
                  className={`w-full p-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition ${
                    errors.image
                      ? "border-red-400/60 focus:border-red-400"
                      : "border-white/10 focus:border-yellow-400/50"
                  }`}
                />
                {errors.image && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.image}
                  </p>
                )}

                {/* IMAGE PREVIEW */}
                {form.image && !errors.image && (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/10">
                    <img
                      src={form.image}
                      alt="Прев'ю"
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="w-14 h-14 rounded-lg bg-white/5 items-center justify-center text-gray-500 text-xs text-center flex-shrink-0 hidden">
                      немає фото
                    </div>
                    <p className="text-gray-400 text-xs">
                      Прев'ю зображення за вказаним посиланням
                    </p>
                  </div>
                )}
              </div>

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
                {submitting ? "Збереження..." : editId ? "Оновити" : "Створити"}
              </button>
            </div>
          </div>
        )}

        {/* LIST */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw
              size={32}
              className="text-yellow-400 animate-spin mb-3"
            />
            <p className="text-gray-400">Завантаження...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <Star size={48} className="text-gray-600 mb-3" />
            <p className="text-gray-500 text-sm">Немає популярних послуг</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-yellow-400 text-sm hover:underline"
            >
              Додати першу послугу
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white/5 rounded-2xl border border-white/10">
            <Search size={40} className="text-gray-600 mb-3" />
            <p className="text-gray-500 text-sm">
              Нічого не знайдено за запитом «{searchQuery}»
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-yellow-400 text-sm hover:underline"
            >
              Очистити пошук
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-4 hover:border-yellow-400/30 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  {/* Preview Image */}
                  <div className="w-16 h-16 rounded-lg bg-black/50 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full items-center justify-center text-gray-600 ${item.image ? "hidden" : "flex"}`}
                    >
                      <ImageIcon size={20} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base truncate">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    )}
                    {item.price && (
                      <div className="flex items-center gap-1 mt-2">
                        <DollarSign size={12} className="text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">
                          {item.price}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {deleteConfirmId === item._id ? (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                    <p className="text-gray-300 text-xs flex-1">
                      Видалити «{item.title}»?
                    </p>
                    <button
                      onClick={() => remove(item._id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition"
                    >
                      Видалити
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-medium transition"
                    >
                      Скасувати
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                    <button
                      onClick={() => edit(item)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition text-sm"
                    >
                      <Edit size={14} />
                      Редагувати
                    </button>
                    <button
                      onClick={() => confirmRemove(item._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm"
                    >
                      <Trash2 size={14} />
                      Видалити
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminPopularServices;

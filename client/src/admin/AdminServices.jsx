import { useEffect, useRef, useState } from "react";
import api from "../api/api"; // Імпортуємо налаштований axios
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Layers,
  Tag,
  Image as ImageIcon,
  Package,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Search,
} from "lucide-react";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', text }
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    icon: "",
  });

  const [items, setItems] = useState([{ name: "", price: "" }]);

  const fetched = useRef(false);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/services");
      setServices(res.data || []);
    } catch (err) {
      console.log(err);
      showToast("error", "Не вдалося завантажити список послуг");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchServices();
  }, []);

  const change = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((p) => ({ ...p, [e.target.name]: null }));
    }
  };

  const updateItem = (i, k, v) => {
    setItems((p) => {
      const copy = [...p];
      copy[i][k] = v;
      return copy;
    });
  };

  const addItem = () => setItems((p) => [...p, { name: "", price: "" }]);

  const removeItem = (i) => setItems((p) => p.filter((_, idx) => idx !== i));

  const reset = () => {
    setForm({ title: "", icon: "" });
    setItems([{ name: "", price: "" }]);
    setErrors({});
    setEditId(null);
    setShowForm(false);
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Вкажіть назву послуги";
    if (form.icon && !/^https?:\/\/.+/i.test(form.icon.trim())) {
      next.icon = "Посилання має починатись з http:// або https://";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    setSubmitting(true);

    const payload = {
      ...form,
      items: items.filter((item) => item.name || item.price),
    };

    try {
      if (editId) {
        await api.put(`/api/services/${editId}`, payload);
        showToast("success", "Зміни збережено");
      } else {
        await api.post("/api/services", payload);
        showToast("success", "Послугу створено");
      }

      reset();
      fetchServices();
    } catch (err) {
      console.log(err);
      showToast("error", "Помилка при збереженні. Спробуйте ще раз");
    } finally {
      setSubmitting(false);
    }
  };

  const edit = (s) => {
    setForm({ title: s.title, icon: s.icon || "" });
    setItems(s.items?.length ? s.items : [{ name: "", price: "" }]);
    setErrors({});
    setEditId(s._id);
    setShowForm(true);
  };

  const confirmRemove = (id) => setDeleteConfirmId(id);

  const remove = async (id) => {
    try {
      await api.delete(`/api/services/${id}`);
      showToast("success", "Послугу видалено");
      fetchServices();
    } catch (err) {
      console.log(err);
      showToast("error", "Не вдалося видалити послугу");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const getItemsCount = (items) => {
    if (!items) return 0;
    return items.filter((item) => item.name || item.price).length;
  };

  const filteredServices = services.filter(
    (s) =>
      searchQuery === "" ||
      s.title?.toLowerCase().includes(searchQuery.toLowerCase()),
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
              Послуги
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Керування списком послуг та їх варіантами
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
        {!showForm && services.length > 0 && (
          <div className="relative mb-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пошук за назвою послуги..."
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
              {/* Основна інформація */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <Tag size={14} />
                    Назва послуги <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={change}
                    placeholder="Наприклад: Друк документів"
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
                    <ImageIcon size={14} />
                    URL іконки
                  </label>
                  <input
                    name="icon"
                    value={form.icon}
                    onChange={change}
                    placeholder="https://..."
                    className={`w-full p-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition ${
                      errors.icon
                        ? "border-red-400/60 focus:border-red-400"
                        : "border-white/10 focus:border-yellow-400/50"
                    }`}
                  />
                  {errors.icon && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.icon}
                    </p>
                  )}
                </div>
              </div>

              {/* Icon preview */}
              {form.icon && !errors.icon && (
                <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center flex-shrink-0">
                    <img
                      src={form.icon}
                      alt="Прев'ю іконки"
                      className="w-6 h-6 object-contain"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                  <p className="text-gray-400 text-xs">
                    Прев'ю іконки за вказаним посиланням
                  </p>
                </div>
              )}

              {/* Варіанти послуг */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                  <Package size={14} />
                  Варіанти послуг
                </label>

                <div className="space-y-2">
                  {items.map((it, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        value={it.name}
                        onChange={(e) => updateItem(i, "name", e.target.value)}
                        placeholder="Назва варіанту"
                        className="flex-1 p-2 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50"
                      />
                      <input
                        value={it.price}
                        onChange={(e) => updateItem(i, "price", e.target.value)}
                        placeholder="Ціна"
                        className="w-28 p-2 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50"
                      />
                      <button
                        onClick={() => removeItem(i)}
                        disabled={items.length === 1}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title={
                          items.length === 1
                            ? "Має бути хоча б один рядок"
                            : "Видалити варіант"
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addItem}
                  className="flex items-center gap-1 text-yellow-400 text-sm mt-3 hover:text-yellow-300 transition"
                >
                  <Plus size={14} />
                  Додати варіант
                </button>
              </div>

              {/* Кнопка збереження */}
              <button
                onClick={submit}
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 mt-4"
              >
                {submitting ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {submitting
                  ? "Збереження..."
                  : editId
                    ? "Оновити послугу"
                    : "Створити послугу"}
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
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <Layers size={48} className="text-gray-600 mb-3" />
            <p className="text-gray-500 text-sm">Немає послуг</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-yellow-400 text-sm hover:underline"
            >
              Додати першу послугу
            </button>
          </div>
        ) : filteredServices.length === 0 ? (
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
          <div className="grid gap-4">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="group bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl p-4 hover:border-yellow-400/30 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Icon Preview */}
                    {service.icon && (
                      <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center flex-shrink-0">
                        <img
                          src={service.icon}
                          alt={service.title}
                          className="w-8 h-8 object-contain"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-base">
                        {service.title}
                      </h3>

                      {/* Items preview */}
                      {service.items && service.items.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {service.items
                            .filter((item) => item.name || item.price)
                            .slice(0, 3)
                            .map((item, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-300"
                              >
                                {item.name && <span>{item.name}</span>}
                                {item.price && (
                                  <span className="text-yellow-400">
                                    {item.price}
                                  </span>
                                )}
                              </span>
                            ))}
                          {getItemsCount(service.items) > 3 && (
                            <span className="inline-flex items-center px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400">
                              +{getItemsCount(service.items) - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {(!service.items ||
                        getItemsCount(service.items) === 0) && (
                        <p className="text-gray-500 text-xs mt-1">
                          Немає варіантів
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {deleteConfirmId !== service._id && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => edit(service)}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                        title="Редагувати"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => confirmRemove(service._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                        title="Видалити"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Inline delete confirm */}
                {deleteConfirmId === service._id && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                    <p className="text-gray-300 text-xs flex-1">
                      Видалити «{service.title}» разом з усіма варіантами?
                    </p>
                    <button
                      onClick={() => remove(service._id)}
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

export default AdminServices;

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
} from "lucide-react";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    icon: "",
  });

  const [items, setItems] = useState([{ name: "", price: "" }]);

  const fetched = useRef(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      // ВИКОРИСТОВУЄМО api ЗАМІСТЬ axios
      const res = await api.get("/api/services");
      setServices(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchServices();
  }, []);

  const change = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

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
    setEditId(null);
    setShowForm(false);
  };

  const submit = async () => {
    if (!form.title) {
      alert("Назва послуги обов'язкова");
      return;
    }

    setSubmitting(true);

    const payload = {
      ...form,
      items: items.filter((item) => item.name || item.price),
    };

    try {
      if (editId) {
        // ВИКОРИСТОВУЄМО api ЗАМІСТЬ axios
        await api.put(`/api/services/${editId}`, payload);
      } else {
        // ВИКОРИСТОВУЄМО api ЗАМІСТЬ axios
        await api.post("/api/services", payload);
      }

      reset();
      fetchServices();
    } catch (err) {
      console.log(err);
      alert("Помилка при збереженні");
    } finally {
      setSubmitting(false);
    }
  };

  const edit = (s) => {
    setForm({ title: s.title, icon: s.icon || "" });
    setItems(s.items?.length ? s.items : [{ name: "", price: "" }]);
    setEditId(s._id);
    setShowForm(true);
  };

  const remove = async (id) => {
    if (!confirm("Ви впевнені, що хочете видалити цю послугу?")) return;
    try {
      // ВИКОРИСТОВУЄМО api ЗАМІСТЬ axios
      await api.delete(`/api/services/${id}`);
      fetchServices();
    } catch (err) {
      console.log(err);
      alert("Помилка при видаленні");
    }
  };

  const getItemsCount = (items) => {
    if (!items) return 0;
    return items.filter((item) => item.name || item.price).length;
  };

  return (
    <div className="min-h-screen bg-[#07111C] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
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
                    Назва послуги
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={change}
                    placeholder="Наприклад: Друк документів"
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition"
                  />
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
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition"
                  />
                </div>
              </div>

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
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                        title="Видалити варіант"
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
        ) : (
          <div className="grid gap-4">
            {services.map((service) => (
              <div
                key={service._id}
                className="group bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl p-4 hover:border-yellow-400/30 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Icon Preview */}
                    {service.icon && (
                      <div className="w-12 h-12 rounded-xl bg-black/50 flex items-center justify-center flex-shrink-0">
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
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => edit(service)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                      title="Редагувати"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => remove(service._id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                      title="Видалити"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServices;

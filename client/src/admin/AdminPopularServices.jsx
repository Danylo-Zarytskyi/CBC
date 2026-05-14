import { useEffect, useState, useRef } from "react";
import axios from "axios";
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
} from "lucide-react";

const API = "http://localhost:4000/api/popular-services";

const AdminPopularServices = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    price: "",
    image: "",
    serviceId: "",
  });

  const fetched = useRef(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setItems(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchItems();
  }, []);

  const change = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const reset = () => {
    setForm({
      title: "",
      desc: "",
      price: "",
      image: "",
      serviceId: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  const submit = async () => {
    if (!form.title) return;

    setSubmitting(true);
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
      } else {
        await axios.post(API, form);
      }

      reset();
      fetchItems();
    } catch (err) {
      console.log(err);
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
    setEditId(s._id);
    setShowForm(true);
  };

  const remove = async (id) => {
    if (!confirm("Ви впевнені, що хочете видалити цю послугу?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111C] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
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
                  Назва послуги
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  placeholder="Наприклад: Друк візиток"
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition"
                />
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
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition resize-none"
                />
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
                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition"
                  />
                </div>
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
        ) : (
          <div className="grid gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="group bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl p-4 hover:border-yellow-400/30 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  {/* Preview Image */}
                  {item.image && (
                    <div className="w-16 h-16 rounded-lg bg-black/50 overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
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

                      {/* Actions */}
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => edit(item)}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                          title="Редагувати"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => remove(item._id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                          title="Видалити"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
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

export default AdminPopularServices;

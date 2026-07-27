import api from "../api/api";
import { useEffect, useState, useRef } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  AlignLeft,
  Type,
  FolderOpen,
  RefreshCw,
  Eye,
  Search,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const AdminWorks = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", desc: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', text }
  const [errors, setErrors] = useState({});

  const fetched = useRef(false);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchWorks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/works");
      setWorks(res.data || []);
    } catch (err) {
      console.log(err);
      showToast("error", "Не вдалося завантажити роботи");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchWorks();
  }, []);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((p) => ({ ...p, [e.target.name]: null }));
    }
  };

  const reset = () => {
    setForm({ title: "", desc: "", image: "" });
    setErrors({});
    setEditId(null);
    setShowForm(false);
    setPreviewImage(null);
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Вкажіть назву роботи";
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
        await api.put(`/api/works/${editId}`, form);
        showToast("success", "Зміни збережено");
      } else {
        await api.post("/api/works", form);
        showToast("success", "Роботу додано");
      }

      reset();
      fetchWorks();
    } catch (err) {
      console.log(err);
      showToast("error", "Помилка при збереженні. Спробуйте ще раз");
    } finally {
      setSubmitting(false);
    }
  };

  const edit = (w) => {
    setForm({ title: w.title, desc: w.desc || "", image: w.image || "" });
    setErrors({});
    setEditId(w._id);
    setPreviewImage(w.image);
    setShowForm(true);
  };

  const confirmRemove = (id) => setDeleteConfirmId(id);

  const remove = async (id) => {
    try {
      await api.delete(`/api/works/${id}`);
      showToast("success", "Роботу видалено");
      fetchWorks();
    } catch (err) {
      console.log(err);
      showToast("error", "Не вдалося видалити роботу");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleImageUrlChange = (url) => {
    setForm({ ...form, image: url });
    setPreviewImage(url);
    if (errors.image) setErrors((p) => ({ ...p, image: null }));
  };

  const filteredWorks = works.filter(
    (w) =>
      searchQuery === "" ||
      w.title?.toLowerCase().includes(searchQuery.toLowerCase()),
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
              Наші роботи
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Керування портфоліо виконаних робіт
            </p>
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus size={18} />
              Додати роботу
            </button>
          )}
        </div>

        {/* SEARCH */}
        {!showForm && works.length > 0 && (
          <div className="relative mb-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пошук за назвою роботи..."
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
                {editId ? "Редагувати роботу" : "Нова робота"}
              </h2>
              <button
                onClick={reset}
                className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                  <Type size={14} />
                  Назва роботи <span className="text-red-400">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  placeholder="Наприклад: Друк банерів для ТРЦ"
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

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                  <AlignLeft size={14} />
                  Опис
                </label>
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={change}
                  placeholder="Короткий опис роботи..."
                  rows="3"
                  maxLength={200}
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition resize-none"
                />
                <p className="text-gray-500 text-xs mt-1 text-right">
                  {form.desc.length}/200
                </p>
              </div>

              {/* Image URL */}
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                  <ImageIcon size={14} />
                  URL зображення
                </label>
                <input
                  name="image"
                  value={form.image}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
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
              </div>

              {/* Image Preview */}
              {previewImage && !errors.image && (
                <div className="mt-2">
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <Eye size={14} />
                    Попередній перегляд
                  </label>
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-black/50 border border-white/10">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
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
                    ? "Оновити роботу"
                    : "Додати роботу"}
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
        ) : works.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <FolderOpen size={48} className="text-gray-600 mb-3" />
            <p className="text-gray-500 text-sm">Немає робіт у портфоліо</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-yellow-400 text-sm hover:underline"
            >
              Додати першу роботу
            </button>
          </div>
        ) : filteredWorks.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWorks.map((work) => (
              <div
                key={work._id}
                className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/30 transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-black/50">
                  <img
                    src={
                      work.image ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-base mb-1 line-clamp-1">
                    {work.title}
                  </h3>
                  {work.desc && (
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {work.desc}
                    </p>
                  )}

                  {/* Actions */}
                  {deleteConfirmId === work._id ? (
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                      <p className="text-gray-300 text-xs flex-1">
                        Видалити цю роботу?
                      </p>
                      <button
                        onClick={() => remove(work._id)}
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
                    <div className="flex gap-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => edit(work)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition text-sm"
                      >
                        <Edit size={14} />
                        Редагувати
                      </button>
                      <button
                        onClick={() => confirmRemove(work._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm"
                      >
                        <Trash2 size={14} />
                        Видалити
                      </button>
                    </div>
                  )}
                </div>
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

export default AdminWorks;

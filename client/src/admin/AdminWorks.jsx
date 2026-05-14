import { useEffect, useState, useRef } from "react";
import axios from "axios";
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
} from "lucide-react";

const API = "http://localhost:4000/api/works";

const AdminWorks = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: "", desc: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const fetched = useRef(false);

  const fetchWorks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setWorks(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchWorks();
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const reset = () => {
    setForm({ title: "", desc: "", image: "" });
    setEditId(null);
    setShowForm(false);
    setPreviewImage(null);
  };

  const submit = async () => {
    if (!form.title) {
      alert("Назва роботи обов'язкова");
      return;
    }

    setSubmitting(true);
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
      } else {
        await axios.post(API, form);
      }

      reset();
      fetchWorks();
    } catch (err) {
      console.log(err);
      alert("Помилка при збереженні");
    } finally {
      setSubmitting(false);
    }
  };

  const edit = (w) => {
    setForm({ title: w.title, desc: w.desc || "", image: w.image || "" });
    setEditId(w._id);
    setPreviewImage(w.image);
    setShowForm(true);
  };

  const remove = async (id) => {
    if (!confirm("Ви впевнені, що хочете видалити цю роботу?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchWorks();
    } catch (err) {
      console.log(err);
      alert("Помилка при видаленні");
    }
  };

  const handleImageUrlChange = (url) => {
    setForm({ ...form, image: url });
    setPreviewImage(url);
  };

  return (
    <div className="min-h-screen bg-[#07111C] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
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
                  Назва роботи
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  placeholder="Наприклад: Друк банерів для ТРЦ"
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition"
                />
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
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition resize-none"
                />
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
                  className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 transition"
                />
              </div>

              {/* Image Preview */}
              {previewImage && (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {works.map((work) => (
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
                  <div className="flex gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => edit(work)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition text-sm"
                    >
                      <Edit size={14} />
                      Редагувати
                    </button>
                    <button
                      onClick={() => remove(work._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm"
                    >
                      <Trash2 size={14} />
                      Видалити
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

export default AdminWorks;

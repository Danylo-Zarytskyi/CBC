import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { X } from "lucide-react";

const API = "http://localhost:4000/api/popular-services";

const AdminPopularServices = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

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
    } finally {
      setSubmitting(false);
    }
  };

  // 🔥 FIX: НЕ setForm(s) напряму
  const edit = (s) => {
    setForm({
      title: s.title || "",
      desc: s.desc || "",
      price: s.price || "",
      image: s.image || "",
      serviceId: s.serviceId || "",
    });
    setEditId(s._id);
  };

  const remove = async (id) => {
    if (!confirm("Delete?")) return;
    await axios.delete(`${API}/${id}`);
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-[#07111C] text-white flex justify-center p-4">
      {/* ВУЖЧИЙ КОНТЕЙНЕР */}
      <div className="w-full max-w-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold">Popular Services</h1>

          {editId && (
            <button
              onClick={reset}
              className="text-gray-400 flex gap-1 text-sm cursor-pointer"
            >
              <X size={14} /> cancel
            </button>
          )}
        </div>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2 mb-5">
          <input
            name="title"
            value={form.title}
            onChange={change}
            placeholder="Title"
            className="w-full p-2 bg-black/30 rounded text-sm cursor-text"
          />

          <input
            name="desc"
            value={form.desc}
            onChange={change}
            placeholder="Description"
            className="w-full p-2 bg-black/30 rounded text-sm cursor-text"
          />

          <input
            name="price"
            value={form.price}
            onChange={change}
            placeholder="Price"
            className="w-full p-2 bg-black/30 rounded text-sm cursor-text"
          />

          <input
            name="image"
            value={form.image}
            onChange={change}
            placeholder="Image URL"
            className="w-full p-2 bg-black/30 rounded text-sm cursor-text"
          />

          <button
            onClick={submit}
            disabled={submitting}
            className="w-full bg-yellow-400 text-black py-2 rounded text-sm cursor-pointer"
          >
            {submitting ? "..." : editId ? "Update" : "Create"}
          </button>
        </div>

        {/* LIST */}
        {loading ? (
          <div className="text-center text-gray-400">loading...</div>
        ) : (
          <div className="space-y-2">
            {items.map((s) => (
              <div
                key={s._id}
                className="bg-white/5 border border-white/10 p-3 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="text-xs text-gray-400">{s.price}</div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => edit(s)}
                    className="cursor-pointer hover:text-yellow-400"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => remove(s._id)}
                    className="cursor-pointer hover:text-red-400"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            {!items.length && (
              <div className="text-center text-gray-500 text-sm">empty</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPopularServices;

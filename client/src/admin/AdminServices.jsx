import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

const API = "http://localhost:4000/api/services";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    icon: "",
  });

  const [items, setItems] = useState([{ name: "", price: "" }]);

  const fetched = useRef(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setServices(res.data || []);
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
  };

  const submit = async () => {
    if (!form.title) return alert("Назва обовʼязкова");

    setSubmitting(true);

    const payload = { ...form, items };

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, payload);
      } else {
        await axios.post(API, payload);
      }

      reset();
      fetchServices();
    } finally {
      setSubmitting(false);
    }
  };

  const edit = (s) => {
    setForm({ title: s.title, icon: s.icon || "" });
    setItems(s.items?.length ? s.items : [{ name: "", price: "" }]);
    setEditId(s._id);
  };

  const remove = async (id) => {
    if (!confirm("Delete?")) return;
    await axios.delete(`${API}/${id}`);
    fetchServices();
  };

  return (
    <div className="min-h-screen bg-[#07111C] text-white py-6 px-3">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">Services</h1>

          {editId && (
            <button
              onClick={reset}
              className="text-gray-400 text-sm flex gap-1 cursor-pointer"
            >
              <X size={14} /> cancel
            </button>
          )}
        </div>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
          <input
            name="title"
            value={form.title}
            onChange={change}
            placeholder="Title"
            className="w-full p-2 bg-black/30 rounded text-sm cursor-text"
          />

          <input
            name="icon"
            value={form.icon}
            onChange={change}
            placeholder="Icon URL"
            className="w-full p-2 bg-black/30 rounded text-sm cursor-text"
          />

          {items.map((it, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={it.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                placeholder="name"
                className="flex-1 p-2 bg-black/30 rounded text-sm cursor-text"
              />

              <input
                value={it.price}
                onChange={(e) => updateItem(i, "price", e.target.value)}
                placeholder="price"
                className="w-24 p-2 bg-black/30 rounded text-sm cursor-text"
              />

              <button onClick={() => removeItem(i)} className="cursor-pointer">
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <button
            onClick={addItem}
            className="text-yellow-400 text-xs cursor-pointer"
          >
            + add item
          </button>

          <button
            onClick={submit}
            disabled={submitting}
            className="w-full bg-yellow-400 text-black py-2 rounded text-sm flex justify-center gap-2 cursor-pointer"
          >
            {submitting ? "..." : editId ? "update" : "create"}
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-2">
          {services.map((s) => (
            <div
              key={s._id}
              className="bg-white/5 border border-white/10 rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-sm">{s.title}</div>
                <div className="text-xs text-gray-400">
                  {s.items?.length || 0} items
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => edit(s)} className="cursor-pointer">
                  ✏️
                </button>

                <button
                  onClick={() => remove(s._id)}
                  className="cursor-pointer"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminServices;

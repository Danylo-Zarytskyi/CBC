import { useEffect, useState, useRef } from "react";
import axios from "axios";

const API = "http://localhost:4000/api/works";

const AdminWorks = () => {
  const [works, setWorks] = useState([]);
  const [form, setForm] = useState({ title: "", desc: "", image: "" });
  const [editId, setEditId] = useState(null);

  const fetched = useRef(false);

  const fetchWorks = async () => {
    const res = await axios.get(API);
    setWorks(res.data || []);
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchWorks();
  }, []);

  const submit = async () => {
    if (editId) {
      await axios.put(`${API}/${editId}`, form);
    } else {
      await axios.post(API, form);
    }

    setForm({ title: "", desc: "", image: "" });
    setEditId(null);
    fetchWorks();
  };

  const edit = (w) => {
    setForm(w);
    setEditId(w._id);
  };

  const remove = async (id) => {
    if (!confirm("Delete?")) return;
    await axios.delete(`${API}/${id}`);
    fetchWorks();
  };

  return (
    <div className="min-h-screen bg-[#07111C] text-white py-6 px-3">
      <div className="max-w-xl mx-auto">
        <h1 className="mb-4 font-bold">Works</h1>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2 mb-5">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="w-full p-2 bg-black/30 rounded text-sm cursor-text"
          />

          <input
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            placeholder="Desc"
            className="w-full p-2 bg-black/30 rounded text-sm cursor-text"
          />

          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="Image"
            className="w-full p-2 bg-black/30 rounded text-sm cursor-text"
          />

          <button
            onClick={submit}
            className="w-full bg-yellow-400 text-black py-2 rounded cursor-pointer"
          >
            {editId ? "update" : "create"}
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-2">
          {works.map((w) => (
            <div
              key={w._id}
              className="bg-white/5 border border-white/10 p-3 rounded flex justify-between"
            >
              <div className="flex gap-3 items-center">
                <img src={w.image} className="w-10 h-10 object-cover rounded" />
                <div>
                  <div className="text-sm">{w.title}</div>
                  <div className="text-xs text-gray-400">{w.desc}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => edit(w)} className="cursor-pointer">
                  ✏️
                </button>
                <button
                  onClick={() => remove(w._id)}
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

export default AdminWorks;

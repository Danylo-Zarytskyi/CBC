import { useState } from "react";
import axios from "axios";
import { Send, Info } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ContactForm = () => {
  const isRevealed = useScrollReveal();
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "Друк документів",
    comment: "",
  });

  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState({});

  const services = [
    "Друк документів",
    "Фотодрук",
    "Візитки",
    "Таблички",
    "Банери",
    "Наліпки",
    "Сувеніри",
    "Плакетки та подяки",
    "Брошурування та ламінування",
    "Дизайн макетів",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);

    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles = [];
    let error = "";

    for (let file of selected) {
      if (file.size > maxSize) {
        error = "Кожен файл має бути менше 5MB";
        continue;
      }
      validFiles.push(file);
    }

    setFileError(error);
    setFiles(validFiles);
  };

  const validate = () => {
    const newErrors = {};

    const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/;

    if (!form.name || form.name.trim().length < 2) {
      newErrors.name = "Ім'я занадто коротке";
    } else if (!nameRegex.test(form.name.trim())) {
      newErrors.name = "Ім'я може містити тільки літери";
    }

    const cleanedPhone = form.phone.replace(/[^\d]/g, "");
    if (cleanedPhone.length < 10) {
      newErrors.phone = "Некоректний номер телефону";
    }

    if (!form.comment || form.comment.trim().length < 20) {
      newErrors.comment = "Опис має бути мінімум 20 символів";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    if (fileError) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("service", form.service);
      formData.append("comment", form.comment);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const { data } = await axios.post(
        "http://localhost:4000/api/orders",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("SUCCESS:", data);

      setForm({
        name: "",
        phone: "",
        service: "Друк документів",
        comment: "",
      });

      setFiles([]);
      setFileError("");
      setErrors({});
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        data-reveal="form-section"
        className={`relative py-24 bg-[#07111C] overflow-hidden transition-all duration-700 scroll-mt-24 ${
          isRevealed("form-section")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        id="orderForm"
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div
            data-reveal="form-container"
            className={`rounded-2xl border border-[#FFC400]/30 bg-gradient-to-br from-[#1A1400] via-[#0F0B00] to-[#0A0700] shadow-2xl p-6 md:p-10 transition-all duration-700 ${
              isRevealed("form-container")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {/* HEADER */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-[Montserrat] text-white">
                Залишити <span className="text-[#FFC400]">заявку</span>
              </h2>

              <p className="text-gray-300 mt-2 font-[Inter]">
                Ми швидко прорахуємо вартість і зв’яжемось з вами
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME + PHONE */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 font-[Inter]">
                    Ім’я
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ваше ім'я"
                    className="w-full p-3 rounded-xl bg-[#0F0B00] border border-[#FFC400]/30 text-white"
                  />

                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white mb-2 font-[Inter]">
                    Телефон
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Номер телефону"
                    className="w-full p-3 rounded-xl bg-[#0F0B00] border border-[#FFC400]/30 text-white"
                  />

                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* FILES */}
              <div>
                <label className="block text-white mb-2 font-[Inter]">
                  Файли / фото (до 5MB)
                </label>

                <input
                  type="file"
                  multiple
                  onChange={handleFiles}
                  className="w-full p-3 rounded-xl bg-[#0F0B00] border border-[#FFC400]/30 text-white"
                />

                {fileError && (
                  <p className="text-red-400 text-xs mt-1">{fileError}</p>
                )}

                {files.length > 0 && (
                  <p className="text-gray-300 text-xs mt-1">
                    Вибрано файлів: {files.length}
                  </p>
                )}
              </div>

              {/* SERVICE */}
              <div>
                <label className="block text-white mb-2 font-[Inter]">
                  Послуга
                </label>

                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#0F0B00] border border-[#FFC400]/30 text-white"
                >
                  {services.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* COMMENT */}
              <div className="relative">
                <label className="block text-white mb-2 font-[Inter]">
                  Опис замовлення
                </label>

                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Опишіть замовлення"
                  className="w-full p-3 pr-12 rounded-xl bg-[#0F0B00] border border-[#FFC400]/30 text-white"
                />

                <button
                  type="button"
                  onClick={() => setShowInfo(true)}
                  className="absolute top-10 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#FFC400]/10 text-[#FFC400]"
                >
                  <Info size={16} />
                </button>

                {errors.comment && (
                  <p className="text-red-400 text-xs mt-1">{errors.comment}</p>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#FFC400] text-[#1F2933] py-3 rounded-xl font-bold"
              >
                <Send size={18} />
                {loading ? "Відправка..." : "Надіслати заявку"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {showInfo && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowInfo(false)}
        >
          <div
            className="bg-[#0F0B00] border border-[#FFC400]/30 rounded-2xl p-6 max-w-md w-full text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[#FFC400] font-bold mb-3">
              Що писати в описі?
            </h3>

            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Що саме потрібно зробити</li>
              <li>• Розмір / кількість</li>
              <li>• Колір / стиль</li>
              <li>• Термін</li>
            </ul>

            <button
              onClick={() => setShowInfo(false)}
              className="mt-5 w-full bg-[#FFC400] text-black py-2 rounded-xl font-semibold"
            >
              Зрозуміло
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;

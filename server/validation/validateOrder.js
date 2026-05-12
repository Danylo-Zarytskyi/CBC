export const validateOrder = (data) => {
  const errors = {};

  // NAME
  const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/;

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Ім'я занадто коротке";
  } else if (!nameRegex.test(data.name.trim())) {
    errors.name = "Ім'я може містити тільки літери";
  }

  // PHONE
  const cleanedPhone = data.phone?.replace(/[^\d]/g, "");

  if (!cleanedPhone || cleanedPhone.length < 10) {
    errors.phone = "Некоректний номер телефону";
  }

  // SERVICE
  const allowedServices = [
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

  if (!allowedServices.includes(data.service)) {
    errors.service = "Невірний тип послуги";
  }

  // COMMENT
  if (!data.comment || data.comment.trim().length < 20) {
    errors.comment = "Опис має бути мінімум 20 символів";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

import Work from "../model/worksSchema.js";

export const seedWorks = async () => {
  await Work.deleteMany();

  await Work.insertMany([
    {
      image: "https://i.ibb.co/4ZWjfdNY/photo-2026-05-04-21-43-11.jpg",
      title: "Табличка офісна",
      desc: "Акрил, гравірування",
    },
    {
      image: "https://i.ibb.co/p7s4gny/photo-2026-05-04-21-47-42.jpg",
      title: "Банер рекламний",
      desc: "Широкоформатний друк",
    },
    {
      image: "https://i.ibb.co/bYG1BWX/photo-2026-05-04-21-43-11.jpg",
      title: "Сувенірна продукція",
      desc: "Горнятка, футболки",
    },
    {
      image: "https://i.ibb.co/CkdCBCW/photo-2026-05-05-19-13-05.jpg",
      title: "Візитки",
      desc: "Двосторонній друк",
    },
    {
      image: "https://i.ibb.co/fYGXHRB3/photo-2026-05-05-19-11-41.jpg",
      title: "Фотодрук",
      desc: "Фото різних форматів",
    },
    {
      image: "https://i.ibb.co/cKRMrQmt/photo-2026-05-05-19-14-00.jpg",
      title: "Документи",
      desc: "Ч/б та кольоровий друк",
    },
  ]);
};

// useScrollReveal.js
import { useEffect, useState } from "react";

export const useScrollReveal = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-reveal");

          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (id) => visibleItems.has(id);
};

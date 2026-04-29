import { ChevronDown } from "lucide-react";
import { useState } from "react";

const AccordionItem = ({ title, isOpen, onClick, children, defaultOpen = false }) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  
  const handleClick = () => {
    if (onClick) onClick();
    else setInternalOpen(!open);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-semibold text-[#1F2933] font-[Montserrat] tracking-tight">
          {title}
        </span>
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-[#FFC400]" : "text-[#FFC400]/60"
          }`}
          size={20}
          strokeWidth={2}
        />
      </button>

      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className={`px-5 pb-5 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
            <div className="text-[#4B5563] font-[Inter] text-sm leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
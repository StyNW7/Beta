import React from "react";
import { useMenuStore } from "../../store/menuStore";

const FloatingButton = () => {
  const openMenu = useMenuStore((state) => state.openMenu);
  const isOpen = useMenuStore((state) => state.isOpen);
  const closeMenu = useMenuStore((state) => state.closeMenu);

  return (
    <button
      onClick={isOpen ? closeMenu : openMenu}
      className={`
        fixed button-position z-50 w-16 h-16 rounded-full
        flex items-center justify-center
        bg-white/20 backdrop-blur-md
        border border-white/30
        text-black text-4xl font-light
        shadow-lg
        transition-all duration-300 ease-in-out
        hover:bg-white/30 hover:scale-105
        active:scale-95
        rotate-45
        ${isOpen ? "rotate-45" : ""}
      `}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      +
    </button>
  );
};

export default FloatingButton;

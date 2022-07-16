import { ChevronDoubleUpIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

function TopScroll() {
  const [visible, setVisible] = useState(false);
  const scrolled = document.documentElement.scrollTop;
  const toggleVisible = () => {
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisible);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <button
      className={`fixed bottom-2 right-6 z-[60] flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-rose-500 bg-opacity-80 shadow-md transition ease-in hover:bg-opacity-100 ${
        visible ? "inline" : "invisible"
      }`}
      onClick={scrollToTop}
      role="button"
      aria-label="Scroll to Top"
    >
      <ChevronDoubleUpIcon className="h-5 w-5 text-white" />
    </button>
  );
}

export default TopScroll;

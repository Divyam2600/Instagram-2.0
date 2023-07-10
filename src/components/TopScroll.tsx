import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import React from "react";

const TopScroll = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      className="fixed bottom-2 right-6 z-[60] h-10 w-10 animate-bounce rounded-full bg-rose-500 bg-opacity-80 text-white shadow-md transition duration-200 ease-in-out hover:bg-opacity-100 xs:bottom-16"
      onClick={scrollToTop}
      role="button"
      aria-label="Scroll to Top"
    >
      <ChevronDoubleUpIcon className="mx-auto h-6 w-6 stroke-2" />
    </button>
  );
};

export default TopScroll;

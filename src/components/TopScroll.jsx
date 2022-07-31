import { ChevronDoubleUpIcon } from '@heroicons/react/outline';
import React from 'react';

function TopScroll() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <button
      className="fixed bottom-2 right-6 z-[60] flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-rose-500 bg-opacity-80 shadow-md transition duration-200 ease-in-out hover:bg-opacity-100"
      onClick={scrollToTop}
      role="button"
      aria-label="Scroll to Top"
    >
      <ChevronDoubleUpIcon className="h-5 w-5 text-white" />
    </button>
  );
}

export default TopScroll;

import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header';
import SearchBarModal from '../components/Modals/SearchBarModal';

function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - Instagram 2.0';
  }, []);

  return (
    <div className="h-full bg-white">
      <SearchBarModal />
      <Header />
      <p className="m-10 mt-24 text-center text-5xl font-bold">Error 404!!!</p>
      <p className="m-8 text-center text-3xl font-bold">Sorry, this page isn't available.</p>
      <p className="mx-3 text-center text-lg font-semibold md:text-xl">
        The link you followed may be broken, or the page may have been removed.
      </p>
      <Link
        to={ROUTES.DASHBOARD}
        className="my-4 flex items-center justify-center text-lg text-blue-500 decoration-transparent"
      >
        Go Back To Instagram 2.0
      </Link>
    </div>
  );
}

export default NotFound;

import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import SearchBarModal from "../components/Modals/SearchBarModal";

function NotFound() {
  useEffect(() => {
    document.title = "Not Found - Instagram 2.0";
  }, []);

  return (
    <div className="h-full bg-white">
      <SearchBarModal />
      <Header />
      <p className="m-10 text-5xl text-center font-bold mt-24">Error 404!!!</p>
      <p className="m-8 text-3xl text-center font-bold">
        Sorry, this page isn't available.
      </p>
      <p className="text-center text-lg md:text-xl font-semibold mx-3">
        The link you followed may be broken, or the page may have been removed.
      </p>
      <Link
        to={ROUTES.DASHBOARD}
        className="justify-center items-center text-lg flex text-blue-500 decoration-transparent my-4"
      >
        Go Back To Instagram 2.0
      </Link>
    </div>
  );
}

export default NotFound;

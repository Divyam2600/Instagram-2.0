import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import Feed from "../components/Feed/Feed";
import PostModal from "../components/Modals/PostModal";
import LikesModal from "../components/Modals/LikesModal";
import CommentLikesModal from "../components/Modals/CommentLikesModal";
import TopScroll from "../components/TopScroll";

function Dashboard() {
  useEffect(() => {
    document.title = "Instagram 2.0 Clone";
  }, []);
  const { user } = useContext(UserContext);

  return (
    <div className="overflow-hidden h-full min-h-screen">
      <PostModal />
      <LikesModal />
      <CommentLikesModal />
      <TopScroll />
      <Header />
      {user ? (
        <div className="overflow-y-auto scrollbar-hide">
          <div className="mx-auto mt-16 grid h-full grid-cols-1 justify-between gap-4 xs:grid-cols-2 sm:max-w-xl md:max-w-2xl md:grid-cols-3 lg:max-w-[52rem] xl:max-w-4xl ">
            <section className="container col-span-2 inline-grid ">
              <Feed />
            </section>
            <section className="-ml-48 hidden md:col-span-1 md:inline-grid lg:-ml-32">
              <Sidebar />
            </section>
          </div>
        </div>
      ) : (
        <>
          <p className="m-10 mt-24 text-center text-5xl font-bold">
            Error 404!!!
          </p>
          <p className="m-8 text-center text-3xl font-bold">
            Sorry, this page isn't available.
          </p>
          <p className="mx-3 text-center text-lg font-semibold md:text-xl">
            It seems like you are trying to access the Dashboard. But
            unfortunately you don't seem to have logged in to an account.
          </p>
          <br />
          <p className="mx-3 text-center text-lg font-semibold md:text-xl">
            Please click the below button to head towards the Login page to
            access the Dashboard.
          </p>
          <Link to={ROUTES.LOGIN} className="flex items-center justify-center">
            <button className="my-3 w-44 rounded-md border bg-sky-500 py-2 text-center text-lg font-semibold text-white">
              Go To Login
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Dashboard;

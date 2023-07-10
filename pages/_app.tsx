import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { AuthProvider } from "../src/hooks/use-auth";
import TopScroll from "../src/components/TopScroll";
import Router, { useRouter } from "next/router";
import TopBarProgress from "react-topbar-progress-indicator";
import LikesModal from "../src/components/Modals/LikesModal";
import CommentLikesModal from "../src/components/Modals/CommentLikesModal";
import PostModal from "../src/components/Modals/PostModal";
import SearchBarModal from "../src/components/Modals/SearchBarModal";
import FollowersModal from "../src/components/Modals/FollowersModal";
import FollowingModal from "../src/components/Modals/FollowingModal";
import SendMediaModal from "../src/components/Modals/SendMediaModal";
import SendAudioModal from "../src/components/Modals/SendAudioModal";

import Navbar from "../src/components/Navbar";
import SendFileModal from "../src/components/Modals/SendFileModal";

TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);
TopBarProgress.config({
  barColors: {
    0: "#fcd34d",
    1: "#ef4444",
  },
  barThickness: 2.5,
  shadowBlur: 0,
});

const MyApp = ({ Component, ...pageProps }: AppProps) => {
  const [progress, setProgress] = useState(false);
  Router.events.on("routeChangeStart", () => setProgress(true));
  Router.events.on("routeChangeComplete", () => setProgress(false));
  Router.events.on("routeChangeError", () => setProgress(false));
  const router = useRouter();
  return (
    <AuthProvider>
      <RecoilRoot>
        {progress && <TopBarProgress />}
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
        <LikesModal />
        <CommentLikesModal />
        <PostModal />
        <SearchBarModal />
        <FollowersModal />
        <FollowingModal />
        <SendMediaModal />
        <SendAudioModal />
        <SendFileModal />
        {!(
          router.pathname === "/login" ||
          router.pathname === "/signup" ||
          router.pathname === "/direct" ||
          router.pathname === "/direct/[messageId]"
        ) && <TopScroll />}
      </RecoilRoot>
    </AuthProvider>
  );
};

export default MyApp;

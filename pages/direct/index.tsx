import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React from "react";
import MessageHomePage from "../../src/components/Messages/MessageHomePage";

const HomePage = () => (
  <MessageHomePage isHomePage={true}>
    <div className="flex flex-col items-center justify-center space-y-4 px-4 text-center text-2xl">
      <h1 className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-black">
        <PaperAirplaneIcon className="-mt-1 ml-3 h-20 w-20 rotate-[-20deg] stroke-[0.8]" />
      </h1>
      <p>No messages to display...</p>
      <button className="submit w-fit px-14">Start a Chat</button>
    </div>
  </MessageHomePage>
);

export default HomePage;

import React, { ReactNode } from "react";
import MessageList from "./MessageList";

type PageProps = {
  isHomePage: boolean;
  children: ReactNode;
};

const MessageHomePage = ({ isHomePage, children }: PageProps) => {
  return (
    <main className="ml-20 w-full p-2 scrollbar-hide sm:px-4 lg:pl-28 xs:my-16 xs:ml-0">
      <div className="mx-auto grid  min-h-full min-w-fit max-w-5xl grid-cols-4 border bg-white sm:grid-cols-7">
        <div
          className={`col-span-full divide-y sm:col-span-3 sm:border-r xs:max-h-[76vh] ${
            !isHomePage && "hidden sm:inline-grid"
          }`}
        >
          <MessageList />
        </div>
        <div
          className={`col-span-4 flex flex-col xs:max-h-[75vh] ${
            isHomePage && "hidden sm:inline-grid"
          }`}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default MessageHomePage;

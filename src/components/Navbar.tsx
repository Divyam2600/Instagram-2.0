import React, { ReactNode } from "react";
import BottomBar from "./Navbar/BottomBar";
import SideBar from "./Navbar/Sidebar";
import TopBar from "./Navbar/TopBar";
import useUser from "../hooks/use-user";

type Props = {
  children: ReactNode;
};

const Navbar = ({ children }: Props) => {
  const user = useUser();
  return (
    <div className="flex xs:flex-col ">
      <TopBar />
      <SideBar username={user?.username} imageUrl={user?.imageUrl} />
      {children}
      <BottomBar username={user?.username} imageUrl={user?.imageUrl} />
    </div>
  );
};

export default Navbar;

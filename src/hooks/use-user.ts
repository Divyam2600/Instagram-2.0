import { useState, useEffect } from "react";
import { User } from "../../typings";
import { getUserByUserId } from "../services/firebase";
import useAuth from "./use-auth";

const useUser = () => {
  const [activeUser, setActiveUser] = useState<User>();
  const { user } = useAuth();
  useEffect(() => {
    const getUserObjectById = async (id: string) => {
      const response = await getUserByUserId(id);
      setActiveUser(response);
    };
    user?.uid && getUserObjectById(user.uid);
  }, [user]);
  return activeUser;
};

export default useUser;

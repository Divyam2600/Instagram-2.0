import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { User } from "../../../typings";
import { getUserByUserId } from "../../services/firebase";

type Props = {
  caption?: string;
  userId?: string;
};

const Captions = ({ caption, userId }: Props) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getUser();
  }, [userId]);

  const getUser = async () => {
    const user: User = await getUserByUserId(userId);
    setUser(user);
  };
  return (
    <div className="mb-3 px-3">
      <span
        className="cursor-pointer pr-2 font-semibold text-gray-800"
        onClick={() => router.push(`/profile/${user?.username}`)}
      >
        {user?.username}
      </span>
      {show ? caption : caption?.substring(0, 120)}
      <button
        onClick={() => setShow(!show)}
        className="tracking-wide text-gray-400"
      >
        {!show && caption?.length! > 120 && "...more"}
      </button>
    </div>
  );
};

export default Captions;

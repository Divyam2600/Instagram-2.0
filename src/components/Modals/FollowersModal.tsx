import React, { useEffect, useState } from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { followersModalState } from "../../atoms/modalAtom";
import { User } from "../../../typings";
import { userIdState } from "../../atoms/idAtom";
import { getFollowers } from "../../services/firebase";

import Modal from "../Modal";
import DisplayUsers from "./DisplayUsers";

const FollowersModal = () => {
  const [open, setOpen] = useRecoilState(followersModalState);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useRecoilState(userIdState);
  useEffect(() => {
    if (open) {
      const getUsers = async () => {
        const result = await getFollowers(userId);
        result.map((res) => {
          setUsers((users) => [...users, res]);
        });
      };
      userId !== "" && getUsers();
    } else {
      setUserId(""), setUsers([]);
    }
  }, [userId, open]);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      icon={{
        icon: <UserGroupIcon className="h-8 w-8" />,
        name: "Followers",
      }}
    >
      <DisplayUsers users={users} setOpen={setOpen} />
    </Modal>
  );
};

export default FollowersModal;

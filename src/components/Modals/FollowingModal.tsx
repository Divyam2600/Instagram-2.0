import React, { useEffect, useState } from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { followingModalState } from "../../atoms/modalAtom";
import { User } from "../../../typings";
import { userIdState } from "../../atoms/idAtom";
import { getFollowing } from "../../services/firebase";

import Modal from "../Modal";
import DisplayUsers from "./DisplayUsers";

const FollowingModal = () => {
  const [open, setOpen] = useRecoilState(followingModalState);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useRecoilState(userIdState);
  useEffect(() => {
    if (open) {
      const getUsers = async () => {
        const result = await getFollowing(userId);
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
        name: "Following",
      }}
    >
      <DisplayUsers users={users} setOpen={setOpen} />
    </Modal>
  );
};

export default FollowingModal;

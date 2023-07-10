import React, { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { likesModalState } from "../../atoms/modalAtom";
import { User } from "../../../typings";
import { postIdState } from "../../atoms/idAtom";
import { getLikedUsers } from "../../services/firebase";

import Modal from "../Modal";
import DisplayUsers from "./DisplayUsers";

const LikesModal = () => {
  const [open, setOpen] = useRecoilState(likesModalState);
  const [users, setUsers] = useState<User[]>([]);
  const [postId, setPostId] = useRecoilState(postIdState);
  useEffect(() => {
    if (open) {
      const getUsers = async () => {
        const result = await getLikedUsers(postId);
        result.map((res) => {
          setUsers((users) => [...users, res]);
        });
      };
      postId !== "" && getUsers();
    } else {
      setPostId(""), setUsers([]);
    }
  }, [postId, open]);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      icon={{
        icon: <HeartIcon className="h-8 w-8" />,
        name: "Likes",
      }}
    >
      <DisplayUsers users={users} setOpen={setOpen} />
    </Modal>
  );
};

export default LikesModal;

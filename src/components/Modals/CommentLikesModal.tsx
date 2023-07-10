import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { User } from "../../../typings";
import { commentIdState, postIdState } from "../../atoms/idAtom";
import { commentLikesModalState } from "../../atoms/modalAtom";
import { getCommentLikedUsers } from "../../services/firebase";
import Modal from "../Modal";
import DisplayUsers from "./DisplayUsers";

const CommentLikesModal = () => {
  const [open, setOpen] = useRecoilState(commentLikesModalState);
  const [users, setUsers] = useState<User[]>([]);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [commentId, setCommentId] = useRecoilState(commentIdState);
  useEffect(() => {
    if (open) {
      const getUsers = async () => {
        const result = await getCommentLikedUsers(postId, commentId);
        result.map((res) => {
          setUsers((users) => [...users, res]);
        });
      };
      commentId !== "" && postId !== "" && getUsers();
    } else {
      setCommentId("");
      setPostId("");
      setUsers([]);
    }
  }, [postId, open, commentId]);
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

export default CommentLikesModal;

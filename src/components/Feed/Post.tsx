import React, { useEffect, useRef, useState } from "react";
import { Comment, Post } from "../../../typings";
import useUser from "../../hooks/use-user";
import Buttons from "../Post/Buttons";
import Captions from "../Post/Captions";
import Header from "../Post/Header";
import RenderFiles from "../Post/Image";
import {
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { displayComment, isPostSaved } from "../../services/firebase";
import { db } from "../../lib/firebase";
import RenderComments from "../Post/Comment";
import CommentInput from "../Post/CommentInput";
import ReactTimeAgo from "react-time-ago";

const RenderPost = ({ post }: { post: Post }) => {
  const commentInput = useRef<HTMLTextAreaElement>(null);
  const handleFocus = () => commentInput.current?.focus();
  const [toggledLiked, setToggledLiked] = useState<boolean | undefined>();
  const [toggleSaved, setToggleSaved] = useState<boolean | undefined>();
  const [likes, setLikes] = useState<number | undefined>(0);
  const activeUser = useUser();
  const userLiked =
    post.likes?.findIndex((id) => id === activeUser?.userId) !== -1;
  useEffect(() => {
    setLikes(post.likes?.length);
    setToggledLiked(userLiked);
  }, [post?.likes, userLiked]);
  useEffect(() => {
    const checkIfPostIsSaved = async () => {
      const result = await isPostSaved(post.id, activeUser?.id);
      setToggleSaved(result);
    };
    activeUser?.id && checkIfPostIsSaved();
  }, [activeUser?.id]);

  const [comments, setComments] = useState<QueryDocumentSnapshot<Comment>[]>(
    []
  );
  useEffect(() => {
    const showComments = async () => {
      onSnapshot(displayComment(post.id), (snapshot: QuerySnapshot<Comment>) =>
        setComments(snapshot.docs)
      );
    };
    post.id && showComments();
  }, [db, post.id]);

  return (
    <div className="divide-y rounded-md border bg-white shadow-sm">
      <Header
        postId={post.id}
        userId={post.userId}
        activeUserUsername={activeUser?.username}
      />
      <RenderFiles
        files={post.files}
        caption={post.caption}
        postId={post.id}
        toggledLiked={toggledLiked}
        setToggledLiked={setToggledLiked}
        numberOfLikes={likes}
        setLikes={setLikes}
        activeUserUserId={activeUser?.userId}
      />
      <div>
        <Buttons
          postId={post.id}
          handleFocus={handleFocus}
          toggledLiked={toggledLiked}
          setToggledLiked={setToggledLiked}
          toggleSaved={toggleSaved}
          setToggleSaved={setToggleSaved}
          likes={likes}
          setLikes={setLikes}
          activeUserUserId={activeUser?.userId}
          activeUserDocId={activeUser?.id}
        />
        {post.caption?.length! > 0 && (
          <Captions caption={post.caption} userId={post.userId} />
        )}
      </div>
      {comments.length > 0 && (
        <div className="max-h-32 space-y-2 overflow-y-scroll border-b p-3 scrollbar-thin scrollbar-thumb-gray-400">
          {comments.map((comment) => (
            <RenderComments
              key={comment.id}
              postId={post.id}
              id={comment.id}
              activeUserUserId={activeUser?.userId}
              userId={comment.data().userId}
              comment={comment.data().comment}
              postedAt={comment.data()?.postedAt}
              likes={comment.data().likes}
            />
          ))}
        </div>
      )}
      <CommentInput
        commentInput={commentInput}
        postId={post.id}
        activeUserUserId={activeUser?.userId}
      />
      {post.postedAt && (
        <div className="p-3">
          <ReactTimeAgo
            date={post.postedAt.toDate()}
            locale="en-US"
            timeStyle="round"
            className="text-sm capitalize text-gray-400"
          />
        </div>
      )}
    </div>
  );
};

export default RenderPost;

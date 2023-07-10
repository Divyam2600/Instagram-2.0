import React, { useEffect, useReducer, useRef, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import { Comment, Post, User } from "../../typings";
import {
  displayComment,
  getPostById,
  getPostsByUserId,
  getUserByUserId,
  isPostSaved,
} from "../../src/services/firebase";
import Posts from "../../src/components/UserProfile/Posts";
import Header from "../../src/components/Post/Header";
import useUser from "../../src/hooks/use-user";
import RenderFiles from "../../src/components/Post/Image";
import Buttons from "../../src/components/Post/Buttons";
import CommentInput from "../../src/components/Post/CommentInput";
import ReactTimeAgo from "react-time-ago";
import {
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../src/lib/firebase";
import RenderComments from "../../src/components/Post/Comment";
import Captions from "../../src/components/Post/Captions";

type Props = {
  query: {
    postId?: string;
  };
} & NextRouter;

const Post = () => {
  const {
    query: { postId },
    prefetch,
    pathname,
  }: Props = useRouter();
  const activeUser = useUser();
  const [post, setPost] = useState<Post>();
  const [usersOtherPosts, setUsersOtherPosts] = useState<Post[]>();
  const [user, setUser] = useState<User>();
  const commentInput = useRef<HTMLTextAreaElement>(null);
  const handleFocus = () => commentInput.current?.focus();
  const [toggledLiked, setToggledLiked] = useState<boolean | undefined>();
  const [likes, setLikes] = useState<number | undefined>(0);
  const router = useRouter();
  useEffect(() => {
    const checkPostExists = async () => {
      const post: Post = await getPostById(postId);
      post && setPost(post);
    };
    checkPostExists();
  }, [postId, pathname]);
  useEffect(() => {
    prefetch(`/post/${postId}`);
  }, []);
  useEffect(() => {
    const getOtherPosts = async () => {
      const posts = await getPostsByUserId(post?.userId);
      posts && setUsersOtherPosts(posts);
    };
    post?.userId && getOtherPosts();
  }, [post, post?.userId]);
  useEffect(() => {
    const checkUserExists = async () => {
      const user: User = await getUserByUserId(post?.userId);
      user && setUser(user);
    };
    post?.userId && checkUserExists();
  }, [post?.userId]);
  const userLiked =
    post?.likes?.findIndex((id) => id === activeUser?.userId) !== -1;
  useEffect(() => {
    setLikes(post?.likes?.length);
    setToggledLiked(userLiked);
  }, [post?.likes, userLiked]);
  const [comments, setComments] = useState<QueryDocumentSnapshot<Comment>[]>(
    []
  );
  useEffect(() => {
    const showComments = async () => {
      onSnapshot(displayComment(post?.id), (snapshot: QuerySnapshot<Comment>) =>
        setComments(snapshot.docs)
      );
    };
    post?.id && showComments();
  }, [db, post?.id]);
  const [toggleSaved, setToggleSaved] = useState<boolean | undefined>();
  useEffect(() => {
    const checkIfPostIsSaved = async () => {
      const result = await isPostSaved(post?.id, activeUser?.id);
      setToggleSaved(result);
    };
    post?.id && activeUser?.id && checkIfPostIsSaved();
  }, [post?.id, activeUser?.id]);
  return (
    <main className="ml-20 w-full xs:my-16 xs:ml-0">
      <div className="mx-auto min-w-fit max-w-3xl space-y-4 divide-y p-2 sm:px-4 lg:px-28">
        {post && activeUser && (
          <div className="grid grid-cols-6 divide-x overflow-hidden rounded-md border bg-white shadow-sm md:grid-cols-11 ">
            <div className="col-span-6 divide-y">
              <Header
                activeUserUsername={activeUser.username}
                postId={postId}
                userId={post.userId}
              />
              <RenderFiles
                files={post.files}
                caption={post.caption}
                postId={post.id}
                toggledLiked={toggledLiked}
                setToggledLiked={setToggledLiked}
                numberOfLikes={likes}
                setLikes={setLikes}
                activeUserUserId={activeUser.userId}
              />
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
            </div>
            <div className="relative col-span-full flex flex-col md:col-span-5">
              {post.caption?.length! > 0 && (
                <Captions caption={post.caption} userId={post.userId} />
              )}
              <div className="flex-1">
                {comments.length > 0 && (
                  <div className="max-h-40 space-y-2 overflow-y-scroll p-3 scrollbar-thin scrollbar-thumb-gray-400 md:max-h-72 lg:max-h-[22rem] xl:max-h-96">
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
              </div>
              <div className="w-full border-t">
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
            </div>
          </div>
        )}
        <div className="space-y-4 py-4 font-semibold text-gray-400">
          <h1>
            More posts from&nbsp;
            <span
              className="cursor-pointer text-gray-900"
              onClick={() => router.push(`/profile/${user?.username}`)}
            >
              {user?.username}
            </span>
          </h1>
          <Posts
            posts={usersOtherPosts?.filter(
              (otherPost) => otherPost.id !== post?.id
            )}
          />
        </div>
      </div>
    </main>
  );
};

export default Post;

import React from "react";
import { Post, User } from "../../../typings";
import usePosts from "../../hooks/use-posts";
import { FeedLoader } from "../Loader";
import RenderPost from "./Post";
import Suggestions from "./SideSection/Suggestions";
import Stories from "./Stories";

const Feed = ({ id, userId, following }: User) => {
  const posts: Post[] | undefined = usePosts(userId!);
  return !posts ? (
    <FeedLoader />
  ) : posts.length > 0 ? (
    <section className="col-span-2 mx-auto w-full max-w-md space-y-4 lg:col-span-3 xxs:max-w-none">
      <Stories userId={userId} following={following} />
      {posts
        .filter(
          (post, i) => i === posts.findIndex((item) => item.id === post.id)
        )
        .map((post: Post) => (
          <RenderPost key={post.id} post={post} />
        ))}
    </section>
  ) : (
    <div className="col-span-2 mx-auto w-full max-w-md space-y-4 text-center md:col-span-3 xxs:max-w-none">
      <h1 className="text-3xl font-bold">Hey There !!!</h1>
      <h2 className="text-lg font-semibold text-gray-600">
        Please follow some accounts from the suggestions list to view their
        posts.
      </h2>
      <br />
      <div className="lg:hidden">
        <Suggestions
          userId={userId}
          following={following}
          activeUserDocId={id}
        />
      </div>
    </div>
  );
};

export default Feed;

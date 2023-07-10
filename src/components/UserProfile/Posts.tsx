import React from "react";
import { Post } from "../../../typings";
import { UserProfilePostsLoader } from "../Loader";
import RenderPost from "./Post";

const Posts = ({ posts }: { posts?: Post[] }) => {
  return posts ? (
    posts.length > 0 ? (
      <div className="grid grid-cols-3 gap-2">
        {posts.map(({ id, likes, userId, files }) => (
          <RenderPost
            files={files}
            postId={id}
            likes={likes}
            key={id}
            userId={userId}
          />
        ))}
      </div>
    ) : (
      <div className="my-4 text-center text-3xl">No Posts Yet...</div>
    )
  ) : (
    <UserProfilePostsLoader />
  );
};

export default Posts;

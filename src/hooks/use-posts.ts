import { useEffect, useState } from "react";
import { Post, User } from "../../typings";
import {
  activeUserLatestPost,
  getPosts,
  getUserByUserId,
} from "../services/firebase";
import useAuth from "./use-auth";

const usePosts = (userId: string) => {
  const [posts, setPosts] = useState<Post[] | undefined>();
  const { user } = useAuth();

  const getTimelinePosts = async () => {
    const { following }: User = await getUserByUserId(user?.uid);
    let followedUserPosts: Post[] = [];
    if (following?.length! > 0) {
      followedUserPosts = await getPosts(following!);
    }
    followedUserPosts.sort((a: Post, b: Post) => +b.postedAt! - +a.postedAt!);
    setPosts(followedUserPosts);
    if (userId) {
      const activeUserLastPost = await activeUserLatestPost(userId);
      setPosts((posts) =>
        activeUserLastPost ? [activeUserLastPost, ...posts!] : posts
      );
    }
  };

  useEffect(() => {
    user && getTimelinePosts();
  }, [user?.uid, userId]);
  return posts;
};

export default usePosts;

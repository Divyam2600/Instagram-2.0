import React, { Fragment, useEffect, useReducer, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import { PostsType, User, UserProfileProps } from "../../typings";
import {
  getPostsByUserId,
  getUserByUsername,
  savedCollection,
} from "../../src/services/firebase";
import Header from "../../src/components/UserProfile/Header";
import Posts from "../../src/components/UserProfile/Posts";
import {
  UserProfileHeaderLoader,
  UserProfilePostsLoader,
} from "../../src/components/Loader";
import useUser from "../../src/hooks/use-user";

type Props = {
  query: {
    username?: string;
  };
} & NextRouter;

const Profile = () => {
  const {
    query: { username },
    prefetch,
    pathname,
  }: Props = useRouter();
  const [user, setUser] = useState<User>();
  const activeUser = useUser();
  const initialState: UserProfileProps = {
    profile: {},
    postsCollection: [],
    savedPostsCollection: [],
    followerCount: 0,
    followingCount: 0,
  };
  const reducer = (state: UserProfileProps, newState: UserProfileProps) => ({
    ...state,
    ...newState,
  });
  useEffect(() => {
    const checkUserExists = async () => {
      const user: User = await getUserByUsername(username);
      user && setUser(user);
    };
    checkUserExists();
  }, [username, pathname]);
  useEffect(() => {
    prefetch(`/profile/${username}`);
  }, []);
  useEffect(() => {
    const getProfileInfoAndPosts = async () => {
      const posts = await getPostsByUserId(user?.userId);
      const savedPosts = await savedCollection(activeUser?.id);
      dispatch({
        profile: user,
        postsCollection: posts,
        savedPostsCollection: savedPosts,
        followerCount: user?.followers!.length,
        followingCount: user?.following!.length,
      });
    };
    user && activeUser && getProfileInfoAndPosts();
  }, [user, user?.username]);

  const [
    {
      profile,
      postsCollection,
      savedPostsCollection,
      followerCount,
      followingCount,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [show, setShow] = useState<PostsType>("posts");
  return (
      <main className="ml-20 w-full xs:my-16 xs:ml-0">
        <div className="mx-auto min-w-fit space-y-2 p-2 md:max-w-2xl lg:max-w-[45rem] xl:max-w-3xl">
          {user ? (
            <Fragment>
              <Header
                postsCount={postsCollection ? postsCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                followingCount={followingCount}
                setFollowerCount={dispatch}
                show={show}
                setShow={setShow}
              />
              <Posts
                posts={
                  show === "posts"
                    ? postsCollection
                    : show === "saved"
                    ? savedPostsCollection
                    : []
                }
              />
            </Fragment>
          ) : (
            <Fragment>
              <UserProfileHeaderLoader />
              <UserProfilePostsLoader />
            </Fragment>
          )}
        </div>
      </main>
  );
};

export default Profile;

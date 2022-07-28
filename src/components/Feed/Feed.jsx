import React from 'react';
import usePhotos from '../../hooks/use-photos';
import Suggestions from '../Sidebar/Suggestions';
import useUser from '../../hooks/use-user';
import Post from './Post';
import Stories from './Stories';
import Loader from './Loader';

function Feed() {
  const {
    user: { id, userId, following }
  } = useUser();
  const { photos } = usePhotos({ userId });
  return !photos ? (
    <Loader />
  ) : photos?.length > 0 ? (
    <>
      <Stories activeUserId={userId} following={following} />
      {photos.map((content) => (
        <div className="" key={content.id}>
          <Post key={content.id} content={content} />
        </div>
      ))}
    </>
  ) : (
    <>
      <div className="my-4 flex h-[25vh] flex-col items-center justify-center space-y-4 text-center ">
        <p className="text-3xl font-bold">Hey There !!!</p>
        <p className="text-lg font-semibold text-gray-600">
          Please follow some accounts from the suggestions list to view their posts.
        </p>
      </div>
      <div className="mr-4 -mt-4 md:hidden">
        <Suggestions userId={userId} following={following} loggedInUserDocId={id} />
      </div>
    </>
  );
}

export default Feed;

import { PlusIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserByUserId } from '../../services/firebase';

function Stories({ activeUserId, following }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      following.map(async (userId) => {
        //to fetch the user's data whom the user is Following
        const otherUsers = await getUserByUserId(userId);
        setUsers((users) => [...users, otherUsers[0]]);
      });
      const activeUser = await getUserByUserId(activeUserId);
      setUsers((users) => [activeUser[0], ...users]);
    };
    // to allow rendering of userlist only once when user array length is less than following length
    if (users.length < following.length) {
      getUsers();
    }
  }, [activeUserId, following]);

  return (
    following && (
      <div className="container mt-5 overflow-hidden rounded-md border  bg-white shadow-sm">
        <div className="flex h-full w-full space-x-2 overflow-y-scroll p-2 scrollbar-hide">
          {users.map((content) => (
            <div
              className="relative  flex h-full max-w-full flex-col items-center justify-center text-center"
              key={content.id}
            >
              <img
                src={content.image}
                alt={content.username}
                className="aspect-square h-16 w-16 cursor-pointer rounded-full border-2 border-solid border-transparent object-cover p-[2px] border-gradient-t-insta-gray-50"
              />
              {content?.userId === activeUserId && (
                <span className="absolute top-[50%] -right-1 rounded-full border-2 border-white bg-white">
                  <PlusIcon className="h-5 rounded-full bg-blue-500 bg-opacity-80 p-[2px] text-white shadow-md  " />
                </span>
              )}
              <Link
                to={`/profile/${content.username}`}
                className="text-center text-xs text-gray-500"
              >
                <p className="w-[70px] truncate">{content.username}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Stories;

Stories.propTypes = {
  activeUserId: PropTypes.string,
  following: PropTypes.array
};

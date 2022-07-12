import { PlusCircleIcon, PlusIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserByUserId } from "../../services/firebase";

function Stories({ activeUserId, following }) {
  const [users, setUsers] = useState([]);
  if (following) {
    useEffect(() => {
      const getUsers = async () => {
        following.map(async (userId) => {
          //to fetch the user's data whom the user is Following
          const otherUsers = await getUserByUserId(userId);
          otherUsers.map((res) => {
            setUsers((users) => [...users, res]);
          });
        });
        const activeUser = await getUserByUserId(activeUserId);
        setUsers((users) => [activeUser[0], ...users]);
      };
      // to show the list of users whom the user is Following if his userId is present
      if (activeUserId) {
        getUsers();
      }
    }, [activeUserId]);
  }

  return following && (
    <div className="container bg-white mt-5 border rounded-md  shadow-sm overflow-hidden">
      <div className="flex space-x-2 overflow-y-scroll scrollbar-hide p-2 w-full h-full">
        {users.map((content) => (
          <div
            className="flex  flex-col justify-center text-center items-center max-w-full relative h-full"
            key={content.id}
          >
            <img
              src={content.image}
              alt={content.username}
              className="rounded-full h-16 w-16 object-cover border-gradient-t-insta-gray-50 border-solid border-2 border-transparent p-[2px] cursor-pointer"
            />
            {content?.userId === activeUserId && (
              <span className="absolute top-[50%] -right-1 border-white rounded-full border-2 bg-white">
                <PlusIcon className="h-5 bg-blue-500 bg-opacity-80 rounded-full p-[2px] text-white shadow-md  " />
              </span>
            )}
            <Link
              to={`/profile/${content.username}`}
              className="text-xs text-center text-gray-500"
            >
              <p className="truncate w-[70px]">{content.username}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stories;

Stories.propTypes = {
  activeUserId: PropTypes.string,
  following: PropTypes.array,
};

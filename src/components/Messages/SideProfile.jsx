import { getFirestore, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firebaseApp } from '../../lib/firebase';
import { getLastMessage } from '../../services/firebase';
import PropTypes from 'prop-types';

function SideProfile({ open, username, image, activeUserId, followingUserId }) {
  const [lastMessage, setLastMessage] = useState();
  const db = getFirestore(firebaseApp);
  useEffect(() => {
    async function showLastMessage() {
      onSnapshot(getLastMessage(activeUserId), (snapshot) => {
        snapshot.docs?.map((res) => {
          if (res?.data()?.users.includes(followingUserId)) {
            setLastMessage(res.data().lastMessage);
          }
        });
      });
    }
    showLastMessage();
  }, [db, activeUserId, followingUserId]);
  return (
    <>
      <img
        src={image}
        alt={username}
        className="aspect-square h-12 w-12 cursor-pointer rounded-full object-cover"
      />
      <div
        className={`px-2 py-1 text-sm font-semibold duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="line-clamp-1">{username}</p>
        <p className=" text-[10px] leading-4 text-gray-500 line-clamp-1">
          {lastMessage && lastMessage}
        </p>
      </div>
    </>
  );
}

export default SideProfile;

SideProfile.propType = {
  open: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  activeUserId: PropTypes.string.isRequired,
  followingUserId: PropTypes.string.isRequired
};

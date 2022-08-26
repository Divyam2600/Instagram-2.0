import { InformationCircleIcon, PhoneIcon, VideoCameraIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago';
import { getFirestore, onSnapshot } from 'firebase/firestore';
import { firebaseApp } from '../../lib/firebase';
import { getUserLastSeen } from '../../services/firebase';

export function Header({ username, image }) {
  const [lastSeen, setLastSeen] = useState(null);
  const db = getFirestore(firebaseApp);
  useEffect(() => {
    async function showlastSeen() {
      onSnapshot(getUserLastSeen(username), (snapshot) => {
        setLastSeen(snapshot.docs[0].data().lastSeen);
      });
    }
    showlastSeen();
  }, [db, username]);
  return (
    <div className="flex w-full items-center space-x-1 border-b  p-2 shadow-sm sm:px-4">
      <img
        src={image}
        alt={username}
        className="aspect-square h-12 w-12 rounded-full object-cover sm:h-16 sm:w-16"
      />
      <div className="flex-1 items-center pl-2 font-semibold">
        <Link to={`/profile/${username}`}>{username}</Link>
        <p className="text-[9px] capitalize  text-gray-400 sm:text-xs">
          Last Active:
          {lastSeen && (
            <ReactTimeAgo
              date={lastSeen?.toDate()}
              locale="en-US"
              timeStyle="round-minute"
              className="pl-1 "
            />
          )}
        </p>
      </div>
      <PhoneIcon className="navButton mb-[2px] h-6 w-6 sm:mb-1 sm:h-7 sm:w-7" />
      <VideoCameraIcon className="navButton" />
      <InformationCircleIcon className="navButton" />
    </div>
  );
}

Header.propType = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

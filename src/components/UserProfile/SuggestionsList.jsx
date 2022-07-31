import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { getSuggestedProfiles } from '../../services/firebase';
import { useRecoilState } from 'recoil';
import { suggestionsListState } from '../../atoms/modalAtom';
import SuggestedProfile from './SuggestedProfile';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

function SuggestionsList({ userId, following, loggedInUserDocId }) {
  const [open, setOpen] = useRecoilState(suggestionsListState);
  const [profiles, setProfiles] = useState(null);
  const suggestions = useRef(null);
  let position = 0;
  function scroll(offset) {
    position = offset;
    suggestions.current.scrollLeft += offset;
  }

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    // if it is an active user then the suggestions will be displayed
    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);
  return (
    profiles &&
    open &&
    profiles.length > 0 && (
      <div className="relative -mx-7 mb-2 min-w-full max-w-none space-y-2 overflow-hidden rounded-md border border-gray-200 bg-white py-4 md:-mx-0">
        <button
          className="z-1 absolute left-2 top-[50%] flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 bg-opacity-40 px-1 py-2 text-white shadow-md"
          onClick={() => scroll(-500)}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          className="z-1 absolute right-2 top-[47.3%] flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 bg-opacity-40 px-1 py-2 text-white shadow-md"
          onClick={() => scroll(500)}
        >
          <ChevronRightIcon className="h-5 w-5 " />
        </button>
        <p className="px-6 text-lg text-gray-500">Suggested Accounts For You</p>
        <div
          className=" flex space-x-2 overflow-y-scroll scroll-smooth px-6 transition-all delay-200 ease-in-out scrollbar-hide"
          ref={suggestions}
        >
          {profiles.map((profile) => (
            <SuggestedProfile
              key={profile.id}
              profileDocId={profile.id}
              username={profile.username}
              fullName={profile.fullName}
              userImage={profile.image}
              profileId={profile.userId}
              loggedInUserId={userId}
              loggedInUserDocId={loggedInUserDocId}
            />
          ))}
        </div>
      </div>
    )
  );
}

export default SuggestionsList;

SuggestionsList.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
};

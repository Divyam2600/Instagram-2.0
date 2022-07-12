import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { getSuggestedProfiles } from "../../services/firebase";
import { useRecoilState } from "recoil";
import { suggestionsListState } from "../../atoms/modalAtom";
import SuggestedProfile from "./SuggestedProfile";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

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
  }, [userId]);
  return (
    profiles &&
    open &&
    profiles.length > 0 && (
      <div className="bg-white min-w-full max-w-none border border-gray-200 rounded-md py-4 -mx-7 md:-mx-0 overflow-hidden space-y-2 mb-2 relative">
        <button
          className="left-2 bg-gray-500 bg-opacity-40 text-white px-1 py-2 z-1 h-8 shadow-md rounded-full w-8 flex items-center justify-center absolute top-[50%]"
          onClick={() => scroll(-500)}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          className="right-2 bg-gray-500 bg-opacity-40 text-white px-1 py-2 z-1 h-8 shadow-md rounded-full w-8 flex items-center justify-center absolute top-[47.3%]"
          onClick={() => scroll(500)}
        >
          <ChevronRightIcon className="h-5 w-5 " />
        </button>
        <p className="text-gray-500 text-lg px-6">Suggested Accounts For You</p>
        <div
          className="flex space-x-2 overflow-y-scroll scrollbar-hide px-6 scroll-smooth scroll- transition-all ease-in delay-200"
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
  loggedInUserDocId: PropTypes.string,
};

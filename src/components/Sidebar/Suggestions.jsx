import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './SuggestedProfile';
import { SuggestionsLoader } from './Loader';

function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    // if it is an active user then the suggestions will be displayed
    if (userId) {
      suggestedProfiles();
    }
  }, [following, userId]);

  return !profiles ? (
    <SuggestionsLoader />
  ) : profiles.length > 0 ? (
    <div className="mt-4 ml-5">
      <div className="mb-5 flex flex-col justify-between text-sm">
        <h3 className="font-semibold text-gray-500">Suggestions For You</h3>
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.id}
            profileDocId={profile.id}
            username={profile.username}
            userImage={profile.image}
            profileId={profile.userId}
            loggedInUserId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
}

export default Suggestions;

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
};

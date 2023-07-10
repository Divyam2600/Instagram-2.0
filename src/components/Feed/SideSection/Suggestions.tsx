import React, { useEffect, useState } from "react";
import { User } from "../../../../typings";
import { getSuggestedProfiles } from "../../../services/firebase";
import { SuggestionsLoader } from "../../Loader";
import SuggestedProfile from "./SuggestedProfile";

type Props = {
  userId?: string;
  following?: string[];
  activeUserDocId?: string;
};

const Suggestions = ({
  userId: activeUserId,
  following,
  activeUserDocId,
}: Props) => {
  const [profiles, setProfiles] = useState<User[]>();

  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(activeUserId, following);
      setProfiles(response);
    };
    activeUserId && suggestedProfiles();
  }, [activeUserId]);
  return !profiles ? (
    <SuggestionsLoader />
  ) : profiles.length > 0 ? (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-500">
        Suggestions For You
      </h3>
      {profiles
        .filter(
          (profile, i) =>
            i === profiles.findIndex((user) => user.id === profile.id)
        )
        .map((profile) => (
          <SuggestedProfile
            key={profile.id}
            profileDocId={profile.id}
            username={profile.username}
            userImage={profile.imageUrl}
            profileId={profile.userId}
            activeUserId={activeUserId}
            activeUserDocId={activeUserDocId}
          />
        ))}
    </div>
  ) : null;
};

export default Suggestions;

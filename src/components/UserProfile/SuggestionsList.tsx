import React, { useEffect, useRef, useState } from "react";
import { getSuggestedProfiles } from "../../services/firebase";
import { useRecoilValue } from "recoil";
import { suggestionsListState } from "../../atoms/modalAtom";
import SuggestedProfile from "./SuggestedProfile";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { User } from "../../../typings";

type Props = {
  activeUserDocId?: string;
} & User;

const SuggestionsList = ({
  userId: activeUserId,
  following,
  activeUserDocId,
}: Props) => {
  const open = useRecoilValue(suggestionsListState);
  const [profiles, setProfiles] = useState<User[]>();
  const suggestions = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    suggestions.current!.scrollLeft += offset;
  };

  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(activeUserId, following);
      setProfiles(response);
    };
    activeUserId && suggestedProfiles();
  }, [activeUserId]);
  return profiles && open && profiles.length > 0 ? (
    <div className="relative mb-2 space-y-2 overflow-hidden rounded-md border border-gray-200 bg-white py-4 ">
      <button
        className="absolute left-2 top-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 bg-opacity-40 px-1 py-2 text-white shadow-md"
        onClick={() => scroll(-500)}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        className="absolute right-2 top-[45%] z-30 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 bg-opacity-40 px-1 py-2 text-white shadow-md"
        onClick={() => scroll(500)}
      >
        <ChevronRightIcon className="h-5 w-5 " />
      </button>
      <p className="px-6 text-lg text-gray-500">Discover People</p>
      <div
        className="flex min-w-full max-w-xs space-x-2 overflow-x-scroll scroll-smooth px-6 scrollbar-hide"
        ref={suggestions}
      >
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
              name={profile.name}
              imageUrl={profile.imageUrl}
              profileId={profile.userId}
              activeUserId={activeUserId}
              activeUserDocId={activeUserDocId}
            />
          ))}
      </div>
    </div>
  ) : null;
};

export default SuggestionsList;

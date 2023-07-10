import {
  ArrowLeftIcon,
  InformationCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { onSnapshot, QuerySnapshot, Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { User } from "../../../typings";
import { db } from "../../lib/firebase";
import { getUserLastSeen } from "../../services/firebase";

const Header = ({ username, imageUrl }: User) => {
  const [lastSeen, setLastSeen] = useState<Timestamp>();
  const router = useRouter();
  useEffect(() => {
    async function showlastSeen() {
      onSnapshot(getUserLastSeen(username), (snapshot: QuerySnapshot<User>) => {
        setLastSeen(snapshot.docs[0].data().lastSeen);
      });
    }
    username && showlastSeen();
  }, [db, username]);
  return imageUrl && username && lastSeen ? (
    <header className="flex items-center space-x-2 border-b px-4 py-[5px]">
      <ArrowLeftIcon
        className="animate-small h-6 w-6 cursor-pointer text-gray-600"
        onClick={() => router.push("/direct")}
      />
      <div className="relative h-12 w-12">
        <Image
          src={imageUrl}
          alt={username}
          className="rounded-full object-cover"
          fill
        />
      </div>
      <div className="flex-1 font-semibold">
        <Link href={`/profile/${username}`}>{username}</Link>
        <p className="text-xs font-normal capitalize text-gray-400">
          Last Active:&nbsp;
          <ReactTimeAgo
            date={lastSeen?.toDate()}
            locale="en-US"
            timeStyle="round-minute"
          />
        </p>
      </div>
      <PhoneIcon className="animate-small h-6 w-6 cursor-pointer text-gray-600" />
      <InformationCircleIcon className="animate-small h-6 w-6 cursor-pointer text-gray-600" />
    </header>
  ) : null;
};

export default Header;

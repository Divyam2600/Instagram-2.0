import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import useUser from '../hooks/use-user';
import { createUserMessage, getUserByUserId } from '../services/firebase';
import { Link } from 'react-router-dom';
import useQuery from '../hooks/use-query';
import MessageBox from '../components/Messages/MessageBox';
import { ArrowCircleRightIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import SideProfile from '../components/Messages/SideProfile';
import SearchBarModal from '../components/Modals/SearchBarModal';
import SendMedia from '../components/Modals/SendMedia';
import SendAudioModal from '../components/Modals/SendAudioModal';

function Messages() {
  const {
    user: { following, userId }
  } = useUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () =>
      following.map(async (followingUserId) => {
        //to fetch the user's data whom the user is Following
        const otherUsers = await getUserByUserId(followingUserId);
        const message = await createUserMessage(userId, followingUserId);
        if (otherUsers[0].userId === message.followingUserId) {
          otherUsers[0] = {
            ...otherUsers[0],
            messageId: message.messageId
          };
        }
        setUsers((users) => [...users, otherUsers[0]]);
      });
    // to allow rendering of userlist only once when user array length is less than following length
    if (following && users.length < following.length) {
      getUsers();
    }
  }, [userId]);

  const query = useQuery();
  const [open, setOpen] = useState(true);
  return (
    <div className="h-full">
      <SearchBarModal />
      <SendAudioModal />
      <SendMedia />
      <Header />
      <main className="relative mx-auto mt-20 flex max-h-fit justify-end space-x-2 p-2 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        {users?.length > 0 && (
          <section
            className={`absolute left-2 z-10 flex h-[84vh] flex-col space-y-1 overflow-x-hidden overflow-y-scroll rounded-xl border bg-[#fbfcfc] py-3 px-2 shadow-md duration-300 scrollbar-hide ${
              open ? 'w-56 shadow-lg' : 'w-[75px]'
            } `}
          >
            <ArrowCircleRightIcon
              className={`sticky -mr-1 -mt-2 h-6 w-6 cursor-pointer self-end fill-[#fbfcfc] duration-300 ${
                open && 'rotate-180'
              }`}
              onClick={() => setOpen(!open)}
            />
            {users.map((result) => (
              <Link
                to={`/messages/${userId}?with=${result.userId}&messageId=${result.messageId}`}
                key={result.userId}
                className={`flex items-center rounded-xl p-1 duration-200 active:scale-90 ${
                  open
                    ? ' border px-1 hover:scale-105 hover:bg-gray-200 hover:bg-opacity-70'
                    : 'border-none hover:scale-125'
                }`}
                onClick={() => setOpen(false)}
              >
                <SideProfile
                  open={open}
                  username={result.username}
                  image={result.image}
                  activeUserId={userId}
                  followingUserId={result.userId}
                />
              </Link>
            ))}
          </section>
        )}
        <section className="h-[84vh] w-[83%] rounded-xl bg-white shadow-md xxs:w-[78%] xs:w-[80%] sm:w-[85%] md:w-[87%] lg:w-[89%] xl:w-[90%]">
          {!query.get('with') ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center text-2xl font-semibold text-gray-600 sm:text-3xl">
              <p className="flex h-32 w-32 items-center justify-center rounded-full border-4">
                <PaperAirplaneIcon className="-mt-2 ml-3 h-20 w-20 rotate-50 stroke-[1.5]" />
              </p>
              <p>No messages to display...</p>
              <button className="submit w-48">Start a Chat</button>
            </div>
          ) : (
            <div className="h-full">
              <MessageBox userId={query.get('with')} messageId={query.get('messageId')} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Messages;

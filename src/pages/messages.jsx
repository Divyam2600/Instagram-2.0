import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import useUser from '../hooks/use-user';
import { createUserMessage, getUserByUserId } from '../services/firebase';
import { Link } from 'react-router-dom';
import useQuery from '../hooks/use-query';
import MessageBox from '../components/Messages/MessageBox';
import { PaperAirplaneIcon } from '@heroicons/react/outline';

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
          otherUsers[0] = { ...otherUsers[0], messageId: message.messageId };
        }
        setUsers((users) => [...users, otherUsers[0]]);
      });
    // to allow rendering of userlist only once when user array length is less than following length
    if (users.length < following?.length) {
      getUsers();
    }
  }, [following, userId, users.length]);
  const query = useQuery();
  const [open, setOpen] = useState(true);
  return (
    <div className="h-full">
      <Header />
      <main className="relative mx-auto mt-20 flex max-h-fit space-x-2 p-2 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <section
          className={`flex h-[84vh] min-w-fit flex-col space-y-2 overflow-y-scroll rounded-xl border p-3 shadow-md scrollbar-hide `}
        >
          {users?.map((result) => (
            <Link
              to={`/messages/${userId}?with=${result.userId}&messageId=${result.messageId}`}
              key={result.userId}
              className="group flex items-center"
            >
              <img
                src={result.image}
                alt={result.username}
                className="h-12 w-12 cursor-pointer rounded-full border object-cover transition duration-200 ease-in-out hover:scale-125 active:scale-90"
              />
              <span className="absolute left-20 z-50 ml-1 w-auto min-w-max origin-left scale-0 rounded-lg bg-gray-600 px-2 py-1 font-semibold text-white shadow-md transition-all duration-200 ease-in-out group-hover:scale-100">
                {result.username}
              </span>
            </Link>
          ))}
        </section>
        <section className="h-[84vh] w-full rounded-xl bg-white shadow-md">
          {!query.get('with') ? (
            <p className="flex h-full flex-col items-center justify-center space-y-4 text-center text-3xl font-semibold text-gray-600">
              <p className="flex h-32 w-32 items-center justify-center rounded-full border-4">
                <PaperAirplaneIcon className="-mt-2 ml-3 h-20 w-20 rotate-50 stroke-[1.5]" />
              </p>
              <p>No messages to display...</p>
              <button className="submit w-48">Start a Chat</button>
            </p>
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

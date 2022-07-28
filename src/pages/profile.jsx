import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile/UserProfile';
import UserEditModal from '../components/Modals/UserEditModal';
import FollowersModal from '../components/Modals/FollowersModal';
import FollowingModal from '../components/Modals/FollowingModal';
import SuggestionsList from '../components/UserProfile/SuggestionsList';
import Loader from '../components/UserProfile/Loader';
import TopScroll from '../components/TopScroll';
import SearchBarModal from '../components/Modals/SearchBarModal';
import PhotoDisplayModal from '../components/Modals/PhotoDisplayModal';
import PostModal from '../components/Modals/PostModal';

function Profile() {
  // fetch username from url params
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, navigate]);
  return (
    <div>
      <SearchBarModal />
      <UserEditModal />
      <FollowersModal />
      <FollowingModal />
      <PostModal />
      <SuggestionsList />
      <PhotoDisplayModal />
      <TopScroll />
      <Header />
      <div className="mx-auto mt-20 -mb-6 h-full min-h-screen overflow-x-hidden pb-4 scrollbar-hide sm:max-w-xl md:max-w-2xl lg:max-w-[52rem] xl:max-w-4xl">
        {user ? <UserProfile user={user} /> : <Loader />}
      </div>
    </div>
  );
}

export default Profile;

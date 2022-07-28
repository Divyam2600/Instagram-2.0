import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);
  useEffect(() => {
    // fetch active user all details from firebase
    async function getUserObjectById() {
      // we need a function so that we can call (firebase service) that gets the user data based on the id
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjectById();
    }
  }, [user]);
  return { user: activeUser };
}

export default useUser;

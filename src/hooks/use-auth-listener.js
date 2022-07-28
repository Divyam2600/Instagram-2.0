import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import FireBaseContext from '../context/firebase';

function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { firebase } = useContext(FireBaseContext);
  useEffect(() => {
    const auth = getAuth();
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User Auth Successful - add the user in localStorage
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // No user - clear local Storage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });
    return () => listener();
  }, [firebase]);
  return { user };
}
export default useAuthListener;

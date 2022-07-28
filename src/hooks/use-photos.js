import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { activeUserLatestPost, getPhotos, getUserByUserId } from '../services/firebase';
import PropTypes from 'prop-types';

function usePhotos({ userId: activeUserId }) {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);
  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }
      followedUserPhotos.sort((a, b) => b.timestamp - a.timestamp);
      setPhotos(followedUserPhotos);
      if (activeUserId) {
        const activeUserLatestPhoto = await activeUserLatestPost(userId, activeUserId);
        setPhotos((photos) =>
          activeUserLatestPhoto ? [activeUserLatestPhoto, ...photos] : photos
        );
      }
    }
    getTimelinePhotos();
  }, [userId, activeUserId]);

  return { photos };
}

export default usePhotos;

usePhotos.propTypes = {
  activeUserId: PropTypes.string
};

import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Header from './Header';
import Image from './Image';
import Buttons from './Buttons';
import Captions from './Captions';
import Comments from './Comments';

function Post({ content }) {
  const handleFocus = () => commentInput.current.focus();
  const commentInput = useRef(null);
  return (
    <div className="container my-5 divide-y rounded-md border bg-white shadow-md">
      <Header id={content.id} username={content.username} userImage={content.userImage} />
      <Image src={content.imageSrc} caption={content.caption} />
      <div>
        <Buttons
          id={content.id}
          totalLikes={content.likes?.length}
          likedPhoto={content.userLikedPhoto}
          handleFocus={handleFocus}
        />
        <Captions caption={content.caption} username={content.username} />
      </div>
      <div>
        <Comments id={content.id} postedAt={content.timestamp} commentInput={commentInput} />
      </div>
    </div>
  );
}

export default Post;

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    userImage: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array,
    timestamp: PropTypes.object.isRequired
  })
};

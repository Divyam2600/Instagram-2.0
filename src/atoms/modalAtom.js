import { atom } from 'recoil';

export const postModalState = atom({
  key: 'postModalState',
  default: false
});

export const likesModalState = atom({
  key: 'likesModalState',
  default: false
});

export const userEditModal = atom({
  key: 'userEditModal',
  default: false
});

export const followersModalState = atom({
  key: 'followersModalState',
  default: false
});

export const followingModalState = atom({
  key: 'followingModalState',
  default: false
});

export const suggestionsListState = atom({
  key: 'suggestionsListState',
  default: false
});

export const commentLikesModalState = atom({
  key: 'commentLikesModalState',
  default: false
});

export const photoDisplayModalState = atom({
  key: 'photoDisplayModalState',
  default: false
});

export const searchBarModalState = atom({
  key: 'searchBarModalState',
  default: false
});

export const sendMediaModalState = atom({
  key: 'sendMediaModalState',
  default: false
});

export const sendAudioModalState = atom({
  key: 'sendAudioModalState',
  default: false
});

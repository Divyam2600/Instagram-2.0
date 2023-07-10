import { Timestamp } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { User as FirebaseUserInterface } from "firebase/auth";

export interface Auth {
  user: FirebaseUserInterface | null;
  signUp: (
    email: string,
    password: string,
    username: string,
    fullName: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  loading: boolean;
}

export enum ErrorBy {
  FORM = "form",
  EMAIL = "email",
  PASSWORD = "password",
  USERNAME = "username",
  FULLNAME = "fullName",
}

export interface User {
  userId?: string;
  username?: string;
  name?: string;
  description?: string;
  title?: string;
  imageUrl?: string;
  website?: string;
  phoneNumber?: Number;
  following?: string[];
  followers?: string[];
  lastSeen?: Timestamp;
  email?: string;
  note?: string;
  createdAt?: Timestamp;
  isVerified?: boolean;
  savedPosts?: string[];
  id?: string;
}

export interface Post {
  userId?: string;
  caption?: string;
  files?: {
    url: string;
    type: string;
  }[];
  likes?: string[];
  postedAt?: Timestamp;
  id?: string;
}

export type PostsType = "saved" | "posts" | "tagged" | "reels";

export interface Comment {
  userId?: string;
  comment?: string;
  postedAt?: Timestamp;
  likes?: string[];
  id?: string;
}

export interface UploadFile {
  dataURL?: string;
  file?: File;
}

export type UserProfileProps = {
  profile?: User;
  postsCollection?: Post[];
  savedPostsCollection?: Post[];
  followerCount?: number;
  followingCount?: number;
};

export type PostProps = {
  post?: Post;
  usersOtherPosts?: Post[];
};

export interface Messages {
  users?: string[];
  lastMessage?: LastMessage;
  id?: string;
}

export type LastMessage = { message: string; sentAt: Timestamp };

export interface Message {
  message?: string;
  sentAt?: Timestamp;
  type?: MessageType;
  status?: MessageStatus;
  sentBy?: string;
  id?: string;
}

export type MessageType = "text" | "image" | "video" | "audio" | "gif" | "file";

export type MessageStatus = "delivered" | "seen";

export type RecorderState = {
  recordingMinutes: number;
  recordingSeconds: number;
  initRecording: boolean;
  mediaStream: MediaStream | null;
  mediaRecorder: MediaRecorder | null;
  audio: string | ArrayBuffer | null;
  type: string | null;
};

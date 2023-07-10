import React, { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const FeedLoader = () => (
  <section className="col-span-2 mx-auto w-full max-w-md space-y-4 md:col-span-3 xxs:max-w-none">
    <Stories />
    {Array.from({ length: 2 }).map((_, i) => (
      <div className=" my-5 rounded-md border bg-white shadow-md " key={i}>
        <PostHeader />
        <PostImage />
        <div className="px-4 py-2">
          <Skeleton width={"100%"} count={2} />
        </div>
      </div>
    ))}
  </section>
);

export const PostHeader = () => (
  <div className="flex items-center space-x-4 p-3">
    <Skeleton width={50} height={50} circle={true} />
    <Skeleton width={150} />
  </div>
);

export const PostImage = () => (
  <Skeleton width={"100%"} height={360} borderRadius={0} />
);

export const Stories = () => (
  <div className="flex space-x-2 overflow-hidden rounded-md border bg-white p-2 pb-3 shadow-sm">
    {Array.from({ length: 7 }).map((_, i) => (
      <Skeleton width={60} height={60} circle={true} key={i} />
    ))}
  </div>
);

export const SuggestionsLoader = () => (
  <div>
    {Array.from({ length: 3 }).map((_, i) => (
      <div className="mx-auto mb-4 flex max-w-sm items-center" key={i}>
        <Skeleton width={50} height={50} circle={true} />
        <div className="flex-1">
          <Skeleton width={200} />
          <Skeleton width={200} />
        </div>
      </div>
    ))}
  </div>
);

export const MiniProfileLoader = () => (
  <div className="flex items-center">
    <Skeleton width={60} height={60} circle={true} />
    <div className="flex-1 ">
      <Skeleton width={200} />
      <Skeleton width={200} />
    </div>
  </div>
);

export const UserProfileHeaderLoader = () => (
  <Fragment>
    <div className="flex space-y-4 space-x-6 py-2 sm:border-b">
      <p className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 ">
        <Skeleton circle={true} width={`100%`} height={`100%`} />
      </p>
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Skeleton width={150} height={20} />
          <Skeleton width={150} height={20} />
        </div>
        <div className="hidden space-y-4 sm:inline">
          <Skeleton width={150} height={20} />
          <br />
          <Skeleton
            width={350}
            containerClassName="-space-y-2"
            height={15}
            count={4}
          />
          <Skeleton
            width={80}
            height={20}
            count={3}
            containerClassName="flex space-x-6 justify-between max-w-sm"
          />
        </div>
      </div>
    </div>
    <div className="mt-2 space-y-4 sm:hidden ">
      <Skeleton width={150} height={20} />
      <br />
      <Skeleton height={15} count={4} />
      <Skeleton
        width={80}
        height={20}
        count={3}
        containerClassName="flex space-x-6 justify-between border-y px-6 py-4"
      />
    </div>
  </Fragment>
);

export const UserProfilePostsLoader = () => (
  <div className="grid grid-cols-3 gap-2">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="aspect-square h-fit overflow-hidden">
        <Skeleton height={"100%"} width={"100%"} />
      </div>
    ))}
  </div>
);

export const UserChatLoader = () => (
  <div className="flex items-center space-x-2 py-1.5 px-4">
    <Skeleton circle={true} height={56} width={56} />
    <Skeleton containerClassName="w-full" count={2} height={12} />
  </div>
);

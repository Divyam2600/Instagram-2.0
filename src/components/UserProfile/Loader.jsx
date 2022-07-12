import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loader() {
  return (
    <div className="container flex flex-col py-2 space-y-1">
      <HeadLoader />
      <div className="grid grid-cols-3 h-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden py-[75%] pt-0 px-0 md:px-[25%]"
          >
            <Skeleton
              height={250}
              width={250}
              containerClassName="grid grid-cols-3 space-x-5 gap-3 lg:gap-1 h-0"
              className=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeadLoader() {
  return (
    <>
      <div className="flex justify-evenly max-w-sm md:max-w-none md:border-b md:py-2">
        <p className="object-contain h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 ">
          <Skeleton
            circle={true}
            width={`100%`}
            height={`100%`}
            className="ml-4 mr-4"
          />
        </p>
        <div className="flex-col flex mr-2 space-y-3 md:ml-5">
          <div className="flex space-y-2 md:space-x-4 md:space-y-0 flex-col md:flex-row mt-4">
            <Skeleton width={150} height={20} className="ml-4 mr-4" />
            <Skeleton width={150} height={20} className="ml-4 mr-4" />
          </div>
          <div className="hidden md:inline-flex flex-col space-y-2 ml-4 mr-4">
            <Skeleton width={150} height={20} />
            <Skeleton width={350} height={10} count={4} />
            <Skeleton
              width={80}
              height={20}
              count={3}
              containerClassName={`flex space-x-6 justify-between max-w-sm`}
            />
          </div>
        </div>
      </div>
      <div className="mx-6 md:hidden space-y-4 ">
        <Skeleton width={150} height={20} className={`my-4`} />
        <Skeleton height={10} count={4} />
        <Skeleton
          width={80}
          height={20}
          count={3}
          containerClassName={`flex space-x-6 justify-between  border-y -mx-6 px-6 py-4`}
        />
      </div>
    </>
  );
}

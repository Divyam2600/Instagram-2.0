import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loader() {
  return (
    <div className="container flex flex-col space-y-1 py-2">
      <HeadLoader />
      <div className="grid h-0 grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="overflow-hidden py-[75%] px-0 pt-0 md:px-[25%]">
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
      <div className="flex max-w-sm justify-evenly md:max-w-none md:border-b md:py-2">
        <p className="h-24 w-24 object-contain sm:h-32 sm:w-32 md:h-40 md:w-40 ">
          <Skeleton circle={true} width={`100%`} height={`100%`} className="ml-4 mr-4" />
        </p>
        <div className="mr-2 flex flex-col space-y-3 md:ml-5">
          <div className="mt-4 flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
            <Skeleton width={150} height={20} className="ml-4 mr-4" />
            <Skeleton width={150} height={20} className="ml-4 mr-4" />
          </div>
          <div className="ml-4 mr-4 hidden flex-col space-y-2 md:inline-flex">
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
      <div className="mx-6 space-y-4 md:hidden ">
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

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loader() {
  return (
    <div>
      <div className=" flex items-center justify-center ">
        <div className="mt-5 flex max-w-[360px] space-x-2 overflow-hidden rounded-md border bg-white p-2 shadow-sm scrollbar-hide">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton width={60} height={60} circle={true} key={i} />
          ))}
        </div>
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div className=" flex items-center justify-center " key={i}>
          <div className=" my-5 max-w-[360px] rounded-md border bg-white shadow-md " key={i}>
            <div className="flex items-center p-3">
              <Skeleton width={50} height={50} circle={true} />
              <p className="flex-1 pl-4 ">
                <Skeleton width={150} />
              </p>
            </div>
            <div className="w-full">
              <Skeleton width={360} height={400} />
            </div>
            <p className="truncate p-4">
              <Skeleton width={320} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

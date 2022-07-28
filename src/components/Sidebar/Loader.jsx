import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function SuggestionsLoader() {
  return (
    <div className="mt-4 ml-5">
      <div className="mb-5 flex flex-col justify-between">
        <h3 className="font-semibold text-gray-500">
          <Skeleton width={150} />
        </h3>
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="mt-3 flex items-center justify-between" key={i}>
            <Skeleton width={46} height={46} circle={true} />
            <div className="ml-4 flex-1">
              <Skeleton width={150} />
              <Skeleton width={150} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MiniProfileLoader() {
  return (
    <div className="ml-4 mt-2 flex items-center justify-between">
      <Skeleton width={56} height={56} circle={true} />
      <div className="mx-4 flex-1 ">
        <Skeleton width={150} />
        <Skeleton width={150} />
      </div>
    </div>
  );
}

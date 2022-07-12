import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SuggestionsLoader() {
  return (
    <div className="mt-4 ml-5">
      <div className="flex flex-col justify-between mb-5">
        <h3 className="font-semibold text-gray-500">
          <Skeleton width={150} />
        </h3>
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="flex items-center justify-between mt-3" key={i}>
            <Skeleton width={46} height={46} circle={true} />
            <div className="flex-1 ml-4">
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
    <div className="flex items-center justify-between ml-4 mt-2">
      <Skeleton width={56} height={56} circle={true} />
      <div className="flex-1 mx-4 ">
        <Skeleton width={150} />
        <Skeleton width={150} />
      </div>
    </div>
  );
}

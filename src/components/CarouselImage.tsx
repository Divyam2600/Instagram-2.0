import React, { MouseEvent, KeyboardEvent } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  files?: {
    url: string;
    type: string;
  }[];
};

const CarouselImage = ({ files }: Props) => {
  return (
    <Carousel
      autoPlay={false}
      emulateTouch={true}
      infiniteLoop={false}
      swipeable={true}
      showThumbs={false}
      statusFormatter={(current, total) =>
        files?.length! > 1 && formatStatus(current, total)
      }
      renderArrowPrev={(onClickHandler, hasPrev) =>
        previousArrow(onClickHandler, hasPrev)
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        nextArrow(onClickHandler, hasNext)
      }
      renderIndicator={(onClickHandler, isSelected, index, label) =>
        files?.length! > 1 &&
        indicatorDots(onClickHandler, isSelected, index, label)
      }
    >
      {files
        ?.filter(
          (file, i) => i === files.findIndex((ele) => ele.url === file.url)
        )
        .map(({ url, type }, i) =>
          type.match(/^image\//) ? (
            <img
              src={url}
              key={i}
              alt={(i + 1).toString()}
              className="max-h-96 object-cover"
            />
          ) : (
            <video
              src={url}
              controls
              key={i}
              className="max-h-96 object-cover"
            />
          )
        )}
    </Carousel>
  );
};

export default CarouselImage;

const formatStatus: any = (current: number, total: number) => (
  <span className="rounded-full bg-black/60 px-3 py-1.5 text-sm font-semibold tracking-wider">
    {current + "/" + total}
  </span>
);

const previousArrow = (onClickHandler: () => void, hasPrev: boolean) =>
  hasPrev && (
    <button
      className="absolute left-4 top-1/2 z-10 -mt-4 rounded-full bg-black/60 p-2 text-white"
      onClick={onClickHandler}
    >
      <ChevronLeftIcon className="h-6 w-6 stroke-2" />
    </button>
  );

const nextArrow = (onClickHandler: () => void, hasNext: boolean) =>
  hasNext && (
    <button
      className="absolute right-4 top-1/2 z-10 -mt-4 rounded-full bg-black/60 p-2 text-white"
      onClick={onClickHandler}
    >
      <ChevronRightIcon className="h-6 w-6 stroke-2" />
    </button>
  );

const indicatorDots = (
  onClickHandler: (
    e: MouseEvent<Element, globalThis.MouseEvent> | KeyboardEvent<Element>
  ) => void,
  isSelected: boolean,
  index: number,
  label: string
) => (
  <li
    className={`mx-1 inline-block h-2 w-2 rounded-full  bg-black/60 shadow-md ${
      isSelected && "bg-blue-600"
    }`}
    onClick={onClickHandler}
    onKeyDown={onClickHandler}
    value={index}
    key={index}
    role="button"
    tabIndex={0}
    aria-label={
      isSelected ? `Selected: ${label} ${index + 1}` : `${label} ${index + 1}`
    }
  />
);

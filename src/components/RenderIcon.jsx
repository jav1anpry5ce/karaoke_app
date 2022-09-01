import { Icons } from "../utils/HelperArrays";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import React, { useRef } from "react";

export default function RenderIcon({ selectedIcon, setSelectedIcon, mobile }) {
  const ref = useRef();
  const handelScroll = (position) => {
    const { current } = ref;
    if (position === "left") {
      current.scrollBy({
        top: 0,
        left: -current.offsetWidth,
        behavior: "smooth",
      });
    } else {
      current.scrollBy({
        top: 0,
        left: current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative flex flex-col">
      <label className="mb-2 block text-sm font-bold capitalize">
        Choose your icon
      </label>
      {!mobile && (
        <button
          className="absolute left-0 top-[50%] bg-black/30 p-1.5 hover:bg-black/80"
          type="button"
          onClick={() => handelScroll("left")}
        >
          <IoIosArrowBack fontSize={24} color="#fff" />
        </button>
      )}

      <div
        ref={ref}
        className="flex w-full snap-x snap-mandatory gap-4 overflow-auto scrollbar-hide"
      >
        {Icons.map((icon, index) => (
          <img
            onClick={() => setSelectedIcon(icon)}
            key={index}
            src={icon}
            alt={icon}
            className={`h-[80px] w-[80px] cursor-pointer snap-start snap-normal rounded object-cover transition duration-200 ease-in-out lg:h-[120px] lg:w-[120px] lg:hover:border-[3px] lg:hover:border-blue-500 ${
              selectedIcon === icon && "border-[3px] border-blue-500"
            }`}
          />
        ))}
      </div>
      {!mobile && (
        <button
          className="absolute right-0 top-[50%] bg-black/30 p-1.5 hover:bg-black/80"
          type="button"
          onClick={() => handelScroll("right")}
        >
          <IoIosArrowForward fontSize={24} color="#fff" />
        </button>
      )}
    </div>
  );
}

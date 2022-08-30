import React, { useContext } from "react";
import { Context } from "../context/AppContext";

export default function VideoCard({ data }) {
  const { video } = data;
  const { addToQueue } = useContext(Context);

  return (
    <div
      className="max-w-[380px] cursor-pointer overflow-clip rounded bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl"
      onClick={() => addToQueue(video)}
    >
      <img
        src={video?.thumbnails[0].url}
        alt="thumbnail"
        className="object-cover"
        height={280}
        width={380}
      />
      <p className="px-2 py-3">{video?.title}</p>
    </div>
  );
}

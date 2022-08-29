import React, { useContext } from "react";
import { Context } from "../context/AppContext";

export default function VideoCard({ data }) {
  const { video } = data;
  const { addToQueue } = useContext(Context);

  return (
    <div
      className="w-full max-w-[380px] overflow-hidden rounded bg-black/80 text-white"
      onClick={() => addToQueue(video)}
    >
      <img
        src={video?.thumbnails[0].url}
        alt="thumbnail"
        className="h-full w-full object-cover"
      />
      <p className="p-2 font-bold">{video?.title}</p>
    </div>
  );
}

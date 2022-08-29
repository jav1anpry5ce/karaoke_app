import React, { useContext } from "react";
import ReactPlayer from "react-player";
import QueueCard from "./QueueCard";
import { useParams } from "react-router-dom";
import { Context } from "../context/AppContext";
import { AnimatePresence } from "framer-motion";

export default function Host() {
  const params = useParams();
  const { queue, currentSong, updateCurrentSong, onError } =
    useContext(Context);
  return (
    <main className="h-screen overflow-hidden bg-[url(./assets/images/party.jpg)] bg-cover object-center">
      <div className="relative h-full bg-black/60">
        <div className="flex h-full justify-between gap-8 p-4">
          <div className="flex w-[70%] flex-col gap-4">
            {currentSong ? (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${currentSong?.song.videoId}`}
                controls
                width="100%"
                height="100%"
                className="aspect-video"
                playing
                onEnded={updateCurrentSong}
                onError={onError}
              />
            ) : (
              <div className="absolute left-[50%] flex h-full -translate-x-[50%] flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-white">
                  No song currently playing
                </h1>
              </div>
            )}
            {currentSong && <QueueCard queueData={currentSong} />}
          </div>
          <div className="flex w-[30%] flex-col gap-2 overflow-auto pb-2 scrollbar-hide">
            <h1 className="sticky top-0 bg-black/0 py-4 text-right text-2xl font-bold uppercase tracking-widest text-white backdrop-blur-md">
              Room: {params.id}
            </h1>
            <AnimatePresence>
              {queue.map((queueData) => (
                <QueueCard
                  key={queueData.song.videoId}
                  queueData={queueData}
                  side
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}

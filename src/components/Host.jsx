import React, { useContext, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import QueueCard from "./QueueCard";
import { useParams } from "react-router-dom";
import { Context } from "../context/AppContext";
import { AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import UserCard from "./UserCard";
import { motion } from "framer-motion";
import RenderCode from "./RenderCode";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export default function Host() {
  const params = useParams();
  const {
    queue,
    currentSong,
    updateCurrentSong,
    onPlaybackError,
    users,
    closeRoom,
  } = useContext(Context);
  const [url] = useState(
    process.env.NODE_ENV === "development"
      ? `http://10.0.0.233:3000/join?room=${params.id}`
      : `${process.env.REACT_APP_PRODUCTION_URL}join?room=${params.id}`
  );

  useEffect(() => {
    return () => closeRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-bl from-[#1d2639] to-[#110921]">
      <div className="relative h-full">
        <div className="flex h-full justify-between gap-8 p-4">
          <div className="flex w-[70%] flex-col gap-4 xl:w-[65%]">
            {currentSong ? (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${currentSong?.song.videoId}`}
                controls
                width="100%"
                height="100%"
                className="aspect-video"
                playing
                onEnded={updateCurrentSong}
                onError={onPlaybackError}
              />
            ) : (
              <div className="absolute left-[50%] flex h-full w-screen -translate-x-[50%] flex-col items-center justify-center">
                <div className="flex w-full flex-col items-center gap-5">
                  <motion.div
                    layout="position"
                    className="rounded bg-white p-1"
                  >
                    <QRCode value={url} size={320} level="H" />
                  </motion.div>
                  <motion.div
                    layout="position"
                    className="flex max-w-full flex-wrap items-center justify-center gap-3 px-4"
                  >
                    <AnimatePresence>
                      {users.map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            )}
            {currentSong && <QueueCard queueData={currentSong} />}
          </div>
          <div className="flex w-[30%] flex-col gap-2 overflow-auto pb-2 scrollbar-hide xl:w-[35%]">
            <Link
              to="/"
              className="absolute top-7 left-5 inline-flex items-center gap-2 rounded bg-pink-500 p-2.5 font-semibold text-white hover:shadow-lg hover:shadow-pink-500/40 lg:p-2"
            >
              <AiFillHome fontSize={24} />
              <span className="hidden lg:block">Close Room</span>
            </Link>
            <RenderCode code={params.id} />
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

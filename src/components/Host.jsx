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
import SongCountdown from "./SongCountdown";

export default function Host() {
  const params = useParams();
  const {
    queue,
    currentSong,
    startCountdown,
    onPlaybackError,
    users,
    closeRoom,
    skipSong,
  } = useContext(Context);
  const [url] = useState(`http://192.168.1.234/#/join?room=${params.id}`);

  useEffect(() => {
    return () => closeRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-bl from-[#1d2639] to-[#110921]">
      <div className="relative h-full w-screen">
        <div className="flex h-full justify-between gap-4 p-4">
          <div className="flex w-[75%] flex-col gap-4">
            <SongCountdown />
            {currentSong ? (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${currentSong?.song.videoId}`}
                controls
                width="100%"
                height="100%"
                className="aspect-video"
                playing
                onEnded={startCountdown}
                onError={onPlaybackError}
                config={{
                  youtube: {
                    playerVars: {
                      controls: 0,
                    },
                  },
                }}
              />
            ) : (
              <div className="absolute left-[50%] flex h-full w-screen -translate-x-[50%] flex-col items-center justify-center">
                <motion.div
                  layout
                  className="flex w-full flex-col items-center gap-5"
                >
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
                </motion.div>
              </div>
            )}
            {currentSong && <QueueCard queueData={currentSong} />}
            {currentSong && (
              <button
                onClick={skipSong}
                className="w-fit rounded bg-red-500 p-4 font-bold text-white shadow shadow-red-500/80 hover:bg-red-500/80"
              >
                Skip Current Song
              </button>
            )}
          </div>
          <div className="flex w-[25%] flex-col gap-2 overflow-hidden pb-2 scrollbar-hide">
            {!currentSong && (
              <Link
                to="/"
                className="absolute top-7 left-5 inline-flex items-center gap-2 rounded bg-pink-500 p-2.5 font-semibold text-white hover:shadow-lg hover:shadow-pink-500/40 lg:p-2"
              >
                <AiFillHome fontSize={24} />
                <span className="hidden lg:block">Close Room</span>
              </Link>
            )}
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

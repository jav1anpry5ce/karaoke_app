import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";
import QueueCard from "./QueueCard";
import { useParams } from "react-router-dom";
import { Context } from "../context/AppContext";
import { AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import UserCard from "./UserCard";
import { motion } from "framer-motion";

export default function Host() {
  const params = useParams();
  const { queue, currentSong, updateCurrentSong, onPlaybackError, users } =
    useContext(Context);
  const [url] = useState(`http://10.0.0.233:3000/join?room=${params.id}`);
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
                onError={onPlaybackError}
              />
            ) : (
              <div className="absolute left-[50%] flex h-full -translate-x-[50%] flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                  <motion.div
                    layout="position"
                    className="rounded bg-white p-1"
                  >
                    <QRCode value={url} size={360} />
                  </motion.div>
                  <motion.div
                    layout="position"
                    className="flex max-w-[1020px] flex-wrap gap-3"
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

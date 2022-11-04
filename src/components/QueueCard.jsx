import React from "react";
import { motion } from "framer-motion";

export default function QueueCard({ queueData, side }) {
  const { user, song } = queueData;
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="flex w-full items-center gap-2 overflow-hidden rounded bg-slate-900/95 text-white shadow shadow-black/50"
    >
      <img
        src={
          user?.image ||
          "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"
        }
        alt="profile"
        className="h-full w-[80px] object-cover object-center"
      />
      {side ? (
        <div className="flex flex-col py-2">
          <span className="w-full max-w-[260px] truncate text-sm font-bold capitalize">
            {song?.title}
          </span>
          <span className="truncate text-sm capitalize text-white/60">
            {user?.name}
          </span>
        </div>
      ) : (
        <div className="flex flex-col py-2">
          <p className="truncate text-lg font-bold capitalize">{song?.title}</p>
          <p className="capitalize text-white/60">{user?.name}</p>
        </div>
      )}
    </motion.div>
  );
}

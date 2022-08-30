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
      className="flex items-center gap-8 rounded-lg bg-black/70 px-4 py-1 text-white shadow shadow-black/70"
    >
      <img
        src={
          user?.image ||
          "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"
        }
        alt="profile"
        className="h-[80px] w-[80px] rounded-full object-cover object-center"
      />
      {side ? (
        <div className="flex flex-col">
          <span className="text-lg font-bold capitalize">{song?.title}</span>
          <span className="text-sm text-white/60">{user?.name}</span>
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="text-3xl font-bold capitalize">{song?.title}</span>
          <span className="text-white/60">{user?.name}</span>
        </div>
      )}
    </motion.div>
  );
}

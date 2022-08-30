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
      className="flex items-center gap-8 overflow-hidden rounded-r bg-black/90 text-white shadow shadow-black"
    >
      <img
        src={
          user?.image ||
          "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png"
        }
        alt="profile"
        className="h-[80px] w-[80px] object-cover object-center"
      />
      {side ? (
        <div className="flex flex-col">
          <span className="text-lg font-bold capitalize">{song?.title}</span>
          <span className="text-sm capitalize text-white/60">{user?.name}</span>
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="text-3xl font-bold capitalize">{song?.title}</span>
          <span className="capitalize text-white/60">{user?.name}</span>
        </div>
      )}
    </motion.div>
  );
}

import React from "react";
import { motion } from "framer-motion";

export default function UserCard({ user }) {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-4 rounded-lg bg-black/70 px-4 py-1 text-white shadow shadow-black/70"
    >
      <img
        src={user?.image}
        alt="profile"
        className="h-[60px] w-[60px] rounded-full object-cover object-center"
      />
      <p className="text-lg font-bold">{user.name}</p>
    </motion.div>
  );
}

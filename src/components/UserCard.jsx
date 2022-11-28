import React from "react";
import { motion } from "framer-motion";

export default function UserCard({ user }) {
  return (
    <motion.div
      layout="position"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0, x: "-100vw", transition: { duration: 0.5 } }}
      className="flex items-center overflow-hidden rounded bg-black/90 text-white shadow shadow-black"
    >
      <img
        src={user?.image}
        alt="profile"
        className="h-[50px] w-[50px] object-cover object-center"
      />
      <p className="p-2 font-medium uppercase">{user.name}</p>
    </motion.div>
  );
}

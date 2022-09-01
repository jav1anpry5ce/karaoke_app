import React from "react";
import { motion } from "framer-motion";

export default function Ball({
  size,
  color,
  opacity,
  top,
  left,
  right,
  bottom,
  delay,
  x,
  y,
  duration,
}) {
  return (
    <motion.div
      animate={{
        x: x,
        y: y,
        transition: {
          duration: duration,
          delay: delay,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      style={{
        backgroundColor: color,
        opacity: opacity,
        position: "absolute",
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        height: size,
        width: size,
        borderRadius: "50%",
      }}
    />
  );
}

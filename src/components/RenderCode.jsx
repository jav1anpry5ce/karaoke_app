import React from "react";

export default function RenderCode({ code }) {
  const [codeToRender] = React.useState(code.split(""));
  return (
    <div className="sticky top-0 right-0 flex items-center justify-end gap-2 bg-black/0 p-2 backdrop-blur">
      <p className="text-2xl font-bold text-white">ROOM: </p>
      <div className="flex items-center gap-1.5">
        {codeToRender.map((char, index) => (
          <span
            key={index}
            className="bg-slate-900/70 p-2 text-xl font-bold text-white"
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

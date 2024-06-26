import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import RenderIcon from "../components/RenderIcon";
import JoinHeader from "../components/JoinHeader";
const shortid = require("shortid");

export default function Join() {
  const [searchParams] = useSearchParams();
  const { randomIcon, mobile, checkIsRoomValid } = useContext(Context);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const ref = useRef();
  const submit = (e) => {
    e.preventDefault();
    const data = {
      roomId: e.target.room.value.toUpperCase(),
      user: {
        id: shortid.generate(),
        name: e.target.name.value,
        image: selectedIcon || randomIcon(),
      },
    };
    checkIsRoomValid(data);
    // joinRoom(data);
    // navigate(`/room/${data.roomId}`);
  };

  useEffect(() => {
    ref.current.room.value = searchParams.get("room");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <main
      className="h-screen overflow-hidden bg-gradient-to-tl from-[#1d2639] to-[#110921]"
      // style={{
      //   height: "-webkit-fill-available",
      // }}
    >
      <JoinHeader />
      <div className="flex h-[calc(100vh-68px)] items-center justify-center px-4">
        <form
          ref={ref}
          className="container flex w-full max-w-[560px] flex-col gap-3 rounded bg-white p-2 shadow-lg"
          onSubmit={submit}
        >
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="room">
              Room Id
            </label>
            <input type="tel" name="room" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="name">
              Name
            </label>
            <input type="text" name="name" required />
          </div>
          <RenderIcon
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            mobile={mobile}
          />
          <input type="hidden" name="image" required />
          <button
            type="submit"
            className="w-full rounded-md bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-600"
          >
            Join Room
          </button>
        </form>
      </div>
    </main>
  );
}

import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/AppContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import RenderIcon from "../components/RenderIcon";
const shortid = require("shortid");

export default function Join() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { canNavigate, randomIcon, mobile, checkIsRoomValid, room } =
    useContext(Context);
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

  useEffect(() => {
    if (canNavigate && room) {
      navigate(`/room/${room}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canNavigate, room]);

  return (
    <main className="h-screen overflow-hidden bg-[url(./assets/images/party.jpg)] bg-cover bg-fixed bg-right-top">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-black/70 p-4">
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

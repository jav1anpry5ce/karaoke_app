import React, { useContext, useEffect, useRef } from "react";
import { TbArrowsRandom } from "react-icons/tb";
import { Context } from "../context/AppContext";
import { useNavigate, useSearchParams } from "react-router-dom";
const shortid = require("shortid");

export default function Join() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { joinRoom, randomIcon } = useContext(Context);
  const ref = useRef();
  const submit = (e) => {
    e.preventDefault();
    const data = {
      roomId: e.target.room.value.toUpperCase(),
      user: {
        id: shortid.generate(),
        name: e.target.name.value,
        image: e.target.image.value,
      },
    };
    joinRoom(data);
    navigate(`/room/${data.roomId}`);
  };
  const setIcon = () => {
    const icon = randomIcon();
    ref.current.image.value = icon;
  };

  useEffect(() => {
    ref.current.room.value = searchParams.get("room");
  }, [searchParams]);

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
          <div>
            <label className="mb-2 block text-sm font-bold" htmlFor="image">
              Image url
            </label>
            <div className="relative inline-flex w-full items-center justify-center overflow-hidden">
              <input type="url" name="image" required />
              <button
                type="button"
                onClick={setIcon}
                className="absolute right-0 bg-gray-800 p-4"
              >
                <TbArrowsRandom fontSize={20} color="#fff" />
              </button>
            </div>
          </div>
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

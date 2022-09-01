import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";

export default function Header() {
  const { mobile } = useContext(Context);

  return (
    <header className="bg-transparent p-5 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="z-10 font-serif text-lg font-bold">Karaoke Central</h1>
        <div className="space-x-4">
          {!mobile && (
            <Link
              className="rounded bg-transparent bg-sky-500 px-3 py-2 font-semibold text-white shadow-lg shadow-sky-500/40 transition duration-300 ease-in-out"
              to={`/room/${Math.floor(100000 + Math.random() * 900000)}`}
              state={{ host: true }}
            >
              Create a room
            </Link>
          )}
          <Link
            to="/join"
            className="rounded bg-fuchsia-500 px-3 py-2 font-semibold text-white shadow-lg shadow-fuchsia-500/40 transition duration-300 ease-in-out"
          >
            Join a room
          </Link>
        </div>
      </div>
    </header>
  );
}

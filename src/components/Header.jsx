import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";

export default function Header() {
  const { mobile } = useContext(Context);
  const data = {
    host: true,
  };
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-[#0a388e] to-[#004b68] py-2 px-4">
      <h1 className="font-serif font-bold text-white">Karaoke Central</h1>
      <div className="space-x-4">
        {!mobile && (
          <Link
            className="rounded-full bg-white px-3 py-1 font-semibold text-black shadow-lg"
            to={`/room/${Math.floor(100000 + Math.random() * 900000)}`}
            state={data}
          >
            Create a room
          </Link>
        )}
        <Link
          to="/join"
          className="rounded-full bg-[#0a388e] px-3 py-1 font-semibold text-white shadow-lg"
        >
          Join a room
        </Link>
      </div>
    </header>
  );
}

import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export default function JoinHeader() {
  return (
    <header className="relative overflow-hidden p-3 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <p className="font-serif font-bold uppercase lg:text-lg">
          Smash Karaoke
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded bg-pink-500 p-2.5 font-semibold hover:shadow-lg hover:shadow-pink-500/40 lg:p-2"
        >
          <AiFillHome fontSize={24} />
          <span className="hidden lg:block">Return Home</span>
        </Link>
      </div>
    </header>
  );
}

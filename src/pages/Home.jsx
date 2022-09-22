import React, { useContext, useEffect } from "react";
import { Ball } from "../components";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Context } from "../context/AppContext";
import { Balls } from "../utils/HelperArrays";

export default function Home() {
  const { mobile, closeOpenConnections } = useContext(Context);
  useEffect(() => {
    closeOpenConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="relative h-screen overflow-hidden bg-gradient-to-br from-[#0a388e] to-[#004b68]">
      <Header />
      {Balls.map((ball, index) => (
        <Ball key={index} {...ball} />
      ))}
      <div className="relative flex h-[calc(100vh-68px)] items-center justify-center overflow-hidden">
        <div className="z-10 flex flex-col items-center gap-8 p-4">
          <h1 className="text-center text-2xl font-bold capitalize leading-relaxed text-white lg:text-7xl">
            Sing along with friends
          </h1>
          <div className="flex items-center gap-4">
            {!mobile && (
              <Link
                to={`/room/${Math.floor(100000 + Math.random() * 900000)}`}
                state={{ host: true }}
                className="rounded border border-pink-400 bg-transparent py-3 px-4 text-lg font-bold text-white shadow-lg transition duration-300 ease-out hover:bg-pink-400"
              >
                Create a Room
              </Link>
            )}
            <Link
              to="/join"
              className="rounded border border-violet-400 bg-transparent py-3 px-4 text-lg font-bold text-white shadow-lg transition duration-300 ease-in-out hover:bg-violet-400"
            >
              Join a Room
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

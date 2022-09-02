import { useContext, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import VideoCard from "./VideoCard";
import { BounceLoader } from "react-spinners";
import { Context } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Guest() {
  const { inRoom, leaveRoom } = useContext(Context);
  const navigate = useNavigate();
  const ref = useRef();
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inRoom) {
      navigate("/join");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inRoom]);

  const submit = (e) => {
    e.preventDefault();
    const query = ref.current.search.value;
    const options = {
      method: "GET",
      url: "https://youtube138.p.rapidapi.com/search/",
      params: { q: query + " karaoke", hl: "en", gl: "US" },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };
    setLoading(true);
    axios.request(options).then((res) => {
      setResults(res.data.contents);
      setLoading(false);
    });
  };

  const clearSearch = () => {
    ref.current.search.value = "";
    ref.current.search.focus();
  };

  return (
    <main className="h-screen overflow-hidden bg-[url(./assets/images/party.jpg)] bg-cover bg-right-top">
      <div className="h-full bg-black/70">
        <form
          className="mx-auto flex items-center justify-center gap-2 p-2"
          onSubmit={submit}
          ref={ref}
        >
          <div className="group relative inline-flex w-full max-w-[1020px] grow overflow-hidden rounded bg-gray-700/80 font-semibold text-white placeholder-white outline-none focus-within:bg-gray-800/90 focus-within:shadow-md">
            <input
              name="search"
              placeholder="Song Search..."
              className="w-full appearance-none overflow-hidden bg-transparent p-2 text-white outline-none"
            />
            <button
              className="absolute right-14 top-[10%] hidden rounded-full bg-slate-500/10 p-2 transition-all duration-200 ease-in-out hover:bg-red-600 group-focus-within:block"
              type="button"
              onClick={clearSearch}
            >
              <AiOutlineClose />
            </button>
            <button type="submit" className="overflow-hidden bg-gray-900 px-4">
              <BsSearch fontSize={24} />
            </button>
          </div>
          <button
            type="button"
            onClick={leaveRoom}
            className="inline-flex items-center rounded bg-red-700 py-1 px-3 text-white transition duration-300 ease-in-out hover:translate-x-4 hover:bg-red-600"
          >
            <span className="hidden md:block">Leave</span>
            <BiExit className="m-0 p-0" fontSize={32} color="#fff" />
          </button>
        </form>
        <div className="h-full overflow-auto pb-14 scrollbar-hide">
          {loading && (
            <div className="flex h-full items-center justify-center">
              <BounceLoader color="#fff" />
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3 px-2 pb-3">
            {results &&
              !loading &&
              results.map((video, index) => (
                <VideoCard key={index} data={video} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

import { useContext, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import VideoCard from "./VideoCard";
import { BounceLoader } from "react-spinners";
import { Context } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Guest() {
  const { inRoom } = useContext(Context);
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

  return (
    <main className="h-screen overflow-hidden bg-[url(./assets/images/party.jpg)] bg-cover bg-right-top">
      <form className="flex items-center gap-2 p-2" onSubmit={submit} ref={ref}>
        <div className="group inline-flex w-full grow overflow-hidden rounded bg-gray-700/80 font-semibold text-white placeholder-white outline-none focus-within:bg-gray-700/90 focus-within:shadow-md ">
          <input
            name="search"
            type="text"
            placeholder="Song Search..."
            className="outline-non w-full appearance-none overflow-hidden bg-transparent p-2 text-white"
          />
          <button type="submit" className="overflow-hidden bg-gray-900 px-4">
            <BsSearch fontSize={24} />
          </button>
        </div>
      </form>
      <div className="h-full overflow-auto pb-14 scrollbar-hide">
        {loading && (
          <div className="flex h-full items-center justify-center">
            <BounceLoader color="#fff" />
          </div>
        )}
        <div className="flex flex-col items-center gap-3 px-2 pb-3">
          {results &&
            results.map((video, index) => (
              <VideoCard key={index} data={video} />
            ))}
        </div>
      </div>
    </main>
  );
}

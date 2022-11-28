import { useContext } from "react";
import Countdown from "react-countdown";
import { Context } from "../context/AppContext";

export default function SongCountdown() {
  const { countdown, updateCurrentSong } = useContext(Context);
  if (countdown) {
    return (
      <Countdown
        date={Date.now() + 10000}
        renderer={(props) => {
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-[550px] text-white">
              {props.seconds}
            </div>
          );
        }}
        onComplete={updateCurrentSong}
      />
    );
  } else {
    return null;
  }
}

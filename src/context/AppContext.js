import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { Icons } from "../utils/ImageList";
const shortid = require("shortid");

const Context = createContext();
const socket = io("http://10.0.0.233:5000");

const Provider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [room, setRoom] = useState(null);
  const [inRoom, setInRoom] = useState(false);

  // Functions
  const createRoom = (roomId) => {
    socket.emit("ownerId", roomId);
    socket.on("ownerId", (ID) => {
      const OID = sessionStorage.getItem("_OID");
      if (OID !== ID) {
        const ownerId = shortid.generate();
        sessionStorage.setItem("_OID", ownerId);
      }
    });
    socket.emit("createRoom", {
      roomId: roomId.toUpperCase(),
      ownerId: sessionStorage.getItem("_OID"),
    });
  };

  const joinRoom = (data) => {
    setInRoom(true);
    socket.emit("joinRoom", data);
  };

  const updateQueue = (data) => {
    setQueue((queue) => [...queue, data]);
  };

  const updateCurrentSong = () => {
    const song = queue[0];
    setCurrentSong(song);
    setQueue((queue) => queue.slice(1));
  };

  const onError = () => {
    const song = queue[0];
    setCurrentSong(song);
    setQueue((queue) => queue.slice(1));
    toast.error("Bummer, something went wrong playing this song");
  };

  const addToQueue = (song) => {
    const data = {
      roomId: room,
      song,
    };
    socket.emit("addToQueue", data);
  };

  const randomIcon = () => {
    const random = Math.floor(Math.random() * Icons.length);
    return Icons[random];
  };

  // Socket events
  useEffect(() => {
    socket.on("updateQueue", (data) => {
      if (!currentSong) {
        setCurrentSong(data);
      } else {
        const inQueue = queue.find((item) => item.user.id === data.user.id);
        if (!inQueue) {
          updateQueue(data);
        } else {
          toast.info(`${data.user.name} is being a greedy bottom!`);
        }
      }
    });
    socket.on("userJoined", (data) => {
      console.log(data);
      toast(`${data.name} has joined the room`);
    });
    socket.on("roomError", () => {
      setInRoom(false);
      window.location.href = "/join";
    });
    return () => {
      socket.off("updateQueue");
      socket.off("userJoined");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, currentSong]);

  const value = {
    createRoom,
    joinRoom,
    queue,
    currentSong,
    updateCurrentSong,
    addToQueue,
    setRoom,
    inRoom,
    onError,
    randomIcon,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };

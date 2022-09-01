import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { Icons } from "../utils/HelperArrays";

const Context = createContext();
const socket = io("http://10.0.0.233:5000");

const Provider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [room, setRoom] = useState(null);
  const [host, setHost] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [inRoom, setInRoom] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  // Functions
  const createRoom = (roomId) => {
    socket.emit("createRoom", {
      roomId,
    });
  };

  const joinRoom = (data) => {
    setInRoom(true);
    setUser(data);
    socket.emit("joinRoom", data);
  };

  const leaveRoom = () => {
    setInRoom(false);
    setUser(null);
    socket.emit("leaveRoom", room);
    window.location.href = "/join";
  };

  const closeRoom = () => {
    socket.emit("closeRoom", room);
    window.location.replace("/");
  };

  const updateQueue = (data) => {
    setQueue((queue) => [...queue, data]);
  };

  const updateCurrentSong = () => {
    const song = queue[0];
    setCurrentSong(song);
    setQueue((queue) => queue.slice(1));
  };

  const onPlaybackError = () => {
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
    socket.on("disconnect", () => {
      if (user && inRoom) socket.emit("reconnect", user);
    });
    socket.on("updateQueue", (data) => {
      if (!currentSong) {
        setCurrentSong(data);
      } else {
        if (host) {
          const inQueue = queue.find((item) => item.user.id === data.user.id);
          if (!inQueue) {
            updateQueue(data);
          } else {
            toast.info(`${data.user.name} is being a greedy bottom!`);
          }
        }
      }
    });
    socket.on("userJoined", (data) => {
      if (currentSong && host) toast(`${data.name} has joined the room`);
    });
    socket.on("users", (users) => {
      setUsers(users);
    });
    socket.on("roomError", () => {
      setInRoom(false);
      setUser(null);
      alert("Room does not exist");
      window.location.replace("/join");
    });
    socket.on("roomClosed", () => {
      socket.emit("leaveRoom", room);
      setInRoom(false);
      window.location.href = "/join";
    });
    return () => {
      socket.off("updateQueue");
      socket.off("userJoined");
      socket.off("users");
      socket.off("roomError");
      socket.off("roomClosed");
      socket.off("disconnect");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, currentSong, user, users, room]);

  const value = {
    createRoom,
    joinRoom,
    leaveRoom,
    closeRoom,
    queue,
    currentSong,
    updateCurrentSong,
    addToQueue,
    setRoom,
    inRoom,
    onPlaybackError,
    randomIcon,
    setHost,
    users,
    mobile,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };

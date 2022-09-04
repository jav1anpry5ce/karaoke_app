const { createServer } = require("https");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const server = createServer({
  key: fs.readFileSync(path.join(process.env.SERVER_KEY)),
  cert: fs.readFileSync(path.join(process.env.SERVER_CERT)),
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = [];

io.on("connection", (socket) => {
  socket.on("createRoom", (roomData) => {
    const room = {
      id: roomData.roomId,
      host: socket.id,
      users: [],
    };
    if (!rooms.find((r) => r.id === room.id)) {
      rooms.push(room);
    }
    socket.join(roomData.roomId);
  });

  socket.on("joinRoom", (roomData) => {
    const room = rooms.find((r) => r.id === roomData.roomId);
    if (room) {
      const user = {
        socketId: socket.id,
        id: roomData.user.id,
        name: roomData.user.name,
        image: roomData.user.image,
      };
      room.users.push(user);
      io.to(room.host).emit("userJoined", user);
      io.to(room.host).emit("users", room.users);
      socket.join(roomData.roomId);
    } else {
      socket.emit("roomError", { message: "Room not found" });
    }
  });

  socket.on("isRoomValid", (data) => {
    const room = rooms.find((r) => r.id === data.roomId);
    if (room) {
      socket.emit("isRoomValid", { valid: true, roomData: data });
    } else {
      socket.emit("isRoomValid", { valid: false });
    }
  });

  socket.on("addToQueue", (data) => {
    const room = rooms.find((r) => r.id === data.roomId);
    if (room) {
      const user = room.users.find((u) => u.socketId === socket.id);
      const queueData = {
        user,
        song: data.song,
      };
      io.to(room.host).emit("updateQueue", queueData);
    }
  });

  socket.on("reconnect", (data) => {
    const room = rooms.find((r) => r.id === data.roomId);
    if (room) {
      const user = {
        socketId: socket.id,
        ...data.user,
      };
      room.users.push(user);
      socket.join(data.roomId);
      io.to(room.host).emit("users", room.users);
    }
  });

  socket.on("leaveRoom", (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      room.users = room.users.filter((u) => u.socketId !== socket.id);
      io.to(room.host).emit("users", room.users);
      socket.leave(roomId);
    }
  });

  socket.on("closeRoom", (roomId) => {
    const host = rooms.find((r) => r.id === roomId);
    if (host) {
      rooms.splice(rooms.indexOf(host), 1);
      io.to(host.id).emit("roomClosed");
    }
  });

  socket.on("disconnect", () => {
    const host = rooms.find((r) => r.host === socket.id);
    if (host) {
      rooms.splice(rooms.indexOf(host), 1);
      io.to(host.id).emit("roomClosed");
    } else {
      const room = rooms.find((r) =>
        r.users.find((u) => u.socketId === socket.id)
      );
      if (room) {
        room.users = room.users.filter((u) => u.socketId !== socket.id);
        io.to(room.host).emit("users", room.users);
      }
    }
  });
});

instrument(io, {
  auth: false,
});

server.listen(process.env.PORT || 5000, process.env.IP, () =>
  console.log(
    `Server has started on ${process.env.IP} using port ${process.env.PORT}`
  )
);

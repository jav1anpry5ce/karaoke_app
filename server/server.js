const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = [];

io.on("connection", (socket) => {
  socket.on("ownerId", (roomId) => {
    const ownerId = rooms.find((room) => room.id === roomId);
    if (ownerId) {
      socket.emit("ownerId", ownerId.host);
    } else {
      socket.emit("ownerId", false);
    }
  });
  socket.on("createRoom", (roomData) => {
    const room = {
      id: roomData.roomId,
      host: roomData.ownerId,
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
      io.to(roomData.roomId).emit("userJoined", user);
      io.to(roomData.roomId).emit("users", room.users);
      socket.join(roomData.roomId);
    } else {
      socket.emit("roomError", { message: "Room not found" });
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
      io.to(data.roomId).emit("updateQueue", queueData);
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
      io.to(data.roomId).emit("users", room.users);
    }
  });
  socket.on("disconnect", () => {
    const room = rooms.find((r) =>
      r.users.find((u) => u.socketId === socket.id)
    );
    if (room) {
      room.users = room.users.filter((u) => u.socketId !== socket.id);
      io.to(room.id).emit("users", room.users);
    }
  });
});

server.listen(process.env.PORT || 5000, process.env.IP, () =>
  console.log(
    `Server has started on ${process.env.IP} using port ${process.env.PORT}`
  )
);

const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");
const { Emitter } = require("@socket.io/redis-emitter");
require("dotenv").config();

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  const emitter = new Emitter(pubClient);

  const getRooms = async () => {
    const rooms = await pubClient.get("rooms");
    return JSON.parse(rooms);
  };

  io.on("connection", (socket) => {
    console.log(
      `connection established from ${socket.request.socket._peername.address}:${socket.request.socket._peername.port}`
    );
    socket.on("createRoom", async (roomData) => {
      const room = {
        id: roomData.roomId,
        host: socket.id,
        users: []
      };
      const rooms = await getRooms();
      if (!rooms.find((r) => r.id === room.id)) {
        rooms.push(room);
        pubClient.set("rooms", JSON.stringify(rooms));
      }
      socket.join(roomData.roomId);
    });

    socket.on("joinRoom", async (roomData) => {
      const rooms = await getRooms();
      const room = rooms.find((r) => r.id === roomData.roomId);
      if (room) {
        const user = {
          socketId: socket.id,
          id: roomData.user.id,
          name: roomData.user.name,
          image: roomData.user.image
        };
        room.users.push(user);
        pubClient.set("rooms", JSON.stringify(rooms));
        emitter.to(room.host).emit("userJoined", user);
        emitter.to(room.host).emit("users", room.users);
        socket.join(roomData.roomId);
      } else {
        socket.emit("roomError", { message: "Room not found" });
      }
    });

    socket.on("isRoomValid", async (data) => {
      const rooms = await getRooms();
      const room = rooms.find((r) => r.id === data.roomId);
      if (room) {
        socket.emit("isRoomValid", { valid: true, roomData: data });
      } else {
        socket.emit("isRoomValid", { valid: false });
      }
    });

    socket.on("addToQueue", async (data) => {
      const rooms = await getRooms();
      const room = rooms.find((r) => r.id === data.roomId);
      if (room) {
        const user = room.users.find((u) => u.socketId === socket.id);
        const queueData = {
          user,
          song: data.song
        };
        pubClient.set("rooms", JSON.stringify(rooms));
        emitter.to(room.host).emit("updateQueue", queueData);
      }
    });

    socket.on("reconnect", async (data) => {
      const rooms = await getRooms();
      const room = rooms.find((r) => r.id === data.roomId);
      if (room) {
        const user = {
          socketId: socket.id,
          ...data.user
        };
        room.users.push(user);
        pubClient.set("rooms", JSON.stringify(rooms));
        socket.join(data.roomId);
        emitter.to(room.host).emit("users", room.users);
      }
    });

    socket.on("leaveRoom", async (roomId) => {
      const rooms = await getRooms();
      const room = rooms.find((r) => r.id === roomId);
      if (room) {
        room.users = room.users.filter((u) => u.socketId !== socket.id);
        emitter.to(room.host).emit("users", room.users);
        socket.leave(roomId);
      }
    });

    socket.on("closeRoom", async (roomId) => {
      const rooms = await getRooms();
      const host = rooms.find((r) => r.id === roomId);
      if (host) {
        rooms.splice(rooms.indexOf(host), 1);
        pubClient.set("rooms", JSON.stringify(rooms));
        emitter.to(host.id).emit("roomClosed");
      }
    });

    socket.on("disconnect", async () => {
      const rooms = await getRooms();
      const host = rooms.find((r) => r.host === socket.id);
      if (host) {
        rooms.splice(rooms.indexOf(host), 1);
        pubClient.set("rooms", JSON.stringify(rooms));
        emitter.to(host.id).emit("roomClosed");
      } else {
        const room = rooms.find((r) =>
          r.users.find((u) => u.socketId === socket.id)
        );
        if (room) {
          room.users = room.users.filter((u) => u.socketId !== socket.id);
          emitter.to(room.host).emit("users", room.users);
        }
        pubClient.set("rooms", JSON.stringify(rooms));
      }
    });
  });

  instrument(io, {
    auth: false
  });

  server.listen(process.env.PORT || 5000, process.env.IP, () =>
    console.log(
      `Server has started on ${process.env.IP} using port ${process.env.PORT}`
    )
  );
});

import { Server } from "socket.io";
import messageService from "../services/message.service.js";

let io;

const startServerSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected");

    // Join a room
    socket.on("join room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Handle incoming chat messages
    socket.on("chat message", async (msg) => {
      console.log(`Message received in room ${msg.roomId}: ${msg.content}`);
      
      // Save the message to the database
      const savedMessage = await messageService.create(msg);

      // Emit the saved message to all clients in the room
      io.to(msg.roomId).emit("chat message", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

const getIO = () => io;

export { startServerSocket, getIO };

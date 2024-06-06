import { Server } from "socket.io";
import { createServer } from "http";

const startServerSocket = () => {
  const httpServer = createServer();
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("User connected");
  });

  io.on("message", (message) => {
    console.log(`User message:  ${message}`);
  });

  httpServer.listen(4000, () => {
    console.log("Server Socket is running on port 4000");
  });
};

export default startServerSocket;
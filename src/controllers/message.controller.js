import messageService from '../services/message.service.js';
import { Server } from "socket.io";
import { getIO } from '../WebSocket/wss.js'; // Asegúrate de exportar el objeto io desde wss.js

const sendMessage = async (req, res) => {
  const { content, userId, roomId } = req.body;
  try {
    const message = await messageService.create({ content, userId, roomId });
    
    // Emitir el mensaje a la sala correspondiente
    const io = getIO();
    io.to(roomId).emit("chat message", message);

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  const roomId = req.params.roomId;
  try {
    const messages = await messageService.getAll(roomId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  sendMessage,
  getMessages
};

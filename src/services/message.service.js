import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async ({ content, userId, roomId }) => {
  try {
    const message = await prisma.message.create({
      data: {
        content,
        userId,
        roomId
      }
    });
    return message;
  } catch (error) {
    console.error("Error creating message:", error.message);
    throw new Error("Could not create message");
  }
};

const getAll = async (roomId) => {
  try {
    const messages = await prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' }
    });
    return messages;
  } catch (error) {
    console.error("Error retrieving messages:", error.message);
    throw new Error("Could not retrieve messages");
  }
};

export default {
  create,
  getAll
};

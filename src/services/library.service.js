import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

const create = async ({ title, content, user_id }) => {
  try {
    const bookId = uuid();

    const book = await prisma.sisyphus_library.create({
      data: {
        id: bookId,
        title,
        content,
        user_id,
      },
    });

    if (!book) {
      throw new Error("Couldn't create book");
    }

    return book;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const books = await prisma.sisyphus_library.findMany();

    if (!books) {
      throw new Error("Couldn't find books");
    }

    return books;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const getId = async (id) => {
  try {
    const book = await prisma.sisyphus_library.findFirst({
      where: {
        id: id,
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    return book;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const update = async (id, { title, content, user_id }) => {
  try {
    const bookUpdated = await prisma.sisyphus_library.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
        user_id: user_id,
      },
    });

    if (!book) {
      throw new Error("Couldn't update book");
    }

    return bookUpdated;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const deletedId = async (id) => {
  try {
    const bookDeleted = await prisma.sisyphus_library.delete({
      where: {
        id: id,
      },
    });

    if (!bookDeleted) {
      throw new Error("Couldn't delete book");
    }

    return bookDeleted;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default {
  create,
  getAll,
  getId,
  update,
  deletedId,
};
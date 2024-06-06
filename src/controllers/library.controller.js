import { request } from "express";
import libraryService from "../services/library.service.js";

const create = async (req, res) => {
  try {
    const book = await libraryService.create(req.body);

    if (!book) {
      return res.status(422).json({
        message: "Book not created",
      });
    }

    return res.status(201).json({
      message: "Book created",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while creating",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const books = await libraryService.getAll();

    if (!books) {
      res.status(404).json({
        message: "Books not found",
      });
    }

    return res.status(200).json({
      message: "Books found",
      books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving books",
      error: error.message,
    });
  }
};

const getId = async (req = request, res) => {
  
  try {
    const book = await libraryService.getId(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book found",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving book",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, user_id } = req.body;

    const book = await libraryService.getId(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const dataToUpdate = {
      title: title ,
      content: content ,
      user_id: user_id ,
    };

    await libraryService.update(id, dataToUpdate);

    return res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating",
      error: error.message,
    });
  }
};

const deletedId = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await libraryService.deletedId(id);

    return res.status(200).json({
      message: "Book deleted successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting",
      error: error.message,
    });
  }
};

export default { 
    create,
    getAll,
    getId,
    update,
    deletedId,
}

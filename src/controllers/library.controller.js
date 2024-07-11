import { request } from "express";
import multer from "multer";
import path from "path";
import libraryService from "../services/library.service.js";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const uploads = upload.single("myFile");

export const uploadFile = async (req, res) => {
  return res.json({ msg: "File uploaded successfully" });
};

export const create = async (req, res) => {
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

export const getAll = async (req, res) => {
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

export const getId = async (req = request, res) => {
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

export const update = async (req, res) => {
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
      title: title,
      content: content,
      user_id: user_id,
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

export const deletedId = async (req, res) => {
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

// Nueva función para la descarga de archivos
export const downloadFile = async (req, res) => {
  const { filename } = req.params;
  const filePath = path.resolve("src/uploads", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        return res.status(500).json({
          message: "An error occurred while downloading the file",
          error: err.message,
        });
      }
    });
  });
};

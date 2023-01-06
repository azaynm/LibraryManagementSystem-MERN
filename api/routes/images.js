import { Router } from "express";
import mongoose from "mongoose";
import Book from "../models/Book.js";
import multer from "multer";
import cloudinary from "cloudinary";


const router = Router();


const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });


cloudinary.config({
  cloud_name: "dg7kcjtlu",
  api_key: "189726296272932",
  api_secret: "dMrT32-k3AGZV_6ruShFRIhGdNM"
});



router.post("/upload", upload.single("image"), async (req, res) => {

  const result = await cloudinary.v2.uploader.upload(req.file.path);

  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const category = req.body.category;
  const isbn = req.body.isbn;
  const availablity = req.body.availablity;
  const image = result.secure_url;

  //res.secure_url

  const newBookData = {
    title,
    author,
    price,
    category,
    isbn,
    availablity,
    image

  }

  const newBook = new Book(newBookData);

  newBook.save()
    .then(() => res.json('Book Added'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
})

router.get('/book/availablity/:id', async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id)
  res.json({availablity: book.availablity});
})

router.put("/books/decreaseAvailability/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id)
  const filter =  { _id: id };
  const update =  { availablity: book.availablity-1 };

  let doc = await Book.updateOne(filter, update);
  res.json(doc);
});

router.put("/books/increaseAvailability/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id)
  const filter =  { _id: id };
  const update =  { availablity: book.availablity+1 };

  let doc = await Book.updateOne(filter, update);
  res.json(doc);
});

router.get('/book/:id', async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  res.json(book);
})


router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);

  res.json(book)
})

router.get('/getImage/:id', async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  res.json(book.image);

})

export default router;
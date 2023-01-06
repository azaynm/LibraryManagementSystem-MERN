import { Router } from "express";
import mongoose from "mongoose";
import Food from "../models/Book.js";
import RentedBook from "../models/RentedBook.js"


const router = Router();

router.post("/add-book", async (req, res) => {

    const user = req.body.user;
    const bookId = req.body.bookId;
    const bookTitle = req.body.bookTitle;
    const days = req.body.days;
    const rentFee = req.body.rentFee;


    //res.secure_url

    const newBookData = {
        user,
        bookId,
        bookTitle,
        days,
        rentFee
    }

    const newBook = new RentedBook(newBookData);

    newBook.save()
        .then(async () => {
            res.json('Book Added to the List')
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/books/rented-books', async (req, res) => {
    const payments = await RentedBook.find();
    res.json(payments);
})

router.put("/books/setConfirmed/:id", async (req, res) => {
    const id = req.params.id;
    
    const filter =  { _id: id };
    const update =  { isConfirmed: true };

    let doc = await RentedBook.updateOne(filter, update);
    res.json(doc);
});

router.put("/books/setCancel/:id", async (req, res) => {
    const id = req.params.id;

    const filter = { _id: id };
    const update = { isConfirmed: false };

    let doc = await RentedBook.updateOne(filter, update);

    res.json(doc);
});


router.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e.userId == id && e.isConfirmed == false);
    res.json(cartItem);
});





router.get("/user/getTotal/:id", async (req, res) => {
    let sum = 0;
    const id = req.params.id;
    const cartItems = await Cart.find();
    const cartItem = cartItems.filter(e => e.userId == id);
    cartItem.forEach(e => {
        sum += parseFloat(e.total)
    })
    res.json(sum);
});

router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const cartItems = await RentedBook.find();
    const cartItem = cartItems.filter(e => e.user == id && e.isConfirmed == true );
    res.json(cartItem);
});



router.delete('/delete/:id', async (req, res) => {
    const result = await Cart.findByIdAndDelete(req.params.id)
    res.json(result)
})

router.get('/check/:id', async (req, res) => {
    const id = req.params.id;
    const cartItem = await Cart.findById(id);
    res.json(cartItem.image);
})


router.post('/:id', async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, {
        userId: req.body.userId,
        foodId: req.body.foodId,
        foodName: req.body.foodName,
        foodImage: req.body.foodImage,
        quantity: req.body.quantity,
        total: req.body.total,
    });


    res.json(cart);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const cartItems = await Cart.findById(id);

    res.json(cartItems)
})








export default router;
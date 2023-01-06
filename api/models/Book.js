import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type: String
    },
    author:{
        type: String
    },
    price:{
        type: String
    },
    category:{
        type: String
    },
    isbn:{
        type: String
    },
    availablity:{
        type: Number
    },
    image:{
        type: String
    }
});  

const Book = mongoose.model("Book", bookSchema);
export default Book;
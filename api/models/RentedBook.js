import mongoose from "mongoose";

const Schema = mongoose.Schema;

const rentedBookSchema = new Schema({
    user:{
        type: String
    },
    bookId:{
        type: String
    },
    bookTitle:{
        type: String
    },
    days:{
        type: String
    },
    rentFee:{
        type: String
    },
    isConfirmed:{
        type: Boolean,
        default: false
    }
});  

const RentedBook = mongoose.model("RentedBook", rentedBookSchema);
export default RentedBook;
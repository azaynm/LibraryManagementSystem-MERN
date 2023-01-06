import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    roles:{
        type:[String],
        //mongdo db allows only these three values to be added
        enum: ["user", "admin", "super_admin"],
        default: ["user"],
    },
    isAdmin:{
        type: Boolean
    }
});  

const User = mongoose.model("User", userSchema);
export default User;
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   fullname: {
    type: String,
    required: true
   },

   username: {
    type: String,
    required:true,
    unique: true
   },

   password: {
    type: String,
    required:true,
    unique: true
   },

   email: {
    type: String,
    required: true,
    unique: true,
   },

   role: {
    type: String,
    required: true,
   },

   lastloggedin: {
    type: Date,
   }
})

const UserModel = mongoose.model('user', userSchema)

export default UserModel
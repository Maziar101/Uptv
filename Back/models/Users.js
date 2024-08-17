import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Please Provide Name'],
        trim:true
    },
    username:{
        type: String,
        required: [true,'Please Provide username'],
        unique: [true,'username Already Exist'],
    },
    password:{
        type:String,
        required: [true,'Please Provide Password'],
        match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,'password must be 8 characters or more']
    },
    role:{
        type:String,
        enum:['admin','user','superAdmin'],
        default:'user'
    },
},{timestamps:true});

const Users = mongoose.model('Users',userSchema);

export default Users;
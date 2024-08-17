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
    email:{
        type: String,
        required: [true,'Please Provide Email'],
        unique: [true,'Email Already Exist'],
        match:[/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,'email invalid'],
        trim:true
    },
    password:{
        type:String,
        required: [true,'Please Provide Password'],
        match:[]
    },
    role:{
        type:String,
        enum:['admin','user','superAdmin'],
        default:'user'
    },
},{timestamps:true});

const Users = mongoose.model('Users',userSchema);

export default Users;
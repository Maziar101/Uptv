import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Please Provide Name'],
        trim:true
    },
    phone:{
        type: Number,
        required: [true,'Please Provide PhoneNumber'],
        unique: [true,'PhoneNumber Already Exist'],
        match:[/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,'phone number invalid'],
        trim:true
    },
    email:{
        type: String,
        required: [true,'Please Provide Email'],
        unique: [true,'Email Already Exist'],
        match:[/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,'email invalid'],
        trim:true
    },
    role:{
        type:String,
        enum:['admin','user','superAdmin'],
        default:'user'
    },




},{timestamps:true});

userSchema.pre('save',function(next){
});

const Users = mongoose.model('Users',userSchema);

export default Users;
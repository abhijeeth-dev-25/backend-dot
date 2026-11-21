import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname: {
        type : String,
        required : [true, 'Name is required'],
        minLength : [3, 'Name must be atleast 3 characters'],
        maxLength : [20, 'Name must be less than 20 characters'],
        trim : true,
    },
    email: {
        type : String,
        required : [true, 'Email is required'],
        unique : true,
        lowercase : true,
        trim : true,
        match : [ /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
                  'Please provide a valid email address'
                ]
    },
    password: {
        type : String,
        required : [true, 'Password is required'],
        minLength : [4, ' Password must be atleast 4 characters'],
    },
    refreshToken: {
        type : String,
    }
},{ timestamps: true});


const UserModel = mongoose.model('User', userSchema);

export default UserModel;
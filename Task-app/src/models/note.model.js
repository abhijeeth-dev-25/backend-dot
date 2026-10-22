const mongoose = require("mongoose");

const noteSchema =  new mongoose.Schema({
    title: {
        required : true,
        type: String,
    },
    subject : {
        required: true,
        type: String,
        minlength: [20, "text should be atleast 20 characters"],
    }
})

const noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;
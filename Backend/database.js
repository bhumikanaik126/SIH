const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:QBnMQHxIN8ruZgZI@cluster0.4k28i.mongodb.net/innovize");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 15
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('Users', userSchema);

module.exports = {
    User
};

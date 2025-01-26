const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please enter a valid email address'] },
    password: { type: String, required: true, minlength: [6, 'Password must be at least 6 characters long'] },
}, { timestamps: true });

module.exports = model('User', userSchema);
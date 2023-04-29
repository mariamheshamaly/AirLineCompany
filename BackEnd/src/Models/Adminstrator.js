const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
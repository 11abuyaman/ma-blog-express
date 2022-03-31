const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    featured_image: {
        type: String
    },
    summary: {
        type: String,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "category"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "comment"
    }]
});

module.exports = mongoose.model("post", postSchema);
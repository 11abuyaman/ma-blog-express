const express = require('express');
const Post = require("../models/post");
const Comment = require("../models/comment");
const Cateogry = require("../models/category");
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const { getPost } = require('./middleware/models');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})
const getCategoryFromBody = async (req, res, next) => {
    let category;
    try {
        category = await Cateogry.findById(req.body.category);
        if (category === null) {
            return res.status(400).json({ message: "Cannot find category!" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.category = category;
    next();
}
// Create new post
router.post("/new/", [getCategoryFromBody, upload.single('image')], async (req, res) => {
console.log('hisss');
    // const post = new Post({
    //     title: req.body.title,
    //     body: req.body.body,
    //     featured_image: req.file.path.replace(/\\/g, "/"),
    //     category: req.body.body,
    // });

    // try {
    //     const newPost = await post.save();
    //     res.status(201).json(newPost);
    // } catch (error) {
    //     res.status(400).json({ message: error.message });
    // }
});

// Get single post details
router.get("/:id", getPost, async (req, res) => {
    let post;
    try {
        post = await Post.findById(req.params.id).populate("comments");
        if (post === null) {
            return res.status(400).json({ message: "Cannot find post!" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.send(post);
})

// Delete post
router.delete("/:id/delete/", getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: "Post deleted!" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
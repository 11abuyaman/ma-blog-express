const express = require('express');
const Post = require("../models/post");
const router = express.Router();
const multer = require('multer');
const { getPost } = require('./middleware/models');
const { categoryDoesExist, tagDoesExist } = require('./middleware/doesExist');

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
        const posts = await Post.find()
            .select("id title tags featured_image summary")
            .populate("category", "name")
            .populate("tags", "name");
        res.send(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Create new post
router.post("/new/", [upload.single('image'), categoryDoesExist, tagDoesExist], async (req, res) => {
    const { title, summary, body, category, tags } = req.body;
    const post = new Post({
        title: title,
        body: body,
        category: category,
    });
    if (req.file)
        post.featured_image = req.file.path.replace(/\\/g, "/");

    if (summary)
        post.summary = summary;

    if (tags)
        post.tags = tags;

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

// Get single post details
router.get("/:id", getPost, async (req, res) => {
    let post;
    try {
        post = await Post.findById(req.params.id)
            .populate('tags');
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
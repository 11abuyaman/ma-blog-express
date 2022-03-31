const Category = require("../../models/category");
const Post = require("../../models/post");

const getPost = async (req, res, next) => {
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post === null) {
            return res.status(400).json({ message: "Cannot find post!" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.post = post;
    next();
}

const getCategory = async (req, res, next) => {
    let category;
    try {
        category = await Category.findById(req.params.id);
        if (category === null) {
            return res.status(400).json({ message: "Cannot find post!" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.category = category;
    next();
}

module.exports = { getPost, getCategory };
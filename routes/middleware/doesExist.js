const Cateogry = require("../../models/category");
const Tag = require("../../models/tag");

const categoryDoesExist = async (req, res, next) => {
    try {
        doesExist = await Cateogry.exists({ _id: req.body.category });
        if (!doesExist) {
            return res.status(400).json({ message: "Category does not exist!" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    next();
}

const postDoesExist = async (req, res, next) => {
    try {
        doesExist = await Post.exists({ _id: req.body.category });
        if (!doesExist) {
            return res.status(400).json({ message: "Post does not exist!" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    next();
}

const tagDoesExist = async (req, res, next) => {
    try {
        if (typeof (req.body.tags) === "object") {
            req.body.tags = [...new Set(req.body.tags)];
            for (let i = 0; i < req.body.tags.length; i++) {
                doesExist = await Tag.exists({ _id: req.body.tags[i] });
                if (!doesExist)
                    return res.status(400).json({ message: "Tag does not exist!" });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    next();
}

module.exports = { categoryDoesExist, tagDoesExist };
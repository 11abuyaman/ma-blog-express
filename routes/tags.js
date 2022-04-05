const express = require('express');
const Tag = require("../models/tag");
const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
    try {
        const tags = await Tag.find();
        res.send(tags);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Create new tag
router.post("/new/", async (req, res) => {
    console.log(req.body);
    const tag = new Tag({
        name: req.body.name,
    });

    try {
        const newTag = await tag.save();
        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
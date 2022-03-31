const express = require('express');
const Cateogry = require("../models/category");
const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Cateogry.find();
        res.send(categories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Create new category
router.post("/new/", async (req, res) => {
    console.log(req.body);
    const category = new Cateogry({
        name: req.body.name,
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
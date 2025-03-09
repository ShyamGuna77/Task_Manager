const express = require('express')

const Todo = require('../models/Todo')
const auth = require('../middleware/auth')

const router = express.Router()

router.use(auth)

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ date: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single todo
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new todo
router.post("/", async (req, res) => {
  try {
    const { title, description, date, priority } = req.body;

    const newTodo = new Todo({
      title,
      description,
      date: date || Date.now(),
      priority: priority || "medium",
      user: req.userId,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update todo
router.put("/:id", async (req, res) => {
  try {
    const { title, description, date, priority, completed } = req.body;

    // Find and update the todo
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      {
        title,
        description,
        date,
        priority,
        completed,
      },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports= router
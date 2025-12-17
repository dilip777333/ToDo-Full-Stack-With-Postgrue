const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/todo.controller");

// GET all todos
router.get("/", TodoController.getAllTodos);

// CREATE todo
router.post("/", TodoController.createTodo);

// UPDATE todo (title / description / future fields)
router.put("/:id", TodoController.updateTodo);

// COMPLETE todo (ACTION)
router.post("/:id/complete", TodoController.completeTodo);

// DELETE single todo
router.delete("/:id", TodoController.deleteTodo);

module.exports = router;

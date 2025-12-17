const TodoService = require("../services/todo.service");
const {
  createTodoSchema,
  updateTodoSchema,
} = require("../validations/todo.validation");

/**
 * Create Todo
 */
const createTodo = async (req, res) => {
  const { error, value } = createTodoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const todo = await TodoService.createTodo(value);
  res.status(201).json(todo);
};

/**
 * Get All Todos
 */
const getAllTodos = async (req, res) => {
  const todos = await TodoService.getAllTodos();
  res.json(todos);
};

/**
 * Update Todo (title / description / future fields)
 */
const updateTodo = async (req, res) => {
  const { error, value } = updateTodoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const todo = await TodoService.updateTodo(req.params.id, value);
  res.json(todo);
};

/**
 * Mark Todo as Completed (ACTION)
 * Only uses :id, no body required
 */
const completeTodo = async (req, res) => {
  const todo = await TodoService.completeTodo(req.params.id);
  res.json(todo);
};

/**
 * Delete Single Todo
 */
const deleteTodo = async (req, res) => {
  const todo = await TodoService.deleteTodo(req.params.id);
  res.json(todo);
};

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  completeTodo,
  deleteTodo,
};

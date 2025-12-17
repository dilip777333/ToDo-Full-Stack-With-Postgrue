const TodoModel = require("../models/todo.model");

const createTodo = async (data) => {
  return await TodoModel.createTodo(data);
};

const getAllTodos = async () => {
  return await TodoModel.getAllTodos();
};

const updateTodo = async (id, data) => {
  const updated = await TodoModel.updateTodo(id, data);
  if (!updated) {
    throw new Error("Todo not found");
  }
  return updated;
};

const completeTodo = async (id) => {
  const todo = await TodoModel.completeTodo(id);
  if (!todo) {
    throw new Error("Todo not found");
  }
  return todo;
};

const deleteTodo = async (id) => {
  const deleted = await TodoModel.deleteTodo(id);
  if (!deleted) {
    throw new Error("Todo not found");
  }
  return deleted;
};

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  completeTodo,
  deleteTodo,
};

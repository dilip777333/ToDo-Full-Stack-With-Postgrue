const db = require("../config/db");


const createTodo = async ({ title, description }) => {
  const query = `
    INSERT INTO todos (title, description)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [title, description || null];
  const { rows } = await db.query(query, values);
  return rows[0];
};


const getAllTodos = async () => {
  const query = `
    SELECT *
    FROM todos
    ORDER BY created_at DESC
  `;
  const { rows } = await db.query(query);
  return rows;
};

const updateTodo = async (id, data) => {
  const { title, description } = data;

  const query = `
    UPDATE todos
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description)
    WHERE id = $3
    RETURNING *
  `;

  const values = [
    title ?? null,
    description ?? null,
    id,
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};


const completeTodo = async (id) => {
  const query = `
    UPDATE todos
    SET is_completed = true
    WHERE id = $1
    RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};


const deleteTodo = async (id) => {
  const query = `
    DELETE FROM todos
    WHERE id = $1
    RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  completeTodo, 
  deleteTodo,
};

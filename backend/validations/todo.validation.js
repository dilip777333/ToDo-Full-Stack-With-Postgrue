const Joi = require("joi");

/**
 * Create Todo Validation
 */
const createTodoSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().allow("", null),
});

/**
 * Update Todo Validation
 * (NO is_completed here)
 */
const updateTodoSchema = Joi.object({
  title: Joi.string().trim().min(1).optional(),
  description: Joi.string().allow("", null).optional(),
  is_completed: Joi.boolean().optional(),
}).min(1);

module.exports = {
  createTodoSchema,
  updateTodoSchema,
};

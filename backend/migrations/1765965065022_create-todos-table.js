exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("todos", {
    id: "id",

    title: {
      type: "varchar(255)",
      notNull: true,
    },

    description: {
      type: "text",
    },

    is_completed: {
      type: "boolean",
      notNull: true,
      default: false,
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("todos");
};

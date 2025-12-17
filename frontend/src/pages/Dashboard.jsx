import { useState } from "react";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";

function Dashboard() {
  const [editingTodo, setEditingTodo] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
            My Todo Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Organize your tasks with style and efficiency
          </p>
        </div>

        {/* Form Section */}
        <div className="mb-8">
          <TodoForm
            editingTodo={editingTodo}
            cancelEdit={() => setEditingTodo(null)}
          />
        </div>

        {/* Todo List Section */}
        <div>
          <TodoList onEdit={(todo) => setEditingTodo(todo)} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

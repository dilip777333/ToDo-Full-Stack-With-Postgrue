import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TodoItem from "./TodoItem";
import TodoService from "@/services/todo.service";

function TodoList({ onEdit }) {
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: TodoService.getAll,
  });

  const completeMutation = useMutation({
    mutationFn: TodoService.complete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: TodoService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 font-semibold">Loading your todos...</p>
      </div>
    );
  }

  if (!todos.length) {
    return (
      <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-dashed border-purple-300">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Todos Yet!</h3>
        <p className="text-gray-500 text-lg">
          Start by creating your first task above
        </p>
      </div>
    );
  }

  const completedCount = todos.filter((t) => t.is_completed).length;
  const totalCount = todos.length;

  return (
    <div>
      {/* Stats Header */}
      <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border-0">
        <div className="flex items-center justify-between">
          <div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Tasks
              </h2>
              <p className="text-sm text-gray-600">
                {completedCount} of {totalCount} completed
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <div className="text-xs text-gray-600 font-semibold">Total</div>
              <div className="text-2xl font-bold text-purple-600">{totalCount}</div>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
              <div className="text-xs text-gray-600 font-semibold">Done</div>
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Todo Items */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={(id) => deleteMutation.mutate(id)}
            onComplete={(id) => completeMutation.mutate(id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;

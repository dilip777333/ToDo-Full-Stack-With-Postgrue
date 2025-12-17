import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function TodoItem({ todo, onEdit, onDelete, onComplete }) {
  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-pink-500 to-rose-500",
  ];

  // Use todo.id to consistently pick a gradient
  const gradientIndex = todo.id % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <Card
      className={`animate-fadeIn transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-0 overflow-hidden ${
        todo.is_completed
          ? "bg-gray-100/80 backdrop-blur-sm"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      {/* Colorful top border */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Custom Checkbox with gradient */}
            <div className="pt-1">
              <Checkbox
                checked={todo.is_completed}
                onCheckedChange={() => onComplete(todo.id)}
                disabled={todo.is_completed}
                className={`w-6 h-6 border-2 ${
                  todo.is_completed
                    ? "border-green-500"
                    : `border-${gradient.split("-")[1]}-500`
                }`}
              />
            </div>

            <div className="flex-1">
              <h3
                className={`text-lg font-bold mb-1 ${
                  todo.is_completed
                    ? "line-through text-gray-400"
                    : `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`
                }`}
              >
                {todo.title}
              </h3>

              {todo.description && (
                <p
                  className={`text-sm leading-relaxed ${
                    todo.is_completed
                      ? "line-through text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {todo.description}
                </p>
              )}

              {/* Completion badge */}
              {todo.is_completed && (
                <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(todo)}
              disabled={todo.is_completed}
              className={`${
                todo.is_completed
                  ? "opacity-50 cursor-not-allowed"
                  : `border-2 border-${gradient.split("-")[1]}-300 hover:bg-gradient-to-r hover:${gradient} hover:text-white hover:border-transparent`
              } font-semibold transition-all duration-200`}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(todo.id)}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TodoItem;

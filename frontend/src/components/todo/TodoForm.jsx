import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TodoService from "@/services/todo.service";

function TodoForm({ editingTodo, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  // Populate form when editingTodo changes
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTodo]);

  const createMutation = useMutation({
    mutationFn: TodoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
      setDescription("");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => TodoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
      setDescription("");
      cancelEdit();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTodo) {
      updateMutation.mutate({
        id: editingTodo.id,
        data: { title, description },
      });
    } else {
      createMutation.mutate({ title, description });
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    cancelEdit();
  };

  const isEditing = !!editingTodo;
  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  return (
    <Card className="shadow-2xl border-0 overflow-hidden backdrop-blur-sm bg-white/90">
      <CardHeader
        className={`rounded-t-lg relative overflow-hidden ${
          isEditing
            ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
            : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
        }`}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <CardTitle className="text-white text-2xl font-bold relative z-10">
          {isEditing ? "Edit Your Todo" : "Create New Todo"}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 bg-gradient-to-br from-white to-purple-50/30">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Title
            </label>
            <Input
              placeholder="Enter your task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <Textarea
              placeholder="Add more details about your task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200 min-h-[100px]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 font-semibold transition-all duration-200"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              className={`${isEditing ? "flex-1" : "w-full"} ${
                isEditing
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              } text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]`}
              disabled={isLoading}
            >
              {isLoading
                ? isEditing
                  ? "Updating..."
                  : "Adding..."
                : isEditing
                ? "Update Todo"
                : "Add Todo"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default TodoForm;

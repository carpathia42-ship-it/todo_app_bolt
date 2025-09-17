import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/todo';
import { CheckCircle2 } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onUpdateTodo: (id: string, text: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleTodo,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">タスクはありません</p>
        <p className="text-gray-400 text-sm mt-2">新しいタスクを追加してみましょう</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={onToggleTodo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};
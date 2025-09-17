import React from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { ListTodo, Trash2 } from 'lucide-react';

function App() {
  const {
    todos,
    filter,
    stats,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <ListTodo size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Todo App</h1>
            <h1 className="text-3xl font-bold text-gray-800">タスク管理アプリ</h1>
          </div>
          <p className="text-gray-600">シンプルで美しいタスク管理</p>
        </div>

        {/* 新しいタスク入力 */}
        <TodoInput onAddTodo={addTodo} />

        {/* フィルターと統計 */}
        <div className="mb-6">
          <TodoFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
          />
        </div>

        {/* タスクリスト */}
        <div className="mb-6">
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
          />
        </div>

        {/* 完了済みタスクをクリア */}
        {stats.completed > 0 && (
          <div className="text-center">
            <button
              onClick={clearCompleted}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-200"
            >
              <Trash2 size={16} />
              完了済みタスクをすべて削除
            </button>
          </div>
        )}

        {/* フッター */}
        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>© 2025 Todo App - シンプルで美しいタスク管理</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
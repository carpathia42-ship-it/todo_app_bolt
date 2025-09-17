import React from 'react';
import { useAuth } from './hooks/useAuth';
import { useTodos } from './hooks/useTodos';
import { Auth } from './components/Auth';
import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { Trash2, Loader2 } from 'lucide-react';

function App() {
  const { user, loading: authLoading } = useAuth();
  const {
    todos,
    filter,
    stats,
    loading: todosLoading,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  // 認証状態の読み込み中
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="mx-auto text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // 未認証の場合は認証画面を表示
  if (!user) {
    return <Auth />;
  }

  // 認証済みの場合はメインアプリを表示
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* ウェルカムメッセージ */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            こんにちは！今日も効率的にタスクを管理しましょう
          </p>
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

        {/* ローディング表示 */}
        {todosLoading && (
          <div className="text-center py-8">
            <Loader2 size={32} className="mx-auto text-blue-500 animate-spin mb-2" />
            <p className="text-gray-500">タスクを読み込み中...</p>
          </div>
        )}

        {/* タスクリスト */}
        {!todosLoading && (
          <div className="mb-6">
            <TodoList
              todos={todos}
              onToggleTodo={toggleTodo}
              onUpdateTodo={updateTodo}
              onDeleteTodo={deleteTodo}
            />
          </div>
        )}

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
          <p>© 2025 タスク管理アプリ - 安全で使いやすいタスク管理</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
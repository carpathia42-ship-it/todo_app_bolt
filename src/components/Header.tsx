import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User, ListTodo } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-2xl">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
              <ListTodo size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">タスク管理アプリ</h1>
          </div>

          {/* ユーザー情報とログアウト */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User size={16} />
              <span className="hidden sm:inline">{user?.email}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="ログアウト"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">ログアウト</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
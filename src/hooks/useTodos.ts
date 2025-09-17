import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Todo, FilterType } from '../types/todo';
import { useAuth } from './useAuth';

export const useTodos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(false);

  // データベースからタスクを取得
  const fetchTodos = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTodos: Todo[] = data.map(todo => ({
        id: todo.id,
        text: todo.text,
        completed: todo.completed,
        createdAt: new Date(todo.created_at),
        updatedAt: new Date(todo.updated_at),
      }));

      setTodos(formattedTodos);
    } catch (error) {
      console.error('タスクの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  // ユーザーがログインしたらタスクを取得
  useEffect(() => {
    if (user) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [user]);

  // タスクを追加
  const addTodo = async (text: string) => {
    if (!user || text.trim() === '') return;

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([
          {
            user_id: user.id,
            text: text.trim(),
            completed: false,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const newTodo: Todo = {
        id: data.id,
        text: data.text,
        completed: data.completed,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      setTodos(prev => [newTodo, ...prev]);
    } catch (error) {
      console.error('タスクの追加に失敗しました:', error);
    }
  };

  // タスクを更新
  const updateTodo = async (id: string, text: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update({ text: text.trim() })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTodos(prev => prev.map(todo => 
        todo.id === id 
          ? { ...todo, text: text.trim(), updatedAt: new Date() }
          : todo
      ));
    } catch (error) {
      console.error('タスクの更新に失敗しました:', error);
    }
  };

  // タスクの完了状態を切り替え
  const toggleTodo = async (id: string) => {
    if (!user) return;

    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTodos(prev => prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      ));
    } catch (error) {
      console.error('タスクの更新に失敗しました:', error);
    }
  };

  // タスクを削除
  const deleteTodo = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('タスクの削除に失敗しました:', error);
    }
  };

  // 完了済みタスクをすべて削除
  const clearCompleted = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('user_id', user.id)
        .eq('completed', true);

      if (error) throw error;

      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch (error) {
      console.error('完了済みタスクの削除に失敗しました:', error);
    }
  };

  // フィルタリングされたタスク
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // 統計
  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return {
    todos: filteredTodos,
    filter,
    stats,
    loading,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  };
};
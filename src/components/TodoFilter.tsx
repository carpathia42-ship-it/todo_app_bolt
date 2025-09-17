import React from 'react';
import { FilterType } from '../types/todo';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  stats,
}) => {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'すべて', count: stats.total },
    { key: 'active', label: '未完了', count: stats.active },
    { key: 'completed', label: '完了済み', count: stats.completed },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* 統計 */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">{stats.total}</span> 件のタスク
          {stats.completed > 0 && (
            <span className="ml-2">
              (<span className="font-medium text-green-600">{stats.completed}</span> 件完了)
            </span>
          )}
        </div>

        {/* フィルター */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {filters.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                currentFilter === key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {label}
              {count > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                  currentFilter === key
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
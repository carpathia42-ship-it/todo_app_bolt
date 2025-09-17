import React, { useState } from 'react';
import { Check, Edit2, Trash2, X } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleUpdate = () => {
    if (editText.trim() && editText.trim() !== text) {
      onUpdate(id, editText.trim());
    }
    setIsEditing(false);
    setEditText(text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`group bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md ${completed ? 'opacity-60' : ''}`}>
      <div className="p-4 flex items-center gap-3">
        {/* チェックボックス */}
        <button
          onClick={() => onToggle(id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
            completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {completed && <Check size={14} />}
        </button>

        {/* テキスト */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={handleKeyPress}
              className="w-full px-2 py-1 text-gray-700 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
              autoFocus
            />
          ) : (
            <span
              className={`block text-gray-700 break-words ${
                completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {text}
            </span>
          )}
        </div>

        {/* アクションボタン */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isEditing ? (
            <button
              onClick={handleCancel}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200"
              title="キャンセル"
            >
              <X size={16} />
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                title="編集"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(id)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200"
                title="削除"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
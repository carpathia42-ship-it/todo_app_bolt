/*
  # Todoアプリケーション用データベーススキーマ

  1. 新しいテーブル
    - `todos`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `text` (text, タスクの内容)
      - `completed` (boolean, 完了状態)
      - `created_at` (timestamptz, 作成日時)
      - `updated_at` (timestamptz, 更新日時)

  2. セキュリティ
    - todosテーブルでRLSを有効化
    - 認証されたユーザーが自分のタスクのみアクセス可能なポリシーを追加
*/

-- todosテーブルの作成
CREATE TABLE IF NOT EXISTS todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLSを有効化
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- ユーザーが自分のタスクのみ閲覧可能
CREATE POLICY "Users can view own todos"
  ON todos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ユーザーが自分のタスクのみ作成可能
CREATE POLICY "Users can create own todos"
  ON todos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ユーザーが自分のタスクのみ更新可能
CREATE POLICY "Users can update own todos"
  ON todos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ユーザーが自分のタスクのみ削除可能
CREATE POLICY "Users can delete own todos"
  ON todos
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- updated_atを自動更新するトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_atトリガーの作成
CREATE TRIGGER update_todos_updated_at
  BEFORE UPDATE ON todos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
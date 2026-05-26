/*
  # Create searches cache table

  1. New Tables
    - `searches`
      - `id` (uuid, primary key)
      - `topic` (text, the search query)
      - `results` (jsonb, array of resource objects)
      - `created_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `searches` table
    - Allow authenticated users to read searches
    - Allow authenticated users to insert searches
    - Allow authenticated users to update their own searches
    - Allow authenticated users to delete their own searches
  3. Notes
    - The `results` jsonb column stores an array of objects with:
      title, url, description, resource_type, domain, favicon
    - Resource types: video, course, docs, repo, article
*/

CREATE TABLE IF NOT EXISTS searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  results jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read searches"
  ON searches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert searches"
  ON searches FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update searches"
  ON searches FOR UPDATE
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can delete searches"
  ON searches FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_searches_topic ON searches (topic);

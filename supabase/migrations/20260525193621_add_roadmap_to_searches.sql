/*
  # Add roadmap column to searches table

  1. Modified Tables
    - `searches`
      - Add `roadmap` (jsonb, nullable) column to store AI-generated learning roadmaps
  2. Notes
    - The `roadmap` jsonb column stores an object with:
      topic, summary, difficulty, estimated_time, and steps array
    - Each step has: step number, title, description, duration, skills array, resources array
    - Nullable since existing cached searches won't have roadmap data
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'searches' AND column_name = 'roadmap'
  ) THEN
    ALTER TABLE searches ADD COLUMN roadmap jsonb;
  END IF;
END $$;

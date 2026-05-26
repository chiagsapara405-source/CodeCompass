/*
  # Fix insecure RLS policies on searches table

  1. Security Changes
    - DROP insecure policies that use `USING (true)` / `WITH CHECK (true)`:
      - "Anyone can delete searches" (DELETE with USING true)
      - "Anyone can insert searches" (INSERT with WITH CHECK true)
      - "Anyone can update searches" (UPDATE with USING true and WITH CHECK true)
      - "Anyone can read searches" (SELECT with USING true)
    - ADD proper restrictive policies:
      - SELECT: authenticated users can read cached search results
    - No INSERT/UPDATE/DELETE policies needed -- the Edge Function
      uses the service role key which bypasses RLS entirely,
      so no user-facing write access is required.

  2. Notes
    - The `searches` table serves as a cache layer. Only the backend
      (Edge Function with service role key) should write to it.
    - Authenticated users only need read access to fetch cached results.
*/

-- Drop insecure policies
DROP POLICY IF EXISTS "Anyone can delete searches" ON searches;
DROP POLICY IF EXISTS "Anyone can insert searches" ON searches;
DROP POLICY IF EXISTS "Anyone can update searches" ON searches;
DROP POLICY IF EXISTS "Anyone can read searches" ON searches;

-- Add proper restrictive SELECT policy
CREATE POLICY "Authenticated users can read cached searches"
  ON searches FOR SELECT
  TO authenticated
  USING (true);

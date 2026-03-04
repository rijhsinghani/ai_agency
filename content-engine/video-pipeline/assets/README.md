# Video Pipeline Assets

Place brand asset files in this directory:

- `brand.cube` — CUBE LUT file for color correction. Until added, the color correction step (Step 7) is a pass-through that copies the input unchanged.
- `intro.mp4` — 5-second branded intro clip. Until added, the intro/outro splice step (Step 8) is a pass-through.
- `outro.mp4` — Branded outro clip. Required alongside intro.mp4 for Step 8 to activate.

All assets are optional. The pipeline runs end-to-end without them; those steps degrade gracefully to pass-throughs.

# Word Wizards (Vertical Slice)

A hybrid-ready mobile game prototype where spelling words casts spells against theatrical bosses. The repo is structured for a React + Vite web build that can be wrapped with Capacitor for iOS/Android.

## Highlights
- **Combat loop:** Draft words from a letter pool, discover new spells, and recast them with mana and a growing combo multiplier.
- **Boss pressure:** Three themed bosses (Leximancer, Queen Anagramma, Silent Editor) with distinct quirks, tells, and a counterattack turn.
- **Player agency:** Shields, mana regen, rerollable letter pools, and spell traits (palindromes, rare letters, weakness hits) that change damage and rewards.
- **Mobile-friendly UI:** Responsive layout, tactile tile styling, and lightweight CSS with no external UI kit.
- **Capacitor ready:** `capacitor.config.ts` preconfigured for wrapping the Vite build.

## Getting started
1. Install dependencies (from a networked environment):
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Build for web/Capacitor:
   ```bash
   npm run build
   ```
4. Initialize native platforms (from a machine with Android/iOS toolchains):
   ```bash
   npx cap add ios
   npx cap add android
   npx cap sync
   ```

## Next steps
- Wire a real dictionary validator to gate damage and award bigger bonuses for rare words.
- Build the Forge/upgrade screen between bosses (augment spells, add mana shards, reroll perks).
- Persist runs + analytics events and add hooks for RevenueCat/IAPs.
- Layer in VFX (hit sparks, screen shake, haptics) and a soundtrack loop.

## License
MIT

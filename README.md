# Word Wizards (Vertical Slice)

A hybrid-ready mobile game prototype where spelling words casts spells against theatrical bosses. The repo is structured for a React + Vite web build that can be wrapped with Capacitor for iOS/Android.

## Highlights
- **Core loop demo:** Draft words from a letter pool, discover new spells, and recast them with mana.
- **Boss variety:** Three themed bosses (Leximancer, Queen Anagramma, Silent Editor) with distinct quirks.
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
- Add validation against a dictionary service to score real words.
- Implement enemy attack turns and player shields/blocks.
- Wire analytics + persistence for learned spells.
- Hook up RevenueCat/ads as desired.

## License
MIT

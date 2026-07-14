---
name: Esdras App
description: Architecture decisions, patterns, and non-obvious constraints for the Esdras mobile app
---

## App overview
Gamified SDA 28-beliefs quiz app. Expo / React Native, frontend-only, AsyncStorage persistence. 4-tab layout: Início, Leitura, Quiz, Ajustes. Dark manuscript theme with per-profile color themes.

## Tab layout
- Erros tab was removed; wrong-answer data is kept in context but has no dedicated tab.
- Tab bar height: `BottomTabBarHeightContext` returns 0 on Expo web → use `Platform.OS === 'web' ? 84 : tabCtxHeight`.

## Dashboard
- Subtitle is "O Escriba Versado".

## Profile model
- `Profile.idade` is optional (`idade?: number`); field was removed from ProfileForm and context.
- `readDoctrines: number[]` on `ProfileData` tracks per-doctrine read state independently of `dayProgress.readingCompleted`.
- `normalizeProfileData()` in AppContext handles backward compat migration.
- `completeBlock` preserves `readDoctrines`.
- Avatar model: `MALE_AVATARS` / `FEMALE_AVATARS` (5 each), selected via gender. Helpers: `profileAvatar()`, `getAvatarsForGender()`.

## ProfileForm — step wizard (full-screen modal)
- ProfileForm is a 3-step full-screen wizard (name → gender → avatar), NOT a flat form.
- API: `onSubmit(nome, gender, avatar)` and `onCancel()`. No `submitLabel` prop.
- Used in two places: ajustes.tsx (Modal presentationStyle="fullScreen") and onboarding.tsx (same pattern).
- **Why full-screen:** iOS keyboard was covering the "Criar Perfil" button in the old bottom-sheet modal. Each step has very little content + a pinned footer button, so keyboard never covers an action.
- Onboarding: intro slides are horizontal scroll pages; tapping "Criar Perfil →" on the last slide opens the ProfileForm modal. `KeyboardAwareScrollViewCompat` was removed from onboarding.

## Leitura screen
- Hierarchy (accordions for "28 Crenças" and "Profecias de Daniel") starts **closed** — user opens manually.
- Confirm-read button is in the header top-right as a pill ("✓ Confirmar leitura"), not a footer. Opacity 30% until scrolled to bottom, full + gold when ready.
- After confirmation, shows "✓ Leitura confirmada" pill in same position.
- Footer pattern was abandoned — button is in normal header flow (no `position:absolute`).

## Quiz
- Questions are shuffled (Fisher-Yates) at the start of each block via `shuffle(raw).map(shuffleOptions)`.
- `shuffleOptions()` strips "a) " prefixes, shuffles texts, relabels with new letters, updates `resposta_correta` accordingly.
- V/F questions are NOT shuffled (fixed "Verdadeiro"/"Falso" options).
- `isCorrect` checks `selected.startsWith(`${rc})`)` for MC, direct string match for V/F.

## Aparência (Ajustes)
- Theme picker is collapsible (`showThemes` state, toggled via section header row with ⌄/› chevron).

## Colors
- All palettes carry `scrim` and `isDark` tokens.
- `ClassicTabLayout` uses `colors.isDark`.

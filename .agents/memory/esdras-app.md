---
name: Esdras Mobile App
description: Gamified SDA 28 Fundamental Beliefs quiz app (Expo/React Native). All state in AsyncStorage, no backend.
---

## Architecture
- Frontend-only: AsyncStorage for all persistence via `context/AppContext.tsx`
- Artifact: `artifacts/mobile`, workflow: `artifacts/mobile: expo`
- 4 tabs: index (Painel/Dashboard), leitura, quiz, ajustes. **"Erros" tab was deliberately removed** (route file deleted); `errorScroll` data logic stays in context on purpose — don't re-add the tab without being asked.
- App subtitle on the dashboard is "O Escriba Versado" (user-chosen identity), not "28 Crenças Fundamentais".
- First-launch onboarding at `app/onboarding.tsx`, gated by a redirect in `app/_layout.tsx` (`RootLayoutNav` uses `useSegments`/`router.replace` — sends to /onboarding when no active profile).

## Multi-profile model (important)
- Multiple local profiles: `@esdras_profiles` (list), `@esdras_active_profile` (id). Per-profile progress blob under `@esdras_data_<id>` = ProfileData {currentDoctrineId, completedDoctrines, dayProgress, errorScroll}.
- **Progress is independent per profile.** Profile = {id, nome, idade, gender:'male'|'female', avatar?, themeId?}. Avatar = one of 5 skin-tone emoji per gender (required at creation; `profileAvatar()` falls back to plain 👨/👩 for old profiles).
- **Why the atomic-swap pattern in switchProfile/deleteProfile:** load target ProfileData FIRST, then set `activeProfileId` + `data` together. Setting the id before data loads creates a mixed-state window where `commit` persists the wrong profile's data under the new key.

## Time-lock vs Free mode (global toggle `@esdras_time_lock`, default true)
- Time-lock ON = "Trilha do Aprendizado Diário": strict hour gates + next-day repeat/advance.
- Free mode OFF: all gates open (getBlockAvailability takes `timeLockEnabled` 3rd arg → mins become 0); on provão pass advance to next unlocked doctrine immediately; on any fail the failed block resets to `null` for immediate retry (vs `false`/locked in lock mode).
- **Day-change (`applyDayChange`) only runs in lock mode.** Applied on: initial load, profile load/switch, a per-minute `tick` day-boundary effect, and when re-enabling lock mode via `setTimeLockEnabled(true)`. **Why the tick effect + setTimeLockEnabled normalization exist:** applyDayChange used to only fire on load, so a date change while the app stayed open (or toggling back to lock mode) left stale day state.

## Content gating
- `MAX_UNLOCKED_DOCTRINE = 2` (types/index.ts): only doctrines 1 & 2 have full text + quiz; 3–28 are title-only ("Em breve"/locked) in the leitura grouped list.
- `THEME_GROUPS` (constants/doctrines.ts): 6 official thematic groups covering all 28 ids — used by leitura list layout.

## Quiz block rules
- Block 1: 5 questions (2 certa + 2 vf + 1 apologetica), **80% to pass** (`BLOCK_PASS_RATIO` in types/index.ts)
- Block 2: 5 questions (3 certa + 2 incorreta), **80% to pass**
- Provão: 10 random from current + past doctrines, 100% to pass; failures → errorScroll
- Doctrine 2 has 2 V/F questions (ids 206, 208) so block1's 2-vf requirement is satisfiable.

## Time gates (normal / second attempt) — lock mode only
- Reading: 5h / 5h · Block 1: 10h / 5h · Block 2: 15h / 5h · Provão: 19h / 5h
- **Why:** Second attempt = user failed provão the previous day; gates open early as grace.

## Question format
- Multiple choice: opcoes = ['a) ...', 'b) ...', ...], resposta_correta = 'a'|'b'|'c'|'d'
- V/F: opcoes = ['Verdadeiro', 'Falso'], resposta_correta = 'Verdadeiro'|'Falso'

## Theme system (per-profile, 4 themes)
- 4 themes in `constants/colors.ts` (`themes` record + `THEMES` metadata for the picker): `darkNight` (default, Pergaminho da Noite), `sinai` (Sinai Sólido), `pergaminho` (Pergaminho Antigo, light), `templo` (Luz do Templo, light). `ThemeId`/`DEFAULT_THEME_ID` live in `types/index.ts`.
- **Theme is stored per-profile:** `themeId` is a field on `Profile` (persisted in `@esdras_profiles`), NOT a separate key. `setThemeId` maps over profiles and re-persists the list; switching profiles auto-switches theme. Picker UI is the "Aparência" section in `ajustes.tsx`.
- **`useColors` reads the active theme from AppContext** via `useContext(AppContext)` (AppContext is exported) with a null-safe fallback to `DEFAULT_THEME_ID` — so it works outside the provider (e.g. error boundary). Each palette carries `isDark` + `scrim` tokens so light themes don't get dark-hardcoded overlays/tab-bar tint.
- **Why palettes carry `isDark`/`scrim`:** any full-screen scrim (leitura success overlay) and the tab-bar blur tint must follow the *selected* theme, not device `useColorScheme()` — otherwise a light theme shows a dark scrim / wrong blur.
- Tab layout uses `isLiquidGlassAvailable()` (expo-glass-effect) to switch NativeTabs (iOS 26) vs ClassicTabLayout; ClassicTabLayout derives dark/light from `colors.isDark`.
- **Tab bar is absolute-positioned** → every scroll screen needs paddingBottom ≥100, and absolute footers (leitura detail) must offset `bottom` by `BottomTabBarHeightContext` (`?? 0` for the NativeTabs path). `@react-navigation/bottom-tabs` is a direct dep pinned to expo-router's transitive version.
- `components/ProfileForm.tsx` is shared by onboarding + ajustes (add-profile modal).
- No debug/test panel: the dashboard (`index.tsx`) no longer has the advance-hour/reset panel. `setDebugHour`/`resetProgress` still exist in context but are unused by UI.

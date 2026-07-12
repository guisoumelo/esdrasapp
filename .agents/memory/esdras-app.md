---
name: Esdras Mobile App
description: Gamified SDA 28 Fundamental Beliefs quiz app (Expo/React Native). All state in AsyncStorage, no backend.
---

## Architecture
- Frontend-only: AsyncStorage for all persistence via `context/AppContext.tsx`
- Artifact: `artifacts/mobile`, workflow: `artifacts/mobile: expo`
- 4 tabs: index (Painel/Dashboard), leitura, quiz, erros

## Theme
- Always dark: `#0D1B2A` (navy), `#C9A227` (gold), `#F0E6D3` (parchment)
- Colors in `constants/colors.ts`, accessed via `hooks/useColors.ts`

## Key files
- `types/index.ts` — Question, Doctrine, WrongAnswer, DayProgress, BlockAvailability, Rank, RANKS, getRank(), getBlockAvailability()
- `constants/doctrines.ts` — 28 doctrines, selectQuestionsForBlock(), shuffleArray(), getDoctrine()
- `context/AppContext.tsx` — AppProvider, useApp() hook

## Quiz block rules
- Block 1: 5 questions (2 certa + 2 vf + 1 apologetica), 70% to pass
- Block 2: 5 questions (3 certa + 2 incorreta), 70% to pass
- Provão: 10 random from current + past doctrines, 100% to pass; failures → errorScroll

## Time gates (normal / second attempt)
- Reading: 5h / 5h
- Block 1: 10h / 5h
- Block 2: 15h / 5h
- Provão: 19h / 5h

**Why:** Second attempt means the user failed to pass provão the previous day; all gates open early as grace.

## Question format
- Multiple choice: opcoes = ['a) ...', 'b) ...', ...], resposta_correta = 'a'|'b'|'c'|'d'
- V/F: opcoes = ['Verdadeiro', 'Falso'], resposta_correta = 'Verdadeiro'|'Falso'

## Tab layout
- Uses `isLiquidGlassAvailable()` from expo-glass-effect to switch between NativeTabs (iOS 26) and ClassicTabLayout (Tabs from expo-router)
- `headerShown: false` set on ClassicTabLayout screenOptions

import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { themes, RADIUS, DEFAULT_THEME_ID } from '@/constants/colors';

/**
 * Returns the design tokens for the active profile's selected theme.
 *
 * The theme is stored per-profile in AsyncStorage and exposed through
 * AppContext. When called outside AppProvider (e.g. an error boundary
 * rendered above the provider) it falls back to the default theme.
 */
export function useColors() {
  const ctx = useContext(AppContext);
  const themeId = ctx?.themeId ?? DEFAULT_THEME_ID;
  const palette = themes[themeId] ?? themes[DEFAULT_THEME_ID];
  return { ...palette, radius: RADIUS };
}

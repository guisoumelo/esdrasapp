import { ThemeId, DEFAULT_THEME_ID } from '../types';

export interface Palette {
  text: string;
  tint: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  success: string;
  successForeground: string;
  scrim: string;
  isDark: boolean;
}

export const RADIUS = 12;

// ── Tema Escuro 1 — Pergaminho da Noite (padrão) ──
// Fundo azul-escuro profundo, texto off-white, acentos em dourado envelhecido.
const darkNight: Palette = {
  text: '#F0E6D3',
  tint: '#C9A227',
  background: '#0D1B2A',
  foreground: '#F0E6D3',
  card: '#162236',
  cardForeground: '#F0E6D3',
  primary: '#C9A227',
  primaryForeground: '#0D1B2A',
  secondary: '#1E3048',
  secondaryForeground: '#F0E6D3',
  muted: '#1A2D42',
  mutedForeground: '#8BA8BE',
  accent: '#E0B94A',
  accentForeground: '#0D1B2A',
  destructive: '#E05252',
  destructiveForeground: '#F0E6D3',
  border: '#1E3048',
  input: '#1E3048',
  success: '#4CAF7D',
  successForeground: '#0D1B2A',
  scrim: 'rgba(13,27,42,0.92)',
  isDark: true,
};

// ── Tema Escuro 2 — Sinai Sólido ──
// Fundo cinza-grafite fosco, acentos em verde-oliva suave, detalhes em bronze.
const sinai: Palette = {
  text: '#E8E6DF',
  tint: '#8A9A5B',
  background: '#1C1E1D',
  foreground: '#E8E6DF',
  card: '#262926',
  cardForeground: '#E8E6DF',
  primary: '#8A9A5B',
  primaryForeground: '#15170F',
  secondary: '#33352F',
  secondaryForeground: '#E8E6DF',
  muted: '#2C2E2A',
  mutedForeground: '#9B9C90',
  accent: '#B08D57',
  accentForeground: '#1C1E1D',
  destructive: '#C06A5A',
  destructiveForeground: '#F1EEE7',
  border: '#3A3C36',
  input: '#3A3C36',
  success: '#7A9A5B',
  successForeground: '#15170F',
  scrim: 'rgba(28,30,29,0.92)',
  isDark: true,
};

// ── Tema Claro 1 — Pergaminho Antigo ──
// Fundo marfim/creme caloroso, texto marrom-café escuro, acentos em terracota.
const pergaminho: Palette = {
  text: '#4A382A',
  tint: '#B5623A',
  background: '#F0E4CC',
  foreground: '#4A382A',
  card: '#FBF2DE',
  cardForeground: '#4A382A',
  primary: '#B5623A',
  primaryForeground: '#FBF2DE',
  secondary: '#E4D3B2',
  secondaryForeground: '#4A382A',
  muted: '#E8DAC0',
  mutedForeground: '#8A7355',
  accent: '#C97B4A',
  accentForeground: '#FBF2DE',
  destructive: '#B0402E',
  destructiveForeground: '#FBF2DE',
  border: '#DAC7A2',
  input: '#DAC7A2',
  success: '#6E8A4E',
  successForeground: '#FBF2DE',
  scrim: 'rgba(74,56,42,0.90)',
  isDark: false,
};

// ── Tema Claro 2 — Luz do Templo ──
// Fundo off-white acinzentado limpo, texto carvão, detalhes em azul-marinho.
const templo: Palette = {
  text: '#23282E',
  tint: '#2C4A6E',
  background: '#F4F5F6',
  foreground: '#23282E',
  card: '#FFFFFF',
  cardForeground: '#23282E',
  primary: '#2C4A6E',
  primaryForeground: '#FFFFFF',
  secondary: '#E4E8EC',
  secondaryForeground: '#23282E',
  muted: '#EAEDF0',
  mutedForeground: '#6B7580',
  accent: '#3D6493',
  accentForeground: '#FFFFFF',
  destructive: '#C0392B',
  destructiveForeground: '#FFFFFF',
  border: '#D8DDE2',
  input: '#D8DDE2',
  success: '#3F8A63',
  successForeground: '#FFFFFF',
  scrim: 'rgba(35,40,46,0.90)',
  isDark: false,
};

export const themes: Record<ThemeId, Palette> = {
  darkNight,
  sinai,
  pergaminho,
  templo,
};

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  description: string;
  isDark: boolean;
  swatch: [string, string, string]; // [fundo, primária, acento]
}

export const THEMES: ThemeMeta[] = [
  {
    id: 'darkNight',
    label: 'Pergaminho da Noite',
    description: 'Escuro · azul profundo e dourado envelhecido',
    isDark: true,
    swatch: [darkNight.background, darkNight.primary, darkNight.accent],
  },
  {
    id: 'sinai',
    label: 'Sinai Sólido',
    description: 'Escuro · grafite fosco, verde-oliva e bronze',
    isDark: true,
    swatch: [sinai.background, sinai.primary, sinai.accent],
  },
  {
    id: 'pergaminho',
    label: 'Pergaminho Antigo',
    description: 'Claro · marfim caloroso, café e terracota',
    isDark: false,
    swatch: [pergaminho.background, pergaminho.primary, pergaminho.accent],
  },
  {
    id: 'templo',
    label: 'Luz do Templo',
    description: 'Claro · off-white, carvão e azul-marinho',
    isDark: false,
    swatch: [templo.background, templo.primary, templo.accent],
  },
];

// Back-compat default export (light/dark keys point at the default palette).
const colors = {
  light: darkNight,
  dark: darkNight,
  radius: RADIUS,
};

export default colors;
export { DEFAULT_THEME_ID };

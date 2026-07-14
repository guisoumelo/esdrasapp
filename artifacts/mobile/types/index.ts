export type QuestionCategory = 'certa' | 'incorreta' | 'vf' | 'apologetica';

export interface Question {
  id: number;
  categoria: QuestionCategory;
  enunciado: string;
  opcoes: string[];
  resposta_correta: string;
  justificativa?: string;
}

export interface Doctrine {
  id: number;
  nome: string;
  texto: string;
  perguntas: Question[];
}

export type Gender = 'male' | 'female';

// Avatar variations (5 ethnic/skin-tone styles per gender) shown at profile creation.
export const MALE_AVATARS = ['👨🏻', '👨🏼', '👨🏽', '👨🏾', '👨🏿'] as const;
export const FEMALE_AVATARS = ['👩🏻', '👩🏼', '👩🏽', '👩🏾', '👩🏿'] as const;

export function getAvatarsForGender(gender: Gender): readonly string[] {
  return gender === 'female' ? FEMALE_AVATARS : MALE_AVATARS;
}

export function profileAvatar(p: { avatar?: string; gender: Gender }): string {
  return p.avatar ?? (p.gender === 'female' ? '👩' : '👨');
}

// Available color themes. Persisted per-profile.
export type ThemeId = 'darkNight' | 'sinai' | 'pergaminho' | 'templo';

export const DEFAULT_THEME_ID: ThemeId = 'darkNight';

export interface Profile {
  id: string;
  nome: string;
  idade: number;
  gender: Gender;
  avatar?: string; // emoji avatar chosen at creation; falls back to gender emoji
  themeId?: ThemeId;
}

export interface ProfileData {
  currentDoctrineId: number;
  completedDoctrines: number[];
  /** IDs of all doctrines whose reading the user has confirmed (superset of completedDoctrines). */
  readDoctrines: number[];
  dayProgress: DayProgress;
  errorScroll: WrongAnswer[];
}

// Only the first two doctrines are unlocked with full content + quiz.
export const MAX_UNLOCKED_DOCTRINE = 2;

// Minimum score ratio to pass the regular blocks (Bloco 1 and Bloco 2).
export const BLOCK_PASS_RATIO = 0.8;

export interface WrongAnswer {
  uid: string;
  doctrineId: number;
  doctrineName: string;
  enunciado: string;
  opcoes: string[];
  resposta_correta: string;
  minha_resposta: string;
  justificativa?: string;
  date: string;
}

export interface DayProgress {
  doctrineId: number;
  date: string; // YYYY-MM-DD
  readingCompleted: boolean;
  block1Passed: boolean | null;
  block2Passed: boolean | null;
  provaoPassed: boolean | null;
  isSecondAttempt: boolean;
}

export interface BlockStatus {
  available: boolean;
  completed: boolean;
  passed: boolean | null;
}

export interface BlockAvailability {
  reading: { available: boolean; completed: boolean };
  block1: BlockStatus;
  block2: BlockStatus;
  provao: BlockStatus;
}

export interface Rank {
  title: string;
  range: string;
  minDoctrines: number;
  maxDoctrines: number;
}

export const RANKS: Rank[] = [
  { title: 'Aluno do Templo', range: '1–4', minDoctrines: 0, maxDoctrines: 4 },
  { title: 'Leitor de Pergaminhos', range: '5–8', minDoctrines: 5, maxDoctrines: 8 },
  { title: 'Copiador de Manuscritos', range: '9–12', minDoctrines: 9, maxDoctrines: 12 },
  { title: 'Zelador dos Textos', range: '13–16', minDoctrines: 13, maxDoctrines: 16 },
  { title: 'Pesquisador da Lei', range: '17–20', minDoctrines: 17, maxDoctrines: 20 },
  { title: 'Intérprete Doutrinário', range: '21–24', minDoctrines: 21, maxDoctrines: 24 },
  { title: 'Escriba Versado', range: '25–28', minDoctrines: 25, maxDoctrines: 28 },
  { title: 'Mestre de Esdras', range: 'Completo', minDoctrines: 29, maxDoctrines: 99 },
];

export function getRank(completedCount: number): Rank {
  for (const rank of RANKS) {
    if (completedCount < rank.maxDoctrines + 1 && completedCount >= rank.minDoctrines - 1) {
      return rank;
    }
  }
  return RANKS[0];
}

export function getBlockAvailability(
  currentHour: number,
  progress: DayProgress,
  timeLockEnabled: boolean = true,
): BlockAvailability {
  const h = currentHour;
  const s = progress.isSecondAttempt;

  // In free mode (time lock disabled) every gate opens immediately.
  const readMin = timeLockEnabled ? 5 : 0;
  const b1Min = timeLockEnabled ? (s ? 5 : 10) : 0;
  const b2Min = timeLockEnabled ? (s ? 5 : 15) : 0;
  const pvMin = timeLockEnabled ? (s ? 5 : 19) : 0;

  return {
    reading: {
      available: h >= readMin,
      completed: progress.readingCompleted,
    },
    block1: {
      available:
        h >= b1Min && progress.readingCompleted && progress.block1Passed === null,
      completed: progress.block1Passed !== null,
      passed: progress.block1Passed,
    },
    block2: {
      available:
        h >= b2Min &&
        progress.block1Passed === true &&
        progress.block2Passed === null,
      completed: progress.block2Passed !== null,
      passed: progress.block2Passed,
    },
    provao: {
      available:
        h >= pvMin &&
        progress.block2Passed === true &&
        progress.provaoPassed === null,
      completed: progress.provaoPassed !== null,
      passed: progress.provaoPassed,
    },
  };
}

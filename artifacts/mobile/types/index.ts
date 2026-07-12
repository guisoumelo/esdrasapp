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
): BlockAvailability {
  const h = currentHour;
  const s = progress.isSecondAttempt;

  const readMin = 5;
  const b1Min = s ? 5 : 10;
  const b2Min = s ? 5 : 15;
  const pvMin = s ? 5 : 19;

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

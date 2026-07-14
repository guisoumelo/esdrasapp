import LEITURAS_RAW from '../leituras.json';

interface Leitura {
  id: number;
  titulo: string;
  conteudo: string;
}

const LEITURAS: Leitura[] = LEITURAS_RAW as Leitura[];

/**
 * Returns the rich reading text for a doctrine id from leituras.json.
 * Returns null when no entry exists (fall back to doctrine.texto).
 */
export function getLeitura(id: number): Leitura | null {
  return LEITURAS.find((l) => l.id === id) ?? null;
}

/**
 * Splits a leitura conteudo into paragraphs for rendering.
 * Paragraphs are separated by '\n\n' in the JSON.
 */
export function getParagraphs(id: number, fallback: string): string[] {
  const leitura = getLeitura(id);
  const text = leitura?.conteudo ?? fallback;
  return text
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);
}

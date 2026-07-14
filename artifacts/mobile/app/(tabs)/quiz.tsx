import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { DOCTRINES, THEME_GROUPS, getDoctrine, shuffleArray } from '@/constants/doctrines';
import { Question, WrongAnswer, BLOCK_PASS_RATIO, MAX_UNLOCKED_DOCTRINE } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ProvaKey = 'prova1' | 'prova2' | 'provao';
type Screen = 'list' | 'detail' | 'quiz' | 'results';
type MacroKey = 'beliefs' | 'daniel';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Fisher-Yates shuffle — returns a new array */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LETTERS = ['a', 'b', 'c', 'd', 'e'];

/**
 * Shuffle the options of a question and relabel "a) … b) …" accordingly.
 * V/F questions are returned unchanged (only two fixed options).
 */
function shuffleOptions(q: Question): Question {
  const isVF = q.opcoes[0] === 'Verdadeiro' || q.opcoes[0] === 'Falso';
  if (isVF) return q;
  const texts = q.opcoes.map((o) => o.replace(/^[a-e]\)\s*/, ''));
  const correctText = texts[LETTERS.indexOf(q.resposta_correta)];
  const shuffledTexts = shuffle(texts);
  const newOpcoes = shuffledTexts.map((t, i) => `${LETTERS[i]}) ${t}`);
  const newResposta = LETTERS[shuffledTexts.indexOf(correctText)];
  return { ...q, opcoes: newOpcoes, resposta_correta: newResposta };
}

function isCorrect(question: Question, selected: string): boolean {
  const rc = question.resposta_correta;
  if (rc === 'Verdadeiro' || rc === 'Falso') return selected === rc;
  return selected.startsWith(`${rc})`);
}

/** Select questions for a given prova from any doctrine */
function selectQuestions(prova: ProvaKey, doctrineId: number): Question[] {
  const doctrine = DOCTRINES.find((d) => d.id === doctrineId);
  if (!doctrine) return [];

  const getByCategory = (cat: import('@/types').QuestionCategory) =>
    shuffleArray(doctrine.perguntas.filter((q) => q.categoria === cat));

  if (prova === 'prova1') {
    const certas = getByCategory('certa').slice(0, 2);
    const vfs = getByCategory('vf').slice(0, 2);
    const apologeticas = getByCategory('apologetica').slice(0, 1);
    const selected = [...certas, ...vfs, ...apologeticas];
    if (selected.length < 5) {
      const extras = shuffleArray(doctrine.perguntas.filter((q) => !selected.includes(q)));
      selected.push(...extras.slice(0, 5 - selected.length));
    }
    return shuffleArray(selected);
  }

  if (prova === 'prova2') {
    const certas = getByCategory('certa').slice(0, 3);
    const incorretas = getByCategory('incorreta').slice(0, 2);
    const selected = [...certas, ...incorretas];
    if (selected.length < 5) {
      const extras = shuffleArray(doctrine.perguntas.filter((q) => !selected.includes(q)));
      selected.push(...extras.slice(0, 5 - selected.length));
    }
    return shuffleArray(selected);
  }

  // Provão: 10 questions from this doctrine
  return shuffleArray(doctrine.perguntas).slice(0, 10);
}

function nameFor(id: number): string {
  return DOCTRINES.find((d) => d.id === id)?.nome ?? `Doutrina ${id}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// ProvaCard
// ─────────────────────────────────────────────────────────────────────────────

function ProvaCard({
  label,
  subtitle,
  available,
  completed,
  passed,
  isRetake,
  onPress,
}: {
  label: string;
  subtitle: string;
  available: boolean;
  completed: boolean;
  passed: boolean | null;
  isRetake?: boolean;
  onPress: () => void;
}) {
  const colors = useColors();

  const canPress = isRetake ? true : available && !completed;

  const bg = completed && !isRetake
    ? passed
      ? colors.success
      : colors.destructive
    : isRetake
    ? colors.card
    : available
    ? colors.card
    : colors.muted;

  const fg = completed && !isRetake
    ? passed
      ? colors.successForeground
      : colors.destructiveForeground
    : available || isRetake
    ? colors.foreground
    : colors.mutedForeground;

  const border = completed && !isRetake
    ? passed
      ? colors.success
      : colors.destructive
    : isRetake
    ? colors.primary
    : available
    ? colors.primary
    : colors.border;

  const statusText = isRetake
    ? '↺ Refazer'
    : completed
    ? passed
      ? '✓ Aprovado'
      : '✗ Reprovado'
    : available
    ? 'Disponível'
    : '🔒 Bloqueado';

  const badgeBg = isRetake
    ? colors.secondary
    : completed
    ? 'rgba(0,0,0,0.2)'
    : available
    ? colors.primary
    : colors.secondary;

  const badgeFg = isRetake
    ? colors.primary
    : completed
    ? fg
    : available
    ? colors.primaryForeground
    : colors.mutedForeground;

  return (
    <TouchableOpacity
      style={[styles.provaCard, { backgroundColor: bg, borderColor: border }]}
      onPress={canPress ? onPress : undefined}
      activeOpacity={canPress ? 0.75 : 1}
      disabled={!canPress}
    >
      <View style={styles.provaCardHeader}>
        <Text style={[styles.provaLabel, { color: fg }]}>{label}</Text>
        <View style={[styles.statusBadge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.statusText, { color: badgeFg }]}>{statusText}</Text>
        </View>
      </View>
      <Text style={[styles.provaSub, { color: fg, opacity: 0.75 }]}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MacroAccordion (mirrors leitura.tsx)
// ─────────────────────────────────────────────────────────────────────────────

function MacroAccordion({
  title,
  subtitle,
  icon,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  subtitle: string;
  icon: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const colors = useColors();
  return (
    <View style={styles.macro}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onToggle}
        style={[
          styles.macroHeader,
          { backgroundColor: colors.card, borderColor: expanded ? colors.primary : colors.border },
        ]}
      >
        <Text style={styles.macroIcon}>{icon}</Text>
        <View style={styles.macroHeaderBody}>
          <Text style={[styles.macroTitle, { color: colors.foreground }]}>{title}</Text>
          <Text style={[styles.macroSub, { color: colors.mutedForeground }]}>{subtitle}</Text>
        </View>
        <Text style={[styles.macroChevron, { color: colors.primary }]}>
          {expanded ? '⌄' : '›'}
        </Text>
      </TouchableOpacity>
      {expanded && <View style={styles.macroContent}>{children}</View>}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Quiz state
// ─────────────────────────────────────────────────────────────────────────────

interface QuizState {
  prova: ProvaKey;
  doctrineId: number;
  questions: Question[];
  answers: Record<number, string>;
  phase: 'quiz' | 'results';
  score: number;
  passed: boolean;
  errors: WrongAnswer[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Main screen
// ─────────────────────────────────────────────────────────────────────────────

export default function QuizScreen() {
  const colors = useColors();
  const {
    currentDoctrineId,
    completedDoctrines,
    blockAvailability,
    dayProgress,
    completeBlock,
    timeLockEnabled,
  } = useApp();

  const [screen, setScreen] = useState<Screen>('list');
  const [selectedDoctrineId, setSelectedDoctrineId] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [expanded, setExpanded] = useState<Record<MacroKey, boolean>>({ beliefs: false, daniel: false });

  function toggleMacro(key: MacroKey) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // ── Start a prova ──────────────────────────────────────────────────────────
  const startProva = useCallback(
    (prova: ProvaKey, doctrineId: number) => {
      const raw = selectQuestions(prova, doctrineId);
      const questions = shuffle(raw).map(shuffleOptions);
      setQuiz({
        prova,
        doctrineId,
        questions,
        answers: {},
        phase: 'quiz',
        score: 0,
        passed: false,
        errors: [],
      });
      setCurrentIdx(0);
      setSelected(null);
      setConfirmed(false);
      setScreen('quiz');
    },
    [],
  );

  const confirmAnswer = useCallback(() => {
    if (!quiz || selected === null) return;
    setConfirmed(true);
  }, [quiz, selected]);

  const nextQuestion = useCallback(() => {
    if (!quiz || selected === null) return;
    const q = quiz.questions[currentIdx];
    const updatedAnswers = { ...quiz.answers, [q.id]: selected };
    const doctrine = getDoctrine(quiz.doctrineId);

    if (currentIdx < quiz.questions.length - 1) {
      setQuiz({ ...quiz, answers: updatedAnswers });
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      const allAnswers = updatedAnswers;
      let score = 0;
      const errors: WrongAnswer[] = [];

      quiz.questions.forEach((question) => {
        const ans = allAnswers[question.id];
        if (ans && isCorrect(question, ans)) {
          score++;
        } else if (quiz.prova === 'provao' && ans) {
          errors.push({
            uid: `${Date.now()}-${question.id}`,
            doctrineId: quiz.doctrineId,
            doctrineName: doctrine?.nome ?? '',
            enunciado: question.enunciado,
            opcoes: question.opcoes,
            resposta_correta: question.resposta_correta,
            minha_resposta: ans,
            justificativa: question.justificativa,
            date: new Date().toISOString().slice(0, 10),
          });
        }
      });

      const total = quiz.questions.length;
      const passed =
        quiz.prova === 'provao' ? score === total : score / total >= BLOCK_PASS_RATIO;

      const finalQuiz = { ...quiz, answers: allAnswers, phase: 'results' as const, score, passed, errors };
      setQuiz(finalQuiz);

      // Only persist progress for the current doctrine
      if (quiz.doctrineId === currentDoctrineId) {
        const blockKey = quiz.prova === 'prova1' ? 'block1' : quiz.prova === 'prova2' ? 'block2' : 'provao';
        completeBlock(blockKey, passed, errors);
      }
    }
  }, [quiz, selected, currentIdx, currentDoctrineId, completeBlock]);

  const resetToDetail = useCallback(() => {
    setQuiz(null);
    setCurrentIdx(0);
    setSelected(null);
    setConfirmed(false);
    setScreen('detail');
  }, []);

  const resetToList = useCallback(() => {
    setQuiz(null);
    setCurrentIdx(0);
    setSelected(null);
    setConfirmed(false);
    setSelectedDoctrineId(null);
    setScreen('list');
  }, []);

  // ── LIST ──────────────────────────────────────────────────────────────────
  if (screen === 'list') {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.primary }]}>Provas</Text>
          <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
            Escolha uma crença para iniciar ou refazer a prova
          </Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.listContent, { paddingBottom: 100 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* 28 Crenças Fundamentais */}
          <MacroAccordion
            title="28 Crenças Fundamentais"
            subtitle="Estrutura teológica oficial da IASD"
            icon="📜"
            expanded={expanded.beliefs}
            onToggle={() => toggleMacro('beliefs')}
          >
            {THEME_GROUPS.map((group) => (
              <View key={group.titulo} style={styles.group}>
                <Text style={[styles.groupTitle, { color: colors.accent }]}>
                  {group.titulo.toUpperCase()}
                </Text>

                {group.doctrineIds.map((id) => {
                  const unlocked = id <= MAX_UNLOCKED_DOCTRINE;
                  const completed = completedDoctrines.includes(id);
                  const isCurrent = id === currentDoctrineId;

                  const border = completed
                    ? colors.success
                    : isCurrent
                    ? colors.primary
                    : colors.border;

                  const statusLabel = completed
                    ? 'Concluída ✓'
                    : isCurrent
                    ? 'Em andamento'
                    : unlocked
                    ? 'Disponível'
                    : 'Em breve';

                  const statusColor = completed
                    ? colors.success
                    : isCurrent
                    ? colors.primary
                    : unlocked
                    ? colors.mutedForeground
                    : colors.mutedForeground;

                  return (
                    <TouchableOpacity
                      key={id}
                      disabled={!unlocked}
                      activeOpacity={0.8}
                      onPress={() => {
                        setSelectedDoctrineId(id);
                        setScreen('detail');
                      }}
                      style={[
                        styles.item,
                        {
                          backgroundColor: colors.card,
                          borderColor: border,
                          opacity: unlocked ? 1 : 0.45,
                        },
                      ]}
                    >
                      <View style={[styles.itemNum, { backgroundColor: unlocked ? colors.secondary : colors.muted }]}>
                        <Text style={[styles.itemNumText, { color: unlocked ? colors.primary : colors.mutedForeground }]}>
                          {id}
                        </Text>
                      </View>
                      <View style={styles.itemBody}>
                        <Text
                          style={[styles.itemName, { color: unlocked ? colors.foreground : colors.mutedForeground }]}
                          numberOfLines={2}
                        >
                          {nameFor(id)}
                        </Text>
                        <Text style={[styles.itemStatus, { color: statusColor }]}>{statusLabel}</Text>
                      </View>
                      <Text style={[styles.itemChevron, { color: colors.mutedForeground }]}>
                        {unlocked ? '›' : '🔒'}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </MacroAccordion>

          {/* Profecias de Daniel (em breve) */}
          <MacroAccordion
            title="Profecias de Daniel"
            subtitle="Novo módulo de estudo"
            icon="🦁"
            expanded={expanded.daniel}
            onToggle={() => toggleMacro('daniel')}
          >
            <View style={[styles.comingSoon, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={styles.comingSoonEmoji}>🕰️</Text>
              <Text style={[styles.comingSoonTitle, { color: colors.foreground }]}>Conteúdo em breve</Text>
              <Text style={[styles.comingSoonText, { color: colors.mutedForeground }]}>
                Um estudo completo das profecias do livro de Daniel está sendo preparado.
              </Text>
            </View>
          </MacroAccordion>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── DETAIL ────────────────────────────────────────────────────────────────
  if (screen === 'detail' && selectedDoctrineId !== null) {
    const docId = selectedDoctrineId;
    const doctrine = getDoctrine(docId);
    const isCurrent = docId === currentDoctrineId;
    const isCompleted = completedDoctrines.includes(docId);
    const isSecond = dayProgress.isSecondAttempt;

    // For non-current doctrines: all provas are freely available (retake mode)
    const prova1Status = isCurrent
      ? { available: blockAvailability.block1.available, completed: blockAvailability.block1.completed, passed: blockAvailability.block1.passed, isRetake: false }
      : { available: true, completed: false, passed: null, isRetake: true };

    const prova2Status = isCurrent
      ? { available: blockAvailability.block2.available, completed: blockAvailability.block2.completed, passed: blockAvailability.block2.passed, isRetake: false }
      : { available: true, completed: false, passed: null, isRetake: true };

    const provaoStatus = isCurrent
      ? { available: blockAvailability.provao.available, completed: blockAvailability.provao.completed, passed: blockAvailability.provao.passed, isRetake: false }
      : { available: true, completed: false, passed: null, isRetake: true };

    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={[styles.detailHeader, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={resetToList} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
          </TouchableOpacity>
          <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>
            Doutrina {docId}
          </Text>
          <Text style={[styles.detailTitle, { color: colors.primary }]} numberOfLines={2}>
            {doctrine?.nome ?? '—'}
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={[styles.detailContent, { paddingBottom: 110 }]}
          showsVerticalScrollIndicator={false}
        >
          {isCurrent && !dayProgress.readingCompleted && (
            <View style={[styles.warningCard, { backgroundColor: colors.muted, borderColor: colors.border }]}>
              <Text style={[styles.warningText, { color: colors.mutedForeground }]}>
                📖 Complete a Leitura antes de começar as Provas.
              </Text>
            </View>
          )}

          <ProvaCard
            label="Prova 1"
            subtitle={`5 questões · mínimo 80% (4/5)${isCurrent && timeLockEnabled && !isSecond ? ' · disponível às 10h' : ''}`}
            available={prova1Status.available}
            completed={prova1Status.completed}
            passed={prova1Status.passed}
            isRetake={prova1Status.isRetake}
            onPress={() => startProva('prova1', docId)}
          />
          <ProvaCard
            label="Prova 2"
            subtitle={`5 questões · mínimo 80% (4/5)${isCurrent && timeLockEnabled && !isSecond ? ' · disponível às 15h' : ''}`}
            available={prova2Status.available}
            completed={prova2Status.completed}
            passed={prova2Status.passed}
            isRetake={prova2Status.isRetake}
            onPress={() => startProva('prova2', docId)}
          />
          <ProvaCard
            label="Provão Final"
            subtitle={`10 questões · 100% exigido${isCurrent && timeLockEnabled && !isSecond ? ' · disponível às 19h' : ''}`}
            available={provaoStatus.available}
            completed={provaoStatus.completed}
            passed={provaoStatus.passed}
            isRetake={provaoStatus.isRetake}
            onPress={() => startProva('provao', docId)}
          />

          {!isCurrent && (
            <View style={[styles.warningCard, { backgroundColor: colors.muted, borderColor: colors.border, marginTop: 4 }]}>
              <Text style={[styles.warningText, { color: colors.mutedForeground }]}>
                ℹ️ As provas desta doutrina são livres — o resultado não altera seu progresso atual.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── RESULTS ───────────────────────────────────────────────────────────────
  if (quiz && quiz.phase === 'results') {
    const total = quiz.questions.length;
    const pct = Math.round((quiz.score / total) * 100);
    const isCurrent = quiz.doctrineId === currentDoctrineId;

    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
        <ScrollView contentContainerStyle={[styles.content, { gap: 16 }]} showsVerticalScrollIndicator={false}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultEmoji}>{quiz.passed ? '🏆' : '📜'}</Text>
            <Text style={[styles.resultTitle, { color: quiz.passed ? colors.success : colors.destructive }]}>
              {quiz.passed ? 'Aprovado!' : 'Reprovado'}
            </Text>
            <Text style={[styles.resultScore, { color: colors.foreground }]}>
              {quiz.score}/{total} ({pct}%)
            </Text>
          </View>

          {quiz.prova === 'provao' && !quiz.passed && isCurrent && (
            <View style={[styles.warningCard, { backgroundColor: colors.muted, borderColor: colors.destructive }]}>
              <Text style={[styles.warningText, { color: colors.foreground }]}>
                ✗ Os erros foram adicionados ao Pergaminho de Erros.
              </Text>
            </View>
          )}

          {quiz.prova === 'provao' && quiz.passed && isCurrent && (
            <View style={[styles.warningCard, { backgroundColor: colors.muted, borderColor: colors.success }]}>
              <Text style={[styles.warningText, { color: colors.foreground }]}>
                {timeLockEnabled
                  ? '✦ Doutrina concluída! Você avança amanhã para a próxima.'
                  : '✦ Doutrina concluída! A próxima já foi liberada.'}
              </Text>
            </View>
          )}

          {quiz.questions.map((q, idx) => {
            const ans = quiz.answers[q.id];
            const correct = ans ? isCorrect(q, ans) : false;
            return (
              <View
                key={q.id}
                style={[
                  styles.reviewCard,
                  { backgroundColor: colors.card, borderColor: correct ? colors.success : colors.destructive },
                ]}
              >
                <Text style={[styles.reviewQ, { color: colors.foreground }]}>
                  {idx + 1}. {q.enunciado}
                </Text>
                <Text style={[styles.reviewAns, { color: correct ? colors.success : colors.destructive }]}>
                  {correct ? '✓' : '✗'} Sua resposta: {ans ?? '—'}
                </Text>
                {!correct && (
                  <Text style={[styles.reviewCorrect, { color: colors.success }]}>
                    Correta: {q.resposta_correta}
                  </Text>
                )}
                {q.justificativa && (
                  <Text style={[styles.reviewJust, { color: colors.mutedForeground }]}>
                    {q.justificativa}
                  </Text>
                )}
              </View>
            );
          })}

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.primary }]}
            onPress={resetToDetail}
          >
            <Text style={[styles.actionBtnText, { color: colors.primaryForeground }]}>
              ← Voltar às Provas
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── QUIZ ─────────────────────────────────────────────────────────────────
  if (quiz && quiz.phase === 'quiz') {
    const q = quiz.questions[currentIdx];
    const isVF = q.opcoes[0] === 'Verdadeiro' || q.opcoes[0] === 'Falso';
    const total = quiz.questions.length;
    const progress = (currentIdx + 1) / total;

    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
        <ScrollView contentContainerStyle={[styles.content, { gap: 14 }]} showsVerticalScrollIndicator={false}>
          {/* Progress */}
          <View style={styles.progressRow}>
            <Text style={[styles.progressText, { color: colors.mutedForeground }]}>
              {currentIdx + 1}/{total}
            </Text>
            <View style={[styles.progressBarWrap, { backgroundColor: colors.secondary }]}>
              <View
                style={[styles.progressFill, { backgroundColor: colors.primary, width: `${progress * 100}%` }]}
              />
            </View>
            <TouchableOpacity onPress={resetToDetail}>
              <Text style={[styles.cancelBtn, { color: colors.mutedForeground }]}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Category badge */}
          <View style={[styles.catBadge, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.catText, { color: colors.primary }]}>
              {q.categoria === 'certa'
                ? 'Correta'
                : q.categoria === 'incorreta'
                ? 'Incorreta'
                : q.categoria === 'vf'
                ? 'Verdadeiro ou Falso'
                : 'Apologética'}
            </Text>
          </View>

          {/* Question */}
          <View style={[styles.questionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.questionText, { color: colors.foreground }]}>{q.enunciado}</Text>
          </View>

          {/* Options */}
          <View style={styles.optionsGap}>
            {q.opcoes.map((option) => {
              const isSelected = selected === option;
              const isConfirmedCorrect = confirmed && isSelected && isCorrect(q, option);
              const isConfirmedWrong = confirmed && isSelected && !isCorrect(q, option);
              const isCorrectOption = confirmed && isCorrect(q, option);

              let bg = colors.card;
              let border = colors.border;
              let fg = colors.foreground;

              if (confirmed) {
                if (isCorrectOption) { bg = colors.success; border = colors.success; fg = colors.successForeground; }
                else if (isSelected) { bg = colors.destructive; border = colors.destructive; fg = colors.destructiveForeground; }
                else { bg = colors.muted; border = colors.border; fg = colors.mutedForeground; }
              } else if (isSelected) {
                border = colors.primary;
                bg = colors.secondary;
              }

              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.option, { backgroundColor: bg, borderColor: border }]}
                  onPress={confirmed ? undefined : () => setSelected(option)}
                  activeOpacity={confirmed ? 1 : 0.75}
                >
                  <Text style={[styles.optionText, { color: fg }]}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Confirm / Next */}
          {!confirmed ? (
            <TouchableOpacity
              style={[
                styles.actionBtn,
                { backgroundColor: selected ? colors.primary : colors.muted, opacity: selected ? 1 : 0.5 },
              ]}
              onPress={selected ? confirmAnswer : undefined}
              activeOpacity={selected ? 0.8 : 1}
            >
              <Text style={[styles.actionBtnText, { color: selected ? colors.primaryForeground : colors.mutedForeground }]}>
                Confirmar Resposta
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              onPress={nextQuestion}
            >
              <Text style={[styles.actionBtnText, { color: colors.primaryForeground }]}>
                {currentIdx < total - 1 ? 'Próxima →' : 'Ver Resultado →'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Justification */}
          {confirmed && q.justificativa && (
            <View style={[styles.justCard, { backgroundColor: colors.muted, borderColor: colors.border }]}>
              <Text style={[styles.justTitle, { color: colors.primary }]}>Justificativa</Text>
              <Text style={[styles.justText, { color: colors.foreground }]}>{q.justificativa}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1 },
  // Header (list + detail)
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 14, borderBottomWidth: 1, gap: 4 },
  headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: 0.5 },
  headerSub: { fontSize: 13 },
  scroll: { flex: 1 },
  listContent: { padding: 16, gap: 16 },
  // MacroAccordion
  macro: { gap: 12 },
  macroHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, borderRadius: 14, borderWidth: 1.5, padding: 16 },
  macroIcon: { fontSize: 26 },
  macroHeaderBody: { flex: 1, gap: 2 },
  macroTitle: { fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },
  macroSub: { fontSize: 12 },
  macroChevron: { fontSize: 22, fontWeight: '800', width: 20, textAlign: 'center' },
  macroContent: { gap: 22, paddingTop: 2 },
  comingSoon: { borderRadius: 14, borderWidth: 1, borderStyle: 'dashed', padding: 24, alignItems: 'center', gap: 8 },
  comingSoonEmoji: { fontSize: 34 },
  comingSoonTitle: { fontSize: 16, fontWeight: '700' },
  comingSoonText: { fontSize: 13, lineHeight: 19, textAlign: 'center' },
  // Group
  group: { gap: 10 },
  groupTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  // Doctrine item
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 12, borderWidth: 1.5, padding: 12 },
  itemNum: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  itemNumText: { fontSize: 14, fontWeight: '800' },
  itemBody: { flex: 1, gap: 2 },
  itemName: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  itemStatus: { fontSize: 12, fontWeight: '500' },
  itemChevron: { fontSize: 20 },
  // Detail
  detailHeader: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 14, borderBottomWidth: 1, gap: 6 },
  backBtn: { paddingVertical: 6 },
  backText: { fontSize: 15, fontWeight: '600' },
  detailLabel: { fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  detailTitle: { fontSize: 19, fontWeight: '700', lineHeight: 26 },
  detailContent: { padding: 16, gap: 14 },
  // ProvaCard
  provaCard: { borderRadius: 14, borderWidth: 2, padding: 16, gap: 6 },
  provaCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  provaLabel: { fontSize: 17, fontWeight: '700' },
  statusBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '700' },
  provaSub: { fontSize: 13, lineHeight: 18 },
  // Warning / Info card
  warningCard: { borderRadius: 12, borderWidth: 1, padding: 14 },
  warningText: { fontSize: 14, lineHeight: 20 },
  // Quiz / results shared
  content: { padding: 16, paddingBottom: 110 },
  // Results
  resultHeader: { alignItems: 'center', paddingVertical: 12, gap: 6 },
  resultEmoji: { fontSize: 48, textAlign: 'center' },
  resultTitle: { fontSize: 26, fontWeight: '800', textAlign: 'center' },
  resultScore: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  reviewCard: { borderRadius: 12, borderWidth: 2, padding: 14, gap: 6 },
  reviewQ: { fontSize: 14, lineHeight: 22, fontWeight: '500' },
  reviewAns: { fontSize: 13, fontWeight: '600' },
  reviewCorrect: { fontSize: 13, fontWeight: '600' },
  reviewJust: { fontSize: 12, lineHeight: 18, marginTop: 4 },
  // Quiz
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressText: { fontSize: 12, fontWeight: '600', minWidth: 32 },
  progressBarWrap: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  cancelBtn: { fontSize: 18, padding: 4 },
  catBadge: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  catText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  questionCard: { borderRadius: 14, borderWidth: 1, padding: 18 },
  questionText: { fontSize: 16, lineHeight: 26, fontWeight: '500' },
  optionsGap: { gap: 10 },
  option: { borderRadius: 12, borderWidth: 2, padding: 14 },
  optionText: { fontSize: 15, lineHeight: 22 },
  actionBtn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 4 },
  actionBtnText: { fontSize: 16, fontWeight: '700' },
  justCard: { borderRadius: 12, borderWidth: 1, padding: 14, gap: 6 },
  justTitle: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  justText: { fontSize: 14, lineHeight: 22 },
});

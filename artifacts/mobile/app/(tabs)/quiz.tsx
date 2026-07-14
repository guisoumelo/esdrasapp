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
import { selectQuestionsForBlock, getDoctrine } from '@/constants/doctrines';
import { Question, WrongAnswer, BLOCK_PASS_RATIO } from '@/types';

type BlockKey = 'block1' | 'block2' | 'provao';
type Phase = 'overview' | 'quiz' | 'results';

function isCorrect(question: Question, selected: string): boolean {
  const rc = question.resposta_correta;
  // V/F questions: direct match
  if (rc === 'Verdadeiro' || rc === 'Falso') return selected === rc;
  // Multiple choice: option starts with "a)", "b)", etc.
  return selected.startsWith(`${rc})`);
}

interface QuizState {
  block: BlockKey;
  questions: Question[];
  answers: Record<number, string>;
  phase: Phase;
  score: number;
  passed: boolean;
  errors: WrongAnswer[];
}

function BlockCard({
  label,
  subtitle,
  available,
  completed,
  passed,
  onPress,
}: {
  label: string;
  subtitle: string;
  available: boolean;
  completed: boolean;
  passed: boolean | null;
  onPress: () => void;
}) {
  const colors = useColors();

  const bg = completed
    ? passed
      ? colors.success
      : colors.destructive
    : available
    ? colors.card
    : colors.muted;

  const fg = completed
    ? passed
      ? colors.successForeground
      : colors.destructiveForeground
    : available
    ? colors.foreground
    : colors.mutedForeground;

  const border = completed
    ? passed
      ? colors.success
      : colors.destructive
    : available
    ? colors.primary
    : colors.border;

  const statusText = completed
    ? passed
      ? '✓ Aprovado'
      : '✗ Reprovado'
    : available
    ? 'Disponível'
    : '🔒 Bloqueado';

  return (
    <TouchableOpacity
      style={[styles.blockCard, { backgroundColor: bg, borderColor: border }]}
      onPress={available && !completed ? onPress : undefined}
      activeOpacity={available && !completed ? 0.75 : 1}
      disabled={!available || completed}
    >
      <View style={styles.blockCardHeader}>
        <Text style={[styles.blockLabel, { color: fg }]}>{label}</Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: completed
                ? 'rgba(0,0,0,0.2)'
                : available
                ? colors.primary
                : colors.secondary,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: completed
                  ? fg
                  : available
                  ? colors.primaryForeground
                  : colors.mutedForeground,
              },
            ]}
          >
            {statusText}
          </Text>
        </View>
      </View>
      <Text style={[styles.blockSub, { color: fg, opacity: 0.75 }]}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

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

  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const doctrine = getDoctrine(currentDoctrineId);

  const startBlock = useCallback(
    (block: BlockKey) => {
      const questions = selectQuestionsForBlock(block, currentDoctrineId, completedDoctrines);
      setQuiz({
        block,
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
    },
    [currentDoctrineId, completedDoctrines],
  );

  const confirmAnswer = useCallback(() => {
    if (!quiz || selected === null) return;
    setConfirmed(true);
  }, [quiz, selected]);

  const nextQuestion = useCallback(() => {
    if (!quiz || selected === null) return;
    const q = quiz.questions[currentIdx];
    const correct = isCorrect(q, selected);
    const updatedAnswers = { ...quiz.answers, [q.id]: selected };

    if (currentIdx < quiz.questions.length - 1) {
      setQuiz({ ...quiz, answers: updatedAnswers });
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      // Compute results
      const allAnswers = updatedAnswers;
      let score = 0;
      const errors: WrongAnswer[] = [];

      quiz.questions.forEach((question) => {
        const ans = allAnswers[question.id];
        if (ans && isCorrect(question, ans)) {
          score++;
        } else if (quiz.block === 'provao' && ans) {
          errors.push({
            uid: `${Date.now()}-${question.id}`,
            doctrineId: currentDoctrineId,
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
        quiz.block === 'provao' ? score === total : score / total >= BLOCK_PASS_RATIO;

      const finalQuiz = { ...quiz, answers: allAnswers, phase: 'results' as Phase, score, passed, errors };
      setQuiz(finalQuiz);
      completeBlock(quiz.block, passed, errors);
    }
  }, [quiz, selected, currentIdx, currentDoctrineId, doctrine, completeBlock]);

  const resetQuiz = useCallback(() => {
    setQuiz(null);
    setCurrentIdx(0);
    setSelected(null);
    setConfirmed(false);
  }, []);

  // ── Overview ──────────────────────────────────────────────────────────────
  if (!quiz || quiz.phase === 'overview') {
    const isSecond = dayProgress.isSecondAttempt;
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
        <ScrollView contentContainerStyle={[styles.content, { gap: 14 }]} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.primary }]}>Quiz do Dia</Text>
            <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
              {doctrine?.nome ?? ''}
            </Text>
          </View>

          {!dayProgress.readingCompleted && (
            <View style={[styles.warningCard, { backgroundColor: colors.muted, borderColor: colors.border }]}>
              <Text style={[styles.warningText, { color: colors.mutedForeground }]}>
                📖 Complete a Leitura antes de começar o Quiz.
              </Text>
            </View>
          )}

          <BlockCard
            label="Bloco 1"
            subtitle={`5 questões · mínimo 80% (4/5)${timeLockEnabled && !isSecond ? ' · disponível às 10h' : ''}`}
            available={blockAvailability.block1.available}
            completed={blockAvailability.block1.completed}
            passed={blockAvailability.block1.passed}
            onPress={() => startBlock('block1')}
          />
          <BlockCard
            label="Bloco 2"
            subtitle={`5 questões · mínimo 80% (4/5)${timeLockEnabled && !isSecond ? ' · disponível às 15h' : ''}`}
            available={blockAvailability.block2.available}
            completed={blockAvailability.block2.completed}
            passed={blockAvailability.block2.passed}
            onPress={() => startBlock('block2')}
          />
          <BlockCard
            label="Provão Final"
            subtitle={`10 questões · 100% exigido${timeLockEnabled && !isSecond ? ' · disponível às 19h' : ''}`}
            available={blockAvailability.provao.available}
            completed={blockAvailability.provao.completed}
            passed={blockAvailability.provao.passed}
            onPress={() => startBlock('provao')}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (quiz.phase === 'results') {
    const total = quiz.questions.length;
    const pct = Math.round((quiz.score / total) * 100);
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
        <ScrollView contentContainerStyle={[styles.content, { gap: 16 }]} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.resultEmoji]}>
              {quiz.passed ? '🏆' : '📜'}
            </Text>
            <Text
              style={[
                styles.resultTitle,
                { color: quiz.passed ? colors.success : colors.destructive },
              ]}
            >
              {quiz.passed ? 'Aprovado!' : 'Reprovado'}
            </Text>
            <Text style={[styles.resultScore, { color: colors.foreground }]}>
              {quiz.score}/{total} ({pct}%)
            </Text>
          </View>

          {quiz.block === 'provao' && !quiz.passed && (
            <View style={[styles.warningCard, { backgroundColor: colors.muted, borderColor: colors.destructive }]}>
              <Text style={[styles.warningText, { color: colors.foreground }]}>
                ✗ Os erros foram adicionados ao Pergaminho de Erros.
              </Text>
            </View>
          )}

          {quiz.block === 'provao' && quiz.passed && (
            <View style={[styles.warningCard, { backgroundColor: colors.muted, borderColor: colors.success }]}>
              <Text style={[styles.warningText, { color: colors.foreground }]}>
                {timeLockEnabled
                  ? '✦ Doutrina concluída! Você avança amanhã para a próxima.'
                  : '✦ Doutrina concluída! A próxima já foi liberada.'}
              </Text>
            </View>
          )}

          {/* Per-question review */}
          {quiz.questions.map((q, idx) => {
            const ans = quiz.answers[q.id];
            const correct = ans ? isCorrect(q, ans) : false;
            return (
              <View
                key={q.id}
                style={[
                  styles.reviewCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: correct ? colors.success : colors.destructive,
                  },
                ]}
              >
                <Text style={[styles.reviewQ, { color: colors.foreground }]}>
                  {idx + 1}. {q.enunciado}
                </Text>
                <Text
                  style={[
                    styles.reviewAns,
                    { color: correct ? colors.success : colors.destructive },
                  ]}
                >
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
            style={[styles.backBtn, { backgroundColor: colors.primary }]}
            onPress={resetQuiz}
          >
            <Text style={[styles.backBtnText, { color: colors.primaryForeground }]}>
              ← Voltar ao Menu
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Quiz ─────────────────────────────────────────────────────────────────
  const q = quiz.questions[currentIdx];
  const isVF = q.opcoes[0] === 'Verdadeiro' || q.opcoes[0] === 'Falso';
  const total = quiz.questions.length;
  const progress = (currentIdx + 1) / total;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={[styles.content, { gap: 14, paddingBottom: 40 }]} showsVerticalScrollIndicator={false}>
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
          <TouchableOpacity onPress={resetQuiz}>
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
              {
                backgroundColor: selected ? colors.primary : colors.muted,
                opacity: selected ? 1 : 0.5,
              },
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

        {/* Justification (after confirm) */}
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

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16 },
  header: { alignItems: 'center', paddingVertical: 12, gap: 6 },
  headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: 1 },
  headerSub: { fontSize: 14, textAlign: 'center' },
  warningCard: { borderRadius: 12, borderWidth: 1, padding: 14 },
  warningText: { fontSize: 14, lineHeight: 20 },
  blockCard: { borderRadius: 14, borderWidth: 2, padding: 16, gap: 6 },
  blockCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  blockLabel: { fontSize: 17, fontWeight: '700' },
  statusBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: '700' },
  blockSub: { fontSize: 13, lineHeight: 18 },
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
  resultEmoji: { fontSize: 48, textAlign: 'center' },
  resultTitle: { fontSize: 26, fontWeight: '800', textAlign: 'center' },
  resultScore: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  reviewCard: { borderRadius: 12, borderWidth: 2, padding: 14, gap: 6 },
  reviewQ: { fontSize: 14, lineHeight: 22, fontWeight: '500' },
  reviewAns: { fontSize: 13, fontWeight: '600' },
  reviewCorrect: { fontSize: 13, fontWeight: '600' },
  reviewJust: { fontSize: 12, lineHeight: 18, marginTop: 4 },
  backBtn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 4 },
  backBtnText: { fontSize: 16, fontWeight: '700' },
});

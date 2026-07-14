import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { TimelineBlock } from '@/components/TimelineBlock';
import { getDoctrine } from '@/constants/doctrines';
import { RANKS } from '@/types';

type BlockState = 'locked' | 'available' | 'passed' | 'failed' | 'completed';

function blockState(
  available: boolean,
  completed: boolean,
  passed: boolean | null,
): BlockState {
  if (completed) return passed ? 'passed' : 'failed';
  if (available) return 'available';
  return 'locked';
}

export default function DashboardScreen() {
  const colors = useColors();
  const {
    activeProfile,
    currentDoctrineId,
    completedDoctrines,
    dayProgress,
    blockAvailability,
    currentRank,
    timeLockEnabled,
    masterMode,
  } = useApp();

  const doctrine = getDoctrine(currentDoctrineId);
  const totalCompleted = completedDoctrines.length;
  const progressPct = (totalCompleted / 28) * 100;

  const isSecond = dayProgress.isSecondAttempt;
  const b1Time = isSecond ? '5h' : '10h';
  const b2Time = isSecond ? '5h' : '15h';
  const pvTime = isSecond ? '5h' : '19h';

  const readState: BlockState = blockAvailability.reading.completed
    ? 'completed'
    : blockAvailability.reading.available
    ? 'available'
    : 'locked';

  const profileEmoji = activeProfile?.gender === 'female' ? '👩' : '👨';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.appTitle, { color: colors.primary }]}>✦ ESDRAS ✦</Text>
          <Text style={[styles.appSubtitle, { color: colors.mutedForeground }]}>
            28 Crenças Fundamentais
          </Text>
        </View>

        {/* Greeting */}
        {activeProfile && (
          <View style={[styles.greetCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.greetEmoji}>{profileEmoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.greetHello, { color: colors.mutedForeground }]}>Bem-vindo(a),</Text>
              <Text style={[styles.greetName, { color: colors.foreground }]}>{activeProfile.nome}</Text>
            </View>
            {!timeLockEnabled && (
              <View style={[styles.modePill, { backgroundColor: colors.accent }]}>
                <Text style={[styles.modePillText, { color: colors.accentForeground }]}>Modo Livre</Text>
              </View>
            )}
          </View>
        )}

        {/* Rank Card */}
        <View style={[styles.rankCard, { backgroundColor: colors.card, borderColor: colors.primary }]}>
          <Text style={[styles.rankLabel, { color: colors.mutedForeground }]}>Seu nível</Text>
          <Text style={[styles.rankTitle, { color: colors.primary }]}>{currentRank.title}</Text>
          {masterMode && (
            <Text style={[styles.masterBadge, { color: colors.accent }]}>✦ Mestre Completo ✦</Text>
          )}
        </View>

        {/* Progress */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Progresso Geral</Text>
            <Text style={[styles.sectionCount, { color: colors.primary }]}>
              {totalCompleted}/28
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.secondary }]}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: colors.primary, width: `${progressPct}%` },
              ]}
            />
          </View>
          <Text style={[styles.progressLabel, { color: colors.mutedForeground }]}>
            Nível seguinte: {RANKS.find(r => r.minDoctrines > totalCompleted)?.title ?? 'Mestre de Esdras'}
          </Text>
        </View>

        {/* Current Doctrine */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Doutrina de Hoje</Text>
          <Text style={[styles.doctrineNumber, { color: colors.mutedForeground }]}>
            Doutrina {currentDoctrineId} de 28
          </Text>
          <Text style={[styles.doctrineName, { color: colors.primary }]}>
            {doctrine?.nome ?? '—'}
          </Text>
          {timeLockEnabled && isSecond && (
            <View style={[styles.pill, { backgroundColor: colors.destructive }]}>
              <Text style={[styles.pillText, { color: colors.destructiveForeground }]}>
                Segunda Tentativa — blocos disponíveis a partir das 5h
              </Text>
            </View>
          )}
        </View>

        {/* Timeline */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            {timeLockEnabled ? 'Cronograma Diário' : 'Trilha de Hoje'}
          </Text>
          <View style={styles.timeline}>
            <TimelineBlock
              label="Leitura"
              timeLabel="5h"
              state={readState}
            />
            <TimelineBlock
              label="Bloco 1"
              timeLabel={b1Time}
              state={blockState(
                blockAvailability.block1.available,
                blockAvailability.block1.completed,
                blockAvailability.block1.passed,
              )}
            />
            <TimelineBlock
              label="Bloco 2"
              timeLabel={b2Time}
              state={blockState(
                blockAvailability.block2.available,
                blockAvailability.block2.completed,
                blockAvailability.block2.passed,
              )}
            />
            <TimelineBlock
              label="Provão Final"
              timeLabel={pvTime}
              state={blockState(
                blockAvailability.provao.available,
                blockAvailability.provao.completed,
                blockAvailability.provao.passed,
              )}
              isLast
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 14, paddingBottom: 100 },
  header: { alignItems: 'center', paddingVertical: 12 },
  appTitle: { fontSize: 28, fontWeight: '800', letterSpacing: 4 },
  appSubtitle: { fontSize: 13, letterSpacing: 1, marginTop: 4 },
  greetCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  greetEmoji: { fontSize: 34 },
  greetHello: { fontSize: 12 },
  greetName: { fontSize: 18, fontWeight: '700' },
  modePill: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  modePillText: { fontSize: 11, fontWeight: '700' },
  rankCard: {
    borderRadius: 14,
    borderWidth: 2,
    padding: 18,
    alignItems: 'center',
  },
  rankLabel: { fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  rankTitle: { fontSize: 20, fontWeight: '700', marginTop: 4, textAlign: 'center' },
  masterBadge: { fontSize: 13, marginTop: 6, letterSpacing: 1 },
  section: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  sectionCount: { fontSize: 16, fontWeight: '800' },
  progressBar: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  progressLabel: { fontSize: 12, marginTop: 2 },
  doctrineNumber: { fontSize: 12, letterSpacing: 0.5 },
  doctrineName: { fontSize: 17, fontWeight: '700', lineHeight: 24 },
  pill: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  pillText: { fontSize: 12, fontWeight: '600' },
  timeline: { gap: 0 },
});

/**
 * ProgressPathModal
 * Shows the full rank progression path with the user's current position.
 */
import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { RANKS } from '@/types';

const RANK_ICONS = ['📖', '📜', '✍🏼', '🗂️', '🔍', '🏛️', '✒️', '⭐'];

interface Props {
  visible: boolean;
  completedDoctrines: number;
  onClose: () => void;
}

export function ProgressPathModal({ visible, completedDoctrines, onClose }: Props) {
  const colors = useColors();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={styles.headerSpacer} />
          <Text style={[styles.headerTitle, { color: colors.primary }]}>Caminho de Progresso</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={[styles.closeText, { color: colors.mutedForeground }]}>Fechar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary */}
          <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.primary }]}>
            <Text style={[styles.summaryCount, { color: colors.primary }]}>
              {completedDoctrines}/28
            </Text>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
              Doutrinas concluídas
            </Text>
          </View>

          {/* Path */}
          <View style={styles.path}>
            {RANKS.map((rank, i) => {
              const icon = RANK_ICONS[i] ?? '◆';
              const isCompleted = completedDoctrines >= rank.maxDoctrines && rank.maxDoctrines < 29;
              const isCurrent =
                completedDoctrines >= rank.minDoctrines - 1 &&
                completedDoctrines < rank.maxDoctrines + 1 &&
                rank.maxDoctrines < 29;
              const isMaster = rank.maxDoctrines >= 29;
              const isMasterAchieved = isMaster && completedDoctrines >= 28;

              const nodeActive = isCompleted || isCurrent || isMasterAchieved;
              const isLast = i === RANKS.length - 1;

              // How many doctrines within this rank are done
              const rankStart = rank.minDoctrines - 1; // 0-based
              const rankEnd = Math.min(rank.maxDoctrines, 28);
              const rankTotal = isMaster ? 28 - 24 : rankEnd - rankStart;
              const rankDone = isMaster
                ? Math.max(0, completedDoctrines - 24)
                : Math.max(0, Math.min(completedDoctrines - rankStart, rankTotal));

              return (
                <View key={rank.title} style={styles.rankRow}>
                  {/* Connector line above (skip first) */}
                  {i > 0 && (
                    <View style={styles.connectorWrap}>
                      <View
                        style={[
                          styles.connector,
                          { backgroundColor: isCompleted || isCurrent || isMasterAchieved ? colors.primary : colors.border },
                        ]}
                      />
                    </View>
                  )}

                  {/* Node card */}
                  <View
                    style={[
                      styles.nodeCard,
                      {
                        backgroundColor: nodeActive ? colors.secondary : colors.card,
                        borderColor: isCurrent || isMasterAchieved
                          ? colors.primary
                          : isCompleted
                          ? colors.success
                          : colors.border,
                        borderWidth: isCurrent || isMasterAchieved ? 2 : 1,
                      },
                    ]}
                  >
                    {/* Icon bubble */}
                    <View
                      style={[
                        styles.iconBubble,
                        {
                          backgroundColor: isCompleted
                            ? colors.success
                            : isCurrent || isMasterAchieved
                            ? colors.primary
                            : colors.muted,
                        },
                      ]}
                    >
                      <Text style={styles.iconText}>
                        {isCompleted ? '✓' : isMasterAchieved ? '⭐' : icon}
                      </Text>
                    </View>

                    {/* Text */}
                    <View style={styles.nodeText}>
                      <Text style={[styles.nodeTitle, { color: colors.foreground }]}>
                        {rank.title}
                      </Text>
                      <Text style={[styles.nodeRange, { color: colors.mutedForeground }]}>
                        {isMaster ? 'Todas as 28 doutrinas' : `${rank.range} doutrinas`}
                      </Text>

                      {/* Inner progress bar (only for current rank) */}
                      {isCurrent && !isMaster && (
                        <View style={styles.innerBarWrap}>
                          <View style={[styles.innerBar, { backgroundColor: colors.muted }]}>
                            <View
                              style={[
                                styles.innerFill,
                                {
                                  backgroundColor: colors.primary,
                                  width: `${(rankDone / rankTotal) * 100}%`,
                                },
                              ]}
                            />
                          </View>
                          <Text style={[styles.innerLabel, { color: colors.mutedForeground }]}>
                            {rankDone}/{rankTotal}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Current badge */}
                    {(isCurrent && !isMasterAchieved) && (
                      <View style={[styles.currentBadge, { backgroundColor: colors.primary }]}>
                        <Text style={[styles.currentBadgeText, { color: colors.primaryForeground }]}>
                          Aqui
                        </Text>
                      </View>
                    )}
                    {isMasterAchieved && (
                      <View style={[styles.currentBadge, { backgroundColor: colors.success }]}>
                        <Text style={[styles.currentBadgeText, { color: colors.successForeground }]}>
                          ✓
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Bottom spacer for last item */}
                  {isLast && <View style={{ height: 20 }} />}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerSpacer: { minWidth: 60 },
  headerTitle: { fontSize: 17, fontWeight: '800' },
  closeBtn: { minWidth: 60, alignItems: 'flex-end' },
  closeText: { fontSize: 15, fontWeight: '500' },

  content: { padding: 20, gap: 4 },

  summaryCard: {
    borderRadius: 16,
    borderWidth: 2,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  summaryCount: { fontSize: 40, fontWeight: '800' },
  summaryLabel: { fontSize: 13, marginTop: 4 },

  path: { gap: 0 },

  rankRow: { alignItems: 'center' },

  connectorWrap: { width: 2, alignItems: 'center', height: 20 },
  connector: { width: 2, flex: 1 },

  nodeCard: {
    width: '100%',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: { fontSize: 20 },
  nodeText: { flex: 1, gap: 3 },
  nodeTitle: { fontSize: 14, fontWeight: '700' },
  nodeRange: { fontSize: 12 },

  innerBarWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  innerBar: { flex: 1, height: 5, borderRadius: 3, overflow: 'hidden' },
  innerFill: { height: '100%', borderRadius: 3 },
  innerLabel: { fontSize: 11, fontWeight: '600' },

  currentBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexShrink: 0,
  },
  currentBadgeText: { fontSize: 12, fontWeight: '800' },
});

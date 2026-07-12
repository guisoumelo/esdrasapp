import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

type BlockState = 'locked' | 'available' | 'passed' | 'failed' | 'completed';

interface TimelineBlockProps {
  label: string;
  timeLabel: string;
  state: BlockState;
  isLast?: boolean;
}

function getStateColors(state: BlockState, colors: ReturnType<typeof useColors>) {
  switch (state) {
    case 'passed':
      return { bg: colors.success, border: colors.success, text: colors.successForeground };
    case 'failed':
      return { bg: colors.destructive, border: colors.destructive, text: colors.destructiveForeground };
    case 'available':
      return { bg: colors.primary, border: colors.primary, text: colors.primaryForeground };
    case 'completed':
      return { bg: colors.success, border: colors.success, text: colors.successForeground };
    case 'locked':
    default:
      return { bg: colors.muted, border: colors.border, text: colors.mutedForeground };
  }
}

function getStateIcon(state: BlockState): string {
  switch (state) {
    case 'passed': return '✓';
    case 'failed': return '✗';
    case 'available': return '◆';
    case 'completed': return '✓';
    case 'locked': return '🔒';
    default: return '·';
  }
}

export function TimelineBlock({ label, timeLabel, state, isLast = false }: TimelineBlockProps) {
  const colors = useColors();
  const sc = getStateColors(state, colors);

  return (
    <View style={styles.wrapper}>
      {/* Connector line above (skip for first, handled by parent) */}
      <View style={styles.row}>
        {/* Dot + vertical line */}
        <View style={styles.track}>
          <View
            style={[
              styles.dot,
              { backgroundColor: sc.bg, borderColor: sc.border },
            ]}
          >
            <Text style={[styles.dotIcon, { color: sc.text }]}>{getStateIcon(state)}</Text>
          </View>
          {!isLast && (
            <View style={[styles.line, { backgroundColor: colors.border }]} />
          )}
        </View>

        {/* Content */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: sc.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardLabel, { color: colors.foreground }]}>{label}</Text>
            <View style={[styles.badge, { backgroundColor: sc.bg }]}>
              <Text style={[styles.badgeText, { color: sc.text }]}>
                {state === 'locked' ? timeLabel : state === 'available' ? 'Disponível' :
                  state === 'passed' ? 'Aprovado' : state === 'failed' ? 'Reprovado' : 'Concluído'}
              </Text>
            </View>
          </View>
          {state === 'locked' && (
            <Text style={[styles.timeText, { color: colors.mutedForeground }]}>
              Disponível após {timeLabel}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  track: {
    alignItems: 'center',
    width: 28,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotIcon: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  line: {
    width: 2,
    height: 28,
    marginTop: 2,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 12,
    marginTop: 4,
  },
});

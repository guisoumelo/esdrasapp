import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { getDoctrine } from '@/constants/doctrines';

export default function LeituraScreen() {
  const colors = useColors();
  const { currentDoctrineId, dayProgress, blockAvailability, completeReading } = useApp();
  const doctrine = getDoctrine(currentDoctrineId);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const alreadyRead = dayProgress.readingCompleted;
  const available = blockAvailability.reading.available;

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
    const isNearBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 60;
    if (isNearBottom) setScrolledToBottom(true);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerLabel, { color: colors.mutedForeground }]}>
          Doutrina {currentDoctrineId} de 28
        </Text>
        <Text style={[styles.headerTitle, { color: colors.primary }]} numberOfLines={2}>
          {doctrine?.nome ?? '—'}
        </Text>
      </View>

      {!available ? (
        <View style={styles.centered}>
          <Text style={[styles.lockedIcon, { color: colors.mutedForeground }]}>🔒</Text>
          <Text style={[styles.lockedTitle, { color: colors.foreground }]}>
            Leitura disponível a partir das 5h
          </Text>
          <Text style={[styles.lockedSub, { color: colors.mutedForeground }]}>
            Volte ao amanhecer para iniciar o estudo de hoje.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={[styles.content, { paddingBottom: 120 }]}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={100}
          >
            {/* Decorative rule */}
            <View style={styles.ornamentRow}>
              <Text style={[styles.ornament, { color: colors.primary }]}>✦ ─────── ✦ ─────── ✦</Text>
            </View>

            <Text style={[styles.bodyText, { color: colors.foreground }]}>
              {doctrine?.texto ?? ''}
            </Text>

            <View style={styles.ornamentRow}>
              <Text style={[styles.ornament, { color: colors.primary }]}>✦ ─────── ✦ ─────── ✦</Text>
            </View>
          </ScrollView>

          {/* Bottom action */}
          <View
            style={[
              styles.footer,
              { backgroundColor: colors.background, borderTopColor: colors.border },
            ]}
          >
            {alreadyRead ? (
              <View style={[styles.doneCard, { backgroundColor: colors.success }]}>
                <Text style={[styles.doneText, { color: colors.successForeground }]}>
                  ✓ Leitura concluída — vá para o Quiz
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[
                  styles.readBtn,
                  {
                    backgroundColor: scrolledToBottom ? colors.primary : colors.muted,
                    opacity: scrolledToBottom ? 1 : 0.6,
                  },
                ]}
                onPress={scrolledToBottom ? completeReading : undefined}
                activeOpacity={scrolledToBottom ? 0.8 : 1}
              >
                <Text
                  style={[
                    styles.readBtnText,
                    {
                      color: scrolledToBottom
                        ? colors.primaryForeground
                        : colors.mutedForeground,
                    },
                  ]}
                >
                  {scrolledToBottom
                    ? '✓ Marcar como Lido'
                    : 'Role até o fim para marcar como lido'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 4,
  },
  headerLabel: { fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  headerTitle: { fontSize: 19, fontWeight: '700', lineHeight: 26 },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 16 },
  ornamentRow: { alignItems: 'center', marginVertical: 4 },
  ornament: { fontSize: 14, letterSpacing: 2 },
  bodyText: { fontSize: 16, lineHeight: 28, letterSpacing: 0.2 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
  },
  readBtn: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  readBtnText: { fontSize: 15, fontWeight: '700' },
  doneCard: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneText: { fontSize: 15, fontWeight: '700' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  lockedIcon: { fontSize: 40 },
  lockedTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  lockedSub: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
});

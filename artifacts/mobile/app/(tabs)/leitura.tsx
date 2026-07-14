import React, { useContext, useRef, useState } from 'react';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import {
  Animated,
  Platform,
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
import { getDoctrine, THEME_GROUPS } from '@/constants/doctrines';
import { DOCTRINES } from '@/constants/doctrines';
import { MAX_UNLOCKED_DOCTRINE } from '@/types';

function nameFor(id: number): string {
  return DOCTRINES.find((d) => d.id === id)?.nome ?? `Doutrina ${id}`;
}

type MacroKey = 'beliefs' | 'daniel';

export default function LeituraScreen() {
  const colors = useColors();
  const { currentDoctrineId, completedDoctrines, readDoctrines, dayProgress } = useApp();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Record<MacroKey, boolean>>({
    beliefs: true,
    daniel: false,
  });

  function toggleMacro(key: MacroKey) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  if (selectedId !== null) {
    return (
      <ReadingDetail
        doctrineId={selectedId}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  // ── Macro-grouped list ──
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>Trilha de Leitura</Text>
        <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
          Escolha um módulo de estudo para explorar
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.listContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Macro 1: 28 Crenças Fundamentais ── */}
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
                // A doctrine is "read" if explicitly confirmed OR already fully completed.
                const hasBeenRead =
                  readDoctrines.includes(id) ||
                  completed ||
                  (isCurrent && dayProgress.readingCompleted);
                const readPending = unlocked && !hasBeenRead;

                const border = completed
                  ? colors.success
                  : hasBeenRead
                  ? colors.success
                  : isCurrent
                  ? colors.primary
                  : colors.border;

                return (
                  <TouchableOpacity
                    key={id}
                    disabled={!unlocked}
                    activeOpacity={0.8}
                    onPress={() => setSelectedId(id)}
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
                      {unlocked ? (
                        completed ? (
                          <Text style={[styles.itemStatus, { color: colors.success }]}>Concluída ✓</Text>
                        ) : hasBeenRead ? (
                          <Text style={[styles.itemStatus, { color: colors.success }]}>Leitura feita ✓</Text>
                        ) : readPending ? (
                          <Text style={[styles.itemStatus, { color: colors.primary }]}>Leitura pendente</Text>
                        ) : (
                          <Text style={[styles.itemStatus, { color: colors.mutedForeground }]}>Disponível</Text>
                        )
                      ) : (
                        <Text style={[styles.itemStatus, { color: colors.mutedForeground }]}>Em breve</Text>
                      )}
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

        {/* ── Macro 2: Profecias de Daniel (em breve) ── */}
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

// ── Collapsible macro group (Accordion) ──
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
          {
            backgroundColor: colors.card,
            borderColor: expanded ? colors.primary : colors.border,
          },
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

// ── Reading detail with "Leitura concluída" + check animation ──
function ReadingDetail({ doctrineId, onBack }: { doctrineId: number; onBack: () => void }) {
  const colors = useColors();

  // Reliable tab-bar height:
  // - Web: ClassicTabLayout hardcodes 84px but BottomTabBarHeightContext may return 0 there.
  // - Native ClassicTabLayout / NativeTabs: context is accurate.
  const tabCtxHeight = useContext(BottomTabBarHeightContext) ?? 0;
  const tabBarHeight = Platform.OS === 'web' ? 84 : tabCtxHeight;

  const { currentDoctrineId, completedDoctrines, readDoctrines, dayProgress, blockAvailability, markDoctrineRead } = useApp();
  const doctrine = getDoctrine(doctrineId);

  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const checkAnim = useRef(new Animated.Value(0)).current; // 0→1 on confirm
  const checkOpacity = useRef(new Animated.Value(0)).current;

  const unlocked = doctrineId <= MAX_UNLOCKED_DOCTRINE;
  const isCurrent = doctrineId === currentDoctrineId;

  // A doctrine is considered read if explicitly confirmed OR already fully completed.
  const alreadyRead =
    readDoctrines.includes(doctrineId) ||
    completedDoctrines.includes(doctrineId) ||
    (isCurrent && dayProgress.readingCompleted);

  // Time-gate only applies to the current doctrine in time-lock mode.
  const readingAvailable = blockAvailability.reading.available;
  const canMark = unlocked && !alreadyRead && (isCurrent ? readingAvailable : true);

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 60) {
      setScrolledToBottom(true);
    }
  }

  function markRead() {
    setShowCheck(true);
    Animated.parallel([
      Animated.spring(checkAnim, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.timing(checkOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();

    setTimeout(async () => {
      await markDoctrineRead(doctrineId);
      Animated.timing(checkOpacity, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
        setShowCheck(false);
        onBack();
      });
    }, 1100);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.detailHeader, { borderBottomColor: colors.border }]}>
        {/* Top row: back ← on left, confirm ✓ on right */}
        <View style={styles.detailHeaderRow}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Voltar</Text>
          </TouchableOpacity>

          {canMark && (
            <TouchableOpacity
              onPress={scrolledToBottom ? markRead : undefined}
              activeOpacity={scrolledToBottom ? 0.75 : 1}
              style={[
                styles.confirmTopBtn,
                {
                  backgroundColor: scrolledToBottom ? colors.primary : 'transparent',
                  borderColor: scrolledToBottom ? colors.primary : colors.border,
                  opacity: scrolledToBottom ? 1 : 0.3,
                },
              ]}
            >
              <Text style={[styles.confirmTopText, { color: scrolledToBottom ? colors.primaryForeground : colors.foreground }]}>
                ✓
              </Text>
            </TouchableOpacity>
          )}

          {alreadyRead && (
            <View style={[styles.confirmTopBtn, { backgroundColor: colors.success, borderColor: colors.success }]}>
              <Text style={[styles.confirmTopText, { color: colors.successForeground }]}>✓</Text>
            </View>
          )}
        </View>

        <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>
          Doutrina {doctrineId}
        </Text>
        <Text style={[styles.detailTitle, { color: colors.primary }]} numberOfLines={2}>
          {doctrine?.nome ?? '—'}
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.detailContent, { paddingBottom: tabBarHeight + 24 }]}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={100}
      >
        <View style={styles.ornamentRow}>
          <Text style={[styles.ornament, { color: colors.primary }]}>✦ ─────── ✦ ─────── ✦</Text>
        </View>
        <Text style={[styles.bodyText, { color: colors.foreground }]}>{doctrine?.texto ?? ''}</Text>
        <View style={styles.ornamentRow}>
          <Text style={[styles.ornament, { color: colors.primary }]}>✦ ─────── ✦ ─────── ✦</Text>
        </View>
      </ScrollView>

      {/* Success animation overlay */}
      {showCheck && (
        <Animated.View style={[styles.overlay, { backgroundColor: colors.scrim, opacity: checkOpacity }]}>
          <Animated.View
            style={[
              styles.checkCircle,
              { backgroundColor: colors.success, transform: [{ scale: checkAnim }] },
            ]}
          >
            <Text style={[styles.checkMark, { color: colors.successForeground }]}>✓</Text>
          </Animated.View>
          <Text style={[styles.checkText, { color: colors.foreground }]}>Leitura confirmada!</Text>
        </Animated.View>
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
  headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: 0.5 },
  headerSub: { fontSize: 13 },
  scroll: { flex: 1 },
  listContent: { padding: 16, gap: 16 },
  // macro accordion
  macro: { gap: 12 },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 16,
  },
  macroIcon: { fontSize: 26 },
  macroHeaderBody: { flex: 1, gap: 2 },
  macroTitle: { fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },
  macroSub: { fontSize: 12 },
  macroChevron: { fontSize: 22, fontWeight: '800', width: 20, textAlign: 'center' },
  macroContent: { gap: 22, paddingTop: 2 },
  comingSoon: {
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  comingSoonEmoji: { fontSize: 34 },
  comingSoonTitle: { fontSize: 16, fontWeight: '700' },
  comingSoonText: { fontSize: 13, lineHeight: 19, textAlign: 'center' },
  group: { gap: 10 },
  groupTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 12,
  },
  itemNum: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemNumText: { fontSize: 14, fontWeight: '800' },
  itemBody: { flex: 1, gap: 2 },
  itemName: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  itemStatus: { fontSize: 12, fontWeight: '500' },
  itemChevron: { fontSize: 20 },
  // detail
  detailHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 6,
  },
  detailHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: { paddingVertical: 6 },
  backText: { fontSize: 15, fontWeight: '600' },
  confirmTopBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmTopText: { fontSize: 16, fontWeight: '800' },
  detailLabel: { fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  detailTitle: { fontSize: 19, fontWeight: '700', lineHeight: 26 },
  detailContent: { padding: 20, gap: 16 },
  ornamentRow: { alignItems: 'center', marginVertical: 4 },
  ornament: { fontSize: 14, letterSpacing: 2 },
  bodyText: { fontSize: 16, lineHeight: 28, letterSpacing: 0.2 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  checkCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { fontSize: 60, color: '#0D1B2A', fontWeight: '800' },
  checkText: { fontSize: 20, fontWeight: '700' },
});

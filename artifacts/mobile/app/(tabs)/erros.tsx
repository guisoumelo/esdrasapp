import React, { useState } from 'react';
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
import { WrongAnswer } from '@/types';

export default function ErrosScreen() {
  const colors = useColors();
  const { errorScroll } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Group by doctrine
  const grouped: Record<string, { name: string; items: WrongAnswer[] }> = {};
  for (const wa of errorScroll) {
    if (!grouped[wa.doctrineId]) {
      grouped[wa.doctrineId] = { name: wa.doctrineName, items: [] };
    }
    grouped[wa.doctrineId].items.push(wa);
  }
  const groups = Object.entries(grouped);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>
          📜 Pergaminho de Erros
        </Text>
        <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>
          {errorScroll.length === 0
            ? 'Nenhum erro registrado'
            : `${errorScroll.length} erro${errorScroll.length !== 1 ? 's' : ''} registrado${errorScroll.length !== 1 ? 's' : ''}`}
        </Text>
      </View>

      {errorScroll.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyIcon, { color: colors.primary }]}>✦</Text>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
            Pergaminho Limpo
          </Text>
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
            Seus erros do Provão Final aparecerão aqui para revisão. Acerte tudo e mantenha o pergaminho limpo!
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, { paddingBottom: 100 }]}
          showsVerticalScrollIndicator={false}
        >
          {groups.map(([docId, group]) => (
            <View key={docId} style={styles.docGroup}>
              {/* Doctrine header */}
              <View style={[styles.docHeader, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.docName, { color: colors.primary }]}>{group.name}</Text>
                <Text style={[styles.docCount, { color: colors.mutedForeground }]}>
                  {group.items.length} erro{group.items.length !== 1 ? 's' : ''}
                </Text>
              </View>

              {/* Wrong answers */}
              {group.items.map((wa) => {
                const isOpen = expanded === wa.uid;
                return (
                  <TouchableOpacity
                    key={wa.uid}
                    style={[
                      styles.card,
                      {
                        backgroundColor: colors.card,
                        borderColor: colors.destructive,
                      },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setExpanded(isOpen ? null : wa.uid)}
                  >
                    <View style={styles.cardRow}>
                      <Text style={[styles.cardQ, { color: colors.foreground }]} numberOfLines={isOpen ? undefined : 2}>
                        {wa.enunciado}
                      </Text>
                      <Text style={[styles.chevron, { color: colors.mutedForeground }]}>
                        {isOpen ? '▲' : '▼'}
                      </Text>
                    </View>

                    {isOpen && (
                      <View style={styles.cardDetails}>
                        {/* Options */}
                        <View style={styles.optionsList}>
                          {wa.opcoes.map((opt) => {
                            const rc = wa.resposta_correta;
                            const isCorrectOpt =
                              rc === 'Verdadeiro' || rc === 'Falso'
                                ? opt === rc
                                : opt.startsWith(`${rc})`);
                            const isMyAnswer = opt === wa.minha_resposta;

                            let color = colors.foreground;
                            let prefix = '  ';
                            if (isCorrectOpt) { color = colors.success; prefix = '✓ '; }
                            else if (isMyAnswer) { color = colors.destructive; prefix = '✗ '; }

                            return (
                              <Text key={opt} style={[styles.optText, { color }]}>
                                {prefix}{opt}
                              </Text>
                            );
                          })}
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.border }]} />

                        <Text style={[styles.correctLabel, { color: colors.success }]}>
                          Correta: {wa.resposta_correta}
                        </Text>
                        <Text style={[styles.myLabel, { color: colors.destructive }]}>
                          Minha resposta: {wa.minha_resposta}
                        </Text>

                        {wa.justificativa ? (
                          <View style={[styles.justBox, { backgroundColor: colors.muted }]}>
                            <Text style={[styles.justTitle, { color: colors.primary }]}>
                              Justificativa
                            </Text>
                            <Text style={[styles.justText, { color: colors.foreground }]}>
                              {wa.justificativa}
                            </Text>
                          </View>
                        ) : null}

                        <Text style={[styles.dateText, { color: colors.mutedForeground }]}>
                          Registrado em: {wa.date}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 4,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', letterSpacing: 0.5 },
  headerSub: { fontSize: 13 },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 20 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 14,
  },
  emptyIcon: { fontSize: 48, textAlign: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  emptyText: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  docGroup: { gap: 10 },
  docHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  docName: { fontSize: 14, fontWeight: '700', flex: 1 },
  docCount: { fontSize: 12 },
  card: { borderRadius: 12, borderWidth: 2, padding: 14, gap: 10 },
  cardRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  cardQ: { fontSize: 14, lineHeight: 22, flex: 1, fontWeight: '500' },
  chevron: { fontSize: 12, marginTop: 4 },
  cardDetails: { gap: 8 },
  optionsList: { gap: 6 },
  optText: { fontSize: 13, lineHeight: 20 },
  divider: { height: 1, marginVertical: 2 },
  correctLabel: { fontSize: 13, fontWeight: '700' },
  myLabel: { fontSize: 13, fontWeight: '600' },
  justBox: { borderRadius: 8, padding: 12, gap: 4 },
  justTitle: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  justText: { fontSize: 13, lineHeight: 20 },
  dateText: { fontSize: 11, marginTop: 2 },
});

import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { ProfileForm } from '@/components/ProfileForm';
import { Profile } from '@/types';

function genderEmoji(p: Profile): string {
  return p.gender === 'female' ? '👩' : '👨';
}

export default function AjustesScreen() {
  const colors = useColors();
  const {
    profiles,
    activeProfile,
    switchProfile,
    createProfile,
    deleteProfile,
    timeLockEnabled,
    setTimeLockEnabled,
  } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.screenTitle, { color: colors.primary }]}>Configurações</Text>

        {/* ── Perfis ── */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Perfis</Text>
          <Text style={[styles.sectionSub, { color: colors.mutedForeground }]}>
            Cada perfil tem seu próprio progresso e histórico.
          </Text>

          {profiles.map((p) => {
            const isActive = activeProfile?.id === p.id;
            return (
              <View
                key={p.id}
                style={[
                  styles.profileRow,
                  {
                    backgroundColor: isActive ? colors.secondary : colors.background,
                    borderColor: isActive ? colors.primary : colors.border,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.profileMain}
                  onPress={() => switchProfile(p.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.profileEmoji}>{genderEmoji(p)}</Text>
                  <View style={styles.profileInfo}>
                    <Text style={[styles.profileName, { color: colors.foreground }]}>{p.nome}</Text>
                    <Text style={[styles.profileMeta, { color: colors.mutedForeground }]}>
                      {p.idade} anos {isActive ? '· Ativo' : ''}
                    </Text>
                  </View>
                  {isActive && <Text style={[styles.activeCheck, { color: colors.primary }]}>✓</Text>}
                </TouchableOpacity>

                {profiles.length > 1 && (
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => setConfirmDelete(p.id)}
                  >
                    <Text style={[styles.deleteText, { color: colors.destructive }]}>Excluir</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}

          <TouchableOpacity
            style={[styles.addBtn, { borderColor: colors.primary }]}
            onPress={() => setShowForm(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.addText, { color: colors.primary }]}>+ Adicionar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* ── Modo de Jogo ── */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Modo de Jogo</Text>

          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={[styles.toggleTitle, { color: colors.foreground }]}>
                Viver a Trilha do Aprendizado Diário
              </Text>
              <Text style={[styles.toggleSub, { color: colors.mutedForeground }]}>
                {timeLockEnabled
                  ? 'Bloqueio por horário ativo: Leitura 5h · Bloco 1 10h · Bloco 2 15h · Provão 19h.'
                  : 'Modo Livre: leia e responda os quizzes no seu próprio ritmo, sem espera.'}
              </Text>
            </View>
            <Switch
              value={timeLockEnabled}
              onValueChange={setTimeLockEnabled}
              trackColor={{ false: colors.muted, true: colors.primary }}
              thumbColor={colors.card}
            />
          </View>
        </View>

        <Text style={[styles.footerNote, { color: colors.mutedForeground }]}>
          Esdras · 28 Crenças Fundamentais da IASD
        </Text>
      </ScrollView>

      {/* Add profile modal */}
      <Modal visible={showForm} transparent animationType="slide" onRequestClose={() => setShowForm(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.primary }]}>Novo Perfil</Text>
              <TouchableOpacity onPress={() => setShowForm(false)}>
                <Text style={[styles.modalClose, { color: colors.mutedForeground }]}>✕</Text>
              </TouchableOpacity>
            </View>
            <ProfileForm
              submitLabel="Criar Perfil"
              onSubmit={(nome, idade, gender) => {
                createProfile(nome, idade, gender);
                setShowForm(false);
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Confirm delete modal */}
      <Modal visible={confirmDelete !== null} transparent animationType="fade" onRequestClose={() => setConfirmDelete(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.confirmCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.confirmTitle, { color: colors.foreground }]}>Excluir perfil?</Text>
            <Text style={[styles.confirmText, { color: colors.mutedForeground }]}>
              Todo o progresso deste perfil será perdido. Esta ação não pode ser desfeita.
            </Text>
            <View style={styles.confirmRow}>
              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: colors.secondary }]}
                onPress={() => setConfirmDelete(null)}
              >
                <Text style={[styles.confirmBtnText, { color: colors.foreground }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: colors.destructive }]}
                onPress={() => {
                  if (confirmDelete) deleteProfile(confirmDelete);
                  setConfirmDelete(null);
                }}
              >
                <Text style={[styles.confirmBtnText, { color: colors.destructiveForeground }]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16, gap: 16, paddingBottom: 100 },
  screenTitle: { fontSize: 24, fontWeight: '800', letterSpacing: 0.5, paddingVertical: 8 },
  section: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  sectionSub: { fontSize: 13, lineHeight: 18, marginTop: -6 },
  profileRow: {
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 12,
    overflow: 'hidden',
  },
  profileMain: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, padding: 12 },
  profileEmoji: { fontSize: 30 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 15, fontWeight: '700' },
  profileMeta: { fontSize: 12, marginTop: 2 },
  activeCheck: { fontSize: 18, fontWeight: '800' },
  deleteBtn: { paddingVertical: 6, paddingHorizontal: 6 },
  deleteText: { fontSize: 12, fontWeight: '600' },
  addBtn: { borderRadius: 12, borderWidth: 1.5, borderStyle: 'dashed', paddingVertical: 14, alignItems: 'center' },
  addText: { fontSize: 14, fontWeight: '700' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  toggleTextWrap: { flex: 1, gap: 4 },
  toggleTitle: { fontSize: 15, fontWeight: '600' },
  toggleSub: { fontSize: 12, lineHeight: 18 },
  footerNote: { fontSize: 12, textAlign: 'center', marginTop: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalCard: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 40, gap: 8 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: '800' },
  modalClose: { fontSize: 20, padding: 4 },
  confirmCard: { margin: 24, marginTop: 'auto', marginBottom: 'auto', borderRadius: 16, padding: 24, gap: 12, alignSelf: 'center', width: '86%' },
  confirmTitle: { fontSize: 18, fontWeight: '700' },
  confirmText: { fontSize: 14, lineHeight: 20 },
  confirmRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  confirmBtn: { flex: 1, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  confirmBtnText: { fontSize: 14, fontWeight: '700' },
});

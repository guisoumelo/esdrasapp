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
import { EditProfileScreen } from '@/components/EditProfileScreen';
import { profileAvatar } from '@/types';
import { Profile } from '@/types';
import { THEMES } from '@/constants/colors';

export default function AjustesScreen() {
  const colors = useColors();
  const {
    profiles,
    activeProfile,
    switchProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    timeLockEnabled,
    setTimeLockEnabled,
    themeId,
    setThemeId,
  } = useApp();

  // Create profile wizard
  const [showForm, setShowForm] = useState(false);

  // Switch profile confirmation
  const [switchTarget, setSwitchTarget] = useState<Profile | null>(null);

  // Edit profiles screen
  const [showEditProfiles, setShowEditProfiles] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  // Collapsible appearance
  const [showThemes, setShowThemes] = useState(false);

  function handleProfileTap(p: Profile) {
    if (activeProfile?.id === p.id) return; // already active, do nothing
    setSwitchTarget(p);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.profileRow,
                  {
                    backgroundColor: isActive ? colors.secondary : colors.background,
                    borderColor: isActive ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => handleProfileTap(p)}
                activeOpacity={isActive ? 1 : 0.8}
              >
                <Text style={styles.profileEmoji}>{profileAvatar(p)}</Text>
                <View style={styles.profileInfo}>
                  <Text style={[styles.profileName, { color: colors.foreground }]}>{p.nome}</Text>
                  {isActive && (
                    <Text style={[styles.profileMeta, { color: colors.mutedForeground }]}>Ativo</Text>
                  )}
                </View>
                {isActive && <Text style={[styles.activeCheck, { color: colors.primary }]}>✓</Text>}
              </TouchableOpacity>
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

        {/* ── Aparência (Tema) — colapsível ── */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity
            style={styles.sectionToggleRow}
            activeOpacity={0.75}
            onPress={() => setShowThemes((v) => !v)}
          >
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Aparência</Text>
            <Text style={[styles.rowChevron, { color: colors.mutedForeground }]}>
              {showThemes ? '⌄' : '›'}
            </Text>
          </TouchableOpacity>

          {showThemes && THEMES.map((t) => {
            const selected = themeId === t.id;
            return (
              <TouchableOpacity
                key={t.id}
                activeOpacity={0.85}
                onPress={() => setThemeId(t.id)}
                style={[
                  styles.themeRow,
                  {
                    backgroundColor: selected ? colors.secondary : colors.background,
                    borderColor: selected ? colors.primary : colors.border,
                  },
                ]}
              >
                <View style={styles.themeSwatch}>
                  {t.swatch.map((c, i) => (
                    <View
                      key={i}
                      style={[
                        styles.swatchDot,
                        { backgroundColor: c, borderColor: colors.border, marginLeft: i === 0 ? 0 : -8 },
                      ]}
                    />
                  ))}
                </View>
                <View style={styles.themeInfo}>
                  <Text style={[styles.themeName, { color: colors.foreground }]}>{t.label}</Text>
                  <Text style={[styles.themeDesc, { color: colors.mutedForeground }]}>{t.description}</Text>
                </View>
                {selected && <Text style={[styles.activeCheck, { color: colors.primary }]}>✓</Text>}
                <Text style={[styles.rowChevron, { color: selected ? colors.primary : colors.mutedForeground }]}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Editar Perfis ── */}
        <TouchableOpacity
          style={[styles.section, styles.editProfilesRow, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => setShowEditProfiles(true)}
          activeOpacity={0.8}
        >
          <View style={styles.editProfilesLeft}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Editar Perfis</Text>
            <Text style={[styles.sectionSub, { color: colors.mutedForeground }]}>
              Altere nome, ícone ou avatar. Exclua perfis.
            </Text>
          </View>
          <Text style={[styles.rowChevron, { color: colors.mutedForeground }]}>›</Text>
        </TouchableOpacity>

        <Text style={[styles.footerNote, { color: colors.mutedForeground }]}>
          Esdras · 28 Crenças Fundamentais da IASD
        </Text>
      </ScrollView>

      {/* ── Add profile modal — full-screen wizard ── */}
      <Modal
        visible={showForm}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowForm(false)}
      >
        <ProfileForm
          onCancel={() => setShowForm(false)}
          onSubmit={(nome, gender, avatar) => {
            createProfile(nome, gender, avatar);
            setShowForm(false);
          }}
        />
      </Modal>

      {/* ── Switch profile confirmation ── */}
      <Modal
        visible={switchTarget !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSwitchTarget(null)}
      >
        <View style={styles.overlayCenter}>
          <View style={[styles.confirmCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.confirmEmoji]}>{switchTarget ? profileAvatar(switchTarget) : ''}</Text>
            <Text style={[styles.confirmTitle, { color: colors.foreground }]}>
              Mudar para "{switchTarget?.nome}"?
            </Text>
            <Text style={[styles.confirmSub, { color: colors.mutedForeground }]}>
              O progresso deste perfil será carregado.
            </Text>
            <View style={styles.confirmBtns}>
              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: colors.secondary }]}
                onPress={() => setSwitchTarget(null)}
              >
                <Text style={[styles.confirmBtnText, { color: colors.foreground }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: colors.primary }]}
                onPress={() => {
                  if (switchTarget) switchProfile(switchTarget.id);
                  setSwitchTarget(null);
                }}
              >
                <Text style={[styles.confirmBtnText, { color: colors.primaryForeground }]}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ── Edit profiles screen ── */}
      <Modal
        visible={showEditProfiles}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => {
          setEditingProfile(null);
          setShowEditProfiles(false);
        }}
      >
        {editingProfile ? (
          <EditProfileScreen
            profile={editingProfile}
            canDelete={profiles.length > 1}
            onSave={(nome, gender, avatar) => {
              updateProfile(editingProfile.id, nome, gender, avatar);
              setEditingProfile(null);
            }}
            onDelete={() => {
              deleteProfile(editingProfile.id);
              setEditingProfile(null);
            }}
            onClose={() => setEditingProfile(null)}
          />
        ) : (
          <EditProfilesList
            profiles={profiles}
            activeProfileId={activeProfile?.id ?? null}
            onSelect={(p) => setEditingProfile(p)}
            onClose={() => setShowEditProfiles(false)}
            colors={colors}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
}

// ── Edit profiles list (pick which profile to edit) ───────────────────────────

function EditProfilesList({
  profiles,
  activeProfileId,
  onSelect,
  onClose,
  colors,
}: {
  profiles: Profile[];
  activeProfileId: string | null;
  onSelect: (p: Profile) => void;
  onClose: () => void;
  colors: ReturnType<typeof import('@/hooks/useColors').useColors>;
}) {
  return (
    <SafeAreaView style={[listStyles.safe, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={[listStyles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onClose}>
          <Text style={[listStyles.back, { color: colors.mutedForeground }]}>‹ Voltar</Text>
        </TouchableOpacity>
        <Text style={[listStyles.title, { color: colors.primary }]}>Editar Perfis</Text>
        <View style={listStyles.spacer} />
      </View>

      <ScrollView contentContainerStyle={listStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[listStyles.hint, { color: colors.mutedForeground }]}>
          Toque em um perfil para editar ou excluir.
        </Text>
        {profiles.map((p) => {
          const isActive = p.id === activeProfileId;
          return (
            <TouchableOpacity
              key={p.id}
              style={[
                listStyles.row,
                {
                  backgroundColor: isActive ? colors.secondary : colors.card,
                  borderColor: isActive ? colors.primary : colors.border,
                },
              ]}
              onPress={() => onSelect(p)}
              activeOpacity={0.8}
            >
              <Text style={listStyles.emoji}>{profileAvatar(p)}</Text>
              <View style={listStyles.info}>
                <Text style={[listStyles.name, { color: colors.foreground }]}>{p.nome}</Text>
                {isActive && (
                  <Text style={[listStyles.meta, { color: colors.mutedForeground }]}>Ativo</Text>
                )}
              </View>
              <Text style={[listStyles.chevron, { color: colors.mutedForeground }]}>›</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const listStyles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  back: { fontSize: 15, fontWeight: '500', minWidth: 70 },
  title: { fontSize: 17, fontWeight: '800' },
  spacer: { minWidth: 70 },
  content: { padding: 16, gap: 12 },
  hint: { fontSize: 13, marginBottom: 4 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    borderRadius: 14, borderWidth: 1.5, padding: 14,
  },
  emoji: { fontSize: 30 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: '700' },
  meta: { fontSize: 12 },
  chevron: { fontSize: 22, fontWeight: '700' },
});

// ── Main styles ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16, gap: 16, paddingBottom: 100 },
  screenTitle: { fontSize: 24, fontWeight: '800', letterSpacing: 0.5, paddingVertical: 8 },
  section: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  sectionSub: { fontSize: 13, lineHeight: 18, marginTop: -6 },
  sectionToggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  profileRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 12, borderWidth: 1, padding: 12,
  },
  profileEmoji: { fontSize: 30 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 15, fontWeight: '700' },
  profileMeta: { fontSize: 12, marginTop: 2 },
  activeCheck: { fontSize: 18, fontWeight: '800' },
  addBtn: { borderRadius: 12, borderWidth: 1.5, borderStyle: 'dashed', paddingVertical: 14, alignItems: 'center' },
  addText: { fontSize: 14, fontWeight: '700' },

  themeRow: {
    borderRadius: 12, borderWidth: 1.5,
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 12,
  },
  themeSwatch: { flexDirection: 'row', alignItems: 'center', paddingLeft: 4 },
  swatchDot: { width: 24, height: 24, borderRadius: 12, borderWidth: 1 },
  themeInfo: { flex: 1, gap: 2 },
  themeName: { fontSize: 15, fontWeight: '700' },
  themeDesc: { fontSize: 12, lineHeight: 16 },
  rowChevron: { fontSize: 22, fontWeight: '700', marginLeft: 2 },

  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  toggleTextWrap: { flex: 1, gap: 4 },
  toggleTitle: { fontSize: 15, fontWeight: '600' },
  toggleSub: { fontSize: 12, lineHeight: 18 },

  editProfilesRow: { flexDirection: 'row', alignItems: 'center' },
  editProfilesLeft: { flex: 1, gap: 4 },

  footerNote: { fontSize: 12, textAlign: 'center', marginTop: 8 },

  // Switch profile confirmation
  overlayCenter: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center', justifyContent: 'center',
  },
  confirmCard: {
    width: '84%', borderRadius: 20,
    padding: 24, gap: 10, alignItems: 'center',
  },
  confirmEmoji: { fontSize: 48, textAlign: 'center' },
  confirmTitle: { fontSize: 18, fontWeight: '800', textAlign: 'center' },
  confirmSub: { fontSize: 13, lineHeight: 18, textAlign: 'center', marginBottom: 6 },
  confirmBtns: { flexDirection: 'row', gap: 12, width: '100%' },
  confirmBtn: { flex: 1, borderRadius: 12, paddingVertical: 13, alignItems: 'center' },
  confirmBtnText: { fontSize: 15, fontWeight: '700' },
});

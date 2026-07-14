import React, { useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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

  const [showForm, setShowForm] = useState(false);
  const [switchTarget, setSwitchTarget] = useState<Profile | null>(null);
  const [showEditProfiles, setShowEditProfiles] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [showThemes, setShowThemes] = useState(false);

  function handleProfileTap(p: Profile) {
    if (activeProfile?.id === p.id) return;
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

      {/* ── Add profile modal ── */}
      <Modal visible={showForm} animationType="slide" presentationStyle="fullScreen" onRequestClose={() => setShowForm(false)}>
        <ProfileForm
          onCancel={() => setShowForm(false)}
          onSubmit={(nome, gender, avatar) => {
            createProfile(nome, gender, avatar);
            setShowForm(false);
          }}
        />
      </Modal>

      {/* ── Switch profile confirmation ── */}
      <Modal visible={switchTarget !== null} transparent animationType="fade" onRequestClose={() => setSwitchTarget(null)}>
        <View style={styles.overlayCenter}>
          <View style={[styles.confirmCard, { backgroundColor: colors.background }]}>
            <Text style={styles.confirmEmoji}>{switchTarget ? profileAvatar(switchTarget) : ''}</Text>
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
        onRequestClose={() => { setEditingProfile(null); setShowEditProfiles(false); }}
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

// ── Edit profiles list ────────────────────────────────────────────────────────

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
  const { resetAll } = useApp();
  const router = useRouter();
  const [showReset, setShowReset] = useState(false);

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

        {/* ── Zona de perigo: Reset ── */}
        <View style={[listStyles.dangerSection, { borderColor: colors.destructive + '44' }]}>
          <Text style={[listStyles.dangerTitle, { color: colors.destructive }]}>Zona de perigo</Text>
          <Text style={[listStyles.dangerSub, { color: colors.mutedForeground }]}>
            Resetar o aplicativo apaga todos os perfis e todo o progresso de forma permanente. O app volta ao estado inicial, como se tivesse acabado de ser instalado.
          </Text>
          <TouchableOpacity
            style={[listStyles.resetBtn, { borderColor: colors.destructive }]}
            onPress={() => setShowReset(true)}
            activeOpacity={0.8}
          >
            <Text style={[listStyles.resetBtnText, { color: colors.destructive }]}>
              Resetar o aplicativo…
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Reset modal */}
      <ResetModal
        visible={showReset}
        colors={colors}
        onCancel={() => setShowReset(false)}
        onConfirm={async () => {
          setShowReset(false);
          onClose();
          await resetAll();
          router.replace('/onboarding');
        }}
      />
    </SafeAreaView>
  );
}

// ── Reset Modal (double-slide + final confirmation) ───────────────────────────

function ResetModal({
  visible,
  colors,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  colors: ReturnType<typeof import('@/hooks/useColors').useColors>;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [bar1Done, setBar1Done] = useState(false);
  const [bar2Done, setBar2Done] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  function handleClose() {
    setBar1Done(false);
    setBar2Done(false);
    setShowFinal(false);
    onCancel();
  }

  function handleBar2Done() {
    setBar2Done(true);
    // Small delay then show final confirmation
    setTimeout(() => setShowFinal(true), 300);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={resetStyles.overlay}>
        {!showFinal ? (
          <View style={[resetStyles.card, { backgroundColor: colors.background }]}>
            <Text style={{ fontSize: 36, textAlign: 'center' }}>⚠️</Text>
            <Text style={[resetStyles.title, { color: colors.destructive }]}>
              Resetar o Aplicativo
            </Text>
            <Text style={[resetStyles.sub, { color: colors.mutedForeground }]}>
              Esta ação apagará todos os perfis e progresso permanentemente. Arraste as duas barras abaixo para continuar.
            </Text>

            {/* Bar 1 */}
            <View style={resetStyles.barWrap}>
              <Text style={[resetStyles.barLabel, { color: colors.mutedForeground }]}>
                {bar1Done ? '✓  Barra 1 confirmada' : 'Barra 1 de 2'}
              </Text>
              {bar1Done ? (
                <View style={[resetStyles.barDone, { backgroundColor: colors.destructive + '33', borderColor: colors.destructive }]}>
                  <Text style={[resetStyles.barDoneText, { color: colors.destructive }]}>✓ Arrastada</Text>
                </View>
              ) : (
                <SlideBar
                  label="Arraste para confirmar →"
                  onConfirm={() => setBar1Done(true)}
                  colors={colors}
                />
              )}
            </View>

            {/* Bar 2 (enabled only after bar 1) */}
            <View style={[resetStyles.barWrap, { opacity: bar1Done ? 1 : 0.35 }]}>
              <Text style={[resetStyles.barLabel, { color: colors.mutedForeground }]}>
                {bar2Done ? '✓  Barra 2 confirmada' : 'Barra 2 de 2'}
              </Text>
              {bar2Done ? (
                <View style={[resetStyles.barDone, { backgroundColor: colors.destructive + '33', borderColor: colors.destructive }]}>
                  <Text style={[resetStyles.barDoneText, { color: colors.destructive }]}>✓ Arrastada</Text>
                </View>
              ) : (
                <SlideBar
                  label="Arraste para confirmar →"
                  onConfirm={bar1Done ? handleBar2Done : undefined}
                  colors={colors}
                  disabled={!bar1Done}
                />
              )}
            </View>

            <TouchableOpacity
              style={[resetStyles.cancelBtn, { backgroundColor: colors.secondary }]}
              onPress={handleClose}
            >
              <Text style={[resetStyles.cancelText, { color: colors.foreground }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[resetStyles.card, { backgroundColor: colors.background }]}>
            <Text style={{ fontSize: 36, textAlign: 'center' }}>💀</Text>
            <Text style={[resetStyles.title, { color: colors.destructive }]}>
              Última confirmação
            </Text>
            <Text style={[resetStyles.sub, { color: colors.mutedForeground }]}>
              Tem absoluta certeza? Todos os perfis, progresso e configurações serão apagados. Não há como desfazer.
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                style={[resetStyles.finalBtn, { backgroundColor: colors.secondary, flex: 1 }]}
                onPress={handleClose}
              >
                <Text style={[resetStyles.finalBtnText, { color: colors.foreground }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[resetStyles.finalBtn, { backgroundColor: colors.destructive, flex: 1 }]}
                onPress={onConfirm}
              >
                <Text style={[resetStyles.finalBtnText, { color: colors.destructiveForeground }]}>
                  Resetar tudo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

// ── Reusable slide bar ────────────────────────────────────────────────────────

function SlideBar({
  label,
  onConfirm,
  colors,
  disabled = false,
}: {
  label: string;
  onConfirm?: () => void;
  colors: ReturnType<typeof import('@/hooks/useColors').useColors>;
  disabled?: boolean;
}) {
  const HANDLE_SIZE = 50;
  const trackWidth = useRef(0);
  const dragX = useRef(new Animated.Value(0)).current;
  const confirmed = useRef(false);

  function onTrackLayout(e: LayoutChangeEvent) {
    trackWidth.current = e.nativeEvent.layout.width;
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderMove: (_, gs) => {
      if (disabled) return;
      const maxX = trackWidth.current - HANDLE_SIZE - 6;
      const clamped = Math.max(0, Math.min(gs.dx, maxX));
      dragX.setValue(clamped);
      if (!confirmed.current && clamped >= maxX * 0.9) {
        confirmed.current = true;
        onConfirm?.();
      }
    },
    onPanResponderRelease: () => {
      if (!confirmed.current) {
        Animated.spring(dragX, { toValue: 0, useNativeDriver: true }).start();
      }
    },
  });

  return (
    <View
      style={[slideStyles.track, { backgroundColor: colors.destructive + '22', borderColor: colors.destructive + '55' }]}
      onLayout={onTrackLayout}
    >
      <Animated.View
        style={[slideStyles.fill, {
          backgroundColor: colors.destructive + '44',
          width: dragX.interpolate({
            inputRange: [0, Math.max(1, (trackWidth.current || 300) - HANDLE_SIZE - 6)],
            outputRange: ['0%', '100%'],
            extrapolate: 'clamp',
          }),
        }]}
      />
      <View style={slideStyles.labelWrap} pointerEvents="none">
        <Text style={[slideStyles.label, { color: colors.destructive }]}>{label}</Text>
      </View>
      <Animated.View
        style={[slideStyles.handle, { width: HANDLE_SIZE, height: HANDLE_SIZE, backgroundColor: colors.destructive, transform: [{ translateX: dragX }] }]}
        {...panResponder.panHandlers}
      >
        <Text style={slideStyles.handleIcon}>›</Text>
      </Animated.View>
    </View>
  );
}

const slideStyles = StyleSheet.create({
  track: {
    height: 56, borderRadius: 28, borderWidth: 1.5,
    overflow: 'hidden', justifyContent: 'center', paddingHorizontal: 3,
  },
  fill: { ...StyleSheet.absoluteFillObject, left: 0 },
  labelWrap: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 13, fontWeight: '700' },
  handle: {
    borderRadius: 25, alignItems: 'center', justifyContent: 'center',
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  handleIcon: { fontSize: 26, fontWeight: '900', color: '#fff' },
});

const resetStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', alignItems: 'center', justifyContent: 'center' },
  card: { width: '90%', borderRadius: 20, padding: 24, gap: 16 },
  title: { fontSize: 18, fontWeight: '800', textAlign: 'center' },
  sub: { fontSize: 13, lineHeight: 20, textAlign: 'center' },
  barWrap: { gap: 6 },
  barLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  barDone: { height: 56, borderRadius: 28, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  barDoneText: { fontSize: 13, fontWeight: '700' },
  cancelBtn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  cancelText: { fontSize: 15, fontWeight: '600' },
  finalBtn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  finalBtnText: { fontSize: 15, fontWeight: '700' },
});

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
  content: { padding: 16, gap: 12, paddingBottom: 40 },
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

  dangerSection: {
    marginTop: 8, borderRadius: 14, borderWidth: 1,
    padding: 16, gap: 10,
  },
  dangerTitle: { fontSize: 14, fontWeight: '800' },
  dangerSub: { fontSize: 13, lineHeight: 18 },
  resetBtn: {
    borderRadius: 10, borderWidth: 1.5,
    paddingVertical: 13, alignItems: 'center',
  },
  resetBtnText: { fontSize: 14, fontWeight: '700' },
});

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

  overlayCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', alignItems: 'center', justifyContent: 'center' },
  confirmCard: { width: '84%', borderRadius: 20, padding: 24, gap: 10, alignItems: 'center' },
  confirmEmoji: { fontSize: 48, textAlign: 'center' },
  confirmTitle: { fontSize: 18, fontWeight: '800', textAlign: 'center' },
  confirmSub: { fontSize: 13, lineHeight: 18, textAlign: 'center', marginBottom: 6 },
  confirmBtns: { flexDirection: 'row', gap: 12, width: '100%' },
  confirmBtn: { flex: 1, borderRadius: 12, paddingVertical: 13, alignItems: 'center' },
  confirmBtnText: { fontSize: 15, fontWeight: '700' },
});

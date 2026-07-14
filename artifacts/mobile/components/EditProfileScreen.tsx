/**
 * EditProfileScreen
 * Full-screen modal for editing an existing profile's name / icon / avatar,
 * and deleting it with a slide-to-confirm gesture.
 */
import React, { useRef, useState } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { Gender, Profile, getAvatarsForGender, profileAvatar } from '@/types';

interface EditProfileScreenProps {
  profile: Profile;
  canDelete: boolean; // false when it's the only profile
  onSave: (nome: string, gender: Gender, avatar: string) => void;
  onDelete: () => void;
  onClose: () => void;
}

export function EditProfileScreen({
  profile,
  canDelete,
  onSave,
  onDelete,
  onClose,
}: EditProfileScreenProps) {
  const colors = useColors();

  const [nome, setNome] = useState(profile.nome);
  const [gender, setGender] = useState<Gender>(profile.gender);
  const [avatar, setAvatar] = useState<string>(profile.avatar ?? profileAvatar(profile));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);

  function handleGenderSelect(g: Gender) {
    if (g !== gender) {
      setGender(g);
      // Reset avatar to first of new gender
      setAvatar(getAvatarsForGender(g)[0]);
    }
  }

  const valid = nome.trim().length >= 2 && gender !== null && avatar !== null;
  const avatars = getAvatarsForGender(gender);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onClose}>
          <Text style={[styles.headerBack, { color: colors.mutedForeground }]}>‹ Voltar</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>Editar Perfil</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Name */}
        <Text style={[styles.label, { color: colors.mutedForeground }]}>NOME</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Nome do perfil"
          placeholderTextColor={colors.mutedForeground}
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.foreground, borderColor: colors.border },
          ]}
          maxLength={30}
          returnKeyType="done"
        />

        {/* Gender / Icon */}
        <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 8 }]}>ÍCONE</Text>
        <View style={styles.genderRow}>
          {([
            { key: 'male' as Gender, emoji: '👨', label: 'Masculino' },
            { key: 'female' as Gender, emoji: '👩', label: 'Feminino' },
          ]).map((g) => {
            const selected = gender === g.key;
            return (
              <TouchableOpacity
                key={g.key}
                style={[
                  styles.genderCard,
                  {
                    backgroundColor: selected ? colors.secondary : colors.card,
                    borderColor: selected ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => handleGenderSelect(g.key)}
                activeOpacity={0.8}
              >
                <Text style={styles.genderEmoji}>{g.emoji}</Text>
                <Text style={[styles.genderLabel, { color: selected ? colors.primary : colors.mutedForeground }]}>
                  {g.label}
                </Text>
                {selected && <Text style={[styles.check, { color: colors.primary }]}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Avatar */}
        <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 8 }]}>AVATAR</Text>
        <View style={styles.avatarGrid}>
          {avatars.map((a) => {
            const sel = avatar === a;
            return (
              <TouchableOpacity
                key={a}
                style={[
                  styles.avatarCard,
                  {
                    backgroundColor: sel ? colors.secondary : colors.card,
                    borderColor: sel ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setAvatar(a)}
                activeOpacity={0.8}
              >
                <Text style={styles.avatarEmoji}>{a}</Text>
                {sel && <Text style={[styles.avatarCheck, { color: colors.primary }]}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Delete section */}
        {canDelete && (
          <View style={[styles.dangerSection, { borderColor: colors.destructive + '44' }]}>
            <Text style={[styles.dangerTitle, { color: colors.destructive }]}>Zona de perigo</Text>
            <Text style={[styles.dangerSub, { color: colors.mutedForeground }]}>
              Excluir este perfil apaga todo o progresso de forma permanente.
            </Text>
            <TouchableOpacity
              style={[styles.deleteBtn, { borderColor: colors.destructive }]}
              onPress={() => setShowDeleteConfirm(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.deleteBtnText, { color: colors.destructive }]}>Excluir perfil…</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Save footer */}
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.cancelFooterBtn, { backgroundColor: colors.secondary, borderColor: colors.border }]}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <Text style={[styles.cancelFooterText, { color: colors.foreground }]}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.saveBtn,
            { backgroundColor: valid ? colors.primary : colors.muted, opacity: valid ? 1 : 0.45 },
          ]}
          onPress={valid ? () => onSave(nome.trim(), gender, avatar) : undefined}
          activeOpacity={valid ? 0.85 : 1}
        >
          <Text style={[styles.saveBtnText, { color: valid ? colors.primaryForeground : colors.mutedForeground }]}>
            Salvar alterações
          </Text>
        </TouchableOpacity>
      </View>

      {/* Slide-to-delete confirmation modal */}
      <Modal visible={showDeleteConfirm} transparent animationType="fade" onRequestClose={() => setShowDeleteConfirm(false)}>
        <View style={styles.overlay}>
          <View style={[styles.deleteCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.deleteCardTitle, { color: colors.foreground }]}>
              Excluir "{profile.nome}"?
            </Text>
            <Text style={[styles.deleteCardSub, { color: colors.mutedForeground }]}>
              Todo o progresso será perdido e não pode ser recuperado.
              Arraste o controle para confirmar.
            </Text>

            <SlideToDelete
              onConfirm={() => {
                setShowDeleteConfirm(false);
                setShowFinalConfirm(true);
              }}
              colors={colors}
            />

            <TouchableOpacity
              style={[styles.cancelDeleteBtn, { backgroundColor: colors.secondary }]}
              onPress={() => setShowDeleteConfirm(false)}
            >
              <Text style={[styles.cancelDeleteText, { color: colors.foreground }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Final delete confirmation */}
      <Modal visible={showFinalConfirm} transparent animationType="fade" onRequestClose={() => setShowFinalConfirm(false)}>
        <View style={styles.overlay}>
          <View style={[styles.deleteCard, { backgroundColor: colors.background }]}>
            <Text style={{ fontSize: 40, textAlign: 'center' }}>⚠️</Text>
            <Text style={[styles.deleteCardTitle, { color: colors.destructive }]}>
              Excluir definitivamente?
            </Text>
            <Text style={[styles.deleteCardSub, { color: colors.mutedForeground }]}>
              Todo o progresso de "{profile.nome}" será apagado para sempre. Esta ação não pode ser desfeita.
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                style={[styles.finalBtn, { backgroundColor: colors.secondary, flex: 1 }]}
                onPress={() => setShowFinalConfirm(false)}
              >
                <Text style={[styles.finalBtnText, { color: colors.foreground }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.finalBtn, { backgroundColor: colors.destructive, flex: 1 }]}
                onPress={() => {
                  setShowFinalConfirm(false);
                  onDelete();
                }}
              >
                <Text style={[styles.finalBtnText, { color: colors.destructiveForeground }]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ── Slide-to-delete widget ────────────────────────────────────────────────────

function SlideToDelete({
  onConfirm,
  colors,
}: {
  onConfirm: () => void;
  colors: ReturnType<typeof import('@/hooks/useColors').useColors>;
}) {
  const HANDLE_SIZE = 52;
  const trackWidth = useRef(0);
  const dragX = useRef(new Animated.Value(0)).current;
  const confirmed = useRef(false);

  function onTrackLayout(e: LayoutChangeEvent) {
    trackWidth.current = e.nativeEvent.layout.width;
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gs) => {
      const maxX = trackWidth.current - HANDLE_SIZE - 6; // 6 = 2×3px padding
      const clamped = Math.max(0, Math.min(gs.dx, maxX));
      dragX.setValue(clamped);

      if (!confirmed.current && clamped >= maxX * 0.9) {
        confirmed.current = true;
        onConfirm();
      }
    },
    onPanResponderRelease: () => {
      if (!confirmed.current) {
        Animated.spring(dragX, { toValue: 0, useNativeDriver: true }).start();
      }
    },
  });

  const trackFill = dragX.interpolate({
    inputRange: [0, Math.max(1, (trackWidth.current || 300) - HANDLE_SIZE - 6)],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={[styles.slideTrack, { backgroundColor: colors.destructive + '22', borderColor: colors.destructive + '55' }]}
      onLayout={onTrackLayout}
    >
      {/* Fill bar */}
      <Animated.View
        style={[styles.slideFill, { backgroundColor: colors.destructive + '44', width: trackFill }]}
      />

      {/* Label behind handle */}
      <View style={styles.slideLabelWrap} pointerEvents="none">
        <Text style={[styles.slideLabel, { color: colors.destructive }]}>
          Arraste para excluir →
        </Text>
      </View>

      {/* Draggable handle */}
      <Animated.View
        style={[
          styles.slideHandle,
          {
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            backgroundColor: colors.destructive,
            transform: [{ translateX: dragX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.slideHandleIcon}>›</Text>
      </Animated.View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

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
  headerBack: { fontSize: 15, fontWeight: '500', minWidth: 70 },
  headerTitle: { fontSize: 17, fontWeight: '800' },
  headerSpacer: { minWidth: 70 },

  scroll: { flex: 1 },
  content: { padding: 20, gap: 10, paddingBottom: 32 },

  label: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  input: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 17,
  },

  genderRow: { flexDirection: 'row', gap: 12 },
  genderCard: {
    flex: 1, borderRadius: 14, borderWidth: 2,
    paddingVertical: 18, alignItems: 'center', gap: 6,
  },
  genderEmoji: { fontSize: 36 },
  genderLabel: { fontSize: 13, fontWeight: '600' },
  check: { fontSize: 13, fontWeight: '800' },

  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  avatarCard: {
    width: '30%', aspectRatio: 1, borderRadius: 14, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', position: 'relative',
    overflow: 'hidden',
  },
  avatarEmoji: {
    fontSize: 34,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 42,
    includeFontPadding: false,
  },
  avatarCheck: { position: 'absolute', top: 5, right: 7, fontSize: 12, fontWeight: '800' },

  dangerSection: {
    marginTop: 12, borderRadius: 14, borderWidth: 1,
    padding: 16, gap: 8,
  },
  dangerTitle: { fontSize: 14, fontWeight: '800' },
  dangerSub: { fontSize: 13, lineHeight: 18 },
  deleteBtn: {
    borderRadius: 10, borderWidth: 1.5,
    paddingVertical: 12, alignItems: 'center', marginTop: 4,
  },
  deleteBtnText: { fontSize: 14, fontWeight: '700' },

  footer: {
    flexDirection: 'row', gap: 12,
    paddingHorizontal: 20, paddingTop: 14, paddingBottom: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  cancelFooterBtn: {
    flex: 1, borderRadius: 14, borderWidth: 1,
    paddingVertical: 15, alignItems: 'center',
  },
  cancelFooterText: { fontSize: 15, fontWeight: '600' },
  saveBtn: { flex: 2, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  saveBtnText: { fontSize: 15, fontWeight: '700' },

  // Delete confirm modal
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center', justifyContent: 'center',
  },
  deleteCard: {
    width: '88%', borderRadius: 20,
    padding: 24, gap: 16,
  },
  deleteCardTitle: { fontSize: 18, fontWeight: '800', textAlign: 'center' },
  deleteCardSub: { fontSize: 14, lineHeight: 20, textAlign: 'center' },

  // Slide-to-delete
  slideTrack: {
    height: 58, borderRadius: 29, borderWidth: 1.5,
    overflow: 'hidden', justifyContent: 'center',
    paddingHorizontal: 3,
  },
  slideFill: { ...StyleSheet.absoluteFillObject, left: 0 },
  slideLabelWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'center',
  },
  slideLabel: { fontSize: 14, fontWeight: '700' },
  slideHandle: {
    borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000', shadowOpacity: 0.3,
    shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  slideHandleIcon: { fontSize: 28, fontWeight: '900', color: '#fff' },

  cancelDeleteBtn: {
    borderRadius: 12, paddingVertical: 14, alignItems: 'center',
  },
  cancelDeleteText: { fontSize: 15, fontWeight: '600' },

  finalBtn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  finalBtnText: { fontSize: 15, fontWeight: '700' },
});

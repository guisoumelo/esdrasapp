import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { Gender, getAvatarsForGender } from '@/types';

interface ProfileFormProps {
  onSubmit: (nome: string, gender: Gender, avatar: string) => void;
  onCancel: () => void;
  /** Pre-fill values for edit mode */
  initial?: { nome: string; gender: Gender; avatar: string };
  submitLabel?: string;
}

type Step = 'name' | 'identity';

export function ProfileForm({ onSubmit, onCancel, initial, submitLabel = 'Criar Perfil ✓' }: ProfileFormProps) {
  const colors = useColors();
  const inputRef = useRef<TextInput>(null);

  const [step, setStep] = useState<Step>(initial ? 'identity' : 'name');
  const [nome, setNome] = useState(initial?.nome ?? '');
  const [gender, setGender] = useState<Gender | null>(initial?.gender ?? null);
  const [avatar, setAvatar] = useState<string | null>(initial?.avatar ?? null);

  function handleGenderSelect(g: Gender) {
    if (g !== gender) {
      setGender(g);
      setAvatar(null);
    }
  }

  const totalSteps = 2;
  const currentStep = step === 'name' ? 0 : 1;

  // ── Step 1: Name ─────────────────────────────────────────────────────────────
  if (step === 'name') {
    const valid = nome.trim().length >= 2;
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
        <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TopBar
            onBack={onCancel}
            backLabel="Cancelar"
            total={totalSteps}
            current={currentStep}
            color={colors.primary}
          />

          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.primary }]}>Como você se chama?</Text>
            <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
              Este será o nome do seu perfil de estudos.
            </Text>
            <TextInput
              ref={inputRef}
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome"
              placeholderTextColor={colors.mutedForeground}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={valid ? () => setStep('identity') : undefined}
              style={[
                styles.input,
                { backgroundColor: colors.input, color: colors.foreground, borderColor: colors.border },
              ]}
              maxLength={30}
            />
          </View>

          <FooterRow
            onBack={onCancel}
            backLabel="Cancelar"
            onNext={() => setStep('identity')}
            nextLabel="Avançar →"
            nextEnabled={valid}
            colors={colors}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ── Step 2: Gender + Avatar (merged) ─────────────────────────────────────────
  const valid = gender !== null && avatar !== null;
  const avatars = gender ? getAvatarsForGender(gender) : [];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <TopBar
        onBack={initial ? onCancel : () => setStep('name')}
        backLabel={initial ? 'Cancelar' : '‹ Voltar'}
        total={totalSteps}
        current={currentStep}
        color={colors.primary}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.stepTitle, { color: colors.primary }]}>Ícone e avatar</Text>
        <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
          Escolha como {nome.trim() || 'você'} será representado no app.
        </Text>

        {/* Gender selector */}
        <Text style={[styles.subLabel, { color: colors.mutedForeground }]}>ÍCONE</Text>
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
                {selected && <Text style={[styles.selectedCheck, { color: colors.primary }]}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Avatar grid — shown only after gender is selected */}
        {gender !== null && (
          <>
            <Text style={[styles.subLabel, { color: colors.mutedForeground, marginTop: 8 }]}>AVATAR</Text>
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
          </>
        )}
      </ScrollView>

      <FooterRow
        onBack={initial ? onCancel : () => setStep('name')}
        backLabel={initial ? 'Cancelar' : '‹ Voltar'}
        onNext={() => onSubmit(nome, gender!, avatar!)}
        nextLabel={submitLabel}
        nextEnabled={valid}
        colors={colors}
      />
    </SafeAreaView>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TopBar({
  onBack,
  backLabel,
  total,
  current,
  color,
}: {
  onBack: () => void;
  backLabel: string;
  total: number;
  current: number;
  color: string;
}) {
  return (
    <View style={topBarStyles.bar}>
      <TouchableOpacity onPress={onBack} style={topBarStyles.backBtn}>
        <Text style={[topBarStyles.backText, { color }]}>{backLabel}</Text>
      </TouchableOpacity>
      <View style={topBarStyles.dots}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={[
              topBarStyles.dot,
              {
                backgroundColor: i <= current ? color : color + '33',
                width: i === current ? 20 : 8,
              },
            ]}
          />
        ))}
      </View>
      {/* Invisible spacer to balance the back button */}
      <View style={topBarStyles.spacer} />
    </View>
  );
}

function FooterRow({
  onBack,
  backLabel,
  onNext,
  nextLabel,
  nextEnabled,
  colors,
}: {
  onBack: () => void;
  backLabel: string;
  onNext: () => void;
  nextLabel: string;
  nextEnabled: boolean;
  colors: ReturnType<typeof import('@/hooks/useColors').useColors>;
}) {
  return (
    <View style={[footerStyles.row, { borderTopColor: colors.border }]}>
      <TouchableOpacity
        style={[footerStyles.backBtn, { backgroundColor: colors.secondary, borderColor: colors.border }]}
        onPress={onBack}
        activeOpacity={0.8}
      >
        <Text style={[footerStyles.backText, { color: colors.foreground }]}>{backLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          footerStyles.nextBtn,
          { backgroundColor: nextEnabled ? colors.primary : colors.muted, opacity: nextEnabled ? 1 : 0.45 },
        ]}
        onPress={nextEnabled ? onNext : undefined}
        activeOpacity={nextEnabled ? 0.85 : 1}
      >
        <Text style={[footerStyles.nextText, { color: nextEnabled ? colors.primaryForeground : colors.mutedForeground }]}>
          {nextLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const topBarStyles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: { minWidth: 70 },
  backText: { fontSize: 15, fontWeight: '600' },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { height: 8, borderRadius: 4 },
  spacer: { minWidth: 70 },
});

const footerStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  backText: { fontSize: 16, fontWeight: '600' },
  nextBtn: {
    flex: 2,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  nextText: { fontSize: 16, fontWeight: '700' },
});

const styles = StyleSheet.create({
  safe: { flex: 1 },
  kav: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 24, gap: 12 },

  stepTitle: { fontSize: 26, fontWeight: '800', letterSpacing: 0.3 },
  stepSub: { fontSize: 15, lineHeight: 22 },
  stepContent: { flex: 1, paddingHorizontal: 24, paddingTop: 24, gap: 16 },
  subLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },

  input: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    marginTop: 4,
  },

  genderRow: { flexDirection: 'row', gap: 14 },
  genderCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 22,
    alignItems: 'center',
    gap: 8,
  },
  genderEmoji: { fontSize: 40 },
  genderLabel: { fontSize: 14, fontWeight: '600' },
  selectedCheck: { fontSize: 14, fontWeight: '800' },

  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  avatarCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  avatarEmoji: {
    fontSize: 36,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 44,
    includeFontPadding: false,
  },
  avatarCheck: {
    position: 'absolute',
    top: 5,
    right: 7,
    fontSize: 12,
    fontWeight: '800',
  },
});

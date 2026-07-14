import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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
}

type Step = 'name' | 'gender' | 'avatar';

export function ProfileForm({ onSubmit, onCancel }: ProfileFormProps) {
  const colors = useColors();
  const inputRef = useRef<TextInput>(null);

  const [step, setStep] = useState<Step>('name');
  const [nome, setNome] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const STEPS: Step[] = ['name', 'gender', 'avatar'];
  const stepIndex = STEPS.indexOf(step);
  const progress = (stepIndex + 1) / STEPS.length;

  function handleGenderSelect(g: Gender) {
    if (g !== gender) {
      setGender(g);
      setAvatar(null);
    }
  }

  // ── Step: Name ─────────────────────────────────────────────────────────────
  if (step === 'name') {
    const valid = nome.trim().length >= 2;
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.kav}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={[styles.cancelText, { color: colors.mutedForeground }]}>Cancelar</Text>
            </TouchableOpacity>
            <ProgressDots total={3} current={0} color={colors.primary} />
            <View style={styles.topBarSpacer} />
          </View>

          {/* Content */}
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
              onSubmitEditing={valid ? () => setStep('gender') : undefined}
              style={[
                styles.input,
                { backgroundColor: colors.input, color: colors.foreground, borderColor: colors.border },
              ]}
              maxLength={30}
            />
          </View>

          {/* Footer — always above keyboard */}
          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <TouchableOpacity
              style={[
                styles.nextBtn,
                { backgroundColor: valid ? colors.primary : colors.muted, opacity: valid ? 1 : 0.45 },
              ]}
              onPress={valid ? () => setStep('gender') : undefined}
              activeOpacity={valid ? 0.85 : 1}
            >
              <Text style={[styles.nextBtnText, { color: valid ? colors.primaryForeground : colors.mutedForeground }]}>
                Avançar →
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ── Step: Gender ────────────────────────────────────────────────────────────
  if (step === 'gender') {
    const valid = gender !== null;
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setStep('name')}>
            <Text style={[styles.cancelText, { color: colors.mutedForeground }]}>‹ Voltar</Text>
          </TouchableOpacity>
          <ProgressDots total={3} current={1} color={colors.primary} />
          <View style={styles.topBarSpacer} />
        </View>

        {/* Content */}
        <View style={styles.stepContent}>
          <Text style={[styles.stepTitle, { color: colors.primary }]}>Escolha seu ícone</Text>
          <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
            Selecione como quer ser representado no app.
          </Text>

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
                  {selected && (
                    <Text style={[styles.selectedCheck, { color: colors.primary }]}>✓</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <TouchableOpacity
            style={[
              styles.nextBtn,
              { backgroundColor: valid ? colors.primary : colors.muted, opacity: valid ? 1 : 0.45 },
            ]}
            onPress={valid ? () => setStep('avatar') : undefined}
            activeOpacity={valid ? 0.85 : 1}
          >
            <Text style={[styles.nextBtnText, { color: valid ? colors.primaryForeground : colors.mutedForeground }]}>
              Avançar →
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Step: Avatar ────────────────────────────────────────────────────────────
  const valid = avatar !== null;
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setStep('gender')}>
          <Text style={[styles.cancelText, { color: colors.mutedForeground }]}>‹ Voltar</Text>
        </TouchableOpacity>
        <ProgressDots total={3} current={2} color={colors.primary} />
        <View style={styles.topBarSpacer} />
      </View>

      {/* Content */}
      <View style={styles.stepContent}>
        <Text style={[styles.stepTitle, { color: colors.primary }]}>Escolha seu avatar</Text>
        <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
          Selecione o avatar que vai representar {nome}.
        </Text>

        <View style={styles.avatarGrid}>
          {getAvatarsForGender(gender!).map((a) => {
            const selected = avatar === a;
            return (
              <TouchableOpacity
                key={a}
                style={[
                  styles.avatarCard,
                  {
                    backgroundColor: selected ? colors.secondary : colors.card,
                    borderColor: selected ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setAvatar(a)}
                activeOpacity={0.8}
              >
                <Text style={styles.avatarEmoji}>{a}</Text>
                {selected && (
                  <Text style={[styles.avatarCheck, { color: colors.primary }]}>✓</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.nextBtn,
            { backgroundColor: valid ? colors.primary : colors.muted, opacity: valid ? 1 : 0.45 },
          ]}
          onPress={valid ? () => onSubmit(nome, gender!, avatar!) : undefined}
          activeOpacity={valid ? 0.85 : 1}
        >
          <Text style={[styles.nextBtnText, { color: valid ? colors.primaryForeground : colors.mutedForeground }]}>
            Criar Perfil ✓
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Progress dots ─────────────────────────────────────────────────────────────
function ProgressDots({ total, current, color }: { total: number; current: number; color: string }) {
  return (
    <View style={dots.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            dots.dot,
            {
              backgroundColor: i <= current ? color : color + '33',
              width: i === current ? 20 : 8,
            },
          ]}
        />
      ))}
    </View>
  );
}

const dots = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { height: 8, borderRadius: 4 },
});

const styles = StyleSheet.create({
  safe: { flex: 1 },
  kav: { flex: 1 },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  topBarSpacer: { width: 60 },
  cancelText: { fontSize: 15, fontWeight: '500' },

  // Step content
  stepContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  stepTitle: { fontSize: 26, fontWeight: '800', letterSpacing: 0.3 },
  stepSub: { fontSize: 15, lineHeight: 22, marginTop: -4 },

  // Name step
  input: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    marginTop: 8,
  },

  // Gender step
  genderRow: { flexDirection: 'row', gap: 14, marginTop: 8 },
  genderCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 28,
    alignItems: 'center',
    gap: 10,
  },
  genderEmoji: { fontSize: 44 },
  genderLabel: { fontSize: 15, fontWeight: '600' },
  selectedCheck: { fontSize: 16, fontWeight: '800' },

  // Avatar step
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  avatarCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarEmoji: { fontSize: 38 },
  avatarCheck: {
    position: 'absolute',
    top: 6,
    right: 8,
    fontSize: 13,
    fontWeight: '800',
  },

  // Footer (always at bottom, above tab bar / keyboard)
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  nextBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextBtnText: { fontSize: 17, fontWeight: '700' },
});

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useColors } from '@/hooks/useColors';
import { Gender, getAvatarsForGender } from '@/types';

interface ProfileFormProps {
  submitLabel?: string;
  onSubmit: (nome: string, gender: Gender, avatar: string) => void;
}

export function ProfileForm({ submitLabel = 'Salvar', onSubmit }: ProfileFormProps) {
  const colors = useColors();
  const [nome, setNome] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const valid = nome.trim().length >= 2 && gender !== null && avatar !== null;

  function selectGender(g: Gender) {
    if (g !== gender) {
      setGender(g);
      setAvatar(null); // avatars are gender-specific; reset on change
    }
  }

  return (
    <View style={styles.container}>
      {/* Nome */}
      <View style={styles.field}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
          placeholderTextColor={colors.mutedForeground}
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.foreground, borderColor: colors.border },
          ]}
          maxLength={30}
        />
      </View>

      {/* Gênero */}
      <View style={styles.field}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>Escolha seu ícone</Text>
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
                onPress={() => selectGender(g.key)}
                activeOpacity={0.8}
              >
                <Text style={styles.genderEmoji}>{g.emoji}</Text>
                <Text
                  style={[
                    styles.genderLabel,
                    { color: selected ? colors.primary : colors.mutedForeground },
                  ]}
                >
                  {g.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Avatar (5 variações por gênero) */}
      {gender !== null && (
        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.mutedForeground }]}>Escolha seu avatar</Text>
          <View style={styles.avatarRow}>
            {getAvatarsForGender(gender).map((a) => {
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
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* Submit */}
      <TouchableOpacity
        style={[
          styles.submit,
          { backgroundColor: valid ? colors.primary : colors.muted, opacity: valid ? 1 : 0.5 },
        ]}
        onPress={valid ? () => onSubmit(nome, gender as Gender, avatar as string) : undefined}
        activeOpacity={valid ? 0.85 : 1}
      >
        <Text
          style={[
            styles.submitText,
            { color: valid ? colors.primaryForeground : colors.mutedForeground },
          ]}
        >
          {submitLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 18 },
  field: { gap: 8 },
  label: { fontSize: 13, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  genderRow: { flexDirection: 'row', gap: 12 },
  genderCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 18,
    alignItems: 'center',
    gap: 8,
  },
  genderEmoji: { fontSize: 36 },
  genderLabel: { fontSize: 14, fontWeight: '600' },
  avatarRow: { flexDirection: 'row', gap: 8 },
  avatarCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 12,
    alignItems: 'center',
  },
  avatarEmoji: { fontSize: 30 },
  submit: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  submitText: { fontSize: 16, fontWeight: '700' },
});

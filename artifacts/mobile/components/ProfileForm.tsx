import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useColors } from '@/hooks/useColors';
import { Gender } from '@/types';

interface ProfileFormProps {
  submitLabel?: string;
  onSubmit: (nome: string, idade: number, gender: Gender) => void;
}

export function ProfileForm({ submitLabel = 'Salvar', onSubmit }: ProfileFormProps) {
  const colors = useColors();
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);

  const idadeNum = parseInt(idade, 10);
  const valid = nome.trim().length >= 2 && !isNaN(idadeNum) && idadeNum > 0 && idadeNum < 120 && gender !== null;

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

      {/* Idade */}
      <View style={styles.field}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>Idade</Text>
        <TextInput
          value={idade}
          onChangeText={(t) => setIdade(t.replace(/[^0-9]/g, ''))}
          placeholder="Sua idade"
          placeholderTextColor={colors.mutedForeground}
          keyboardType="number-pad"
          style={[
            styles.input,
            { backgroundColor: colors.input, color: colors.foreground, borderColor: colors.border },
          ]}
          maxLength={3}
        />
      </View>

      {/* Ícone */}
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
                onPress={() => setGender(g.key)}
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

      {/* Submit */}
      <TouchableOpacity
        style={[
          styles.submit,
          { backgroundColor: valid ? colors.primary : colors.muted, opacity: valid ? 1 : 0.5 },
        ]}
        onPress={valid ? () => onSubmit(nome, idadeNum, gender as Gender) : undefined}
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
  submit: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  submitText: { fontSize: 16, fontWeight: '700' },
});

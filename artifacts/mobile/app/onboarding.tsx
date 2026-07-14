import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { ProfileForm } from '@/components/ProfileForm';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    icon: '✦',
    title: 'Seja bem-vindo ao Esdras.',
    body: '',
  },
  {
    icon: '📖',
    title: 'Esse app irá lhe ajudar a compreender as 28 crenças fundamentais da IASD.',
    body: '',
  },
  {
    icon: '📜',
    title: 'Hoje você é um aluno do templo,',
    body: 'mas ao final de 1 mês você será um verdadeiro Escriba Versado, tal qual Esdras.',
  },
];

export default function OnboardingScreen() {
  const colors = useColors();
  const { createProfile } = useApp();
  const scrollRef = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);

  const totalPages = SLIDES.length + 1; // + profile form

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const p = Math.round(e.nativeEvent.contentOffset.x / width);
    if (p !== page) setPage(p);
  }

  function goTo(p: number) {
    scrollRef.current?.scrollTo({ x: p * width, animated: true });
    setPage(p);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        scrollEnabled={page < SLIDES.length}
        keyboardShouldPersistTaps="handled"
      >
        {/* Intro slides */}
        {SLIDES.map((s, i) => (
          <View key={i} style={[styles.slide, { width }]}>
            <Text style={[styles.slideIcon, { color: colors.primary }]}>{s.icon}</Text>
            <Text style={[styles.slideTitle, { color: colors.foreground }]}>{s.title}</Text>
            {s.body ? (
              <Text style={[styles.slideBody, { color: colors.mutedForeground }]}>{s.body}</Text>
            ) : null}
          </View>
        ))}

        {/* Profile form slide */}
        <View style={[styles.formSlide, { width }]}>
          <KeyboardAwareScrollViewCompat
            contentContainerStyle={styles.formContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.formIcon, { color: colors.primary }]}>✦</Text>
            <Text style={[styles.formTitle, { color: colors.foreground }]}>Crie seu perfil</Text>
            <Text style={[styles.formSub, { color: colors.mutedForeground }]}>
              Preencha seus dados para começar a jornada.
            </Text>
            <View style={{ height: 20 }} />
            <ProfileForm
              submitLabel="Começar Jornada"
              onSubmit={(nome, gender, avatar) => createProfile(nome, gender, avatar)}
            />
          </KeyboardAwareScrollViewCompat>
        </View>
      </ScrollView>

      {/* Footer: dots + next button (hidden on form slide) */}
      {page < SLIDES.length && (
        <View style={styles.footer}>
          <View style={styles.dots}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === page ? colors.primary : colors.border,
                    width: i === page ? 22 : 8,
                  },
                ]}
              />
            ))}
          </View>
          <TouchableOpacity
            style={[styles.nextBtn, { backgroundColor: colors.primary }]}
            onPress={() => goTo(page + 1)}
            activeOpacity={0.85}
          >
            <Text style={[styles.nextText, { color: colors.primaryForeground }]}>
              {page === SLIDES.length - 1 ? 'Criar Perfil →' : 'Avançar →'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    gap: 24,
  },
  slideIcon: { fontSize: 64 },
  slideTitle: { fontSize: 26, fontWeight: '800', textAlign: 'center', lineHeight: 36 },
  slideBody: { fontSize: 17, textAlign: 'center', lineHeight: 26 },
  formSlide: { flex: 1 },
  formContent: { padding: 28, paddingTop: 60, flexGrow: 1 },
  formIcon: { fontSize: 44, textAlign: 'center' },
  formTitle: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginTop: 8 },
  formSub: { fontSize: 14, textAlign: 'center', marginTop: 6, lineHeight: 20 },
  footer: { paddingHorizontal: 28, paddingBottom: 24, gap: 20 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { height: 8, borderRadius: 4 },
  nextBtn: { borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  nextText: { fontSize: 16, fontWeight: '700' },
});

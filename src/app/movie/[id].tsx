import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getMovie } from '../../data/mockMovies';
import { TRIGGERS_BY_ID } from '../../data/triggers';
import { colors } from '../../lib/theme';
import { computeVerdict, HIGH_TRIGGER_THRESHOLD } from '../../lib/verdict';
import { useTriggerPreferences } from '../../state/TriggerPreferences';

export default function MovieScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { sensitivities } = useTriggerPreferences();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const movie = getMovie(id);
  if (!movie) {
    return <Text style={styles.empty}>Movie not found.</Text>;
  }

  const verdict = computeVerdict(movie, sensitivities);
  const noTriggersSet = Object.keys(sensitivities).length === 0;

  const reveal = (triggerId: string) => setRevealed((prev) => new Set(prev).add(triggerId));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: movie.title }} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.year}>{movie.year}</Text>

      {noTriggersSet ? (
        <Text style={styles.note}>You haven’t picked any triggers yet, so there’s nothing to check.</Text>
      ) : (
        <>
          <View style={[styles.verdict, { backgroundColor: verdict.canWatch ? colors.safe : colors.danger }]}>
            <Text style={styles.verdictText}>
              {verdict.canWatch ? 'You can watch this' : 'You might want to skip this'}
            </Text>
            <Text style={styles.score}>Trigger score: {verdict.score}/10</Text>
          </View>

          {verdict.hasHighTrigger && (
            <View style={styles.warning}>
              <Text style={styles.warningText}>
                ⚠️ At least one of your triggers rates above {HIGH_TRIGGER_THRESHOLD}/10 in this film.
              </Text>
            </View>
          )}

          {verdict.hits.length > 0 && (
            <Pressable style={styles.toggle} onPress={() => setShowBreakdown((s) => !s)}>
              <Text style={styles.toggleText}>{showBreakdown ? 'Hide breakdown' : 'Show breakdown'}</Text>
            </Pressable>
          )}

          {showBreakdown &&
            verdict.hits.map((hit, i) => {
              const isRevealed = revealed.has(hit.triggerId);
              return (
                <View key={hit.triggerId} style={styles.hit}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.hitName}>
                      {isRevealed ? TRIGGERS_BY_ID[hit.triggerId]?.name : `Trigger ${i + 1}`}
                    </Text>
                    {!isRevealed && (
                      <Pressable onPress={() => reveal(hit.triggerId)} hitSlop={8}>
                        <Text style={styles.reveal}>Tap to reveal (may spoil)</Text>
                      </Pressable>
                    )}
                  </View>
                  <Text
                    style={[styles.hitRating, hit.rating > HIGH_TRIGGER_THRESHOLD && { color: colors.danger }]}
                  >
                    {hit.rating}/10
                  </Text>
                </View>
              );
            })}
        </>
      )}

      <Text style={styles.disclaimer}>Placeholder data. Real trigger data is coming soon.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  title: { fontSize: 26, fontWeight: '700', color: colors.text },
  year: { color: colors.muted, marginTop: -8 },
  note: { color: colors.muted, fontSize: 15 },
  verdict: { borderRadius: 16, padding: 20, alignItems: 'center' },
  verdictText: { color: '#fff', fontSize: 22, fontWeight: '700', textAlign: 'center' },
  score: { color: '#fff', fontSize: 16, marginTop: 6, opacity: 0.95 },
  warning: { backgroundColor: '#FDF1DC', borderRadius: 12, padding: 14 },
  warningText: { color: '#8A5A00', fontWeight: '600' },
  toggle: { alignSelf: 'flex-start', paddingVertical: 6 },
  toggleText: { color: colors.accent, fontWeight: '600', fontSize: 16 },
  hit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hitName: { fontSize: 16, color: colors.text },
  reveal: { color: colors.accent, marginTop: 4, fontSize: 13 },
  hitRating: { fontSize: 18, fontWeight: '700', color: colors.text },
  empty: { padding: 20, color: colors.muted },
  disclaimer: { marginTop: 16, color: colors.muted, fontSize: 12, textAlign: 'center' },
});

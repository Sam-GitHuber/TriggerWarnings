import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { searchMovies } from '../../data/mockMovies';
import { colors } from '../../lib/theme';
import { useTriggerPreferences } from '../../state/TriggerPreferences';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { sensitivities } = useTriggerPreferences();
  const results = searchMovies(query);
  const triggerCount = Object.keys(sensitivities).length;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie"
        placeholderTextColor={colors.muted}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        returnKeyType="search"
      />
      {triggerCount === 0 && (
        <Link href="/triggers" asChild>
          <Pressable style={styles.banner}>
            <Text style={styles.bannerText}>Set up your triggers first so we can check films for you.</Text>
          </Pressable>
        </Link>
      )}
      <FlatList
        data={results}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<Text style={styles.empty}>No movies found.</Text>}
        renderItem={({ item }) => (
          <Link href={{ pathname: '/movie/[id]', params: { id: item.id } }} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.year}>{item.year}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  banner: { marginTop: 12, padding: 12, borderRadius: 10, backgroundColor: '#E8EBFB' },
  bannerText: { color: colors.accent, fontWeight: '600' },
  list: { paddingVertical: 12, gap: 10 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { fontSize: 17, fontWeight: '600', color: colors.text },
  year: { marginTop: 2, color: colors.muted },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 24 },
});

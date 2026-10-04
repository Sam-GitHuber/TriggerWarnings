import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { SensitivityPicker } from '../../components/SensitivityPicker';
import { TRIGGERS } from '../../data/triggers';
import { colors } from '../../lib/theme';
import { useTriggerPreferences } from '../../state/TriggerPreferences';

export default function TriggersScreen() {
  const { sensitivities, toggle, setSensitivity } = useTriggerPreferences();

  return (
    <FlatList
      data={TRIGGERS}
      keyExtractor={(t) => t.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <Text style={styles.intro}>
          Tick anything you want to avoid, then rate how sensitive you are to it from 1 (mild) to 10 (severe).
        </Text>
      }
      renderItem={({ item }) => {
        const checked = item.id in sensitivities;
        return (
          <View style={styles.card}>
            <Pressable
              style={styles.row}
              onPress={() => toggle(item.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked }}
            >
              <View style={[styles.box, checked && styles.boxChecked]}>
                {checked && <Text style={styles.tick}>✓</Text>}
              </View>
              <Text style={styles.name}>{item.name}</Text>
              {checked && <Text style={styles.level}>{sensitivities[item.id]}/10</Text>}
            </Pressable>
            {checked && (
              <SensitivityPicker
                value={sensitivities[item.id]}
                onChange={(v) => setSensitivity(item.id, v)}
              />
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 10 },
  intro: { color: colors.muted, fontSize: 15, marginBottom: 6, lineHeight: 21 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  box: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  boxChecked: { backgroundColor: colors.accent, borderColor: colors.accent },
  tick: { color: '#fff', fontWeight: '800' },
  name: { flex: 1, fontSize: 16, color: colors.text },
  level: { color: colors.accent, fontWeight: '700' },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../lib/theme';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const LEVELS = Array.from({ length: 10 }, (_, i) => i + 1);

export function SensitivityPicker({ value, onChange }: Props) {
  return (
    <View style={styles.row} accessibilityRole="adjustable" accessibilityValue={{ min: 1, max: 10, now: value }}>
      {LEVELS.map((level) => {
        const selected = level === value;
        return (
          <Pressable
            key={level}
            onPress={() => onChange(level)}
            style={[styles.chip, selected && styles.chipSelected]}
            accessibilityLabel={`Sensitivity ${level}`}
          >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{level}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  chip: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  chipSelected: { backgroundColor: colors.accent },
  chipText: { fontSize: 13, color: colors.muted, fontWeight: '600' },
  chipTextSelected: { color: '#fff' },
});

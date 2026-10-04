import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '../lib/theme';
import { TriggerPreferencesProvider } from '../state/TriggerPreferences';

export default function RootLayout() {
  return (
    <TriggerPreferencesProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Back' }} />
        <Stack.Screen name="movie/[id]" options={{ title: 'Can I watch it?' }} />
      </Stack>
    </TriggerPreferencesProvider>
  );
}

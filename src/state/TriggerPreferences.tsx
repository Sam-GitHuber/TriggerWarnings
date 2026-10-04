import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'triggerPreferences.v1';
export const DEFAULT_SENSITIVITY = 5;

// Selected trigger ids mapped to the user's sensitivity (1-10).
type Sensitivities = Record<string, number>;

type TriggerPreferences = {
  sensitivities: Sensitivities;
  toggle: (id: string) => void;
  setSensitivity: (id: string, value: number) => void;
};

const TriggerPreferencesContext = createContext<TriggerPreferences | null>(null);

export function TriggerPreferencesProvider({ children }: { children: ReactNode }) {
  const [sensitivities, setSensitivities] = useState<Sensitivities>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => raw && setSensitivities(JSON.parse(raw)))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sensitivities)).catch(() => {});
  }, [loaded, sensitivities]);

  const toggle = (id: string) =>
    setSensitivities((prev) => {
      const next = { ...prev };
      if (id in next) delete next[id];
      else next[id] = DEFAULT_SENSITIVITY;
      return next;
    });

  const setSensitivity = (id: string, value: number) =>
    setSensitivities((prev) => ({ ...prev, [id]: value }));

  return (
    <TriggerPreferencesContext.Provider value={{ sensitivities, toggle, setSensitivity }}>
      {children}
    </TriggerPreferencesContext.Provider>
  );
}

export function useTriggerPreferences() {
  const ctx = useContext(TriggerPreferencesContext);
  if (!ctx) throw new Error('useTriggerPreferences must be used inside TriggerPreferencesProvider');
  return ctx;
}

// Placeholder trigger catalogue. The real list will come from the trigger-warning
// data source (likely DoesTheDogDie) via our backend proxy.
export type Trigger = {
  id: string;
  name: string;
};

export const TRIGGERS: Trigger[] = [
  { id: 'animal-death', name: 'An animal dies' },
  { id: 'sexual-assault', name: 'Sexual assault' },
  { id: 'self-harm', name: 'Self-harm' },
  { id: 'suicide', name: 'Suicide' },
  { id: 'gore', name: 'Gore' },
  { id: 'jump-scares', name: 'Jump scares' },
  { id: 'spiders', name: 'Spiders' },
  { id: 'needles', name: 'Needles' },
  { id: 'domestic-abuse', name: 'Domestic abuse' },
  { id: 'child-harm', name: 'A child is harmed' },
  { id: 'drug-use', name: 'Drug use' },
  { id: 'flashing-lights', name: 'Flashing lights' },
  { id: 'claustrophobia', name: 'Claustrophobic scenes' },
  { id: 'vomit', name: 'Vomiting' },
  { id: 'gun-violence', name: 'Gun violence' },
];

export const TRIGGERS_BY_ID: Record<string, Trigger> = Object.fromEntries(
  TRIGGERS.map((t) => [t.id, t]),
);

// Fictional films with made-up content data, used until the real search
// (likely TMDB) and trigger data are wired up through the backend proxy.
export type Movie = {
  id: string;
  title: string;
  year: number;
  // How strongly each trigger is present in the film, 1-10. Missing = not present.
  content: Record<string, number>;
};

export const MOCK_MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'The Quiet Lighthouse',
    year: 2019,
    content: { claustrophobia: 3 },
  },
  {
    id: 'm2',
    title: 'Hollow Pines',
    year: 2022,
    content: { 'jump-scares': 9, gore: 7, spiders: 5, 'animal-death': 6 },
  },
  {
    id: 'm3',
    title: 'Paper Boats',
    year: 2016,
    content: { 'animal-death': 8, 'drug-use': 2 },
  },
  {
    id: 'm4',
    title: 'Neon Runners',
    year: 2024,
    content: { 'flashing-lights': 8, 'gun-violence': 6, 'drug-use': 4 },
  },
  {
    id: 'm5',
    title: 'Sunday at Grandma’s',
    year: 2021,
    content: {},
  },
  {
    id: 'm6',
    title: 'The Ward',
    year: 2018,
    content: { needles: 7, 'self-harm': 5, vomit: 3, claustrophobia: 6 },
  },
];

export function searchMovies(query: string): Movie[] {
  const q = query.trim().toLowerCase();
  if (!q) return MOCK_MOVIES;
  return MOCK_MOVIES.filter((m) => m.title.toLowerCase().includes(q));
}

export function getMovie(id: string): Movie | undefined {
  return MOCK_MOVIES.find((m) => m.id === id);
}

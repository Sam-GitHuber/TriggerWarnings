import type { Movie } from '../data/mockMovies';

export const HIGH_TRIGGER_THRESHOLD = 7;
export const CANNOT_WATCH_THRESHOLD = 5;

export type TriggerHit = {
  triggerId: string;
  // 1-10: how much this film would trigger the user for this trigger.
  rating: number;
};

export type Verdict = {
  canWatch: boolean;
  // Average of the matching trigger ratings, 0 when nothing matches.
  score: number;
  hasHighTrigger: boolean;
  hits: TriggerHit[];
};

// Placeholder scoring: each matching trigger's rating is the film's intensity
// scaled by the user's sensitivity, so a sensitivity of 10 passes the film's
// intensity straight through and lower sensitivities soften it.
export function computeVerdict(movie: Movie, sensitivities: Record<string, number>): Verdict {
  const hits: TriggerHit[] = Object.entries(sensitivities)
    .filter(([id]) => movie.content[id] !== undefined)
    .map(([id, sensitivity]) => ({
      triggerId: id,
      rating: Math.max(1, Math.round((movie.content[id] * sensitivity) / 10)),
    }))
    .sort((a, b) => b.rating - a.rating);

  const score = hits.length
    ? Math.round((hits.reduce((sum, h) => sum + h.rating, 0) / hits.length) * 10) / 10
    : 0;
  const hasHighTrigger = hits.some((h) => h.rating > HIGH_TRIGGER_THRESHOLD);

  return {
    canWatch: score < CANNOT_WATCH_THRESHOLD && !hasHighTrigger,
    score,
    hasHighTrigger,
    hits,
  };
}

import { Match } from "./match.types";

export type Filter = 'all' | 'upcoming' | 'finished';

const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Скоро',
  live: 'Идёт матч',
  finished: 'Завершён',
  postponed: 'Перенесён',
};

export function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

export function scoreText(match: Match): string | null {
  if (!match.score || typeof match.score.home !== 'number') return null;
  return `${match.score.home} : ${match.score.away}`;
}

export function startsAtText(match: Match): string {
  if (!match.startsAt) return 'Время уточняется';
  const date = new Date(match.startsAt);
  if (Number.isNaN(date.getTime())) return 'Время уточняется';
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(date);
}

export function filterMatches(matches: Match[], filter: Filter): Match[] {
  if (filter === 'all') return matches;
  if (filter === 'finished') {
    return matches.filter((match) => match.status === 'finished');
  }
  return matches.filter((match) => match.status !== 'finished');
}

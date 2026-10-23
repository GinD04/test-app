import { Match, scoreText, startsAtText, statusLabel } from '../shared';
import { FavoriteButton } from './FavoriteButton';
import { StyleSheet, Text, View } from 'react-native';

interface MatchCardProps {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function MatchCard({ match, isFavorite, onToggleFavorite }: MatchCardProps) {
  const score = scoreText(match);
  const liveMinute = match.status === 'live' && typeof match.minute === 'number'
    ? `${match.minute}'`
    : null;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.team} numberOfLines={1}>
          {match.home.name}
        </Text>
        <Text style={styles.score}>{score ?? '—'}</Text>
        <Text style={[styles.team, styles.teamAway]} numberOfLines={1}>
          {match.away.name}
        </Text>
        <FavoriteButton active={isFavorite} onPress={onToggleFavorite} />
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.status}>{statusLabel(match.status)}</Text>
        {liveMinute ? <Text style={styles.minute}>{liveMinute}</Text> : null}
        <Text style={styles.time}>{startsAtText(match)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  team: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  teamAway: {
    textAlign: 'right',
  },
  score: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    minWidth: 48,
    textAlign: 'center',
  },
  metaRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  status: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '600',
  },
  minute: {
    fontSize: 13,
    color: '#dc2626',
    fontWeight: '700',
  },
  time: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 'auto',
  },
});

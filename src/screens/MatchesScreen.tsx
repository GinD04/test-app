import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { MatchCard } from '../components/MatchesCard';
import { UpdatedAgo } from '../components/UpdatedAgo';
import { useFavorites } from '../hooks/useFavorites';
import { useMatches } from '../hooks/useMatches';
import { Filter, filterMatches } from '../shared';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'upcoming', label: 'Предстоящие' },
  { key: 'finished', label: 'Завершённые' },
];

export function MatchesScreen() {
  const { matches, loading, error, lastUpdated, refresh } = useMatches();
  const { isFavorite, toggle } = useFavorites();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filterMatches(matches, filter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Матчи тура</Text>
        <View style={styles.headerRight}>
          {lastUpdated ? <UpdatedAgo since={lastUpdated} /> : null}
          <Pressable onPress={refresh} accessibilityRole="button" style={styles.refreshButton}>
            <Text style={styles.refreshText}>Обновить</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={styles.filters}
      >
        {FILTERS.map(({ key, label }) => (
          <FilterChip
            key={key}
            label={label}
            active={filter === key}
            onPress={() => setFilter(key)}
          />
        ))}
      </View>

      {loading ? (
        <Text style={styles.message}>Загрузка…</Text>
      ) : error ? (
        <View style={styles.messageBlock}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={refresh} accessibilityRole="button" style={styles.retryButton}>
            <Text style={styles.retryText}>Повторить</Text>
          </Pressable>
        </View>
      ) : visible.length === 0 ? (
        <Text style={styles.message}>Матчей нет</Text>
      ) : (
        <ScrollView style={styles.list}>
          {visible.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              isFavorite={isFavorite(match.id)}
              onToggleFavorite={() => toggle(match.id)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#e5edff',
  },
  refreshText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  filters: {
    gap: 8,
    marginBottom: 2,
    flexDirection: 'row',
    padding: 5
  },
  chip: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    maxHeight: 'auto'
  },
  chipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  chipText: {
    color: '#374151',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  message: {
    marginTop: 24,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 15,
  },
  messageBlock: {
    marginTop: 24,
    alignItems: 'center',
    gap: 12,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 15,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#dc2626',
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
});

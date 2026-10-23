import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { matchesService } from '../services/match/match.service';

// Экран «Матчи тура» — задание в README.md, часть 1.
export function MatchesScreen() {

  useEffect(() => {
    matchesService.fetch()
    .then((data) => console.log(data))
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Матчи тура</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});

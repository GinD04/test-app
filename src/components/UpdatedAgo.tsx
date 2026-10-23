import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

interface UpdatedAgoProps {
  since: Date;
};

export function UpdatedAgo({ since }: UpdatedAgoProps) {
  const [seconds, setSeconds] = useState(() => elapsedSeconds(since));

  useEffect(() => {
    setSeconds(elapsedSeconds(since));
    const intervalId = setInterval(() => {
      setSeconds(elapsedSeconds(since));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [since]);

  return <Text style={styles.text}>Обновлено {seconds} сек назад</Text>;
}

function elapsedSeconds(since: Date): number {
  return Math.max(0, Math.round((Date.now() - since.getTime()) / 1000));
}

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: '#6b7280',
  },
});

import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/client/components/atoms/EditScreenInfo';
import { Text, View } from '@/client/components/atoms/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text className='rounded-md bg-neutral-300 p-2 text-3xl font-bold text-red-400'>
        Tab One Tailwind
      </Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <EditScreenInfo path='app/(tabs)/index.tsx' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

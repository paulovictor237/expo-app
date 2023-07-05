import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../Button';
import { MotiView } from 'moti';

export function Footer() {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 3000 }}
    >
      <Text className='mb-2 font-bold text-red-800'>Detail</Text>

      <Text className='mb-4 text-gray-500'>
        Get 50% discount on the special and delicious sushi and stay connected
        for further discounts.
      </Text>

      <View className='w-full flex-row items-center justify-between'>
        <Text className='text-2xl font-bold text-amber-900'>$22</Text>
        <Button />
      </View>
    </MotiView>
  );
}

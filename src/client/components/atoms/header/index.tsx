import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import colors from 'tailwindcss/colors';

export function Header() {
  return (
    <View className='my-10 mb-5 w-full flex-row items-center justify-between'>
      <Feather name='arrow-left' color={colors.red[800]} size={32} />

      <View>
        <Text className='text-2xl font-bold text-purple-800'>
          Oriental Food
        </Text>
        <Text className='self-end font-bold text-red-800'>Special Sushi</Text>
      </View>
    </View>
  );
}

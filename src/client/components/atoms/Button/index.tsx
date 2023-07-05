import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import colors from 'tailwindcss/colors';

export function Button() {
  return (
    <TouchableOpacity
      className='w-52 flex-row items-center justify-around rounded-3xl bg-red-800 p-2'
      activeOpacity={0.8}
    >
      <Text className='text-base text-white'>Add to Card</Text>

      <Feather name='shopping-cart' size={24} color={colors.white} />
    </TouchableOpacity>
  );
}

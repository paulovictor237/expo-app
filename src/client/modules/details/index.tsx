import React from 'react';
import { View } from 'react-native';
import { Header } from '@/client/components/atoms/header';
import { Footer } from '@/client/components/atoms/footer';
import { Toggle } from '@/client/components/atoms/toggle';
import { Plate } from '@/client/components/atoms/plate';

export function Details() {
  return (
    <View className='flex-1 bg-neutral-200 p-6'>
      <Header />
      <Toggle />
      <Plate />
      <Footer />
    </View>
  );
}

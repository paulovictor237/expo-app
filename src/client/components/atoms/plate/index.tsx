import React from 'react';
import { Image } from 'react-native';
import plateImg from '@/infra/assets/images/plate.png';
import { MotiImage, MotiView } from 'moti';

export function Plate() {
  return (
    <MotiImage
      from={{ rotate: '100deg', opacity: 0 }}
      animate={{ rotate: '0deg', opacity: 1 }}
      transition={{ type: 'timing', duration: 2000 }}
      className='flex-1'
      source={plateImg}
      resizeMode='contain'
    />
  );
}

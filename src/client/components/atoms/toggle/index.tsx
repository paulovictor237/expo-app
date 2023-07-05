import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Pressable } from 'react-native';
import colors from 'tailwindcss/colors';
import { AnimatePresence, MotiView, useAnimationState } from 'moti';

export function Toggle() {
  const [toggleIsOpen, setToggleIsOpen] = useState(false);

  const toggleAnimationState = useAnimationState({
    from: { height: 60 },
    close: { height: 60 },
    open: { height: 160 },
  });

  const handleToggle = (value: boolean) => {
    toggleAnimationState.transitionTo(value ? 'open' : 'close');
    setToggleIsOpen(value);
  };

  return (
    <MotiView
      animateInitialState
      state={toggleAnimationState}
      className='absolute left-[24] top-[150] z-10 items-center overflow-hidden rounded-b-3xl rounded-r-3xl bg-red-800 p-2 pt-4'
    >
      <Pressable
        onPressIn={() => handleToggle(true)}
        onPressOut={() => handleToggle(false)}
      >
        <View className='items-center'>
          {toggleIsOpen ? (
            <AnimatePresence>
              <MotiView
                from={{ rotate: '0deg', opacity: 0 }}
                animate={{ rotate: '90deg', opacity: 1 }}
                transition={{ type: 'timing' }}
              >
                <Feather name='x' color={colors.white} size={26} />
              </MotiView>
            </AnimatePresence>
          ) : (
            <MotiView
              from={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [
                  { value: 0, type: 'timing' },
                  { value: 1.1, type: 'spring' },
                  { value: 1, type: 'timing' },
                ],
                opacity: 1,
              }}
            >
              <Feather name='tag' color={colors.white} size={26} />
            </MotiView>
          )}
        </View>

        <View className='mt-4'>
          <Text className='text-white'>Calories</Text>
          <Text className='font-bold text-white'>150</Text>
        </View>

        <View className='mt-4'>
          <Text className='text-white'>Weight</Text>
          <Text className='font-bold text-white'>190g</Text>
        </View>
      </Pressable>
    </MotiView>
  );
}

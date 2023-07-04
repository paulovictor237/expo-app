import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Color from 'tailwindcss/colors';

type Item = { id: number; value: string };

export type Props = {
  data: Item;
  scrollY: SharedValue<number>;
  cardPositions: SharedValue<number[]>;
};

export const CARD = { height: 65, length: 12 };

export default function Card({ data, scrollY, cardPositions }: Props) {
  const [moving, setMoving] = useState(false);
  const CARD_HEIGHT = CARD.height;
  const top = useSharedValue(cardPositions.value[data.id] * CARD_HEIGHT);

  function objectMove(positions: number[], from: number, to: number) {
    'worklet';
    const newPositions = Object.assign({}, positions);
    for (const id in positions) {
      if (positions[id] === from) newPositions[id] = to;
      if (positions[id] === to) newPositions[id] = from;
    }
    return newPositions;
  }

  const longPressGesture = Gesture.LongPress()
    .onStart(() => runOnJS(setMoving)(true))
    .minDuration(200);

  const dragGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_, state) => (moving ? state.activate() : state.fail()))
    .onUpdate((event) => {
      top.value = event.absoluteY + scrollY.value - CARD_HEIGHT;
      const earlyUpdate = CARD_HEIGHT / 3;
      const newY = top.value + earlyUpdate;

      const startPositionOnList = 0;
      const endPositionOnList = CARD.length - 1;
      const currentPosition = Math.floor(newY / CARD_HEIGHT);

      const newPosition = Math.max(
        startPositionOnList,
        Math.min(currentPosition, endPositionOnList),
      );

      if (newPosition !== cardPositions.value[data.id]) {
        cardPositions.value = objectMove(
          cardPositions.value,
          cardPositions.value[data.id],
          newPosition,
        );
      }
    })
    .onFinalize(() => {
      const newPosition = cardPositions.value[data.id] * CARD_HEIGHT;
      top.value = withSpring(newPosition);
      runOnJS(setMoving)(false);
    })
    .simultaneousWithExternalGesture(longPressGesture);

  const style = useAnimatedStyle(() => {
    return {
      top: top.value,
      opacity: withSpring(moving ? 1 : 0.4),
      zIndex: moving ? 1 : 0.4,
    };
  }, [moving]);

  useAnimatedReaction(
    () => cardPositions.value[data.id],
    (current, previous) => {
      if (current !== previous && !moving) {
        top.value = withSpring(current * CARD_HEIGHT);
      }
    },
    [moving],
  );

  return (
    <GestureDetector gesture={Gesture.Race(longPressGesture, dragGesture)}>
      <Animated.View
        style={[{ height: CARD_HEIGHT }, style]}
        className='absolute inset-x-0 flex-row items-center justify-between rounded-xl bg-neutral-700 p-4'
      >
        <Text className='text-lg uppercase text-white'>{data.value}</Text>
        <Feather name='menu' size={24} color={Color.white} />
      </Animated.View>
    </GestureDetector>
  );
}

import React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Card, { CARD } from '../../components/atoms/Card';

export function App() {
  const fakeData = Array.from({ length: CARD.length }, (_, k) => {
    return { id: k + 1, value: `Item-${k + 1}` };
  });

  const scrollY = useSharedValue(0);

  function listToObject() {
    const listOfCards = Object.values(fakeData);
    const object: any = {};
    listOfCards.forEach((item, index) => {
      object[item.id] = index;
    });
    return object;
  }

  const cardPositions = useSharedValue(listToObject());

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View className='flex-1 bg-neutral-900 p-5'>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ height: CARD.height * CARD.length }}
      >
        {fakeData.map((data) => (
          <Card
            key={data.id}
            data={data}
            scrollY={scrollY}
            cardPositions={cardPositions}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

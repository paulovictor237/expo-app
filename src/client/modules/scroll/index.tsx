import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  FadeIn,
  FadeOut,
  BounceIn,
  Extrapolation,
  interpolate,
  withDecay,
} from 'react-native-reanimated';
import {
  View,
  Button,
  ScrollView,
  Text,
  NativeScrollEvent,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import tailwindConfig from 'tailwind.config';

export default function AnimatedStyleUpdateExample() {
  const [percentage, setPercentage] = useState(0);
  const ref = useRef<ScrollView>(null);
  const progress = useSharedValue(0);

  const scrollPercentage = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const value = layoutMeasurement.height + contentOffset.y;
    const portent = Math.ceil((value / contentSize.height) * 100);
    setPercentage(contentOffset.y ? portent : 0);
    progress.value = interpolate(
      contentOffset.y ? portent : 0,
      [0, 100],
      [0, 100],
      { extrapolateRight: Extrapolation.EXTEND },
    );
  };

  const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);

  const handleScrollToTop = () => {
    ref.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const onRichened = percentage >= 95;

  const widthContainer = useSharedValue(200);

  const animatedStyle = useAnimatedStyle(() => {
    return { width: widthContainer.value };
  });

  const animatedProgress = useAnimatedStyle(() => ({
    width: `${interpolate(progress.value, [0, 100], [0, 100], {
      extrapolateRight: Extrapolation.CLAMP,
    })}%`,
  }));

  useEffect(() => {
    widthContainer.value = withSpring(onRichened ? 60 : 200, { mass: 0.4 });
  }, [percentage]);

  return (
    <View className='relative flex-1 items-center justify-center p-4'>
      <ScrollView
        ref={ref}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => scrollPercentage(event.nativeEvent)}
      >
        <View>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            nostrum, debitis deleniti laborum vero aut aliquid officia nobis
            neque repellendus dicta! Ex itaque cumque velit necessitatibus,
            provident reiciendis architecto labore. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eaque nostrum, debitis deleniti
            laborum vero aut aliquid officia nobis neque repellendus dicta! Ex
            itaque cumque velit necessitatibus, provident reiciendis architecto
            labore. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eaque nostrum, debitis deleniti laborum vero aut aliquid officia
            nobis neque repellendus dicta! Ex itaque cumque velit
            necessitatibus, provident reiciendis architecto labore. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Eaque nostrum, debitis
            deleniti laborum vero aut aliquid officia nobis neque repellendus
            dicta! Ex itaque cumque velit necessitatibus, provident reiciendis
            architecto labore. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Quidem, repudiandae! Accusamus earum fugiat est
            quo nostrum repellendus amet neque, eos sapiente consequatur sit
            adipisci temporibus nemo praesentium odit molestias natus? Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Quidem,
            repudiandae! Accusamus earum fugiat est quo nostrum repellendus amet
            neque, eos sapiente consequatur sit adipisci temporibus nemo
            praesentium odit molestias natus? Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Quidem, repudiandae! Accusamus earum
            fugiat est quo nostrum repellendus amet neque, eos sapiente
            consequatur sit adipisci temporibus nemo praesentium odit molestias
            natus? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Quidem, repudiandae! Accusamus earum fugiat est quo nostrum
            repellendus amet neque, eos sapiente consequatur sit adipisci
            temporibus nemo praesentium odit molestias natus? Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Quidem, repudiandae!
            Accusamus earum fugiat est quo nostrum repellendus amet neque, eos
            sapiente consequatur sit adipisci temporibus nemo praesentium odit
            molestias natus?
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            nostrum, debitis deleniti laborum vero aut aliquid officia nobis
            neque repellendus dicta! Ex itaque cumque velit necessitatibus,
            provident reiciendis architecto labore. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eaque nostrum, debitis deleniti
            laborum vero aut aliquid officia nobis neque repellendus dicta! Ex
            itaque cumque velit necessitatibus, provident reiciendis architecto
            labore. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eaque nostrum, debitis deleniti laborum vero aut aliquid officia
            nobis neque repellendus dicta! Ex itaque cumque velit
            necessitatibus, provident reiciendis architecto labore. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Eaque nostrum, debitis
            deleniti laborum vero aut aliquid officia nobis neque repellendus
            dicta! Ex itaque cumque velit necessitatibus, provident reiciendis
            architecto labore. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Quidem, repudiandae! Accusamus earum fugiat est
            quo nostrum repellendus amet neque, eos sapiente consequatur sit
            adipisci temporibus nemo praesentium odit molestias natus? Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Quidem,
            repudiandae! Accusamus earum fugiat est quo nostrum repellendus amet
            neque, eos sapiente consequatur sit adipisci temporibus nemo
            praesentium odit molestias natus? Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Quidem, repudiandae! Accusamus earum
            fugiat est quo nostrum repellendus amet neque, eos sapiente
            consequatur sit adipisci temporibus nemo praesentium odit molestias
            natus? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Quidem, repudiandae! Accusamus earum fugiat est quo nostrum
            repellendus amet neque, eos sapiente consequatur sit adipisci
            temporibus nemo praesentium odit molestias natus? Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Quidem, repudiandae!
            Accusamus earum fugiat est quo nostrum repellendus amet neque, eos
            sapiente consequatur sit adipisci temporibus nemo praesentium odit
            molestias natus?
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            nostrum, debitis deleniti laborum vero aut aliquid officia nobis
            neque repellendus dicta! Ex itaque cumque velit necessitatibus,
            provident reiciendis architecto labore. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Eaque nostrum, debitis deleniti
            laborum vero aut aliquid officia nobis neque repellendus dicta! Ex
            itaque cumque velit necessitatibus, provident reiciendis architecto
            labore. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eaque nostrum, debitis deleniti laborum vero aut aliquid officia
            nobis neque repellendus dicta! Ex itaque cumque velit
            necessitatibus, provident reiciendis architecto labore. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Eaque nostrum, debitis
            deleniti laborum vero aut aliquid officia nobis neque repellendus
            dicta! Ex itaque cumque velit necessitatibus, provident reiciendis
            architecto labore. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Quidem, repudiandae! Accusamus earum fugiat est
            quo nostrum repellendus amet neque, eos sapiente consequatur sit
            adipisci temporibus nemo praesentium odit molestias natus? Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Quidem,
            repudiandae! Accusamus earum fugiat est quo nostrum repellendus amet
            neque, eos sapiente consequatur sit adipisci temporibus nemo
            praesentium odit molestias natus? Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Quidem, repudiandae! Accusamus earum
            fugiat est quo nostrum repellendus amet neque, eos sapiente
            consequatur sit adipisci temporibus nemo praesentium odit molestias
            natus? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Quidem, repudiandae! Accusamus earum fugiat est quo nostrum
            repellendus amet neque, eos sapiente consequatur sit adipisci
            temporibus nemo praesentium odit molestias natus? Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Quidem, repudiandae!
            Accusamus earum fugiat est quo nostrum repellendus amet neque, eos
            sapiente consequatur sit adipisci temporibus nemo praesentium odit
            molestias natus?
          </Text>
        </View>
      </ScrollView>
      <Animated.View
        style={animatedStyle}
        className=' absolute bottom-5 flex-row items-center justify-center self-center overflow-hidden rounded-xl bg-slate-600/90 p-5'
      >
        {onRichened ? (
          <AnimatedTouch
            entering={BounceIn}
            exiting={FadeOut}
            onPress={handleScrollToTop}
          >
            <Feather name='arrow-up' size={24} color={'#fff'} />
          </AnimatedTouch>
        ) : (
          <>
            <Text className='mr-2 text-white'>{percentage}%</Text>
            <Animated.View
              className='flex-1 bg-purple-900/80'
              entering={FadeIn}
              exiting={FadeOut}
            >
              <Animated.View
                className='h-1 bg-purple-500'
                // style={{ width: `${percentage}%` }}
                style={animatedProgress}
              />
            </Animated.View>
          </>
        )}
      </Animated.View>
    </View>
  );
}

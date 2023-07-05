import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import Font from '@/infra/assets/fonts/SpaceMono-Regular.ttf';
import Colors from 'tailwindcss/colors';
import 'react-native-gesture-handler';
import { Provider } from '@/client/context/auth';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({ SpaceMono: Font, ...FontAwesome.font });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {/* {loaded && <RootLayoutNav />} */}
      <Toast />
      <Provider>
        <Slot />
      </Provider>
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen
            name='index'
            options={{
              headerShown: false,
              statusBarHidden: false,
              statusBarColor: Colors.black,
            }}
          />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
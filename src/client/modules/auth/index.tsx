import { View, Text, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

const AuthBiometric = () => {
  const [isAuth, setIsAuth] = useState(false);
  const onPress = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) return Alert.alert('Login', 'Função não disponivel');
    const hasEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasEnrolled) return Alert.alert('Login', 'Cadastre a biometria antes');
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Falha na leitura da digital',
    });
    if (!auth) return Alert.alert('Login', 'Não autenticou ');

    setIsAuth(auth.success);
  };

  return (
    <View className='flex-1 items-center justify-center gap-y-2'>
      <View>
        <Text
          className={`self-center 
          ${isAuth ? 'text-green-500' : 'text-red-500'} 
        `}
        >
          isAuth: {isAuth}
        </Text>
      </View>
      <View>
        <Button title='autenticar' onPress={onPress} />
      </View>
    </View>
  );
};

export default AuthBiometric;

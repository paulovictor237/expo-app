import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
interface MyButtonProps {
  onPress: () => void;
  text: string;
  className: string;
  minhaBooleana?: boolean;
  numero?: number;
}

export const MyButton = ({ onPress, text, className }: MyButtonProps) => {
  return (
    <TouchableOpacity
      className={`p-2 bg-green-500 rounded-lg ${className}`}
      onPress={onPress}
    >
      <Text className="text-white text-center">{text}</Text>
    </TouchableOpacity>
  );
};

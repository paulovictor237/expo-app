import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react-native';
import { MyButton } from '.';
import { View } from 'react-native';

type MetaStory = ComponentMeta<typeof MyButton>;
type Story = ComponentStoryObj<typeof MyButton>;

export { MyButtonMeta as default };

const MyButtonMeta: MetaStory = {
  title: 'MyButton',
  component: MyButton,
  args: {
    text: 'Hello worlds',
    className: 'red',
  },
  argTypes: {
    onPress: { action: 'pressed the button' },
    numero: {
      type: 'number',
      description: 'bla bla bla',
    },
    minhaBooleana: { type: 'boolean' },
  },
  decorators: [
    (Story) => (
      <View className="p-4 flex-1 justify-center" children={<Story />} />
    ),
  ],
};

export const Primary: Story = {
  args: { text: 'Button', className: 'bg-green-500' },
};

export const Secondary: Story = {
  args: { text: 'Button', className: 'bg-red-500' },
};

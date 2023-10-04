import React from 'react';
import { Home, Authentication, NotePage } from '../screens';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Authentication"
        component={Authentication}
        options={{
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.RevealFromBottomAndroid
        }}
        name="Home" component={Home} />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS
        }}
        name="NotePage" component={NotePage} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import SpleshScreen from '../screen/SpleshScreen';
import AuthScreen from './auth';
import AppScreen from './app';

function MyStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SpleshScreen">
        <Stack.Screen
          component={SpleshScreen}
          name="SpleshScreen"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={AuthScreen}
          name="AuthScreen"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={AppScreen}
          name="AppScreen"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStackNavigator;

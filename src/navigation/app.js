import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from '../screen/Home';

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name="Home"
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;

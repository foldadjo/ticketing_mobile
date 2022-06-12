import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from '../screen/Home';
import ViewAll from '../screen/ViewAll';
import Detail from '../screen/Detail';
import Booking from '../screen/Booking';
import Payment from '../screen/Payment';

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name="Home"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ViewAll}
        name="ViewAll"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Detail}
        name="Detail"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Booking}
        name="Booking"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={Payment}
        name="Payment"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;

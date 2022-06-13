import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../component/navbar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import Home from '../screen/Home';
import ViewAll from '../screen/ViewAll';
import Profile from '../screen/Profile';
import Detail from '../screen/Detail';
import Booking from '../screen/Booking';
import Payment from '../screen/Payment';

import DrawerContent from '../component/DrawerContent';

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name="Home"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
function ViewallNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ViewAll}
        name="ViewAll"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Profile}
        name="Profile"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
function DetailNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Detail}
        name="Detail"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
function BookingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Booking}
        name="Booking"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
function PaymentNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Payment}
        name="Payment"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        component={HomeNavigator}
        name="Home"
        options={{
          drawerPosition: 'right',
          title: 'Home',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={ViewallNavigator}
        name="ViewAll"
        options={{
          drawerPosition: 'right',
          title: 'List Movie',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="book" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={ProfileNavigator}
        name="Profile"
        options={{
          drawerPosition: 'right',
          title: 'Profile',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={DetailNavigator}
        name="Detail"
        options={{
          drawerPosition: 'right',
          title: 'Detail',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={BookingNavigator}
        name="Booking"
        options={{
          drawerPosition: 'right',
          title: 'Booking',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={PaymentNavigator}
        name="Payment"
        options={{
          drawerPosition: 'right',
          title: 'Payment',
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default AppNavigator;

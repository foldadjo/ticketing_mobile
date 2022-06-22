import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const image = require('../../assets/ss.jpg');
const jwt_decode = require('jwt-decode');

function SpleshSreen(props) {
  useEffect(() => {
    cekToken();
  }, []);
  const cekToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setTimeout(async () => {
      if (token) {
        const decoded = jwt_decode(token);
        if (decoded.exp < Date.now() / 1000) {
          await AsyncStorage.clear();
          props.navigation.replace('AuthScreen');
        } else {
          props.navigation.replace('AppScreen', {screen: 'HomeNavigator'});
        }
      } else {
        props.navigation.replace('AuthScreen');
      }
    }, 3000);
  };
  return (
    <View style={ss.container}>
      <ImageBackground source={image} resizeMode="cover" style={ss.bg}>
        <View style={ss.row}>
          <View>
            <Text style={ss.title}>Ticketing</Text>
          </View>
          <View>
            <Image source={require('../../assets/logo.png')} style={ss.image} />
          </View>
        </View>
        <View>
          <Text style={ss.tag}>wait, watch, wow!</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const ss = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    color: 'white',
    fontWeight: '600',
    padding: 5,
  },
  image: {width: 50, height: 50, top: 6, padding: 5},
  tag: {fontSize: 20, color: 'white', fontWeight: '300', margin: 15},
});

export default SpleshSreen;

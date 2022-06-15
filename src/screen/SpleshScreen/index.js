import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const image = require('../../assets/ss.jpg');

function SpleshSreen(props) {
  useEffect(() => {
    cekToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cekToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setTimeout(() => {
      if (token) {
        props.navigation.navigate('AppScreen', {screen: 'HomeNavigator'});
      } else {
        props.navigation.navigate('AuthScreen');
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

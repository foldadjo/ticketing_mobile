import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

function Navbar(props) {
  const handleHome = () => {
    props.navigation.navigate('Home');
  };
  const openDrawer = () => {
    props.navigation.openDrawer();
  };
  return (
    <View style={navbar.container}>
      <TouchableOpacity style={navbar.row} onPress={handleHome}>
        <View>
          <Text style={navbar.logo}>Ticketing</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/logo.png')}
            style={navbar.image}
          />
        </View>
      </TouchableOpacity>
      <View style={navbar.burger}>
        <TouchableOpacity onPress={openDrawer}>
          <Image
            source={require('../../assets/burger.png')}
            style={navbar.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const navbar = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  logo: {
    fontSize: 20,
    color: '#5F2EEA',
    fontWeight: '600',
    padding: 5,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
  },
  image: {width: 30, height: 30, top: 6, padding: 5},
  burger: {
    padding: 10,
    paddingHorizontal: 20,
  },
});

export default Navbar;

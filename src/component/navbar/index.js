import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from '../../utils/axios';

function Navbar(props) {
  // const [name, setName] = useState('');
  // const [image, setImage] = useState('');
  // const [noTelp, setNoTelp] = useState("hanven't add a number");

  // const getalldata = async e => {
  //   try {
  //     const id = await AsyncStorage.getItem('id');
  //     console.log(id);
  //     const data = await axios.get(`user/${id}`);
  //     console.log(data);
  //     await AsyncStorage.setItem('image', data.data.data.image);
  //     await AsyncStorage.setItem('role', data.data.data.role);
  //     setName(data.data.data.name);
  //     setImage(data.data.data.image);
  //     setNoTelp(data.data.data.noTelp);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };
  const openDrawer = () => {
    props.navigation.openDrawer();
  };
  return (
    <View style={navbar.container}>
      <View style={navbar.row}>
        <View>
          <Text style={navbar.logo}>Ticketing</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/logo.png')}
            style={navbar.image}
          />
        </View>
      </View>
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

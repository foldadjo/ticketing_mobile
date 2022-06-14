import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

function Footer(props) {
  const handleHome = () => {
    props.navigation.navigate('Home');
  };
  const handleViewAll = () => {
    props.navigation.navigate('ViewAllNavigator');
  };
  return (
    <View style={footer.container}>
      <View style={footer.row}>
        <View>
          <Text style={footer.logo}>Ticketing</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/logo.png')}
            style={footer.image}
          />
        </View>
      </View>
      <View style={footer.row}>
        <Text style={footer.tag}>
          Stop waiting in line. Buy tickets {'\n'}
          conveniently, watch movies quietly.
        </Text>
      </View>
      <View style={footer.row}>
        <Text style={footer.title}>Explore</Text>
      </View>
      <View style={footer.row}>
        <TouchableOpacity style={footer.component} onPress={handleHome}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={footer.component2} onPress={handleViewAll}>
          <Text>List Movie</Text>
        </TouchableOpacity>
      </View>
      <View style={footer.row}>
        <Text style={footer.title}>Our Sponsor</Text>
      </View>
      <View style={footer.row}>
        <View style={footer.component}>
          <Image
            source={require('../../assets/ebu.png')}
            style={footer.sponsor}
          />
        </View>
        <View style={footer.component2}>
          <Image
            source={require('../../assets/cineone.png')}
            style={footer.sponsor2}
          />
        </View>
        <View style={footer.component}>
          <Image
            source={require('../../assets/hiflix.png')}
            style={footer.sponsor3}
          />
        </View>
      </View>
      <View style={footer.row}>
        <Text style={footer.title}>Follow Us</Text>
      </View>
      <View style={footer.row}>
        <TouchableOpacity style={footer.component}>
          <Icon name="facebook" size={30} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={footer.component}>
          <Icon name="instagram" size={30} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={footer.component}>
          <Icon name="twitter" size={30} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={footer.component}>
          <Icon name="youtube" size={30} color="grey" />
        </TouchableOpacity>
      </View>
      <Text style={footer.end}>© 2022 Ticketing. All Rights Reserved.</Text>
    </View>
  );
}

const footer = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 580,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  logo: {
    fontSize: 30,
    color: '#5F2EEA',
    fontWeight: '600',
    paddingRight: 5,
  },
  image: {width: 45, height: 45, top: 5, padding: 5},
  tag: {
    color: '#AAAAAA',
    marginVertical: 15,
  },
  title: {
    color: 'black',
    marginTop: 30,
    marginBottom: 10,
    fontWeight: '500',
  },
  component: {
    flex: 1,
    marginRight: 20,
  },
  component2: {
    flex: 2,
  },
  sponsor: {
    width: 35,
    height: 13,
  },
  sponsor2: {
    width: 80,
    height: 13,
  },
  sponsor3: {
    width: 40,
    height: 13,
  },
  end: {
    marginTop: 70,
  },
});

export default Footer;

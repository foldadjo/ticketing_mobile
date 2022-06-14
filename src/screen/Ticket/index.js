/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Footer from '../../component/footer';
// import axios from '../../utils/axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

function Ticket(props) {
  const [lastName, setLastName] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [menu, setMenu] = useState(true);

  const handleOrder = () => {
    setMenu(false);
  };
  const handleProfile = () => {
    setMenu(true);
  };
  return (
    <View>
      <ScrollView
        style={profile.container}
        showsVerticalScrollIndicator={false}>
        <View style={profile.bottom}>
          <View style={profile.flex}>
            <View style={profile.cardbarcode}>
              <View>
                <Image
                  source={require('../../assets/ebu.png')}
                  style={profile.card_premiere}
                />
              </View>
            </View>
          </View>
          <View style={profile.flex}>
            <View style={profile.hr1}>
              <View style={profile.hr} />
            </View>
          </View>
          <View style={profile.flex}>
            <View style={profile.carddetail}>
              <View>
                <Image
                  source={require('../../assets/cineone.png')}
                  style={profile.card_premiere}
                />
              </View>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const profile = StyleSheet.create({
  container: {
    paddingBottom: 50,
    backgroundColor: '#F5F6F8',
  },
  bottom: {
    padding: 30,
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: '#F5F6F8',
    // top: 20,
  },
  hr1: {flexDirection: 'row'},
  hr: {
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 170,
  },
  flex: {
    alignItems: 'center',
  },
  cardbarcode: {
    height: 250,
    width: 250,
    padding: 30,
    marginTop: 30,
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderRadius: 50,
    opacity: 20,
  },
  carddetail: {
    height: 350,
    width: 250,
    padding: 30,
    backgroundColor: 'white',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderRadius: 50,
    // borderTopWidth: 1,
  },
  card_premiere: {
    marginBottom: 5,
  },
});

export default Ticket;

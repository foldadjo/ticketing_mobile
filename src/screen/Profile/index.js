/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Footer from '../../component/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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
  Modal,
  RefreshControl,
  // ActivityIndicator,
} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Profile(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [menu, setMenu] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setFirstName('');
    setLastName('');
    setNoTelp('');
    setPass('');
    setNewPass('');
    setPhoto(null);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  console.log(photo);

  const handleChoosePhoto = async () => {
    await launchImageLibrary({noData: true}, response => {
      try {
        setModalVisible(false);
        // console.log(response);
        if (response) {
          if (response.assets[0].fileSize > 1000000) {
            alert("image size can't be more than 1mb");
          } else {
            setPhoto(response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleTakePhoto = async e => {
    await launchCamera(e, response => {
      try {
        setModalVisible(false);
        if (response) {
          if (response.assets[0].fileSize > 1000000) {
            alert("image size can't be more than 1mb");
          } else {
            setPhoto(response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteImage = () => {
    setModalVisible(false);
    setPhoto(null);
  };

  const handleOrder = () => {
    setMenu(false);
  };
  const handleProfile = () => {
    setMenu(true);
  };
  const handleChangeProfile = async e => {
    try {
      const formProfile = {
        firstName: firstName,
        lastName: lastName,
        noTelp: noTelp,
      };
      console.log(formProfile);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleChangePassword = async e => {
    try {
      const formPass = {newPassword: pass, confirmPassword: newPass};
      console.log(formPass);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleLogout = async () => {
    try {
      alert('Logout');
      await AsyncStorage.clear();
      props.navigation.navigate('AuthScreen', {
        screen: 'Login',
      });
    } catch (error) {}
  };
  const handleTicket = () => {
    props.navigation.navigate('Ticket');
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          style={profile.modal}
          onPress={() => setModalVisible(false)}>
          <View style={profile.modalCard}>
            <View style={profile.btn}>
              <View style={profile.modalbtn}>
                <Button
                  title="Choise foto from file"
                  color={'#5F2EEA'}
                  onPress={handleChoosePhoto}
                />
              </View>
              <View style={profile.modalbtn}>
                <Button
                  title="Open Camera"
                  color={'#5F2EEA'}
                  onPress={() =>
                    handleTakePhoto({
                      quality: 0.6,
                      mediaType: 'photo',
                    })
                  }
                />
              </View>
              <View style={profile.modalbtn2}>
                <Button
                  title="Delete Image"
                  color={'red'}
                  onPress={deleteImage}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={profile.flex2}>
        <View style={profile.pay}>
          <TouchableOpacity onPress={handleProfile}>
            <Text style={menu === true ? profile.textA : profile.textnA}>
              Detail Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOrder}>
            <Text style={menu === false ? profile.textA : profile.textnA}>
              Order History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={profile.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#5F2EEA', '#D6D8E7']}
          />
        }>
        <View style={menu === true ? profile.bottom : profile.dn}>
          <View style={profile.flex}>
            <View style={profile.carduser}>
              <Text style={profile.head_card}>INFO</Text>
              <View style={profile.carduser_item}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Image
                    source={{
                      uri: 'https://res.cloudinary.com/fazztrack/image/upload/v1655102148/tiketjauhar/user/opkiyvpmeejfdjbk8iba.jpg',
                    }}
                    style={profile.avatar}
                  />
                </TouchableOpacity>

                <Text style={profile.textname}>Jauhar Maknun</Text>
                <Text style={profile.tel}>085155405031</Text>
                <View style={profile.hr1}>
                  <View style={profile.hr} />
                </View>
                <View style={profile.btn}>
                  <View style={profile.buttonlogout}>
                    <Button
                      title="Logout"
                      color={'#5F2EEA'}
                      onPress={handleLogout}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={profile.head}>
            <Text style={profile.head_name}>Account Setting</Text>
          </View>
          <View style={profile.flex}>
            <View style={profile.carduser}>
              <View>
                <Text style={profile.head_card}>Detail Information</Text>
              </View>
              <View style={profile.hr1}>
                <View style={profile.hr} />
              </View>
              <View>
                <Text style={profile.name}> First Name </Text>
                <TextInput
                  placeholder="Write your first name"
                  style={profile.form}
                  onChangeText={newText => setFirstName(newText)}
                  defaultValue={firstName}
                />
              </View>
              <View>
                <Text style={profile.name}> Last Name </Text>
                <TextInput
                  placeholder="Write your last name"
                  style={profile.form}
                  onChangeText={newText => setLastName(newText)}
                  defaultValue={lastName}
                />
              </View>
              <View>
                <Text style={profile.name}> Phone Number </Text>
                <TextInput
                  placeholder="Write your phone number"
                  autoComplete="tel"
                  keyboardType="numeric"
                  maxLength={15}
                  style={profile.form}
                  onChangeText={newText => setNoTelp(newText)}
                  defaultValue={noTelp}
                />
              </View>
            </View>
          </View>
          <View style={profile.btn}>
            <View style={profile.button}>
              <Button
                title="Update Change"
                color={'#5F2EEA'}
                onPress={handleChangeProfile}
              />
            </View>
          </View>
          <View style={profile.flex}>
            <View style={profile.cardpassword}>
              <View>
                <Text style={profile.head_card}>Account and Privacy</Text>
              </View>
              <View style={profile.hr1}>
                <View style={profile.hr} />
              </View>
              <View>
                <Text style={profile.name}> New Password </Text>
                <TextInput
                  placeholder="change password"
                  autoComplete="password-new"
                  secureTextEntry={true}
                  style={profile.form}
                  onChangeText={newText => setPass(newText)}
                  defaultValue={pass}
                />
              </View>
              <View>
                <Text style={profile.name}> Confirm </Text>
                <TextInput
                  placeholder="confirm your password"
                  autoComplete="password-new"
                  secureTextEntry={true}
                  style={profile.form}
                  onChangeText={newText => setNewPass(newText)}
                  defaultValue={newPass}
                />
              </View>
            </View>
          </View>
          <View style={profile.btn}>
            <View style={profile.button}>
              <Button
                title="Update Change"
                color={'#5F2EEA'}
                onPress={handleChangePassword}
              />
            </View>
          </View>
        </View>
        <View style={menu === false ? profile.bottom : profile.dn}>
          <View style={profile.flex}>
            <View style={profile.cardhistory}>
              <View>
                <Image
                  source={require('../../assets/ebu.png')}
                  style={profile.card_premiere}
                />
                <Text style={profile.date}>
                  Tuesday, 07 July 2020 - 04:30pm
                </Text>
                <Text style={profile.textname}>Spiderman: Homecoming</Text>
                <View style={profile.hr1}>
                  <View style={profile.hr} />
                </View>
              </View>
              <View style={profile.btn}>
                <View style={profile.button1}>
                  <Button
                    title="Update Change"
                    color={'green'}
                    onPress={handleTicket}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={profile.flex}>
            <View style={profile.cardhistory}>
              <View>
                <Image
                  source={require('../../assets/cineone.png')}
                  style={profile.card_premiere}
                />
                <Text style={profile.date}>
                  Tuesday, 07 July 2020 - 04:30pm
                </Text>
                <Text style={profile.textname}> Avanger: End Game </Text>
                <View style={profile.hr1}>
                  <View style={profile.hr} />
                </View>
              </View>
              <View style={profile.btn}>
                <View style={profile.button2}>
                  <Button
                    title="Update Change"
                    color={'grey'}
                    onPress={handleTicket}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <Footer {...props} />
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
    backgroundColor: '#F5F6F8',
    // top: 20,
  },
  pay: {
    height: 80,
    backgroundColor: 'white',
    width: 360,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  textA: {
    textAlign: 'right',
    fontWeight: '600',
    borderBottomColor: '#5F2EEA',
    borderBottomWidth: 2,
    fontSize: 18,
    paddingVertical: 30,
  },
  textnA: {
    color: '#D6D8E7',
    fontSize: 18,
    paddingVertical: 30,
  },
  dn: {display: 'none'},
  head: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 20,
    flex: 1,
  },
  head_name: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    textAlign: 'left',
    marginVertical: 10,
  },
  hr1: {flexDirection: 'row'},
  hr: {
    borderBottomColor: '#D6D8E7',
    borderBottomWidth: 1,
    marginVertical: 10,
    flex: 1,
  },
  flex: {
    alignItems: 'center',
  },
  flex2: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  carduser: {
    height: 450,
    width: 290,
    marginTop: 30,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  head_card: {
    lineHeight: 30,
    color: 'black',
  },
  carduser_item: {
    alignItems: 'center',
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 180,
    marginVertical: 10,
  },
  textname: {
    fontWeight: '600',
    fontSize: 18,
    padding: 5,
    color: 'black',
    paddingVertical: 10,
  },
  tel: {
    marginBottom: 15,
  },
  cardpassword: {
    height: 340,
    width: 290,
    marginTop: 30,
    padding: 30,
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  name: {fontSize: 15, marginTop: 25},
  form: {
    backgroundColor: '#FFFFFF',
    borderColor: '#8692A6',
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
    marginTop: 8,
  },
  btn: {alignItems: 'center'},
  button: {
    backgroundColor: '#5F2EEA',
    color: 'white',
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 15,
    padding: 5,
    width: 230,
  },
  buttonlogout: {
    backgroundColor: '#5F2EEA',
    color: 'white',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    padding: 5,
    width: 150,
  },
  cardhistory: {
    height: 240,
    width: 290,
    marginTop: 30,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  card_premiere: {
    marginBottom: 5,
  },
  date: {
    color: '#AAAAAA',
    fontSize: 12,
    marginHorizontal: 5,
    marginTop: 15,
  },
  button1: {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 10,
    padding: 5,
    width: 230,
    marginTop: 10,
  },
  button2: {
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: 10,
    padding: 5,
    width: 230,
    marginTop: 10,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalCard: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  modalX: {
    alignItems: 'flex-end',
  },
  modalbtn: {
    backgroundColor: '#5F2EEA',
    color: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    width: 230,
  },
  modalbtn2: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    width: 230,
  },
});

export default Profile;

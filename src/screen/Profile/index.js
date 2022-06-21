import React, {useState, useEffect} from 'react';
import Footer from '../../component/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {getBookingByUserId} from '../../store/action/booking';
import {LINK_CLOUDINARY} from '@env';
import {
  getUser,
  updateProfile,
  updatePassword,
  updateImage,
  deleteImage,
} from '../../store/action/user';
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
  ActivityIndicator,
  FlatList,
} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Profile(props) {
  //form
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [formProfile, setFormProfile] = useState({
    firstName: '',
    lastName: '',
    noTelp: '',
  });
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [formPassword, setFormPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  //modal & menu
  const [menu, setMenu] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  //rendering
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  //data
  const [data, setData] = useState({
    name: 'user ticketing',
    image: 'null',
    noTelp: '',
  });
  const [dataHistory, setDataHistory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    handleUser();
  }, [refreshing, loading, loadingImg, loadingPass]);
  const handleUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      setId(userId);
      const result = await dispatch(getUser(userId));
      setData(result.value.data.data[0]);
    } catch (error) {}
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setFirstName('');
    setLastName('');
    setNoTelp('');
    setPass('');
    setNewPass('');
    setPage(1);
    setLast(false);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const changePicture = async file => {
    try {
      setLoadingImg(true);
      const fdata = new FormData();
      fdata.append('image', {
        uri: file.assets[0].uri,
        type: file.assets[0].type,
        name: file.assets[0].fileName,
      });
      const result = await dispatch(updateImage(id, fdata));
      alert(result.value.data.msg);
      setData({...data, image: result.value.data.data.image});
      setLoadingImg(false);
    } catch (error) {
      setLoading(false);
      console.log('error');
    }
  };

  const handleChoosePhoto = async () => {
    await launchImageLibrary({noData: true}, response => {
      try {
        setModalVisible(false);
        if (response) {
          if (response.assets[0].fileSize > 1000000) {
            alert("image size can't be more than 1mb");
          } else {
            // setPhoto();
            console.log(response);
            changePicture(response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleTakePhoto = async e => {
    try {
      await launchCamera(e, response => {
        try {
          setModalVisible(false);
          if (response) {
            if (response.assets[0].fileSize > 1000000) {
              alert("image size can't be more than 1mb");
            } else {
              // setPhoto();
              changePicture(response);
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
      setModalVisible(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deletePicture = async () => {
    try {
      setModalVisible(false);
      setLoadingImg(true);
      const result = await dispatch(deleteImage(id));
      // setPhoto(null);
      setData({...data, image: 'null'});
      setLoadingImg(false);
      alert(result.value.data.msg);
    } catch (error) {
      setLoadingImg(false);
      alert('image is null');
      console.log(error);
    }
  };

  const handleOrder = () => {
    setMenu(false);
  };
  const handleProfile = () => {
    setMenu(true);
  };

  useEffect(() => {
    setFormProfile({firstName: firstName, lastName: lastName, noTelp: noTelp});
  }, [firstName, lastName, noTelp]);

  const handleChangeProfile = async () => {
    try {
      setLoading(true);
      if (firstName === '' && noTelp === '') {
        alert('form change profile is require');
      } else {
        const result = await dispatch(updateProfile(id, formProfile));
        const name = data.name.split(' ');
        const newData = {
          name: `${
            result.value.data.data.firstName
              ? result.value.data.data.firstName
              : name[0]
          } ${
            result.value.data.data.lastName
              ? result.value.data.data.lastName
              : name[1]
          }`,
          noTelp: result.value.data.data.noTelp
            ? result.value.data.data.noTelp
            : data.noTelp,
          image: data.image,
        };
        setData(newData);
        setFirstName('');
        setLastName('');
        setNoTelp('');
        alert(result.value.data.msg);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  useEffect(() => {
    setFormPassword({newPassword: pass, confirmPassword: newPass});
  }, [pass, newPass]);
  const handleChangePassword = async e => {
    try {
      setLoadingPass(true);
      if (pass === '' || newPass === '') {
        alert('form change password is required');
      } else {
        const result = await dispatch(updatePassword(id, formPassword));
        alert(result.value.data.msg);
        setPass('');
        setNewPass('');
      }
      setLoadingPass(false);
    } catch (error) {
      setLoadingPass(false);
      alert(error.response.value.data.msg);
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

  // Order History

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [totalPage, setTotalPage] = useState(2);
  const [last, setLast] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    handleHistory(page, limit);
  }, [page]);
  const handleHistory = async (pages, limited) => {
    try {
      if (page <= totalPage) {
        setLoading(true);
        setLast(false);
        const userId = await AsyncStorage.getItem('id');
        const result = await dispatch(
          getBookingByUserId(userId, pages, limited),
        );
        if (page === 1) {
          setDataHistory(result.value.data.data);
          console.log(result.value.data.data);
        } else if (page > 1 && page <= totalPage) {
          setDataHistory([...dataHistory, ...result.value.data.data]);
        }
        setTotalPage(result.value.data.pagination.totalPage);
        setLoading(false);
        setLoadMore(false);
      } else {
        setLast(true);
        setLoading(false);
        setLoadMore(false);
      }
    } catch (error) {
      setLoading(false);
      setLoadMore(false);
    }
  };

  const handleLoadMore = async () => {
    if (!loadMore) {
      const newPage = page + 1;
      await setLoadMore(true);
      if (newPage <= totalPage + 1) {
        await setPage(newPage);
      } else {
        setLast(true);
        setLoadMore(false);
        await setPage(page);
      }
    }
  };

  console.log(page);

  const handleTicket = index => {
    props.navigation.navigate('Ticket', {dataHistory: dataHistory[index]});
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
                  onPress={deletePicture}
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
        style={menu === true ? profile.container : ''}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#5F2EEA', '#D6D8E7']}
          />
        }>
        <View style={menu === true ? profile.bottom : profile.dn}>
          <View>
            <View style={profile.flex}>
              <View style={profile.carduser}>
                <Text style={profile.head_card}>INFO</Text>
                <View style={profile.carduser_item}>
                  {loadingImg === true ? (
                    <View style={profile.avatarLoad}>
                      <ActivityIndicator size="large" color={'#5F2EEA'} />
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      {data.image === 'null' ? (
                        <Image
                          source={{
                            uri: 'https://res.cloudinary.com/fazztrack/image/upload/v1655621667/tiketjauhar/user/images_qygn7n.jpg',
                          }}
                          style={profile.avatar}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: `${LINK_CLOUDINARY}${data.image}`,
                          }}
                          style={profile.avatar}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                  <Text style={profile.textname}>{data.name}</Text>
                  <Text style={profile.tel}>
                    {data.noTelp === '' ? 'number phone not add' : data.noTelp}
                  </Text>
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
                {loading === true ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Button
                    title="Update Change"
                    color={'#5F2EEA'}
                    onPress={handleChangeProfile}
                  />
                )}
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
                {loadingPass === true ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Button
                    title="Update Change"
                    color={'#5F2EEA'}
                    onPress={handleChangePassword}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={menu === true ? '' : {display: 'none'}}>
          <Footer {...props} />
        </View>
      </ScrollView>
      <FlatList
        data={dataHistory}
        style={menu === false ? profile.container2 : profile.dn}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View style={menu === false ? profile.bottom : profile.dn}>
            <View style={profile.flex}>
              <View style={profile.cardhistory}>
                <View>
                  <Image
                    source={
                      item.premiere !== 'hiflix'
                        ? item.premiere !== 'Ebu.Id'
                          ? require('../../assets/cineone.png')
                          : require('../../assets/ebu.png')
                        : require('../../assets/hiflix.png')
                    }
                    style={profile.card_premiere}
                  />
                  <Text style={profile.date}>
                    {new Date(item.dateBooking.split('T')[0]).toDateString()} -{' '}
                    {item.timeBooking.split(':')[0]}
                    :00
                  </Text>
                  <Text style={profile.textname}>
                    {item.name.length > 22
                      ? item.name.substring(0, 19) + '...'
                      : item.name}
                  </Text>
                  <View style={profile.hr1}>
                    <View style={profile.hr} />
                  </View>
                </View>
                <View style={profile.btn}>
                  <View
                    style={
                      item.statusUsed === 'Active'
                        ? profile.button1
                        : profile.button2
                    }>
                    <Button
                      title="View Ticket"
                      color={item.statusUsed === 'Active' ? 'green' : 'grey'}
                      onPress={() => handleTicket(index)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#5F2EEA', '#D6D8E7']}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          last === false ? (
            <View style={profile.container2}>
              <ActivityIndicator size={'large'} color={'#5F2EEA'} />
            </View>
          ) : (
            <Footer {...props} />
          )
        }
      />
    </View>
  );
}

const profile = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6F8',
    marginBottom: 10,
    paddingBottom: 0,
  },
  container2: {
    paddingTop: 20,
    paddingBottom: 120,
    marginBottom: 30,
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
  avatarLoad: {
    width: 180,
    height: 180,
    borderRadius: 180,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 5,
    marginBottom: 5,
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

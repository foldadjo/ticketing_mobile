import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {getUser} from '../store/action/user';
import {LINK_CLOUDINARY} from '@env';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';

function DrawerContent(props) {
  const [data, setData] = useState({
    name: 'user ticketing',
    image: 'null',
    noTelp: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    handleUser();
  }, [props]);
  const handleUser = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const result = await dispatch(getUser(userId));
      setData(result.value.data.data[0]);
    } catch (error) {}
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
  const handleProfile = () => {
    props.navigation.navigate('ProfileNavigator');
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity onPress={handleProfile}>
          <View style={styles.containerProfile}>
            {data.image === 'null' ? (
              <Image
                source={{
                  uri: `https://res.cloudinary.com/fazztrack/image/upload/v1655102148/tiketjauhar/user/images_qygn7n.jpg`,
                }}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={{
                  uri: `${LINK_CLOUDINARY}${data.image}`,
                }}
                style={styles.avatar}
              />
            )}
            <View style={styles.biodata}>
              <Text style={styles.title}>{data.name}</Text>
              <Text style={styles.caption}>
                {data.noTelp === '' ? 'number phone not add' : data.noTelp}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.containerSection}>
        <DrawerItem
          label="Logout"
          icon={({color, size}) => (
            <Icon color={color} size={size} name="log-out" />
          )}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerProfile: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'gray',
  },
  biodata: {
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  containerSection: {
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
});

export default DrawerContent;

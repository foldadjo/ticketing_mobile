import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

function Register(props) {
  const handleRegister = () => {
    props.navigation.navigate('Login');
  };
  const handleLogin = () => {
    props.navigation.navigate('Login');
  };
  return (
    <ScrollView style={regis.container} showsVerticalScrollIndicator={false}>
      <View style={regis.row}>
        <View>
          <Text style={regis.logo}>Ticketing</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/logo.png')}
            style={regis.image}
          />
        </View>
      </View>
      <View>
        <Text style={regis.title}> Sign Up </Text>
        <Text style={regis.tag}> Fill your additional detail </Text>
      </View>
      <View style={regis.formulir}>
        <View>
          <Text style={regis.name}> First Name </Text>
          <TextInput placeholder="Write your first Name" style={regis.form} />
        </View>
        <View>
          <Text style={regis.name}> Last Name </Text>
          <TextInput placeholder="Write your last Name" style={regis.form} />
        </View>
        <View>
          <Text style={regis.name}> Phone Number </Text>
          <TextInput
            placeholder="Write your phone number"
            autoComplete="tel"
            keyboardType="numeric"
            maxLength={15}
            style={regis.form}
          />
        </View>
        <View>
          <Text style={regis.name}> Email </Text>
          <TextInput
            placeholder="Write your email"
            autoComplete="email"
            keyboardType="email-address"
            style={regis.form}
          />
        </View>
        <View>
          <Text style={regis.name}> Password </Text>
          <TextInput
            placeholder="Write your password"
            autoComplete="password"
            keyboardType="visible-password"
            secureTextEntry={true}
            style={regis.form}
          />
        </View>
      </View>
      <View style={regis.button}>
        <Button title="Sign Up" color={'#5F2EEA'} onPress={handleRegister} />
      </View>
      <View style={regis.login}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={regis.in}> {'  '}Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const regis = StyleSheet.create({
  container: {
    margin: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 30,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 35,
    color: '#5F2EEA',
    fontWeight: '600',
    padding: 5,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
  },
  image: {width: 50, height: 50, top: 6, padding: 5},
  tag: {fontSize: 15, color: '#8692A6', fontWeight: '300', marginTop: 5},
  formulir: {marginTop: 20},
  name: {fontSize: 15, marginTop: 25},
  form: {
    backgroundColor: '#FFFFFF',
    borderColor: '#8692A6',
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#5F2EEA',
    color: 'white',
    borderRadius: 10,
    marginTop: 40,
    padding: 5,
  },
  login: {
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 15,
  },
  in: {
    color: '#5F2EEA',
  },
});

export default Register;

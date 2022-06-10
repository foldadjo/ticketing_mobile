import React from 'react';
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

function Login(props) {
  const handleLogin = () => {
    props.navigation.navigate('AppScreen', {screen: 'home'});
  };
  const handleRegister = () => {
    props.navigation.navigate('Register');
  };
  const handlePassword = () => {
    props.navigation.navigate('ResetPassword');
  };
  return (
    <ScrollView style={login.container} showsVerticalScrollIndicator={false}>
      <View style={login.row}>
        <View>
          <Text style={login.logo}>Ticketing</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/logo.png')}
            style={login.image}
          />
        </View>
      </View>
      <View>
        <Text style={login.title}> Sign In</Text>
        <Text style={login.tag}>
          Sign in with your data that you entered during your registration.
        </Text>
      </View>
      <View style={login.formulir}>
        <View>
          <Text style={login.name}> Email </Text>
          <TextInput
            placeholder="Write your email"
            autoComplete="email"
            keyboardType="email-address"
            style={login.form}
          />
        </View>
        <View>
          <Text style={login.name}> Password </Text>
          <TextInput
            placeholder="Write your password"
            autoComplete="password"
            keyboardType="visible-password"
            secureTextEntry={true}
            style={login.form}
          />
        </View>
      </View>
      <View style={login.button}>
        <Button title="Login" color={'#5F2EEA'} onPress={handleLogin} />
      </View>
      <View style={login.login}>
        <Text>Forgot your password? </Text>
        <TouchableOpacity onPress={handlePassword}>
          <Text style={login.in}> {'  '}Reset now</Text>
        </TouchableOpacity>
      </View>
      <View style={login.login}>
        <Text>Don’t have an account?</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={login.in}> {'  '}Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const login = StyleSheet.create({
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
    marginBottom: 15,
    padding: 5,
  },
  login: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  in: {
    color: '#5F2EEA',
  },
});

export default Login;

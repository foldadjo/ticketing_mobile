import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

function ForgotPassword(props) {
  const handleLogin = () => {
    props.navigation.navigate('Login');
  };
  return (
    <ScrollView style={forgot.container} showsVerticalScrollIndicator={false}>
      <View style={forgot.row}>
        <View>
          <Text style={forgot.logo}>Ticketing</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/logo.png')}
            style={forgot.image}
          />
        </View>
      </View>
      <View>
        <Text style={forgot.title}> Set Password</Text>
        <Text style={forgot.tag}>Set your new password</Text>
      </View>
      <View style={forgot.formulir}>
        <View>
          <Text style={forgot.name}> Password </Text>
          <TextInput
            placeholder="Write your password"
            autoComplete="password"
            keyboardType="visible-password"
            secureTextEntry={true}
            style={forgot.form}
          />
        </View>
        <View>
          <Text style={forgot.name}> Confirm Password </Text>
          <TextInput
            placeholder="Write your confirm password"
            autoComplete="password"
            keyboardType="visible-password"
            secureTextEntry={true}
            style={forgot.form}
          />
        </View>
      </View>
      <View style={forgot.button}>
        <Button title="Submit" color={'#5F2EEA'} onPress={handleLogin} />
      </View>
    </ScrollView>
  );
}

const forgot = StyleSheet.create({
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
});

export default ForgotPassword;

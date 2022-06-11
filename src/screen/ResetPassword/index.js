import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

function ResetPassword(props) {
  const [mail, setMail] = useState('');
  // const dispatch = useDispatch();
  // const auth = useSelector(state => state.auth);

  const [form, setForm] = useState({
    email: '',
  });

  useEffect(() => {
    setForm({
      email: mail,
    });
  }, [mail]);

  const handlePassword = async e => {
    try {
      e.preventDefault();
      console.log(form);
      props.navigation.navigate('ForgotPassword');
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <ScrollView style={reset.container} showsVerticalScrollIndicator={false}>
      <View style={reset.row}>
        <View>
          <Text style={reset.logo}>Ticketing</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/logo.png')}
            style={reset.image}
          />
        </View>
      </View>
      <View>
        <Text style={reset.title}> Forgot Password</Text>
        <Text style={reset.tag}>we'll send a link to your email shortly</Text>
      </View>
      <View style={reset.formulir}>
        <View>
          <Text style={reset.name}> Email </Text>
          <TextInput
            placeholder="Write your email"
            autoComplete="email"
            keyboardType="email-address"
            style={reset.form}
            onChangeText={newText => setMail(newText)}
            defaultValue={mail}
          />
        </View>
      </View>
      <View style={reset.button}>
        <Button title="Send" color={'#5F2EEA'} onPress={handlePassword} />
      </View>
    </ScrollView>
  );
}

const reset = StyleSheet.create({
  container: {
    margin: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 30,
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

export default ResetPassword;

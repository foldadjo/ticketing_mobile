import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {redux_forgotPassword} from '../../store/action/auth';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';

function ForgotPassword(props) {
  // const router = useRouter();
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState('');
  const [cPass, setCPass] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  const [form, setForm] = useState({
    keyChangePassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setForm({
      keyChangePassword: `${otp}`,
      newPassword: password,
      confirmPassword: cPass,
    });
  }, [cPass, otp, password]);

  const handleReset = async e => {
    try {
      console.log(form);
      setLoading(true);
      const result = await dispatch(redux_forgotPassword(form));
      setLoading(false);
      alert(result.value.data.msg);
      props.navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      alert(error.response.data.msg);
      console.log(error.response);
    }
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
          <Text style={forgot.name}> Code OTP </Text>
          <TextInput
            placeholder="Cek your email and copas code hire"
            keyboardType="number-pad"
            maxLength={6}
            style={forgot.form}
            onChangeText={newText => setOtp(newText)}
            defaultValue={otp}
          />
        </View>
        <View>
          <Text style={forgot.name}> Password </Text>
          <TextInput
            placeholder="Write your password"
            autoComplete="password"
            secureTextEntry={true}
            style={forgot.form}
            onChangeText={newText => setPassword(newText)}
            defaultValue={password}
          />
        </View>
        <View>
          <Text style={forgot.name}> Confirm Password </Text>
          <TextInput
            placeholder="Write your confirm password"
            autoComplete="password"
            secureTextEntry={true}
            style={forgot.form}
            onChangeText={newText => setCPass(newText)}
            defaultValue={cPass}
          />
        </View>
      </View>
      <View style={forgot.button}>
        {loading === true ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Button title="Submit" color={'#5F2EEA'} onPress={handleReset} />
        )}
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

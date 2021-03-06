import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Footer from '../../component/footer';
import {createBooking} from '../../store/action/booking';
import Notification from '../../utils/notif';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';

function Payment(props) {
  const [lastName, setLastName] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [mail, setMail] = useState('');
  const [loading, setLoading] = useState(false);
  const dataBooking = props.route.params.dataBooking;
  const dispatch = useDispatch();
  const date = new Date(
    `${dataBooking.dateBooking}T${dataBooking.timeBooking}:00.000Z`,
  );
  const setNotification = {
    title: 'your movie booking',
    message: 'your movie will be play in 30 minutes later',
    date: new Date(date - 30 * 1000 * 60 - 7 * 1000 * 3600),
  };

  console.log(date);
  console.log(dataBooking);
  console.log(new Date(date - 30 * 1000 * 60 - 7 * 1000 * 3600));
  console.log(new Date(Date.now()));
  console.log(setNotification);

  useEffect(() => {
    console.log(props.route.params);
  }, []);

  const goToPayment = async () => {
    try {
      setLoading(true);
      const result = await dispatch(createBooking(dataBooking));
      if (date === NaN) {
        const ErrorDateNotif = {
          title: 'your movie booking',
          message: '',
          date: new Date(Date.now()),
        };
        Notification.reminderMovieSchedule(ErrorDateNotif);
      } else if (
        new Date(date - 30 * 1000 * 60 - 7 * 1000 * 3600) <=
        new Date(Date.now())
      ) {
        const setNotificationNow = {
          title: 'your movie booking',
          message: 'your movie played. go to cinema now !!',
          date: new Date(Date.now()),
        };
        Notification.reminderMovieSchedule(setNotificationNow);
      } else {
        Notification.reminderMovieSchedule(setNotification);
      }
      setLoading(false);
      props.navigation.navigate('Midtrans', {
        redirectUrl: result.value.data.data.redirectUrl,
      });
    } catch (error) {
      alert('reload your aplication an relogin');
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View>
      <ScrollView
        style={payment.container}
        showsVerticalScrollIndicator={false}>
        <View style={payment.flex}>
          <View style={payment.pay}>
            <Text style={payment.textleft}>Total Payment</Text>
            <Text style={payment.textright}>Rp.{dataBooking.totalPayment}</Text>
          </View>
        </View>
        <View style={payment.bottom}>
          <View style={payment.head}>
            <Text style={payment.head_name}>Payment Method</Text>
          </View>
          <View style={payment.flex}>
            <View style={payment.cardpay}>
              <View style={payment.cardpay_pay}>
                <TouchableOpacity style={payment.cardpay_pay1}>
                  <Image source={require('../../assets/gpay.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={payment.cardpay_pay1}>
                  <Image source={require('../../assets/visa.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={payment.cardpay_pay1}>
                  <Image source={require('../../assets/gopay.png')} />
                </TouchableOpacity>
              </View>
              <View style={payment.cardpay_pay}>
                <TouchableOpacity style={payment.cardpay_pay1}>
                  <Image source={require('../../assets/paypal.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={payment.cardpay_pay1}>
                  <Image source={require('../../assets/ovo.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={payment.cardpay_pay1}>
                  <Image source={require('../../assets/dana.png')} />
                </TouchableOpacity>
              </View>
              <View style={payment.btn}>
                <Text style={payment.texttr}>or</Text>
              </View>
              <View style={payment.texttr1}>
                <View>
                  <Text style={payment.textleft}>Pay via cast. </Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <Text style={payment.text1}>See how it work</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={payment.head}>
            <Text style={payment.head_name}>Personal Info</Text>
          </View>
          <View style={payment.flex}>
            <View style={payment.cardinfo}>
              <View>
                <Text style={payment.name}> Full Name </Text>
                <TextInput
                  placeholder="Write your fullname"
                  style={payment.form}
                  onChangeText={newText => setLastName(newText)}
                  defaultValue={lastName}
                />
              </View>
              <View>
                <Text style={payment.name}> Email </Text>
                <TextInput
                  placeholder="Write your email"
                  autoComplete="email"
                  keyboardType="email-address"
                  style={payment.form}
                  onChangeText={newText => setMail(newText)}
                  defaultValue={mail}
                />
              </View>
              <View>
                <Text style={payment.name}> Phone Number </Text>
                <TextInput
                  placeholder="Write your phone number"
                  autoComplete="tel"
                  keyboardType="numeric"
                  maxLength={15}
                  style={payment.form}
                  onChangeText={newText => setNoTelp(newText)}
                  defaultValue={noTelp}
                />
              </View>
              <View style={payment.warning}>
                <Image source={require('../../assets/warning.png')} />
                <Text>{'    '}Fill your data correctly.</Text>
              </View>
            </View>
          </View>
          <View style={payment.btn}>
            <View style={payment.button}>
              {loading === true ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Button
                  title="Pay your order"
                  color={'#5F2EEA'}
                  onPress={goToPayment}
                />
              )}
            </View>
          </View>
        </View>
        <Footer {...props} />
      </ScrollView>
    </View>
  );
}

const payment = StyleSheet.create({
  container: {
    marginBottom: -50,
    backgroundColor: '#F5F6F8',
  },
  bottom: {
    padding: 30,
    backgroundColor: '#F5F6F8',
    // top: 20,
  },
  pay: {
    height: 80,
    backgroundColor: 'white',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    width: 360,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    paddingHorizontal: 50,
  },
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
    // backgroundColor: 'red',
  },
  hr: {
    borderBottomColor: '#D6D8E7',
    borderBottomWidth: 1,
    marginVertical: 25,
    // flex: 1,
  },
  flex: {
    alignItems: 'center',
  },
  cardpay: {
    height: 220,
    width: 290,
    marginTop: 30,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    // alignItems: 'center',
  },
  cardpay_pay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardpay_pay1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: 70,
    height: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D6D8E7',
  },
  texttr: {
    marginVertical: 15,
  },
  texttr1: {flexDirection: 'row', justifyContent: 'center'},
  text1: {color: '#5F2EEA'},
  textleft: {
    color: '#D6D8E7',
  },
  textright: {
    textAlign: 'right',
    fontWeight: '600',
  },
  cardinfo: {
    height: 500,
    width: 290,
    marginTop: 30,
    padding: 30,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    // alignItems: 'center',
  },
  name: {fontSize: 15, marginTop: 25},
  form: {
    backgroundColor: '#FFFFFF',
    borderColor: '#8692A6',
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
    marginTop: 10,
  },
  warning: {
    marginVertical: 30,
    backgroundColor: '#F4B7404D',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
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
});

export default Payment;

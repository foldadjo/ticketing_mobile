import React, {useState, useEffect} from 'react';
import Footer from '../../component/footer';
import BarcodeCreatorViewManager, {
  BarcodeFormat,
} from 'react-native-barcode-creator';
import {useDispatch} from 'react-redux';
import {updateStatusBooking, getBookingById} from '../../store/action/booking';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

function Ticket(props) {
  const [status, setStatus] = useState('Active');
  const [seat, setSeat] = useState([]);
  const dataTicket = props.route.params.dataHistory;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  console.log(dataTicket);

  useEffect(() => {
    getSeatBooking();
  }, [props]);
  const getSeatBooking = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getBookingById(dataTicket.id));
      setStatus(result.value.data.data.statusUsed);
      setSeat(result.value.data.data.seat);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleStatus = async () => {
    try {
      setLoading(true);
      console.log(dataTicket.id);
      const result = await dispatch(updateStatusBooking(dataTicket.id));
      setStatus(result.value.data.data.statusUsed);
      alert(result.value.data.msg);
      console.log(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View>
      <ScrollView style={ticket.container} showsVerticalScrollIndicator={false}>
        <View style={ticket.bottom}>
          <View style={ticket.flex}>
            <View style={ticket.cardbarcode}>
              {loading === true ? (
                <View>
                  <ActivityIndicator style={ticket.barcode} size={'large'} />
                </View>
              ) : status === 'Active' ? (
                <TouchableOpacity style={ticket.flex} onPress={handleStatus}>
                  <BarcodeCreatorViewManager
                    value={dataTicket.id}
                    background={'#FFFFFF'}
                    foregroundColor={'#000000'}
                    format={BarcodeFormat.QR}
                    style={ticket.barcode}
                  />
                </TouchableOpacity>
              ) : (
                <View style={ticket.flex}>
                  <BarcodeCreatorViewManager
                    value={dataTicket.id}
                    background={'#FFFFFF'}
                    foregroundColor={'#000000'}
                    format={BarcodeFormat.QR}
                    style={ticket.barcode}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={ticket.flex}>
            <View style={status === 'Active' ? ticket.hr1 : ticket.hr2}>
              <View style={ticket.hr} />
            </View>
          </View>
          <View style={ticket.flex}>
            <View style={status === 'Active' ? ticket.hr3 : ticket.hr1}>
              <View style={ticket.hr} />
            </View>
          </View>
          <View style={ticket.flex}>
            <View style={ticket.carddetail}>
              <View style={ticket.row}>
                <View style={ticket.left}>
                  <Text style={ticket.title}>Movie</Text>
                  <Text style={ticket.text}>
                    {dataTicket.name.length > 13
                      ? dataTicket.name.substring(0, 10) + '...'
                      : dataTicket.name}
                  </Text>
                </View>
                <View style={ticket.right}>
                  <Text style={ticket.title}>Category</Text>
                  <Text style={ticket.text}>
                    {' '}
                    {dataTicket.category.length > 10
                      ? dataTicket.category.substring(0, 7) + '...'
                      : dataTicket.category}
                  </Text>
                </View>
              </View>
              <View style={ticket.row}>
                <View style={ticket.left}>
                  <Text style={ticket.title}>Date</Text>
                  <Text style={ticket.text}>
                    {new Date(dataTicket.dateBooking.split('T')[0])
                      .toDateString()
                      .substring(4, 100)}
                  </Text>
                </View>
                <View style={ticket.right}>
                  <Text style={ticket.title}>Time</Text>
                  <Text style={ticket.text}>
                    {dataTicket.timeBooking.split(':')[0]}
                    :00
                  </Text>
                </View>
              </View>
              <View style={ticket.row}>
                <View style={ticket.left}>
                  <Text style={ticket.title}>Count</Text>
                  <Text style={ticket.text}>{dataTicket.totalTicket} pcs</Text>
                </View>
                <View style={ticket.right}>
                  <Text style={ticket.title}>Seat</Text>
                  <Text style={ticket.text}>{seat.join(', ')}</Text>
                </View>
              </View>
              <View style={ticket.row2}>
                <View>
                  <Text style={ticket.text2}>Total</Text>
                </View>
                <View>
                  <Text style={ticket.text2}>Rp.{dataTicket.totalPayment}</Text>
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

const ticket = StyleSheet.create({
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
  hr2: {flexDirection: 'row', marginBottom: 20},
  hr3: {display: 'none'},
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
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderRadius: 50,
    opacity: 20,
  },
  barcode: {height: 180, width: 180},
  carddetail: {
    height: 350,
    width: 250,
    padding: 30,
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderRadius: 50,
    // borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  left: {flex: 4},
  right: {flex: 3},
  title: {fontSize: 12, lineHeight: 20, marginTop: 10},
  text: {fontSize: 15, fontWeight: '600', color: 'black'},
  row2: {
    flexDirection: 'row',
    marginTop: 30,
    borderWidth: 1,
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: 30,
    width: 200,
    left: 25,
  },
  text2: {fontSize: 18, fontWeight: '600', color: 'black'},
});

export default Ticket;

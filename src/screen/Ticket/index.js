import React, {useState, useEffect} from 'react';
import Footer from '../../component/footer';
import BarcodeCreatorViewManager, {
  BarcodeFormat,
} from 'react-native-barcode-creator';
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
} from 'react-native';

function Ticket(props) {
  const [status, setStatus] = useState('active');

  const handleStatus = () => {
    if (status === 'active') {
      setStatus('notActive');
    } else {
      setStatus('active');
    }
  };
  return (
    <View>
      <ScrollView style={ticket.container} showsVerticalScrollIndicator={false}>
        <View style={ticket.bottom}>
          <View style={ticket.flex}>
            <View style={ticket.cardbarcode}>
              <TouchableOpacity style={ticket.flex} onPress={handleStatus}>
                <BarcodeCreatorViewManager
                  value={'100'}
                  background={'#FFFFFF'}
                  foregroundColor={'#000000'}
                  format={BarcodeFormat.QR}
                  style={ticket.barcode}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={ticket.flex}>
            <View style={status === 'active' ? ticket.hr1 : ticket.hr2}>
              <View style={ticket.hr} />
            </View>
          </View>
          <View style={ticket.flex}>
            <View style={status === 'active' ? ticket.hr3 : ticket.hr1}>
              <View style={ticket.hr} />
            </View>
          </View>
          <View style={ticket.flex}>
            <View style={ticket.carddetail}>
              <View style={ticket.row}>
                <View style={ticket.left}>
                  <Text style={ticket.title}>Movie</Text>
                  <Text style={ticket.text}>Spiderman</Text>
                </View>
                <View style={ticket.right}>
                  <Text style={ticket.title}>Category</Text>
                  <Text style={ticket.text}>Action</Text>
                </View>
              </View>
              <View style={ticket.row}>
                <View style={ticket.left}>
                  <Text style={ticket.title}>Date</Text>
                  <Text style={ticket.text}>07-06-2022</Text>
                </View>
                <View style={ticket.right}>
                  <Text style={ticket.title}>Time</Text>
                  <Text style={ticket.text}>17.00</Text>
                </View>
              </View>
              <View style={ticket.row}>
                <View style={ticket.left}>
                  <Text style={ticket.title}>Count</Text>
                  <Text style={ticket.text}>5 pcs</Text>
                </View>
                <View style={ticket.right}>
                  <Text style={ticket.title}>Seat</Text>
                  <Text style={ticket.text}>C6, C7, C8, C7, C8</Text>
                </View>
              </View>
              <View style={ticket.row2}>
                <View>
                  <Text style={ticket.text2}>Total</Text>
                </View>
                <View>
                  <Text style={ticket.text2}>Rp.250000</Text>
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

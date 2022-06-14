/* eslint-disable no-unused-vars */
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
      <ScrollView
        style={profile.container}
        showsVerticalScrollIndicator={false}>
        <View style={profile.bottom}>
          <View style={profile.flex}>
            <View style={profile.cardbarcode}>
              <TouchableOpacity style={profile.flex} onPress={handleStatus}>
                <BarcodeCreatorViewManager
                  value={'100'}
                  background={'#FFFFFF'}
                  foregroundColor={'#000000'}
                  format={BarcodeFormat.QR}
                  style={profile.barcode}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={profile.flex}>
            <View style={status === 'active' ? profile.hr1 : profile.hr2}>
              <View style={profile.hr} />
            </View>
          </View>
          <View style={profile.flex}>
            <View style={status === 'active' ? profile.hr3 : profile.hr1}>
              <View style={profile.hr} />
            </View>
          </View>
          <View style={profile.flex}>
            <View style={profile.carddetail}>
              <View style={profile.row}>
                <View style={profile.left}>
                  <Text style={profile.title}>Movie</Text>
                  <Text style={profile.text}>Spiderman</Text>
                </View>
                <View style={profile.right}>
                  <Text style={profile.title}>Category</Text>
                  <Text style={profile.text}>Action</Text>
                </View>
              </View>
              <View style={profile.row}>
                <View style={profile.left}>
                  <Text style={profile.title}>Date</Text>
                  <Text style={profile.text}>07-06-2022</Text>
                </View>
                <View style={profile.right}>
                  <Text style={profile.title}>Time</Text>
                  <Text style={profile.text}>17.00</Text>
                </View>
              </View>
              <View style={profile.row}>
                <View style={profile.left}>
                  <Text style={profile.title}>Count</Text>
                  <Text style={profile.text}>5 pcs</Text>
                </View>
                <View style={profile.right}>
                  <Text style={profile.title}>Seat</Text>
                  <Text style={profile.text}>C6, C7, C8, C7, C8</Text>
                </View>
              </View>
              <View style={profile.row2}>
                <View>
                  <Text style={profile.text2}>Total</Text>
                </View>
                <View>
                  <Text style={profile.text2}>Rp.250000</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const profile = StyleSheet.create({
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

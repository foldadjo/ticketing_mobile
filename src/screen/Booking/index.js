/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Footer from '../../component/footer';
// import axios from '../../utils/axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  // TextInput,
  Image,
} from 'react-native';

function Booking(props) {
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState(['A3', 'G8', 'F12']);
  const [price, setPrice] = useState(50000);
  const seatLeft = [
    {number: 1},
    {number: 2},
    {number: 3},
    {number: 4},
    {number: 5},
    {number: 6},
    {number: 7},
  ];
  const seatRight = [
    {number: 8},
    {number: 9},
    {number: 10},
    {number: 11},
    {number: 12},
    {number: 13},
    {number: 14},
  ];
  const seatRow = [
    {row: 'A'},
    {row: 'B'},
    {row: 'C'},
    {row: 'D'},
    {row: 'E'},
    {row: 'F'},
    {row: 'G'},
  ];

  const handlePressSeat = seat => {
    if (selectedSeat.includes(seat) || selectedSeat.length > 4) {
      const deleteSeat = selectedSeat.filter(el => {
        return el !== seat;
      });
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
    }
  };
  console.log(selectedSeat);
  const handlePayment = () => {
    props.navigation.navigate('Payment');
  };
  return (
    <View>
      <ScrollView
        style={booking.container}
        showsVerticalScrollIndicator={false}>
        <View style={booking.bottom}>
          <View style={booking.head}>
            <Text style={booking.head_name}>Chose your seat</Text>
          </View>
          <View style={booking.flex}>
            <View style={booking.card}>
              <View style={booking.card_head}>
                <View style={booking.screen}>
                  <View style={booking.seat}>
                    {seatLeft.map(row => (
                      <View key={row.number}>
                        {seatRow.map(item => (
                          <TouchableOpacity
                            key={item.row}
                            style={
                              selectedSeat.includes(item.row + row.number)
                                ? booking.seat_b
                                : reservedSeat.includes(item.row + row.number)
                                ? booking.seat_c
                                : booking.seat_a
                            }
                            onPress={() =>
                              handlePressSeat(item.row + row.number)
                            }>
                            <Text> </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ))}
                  </View>
                  <View style={booking.seat}>
                    {seatRight.map(row => (
                      <View key={row.number}>
                        {seatRow.map(item => (
                          <TouchableOpacity
                            key={item.row}
                            style={
                              selectedSeat.includes(item.row + row.number)
                                ? booking.seat_b
                                : reservedSeat.includes(item.row + row.number)
                                ? booking.seat_c
                                : booking.seat_a
                            }
                            onPress={() =>
                              handlePressSeat(item.row + row.number)
                            }>
                            <Text> </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View>
                <Text style={booking.head_name}>Seating key</Text>
              </View>
              <View style={booking.row}>
                <View style={booking.flex2}>
                  <View style={booking.row}>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/545/545678.png',
                      }}
                      style={booking.icon}
                    />
                    <Text>{'  '}A to G</Text>
                  </View>
                  <View style={booking.row}>
                    <View style={booking.seat_a}>
                      <Text> </Text>
                    </View>
                    <Text>{'  '}Available</Text>
                  </View>
                  <View style={booking.row}>
                    <View style={booking.seat_c}>
                      <Text> </Text>
                    </View>
                    <Text>{'  '}Sold</Text>
                  </View>
                </View>
                <View style={booking.flex3}>
                  <View style={booking.row}>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/545/545682.png',
                      }}
                      style={booking.icon}
                    />
                    <Text>{'   '}1 to 14</Text>
                  </View>
                  <View style={booking.row}>
                    <View style={booking.seat_b}>
                      <Text> </Text>
                    </View>
                    <Text>{'  '}Selected</Text>
                  </View>
                </View>
              </View>
              <Text
                style={
                  selectedSeat.length === 5 ? booking.text2 : booking.textleft
                }>
                max seat booking is 5
              </Text>
            </View>
          </View>
          <View style={booking.head}>
            <Text style={booking.head_name}>Order Info</Text>
          </View>
          <View style={booking.flex}>
            <View style={booking.card}>
              <View style={booking.card_head}>
                <Image
                  source={require('../../assets/cineone.png')}
                  style={booking.card_premiere}
                />
                <View>
                  <Text style={booking.text1}> CineOne 21 Cinema </Text>
                </View>
                <View>
                  <Text style={booking.text2}> Dora the lost city </Text>
                </View>
              </View>
              <View style={booking.row}>
                <View style={booking.flex3}>
                  <Text style={booking.textleft}>Tuesday, 07 july 2022</Text>
                </View>
                <View style={booking.flex2}>
                  <Text style={booking.textright}>19.00</Text>
                </View>
              </View>
              <View style={booking.row}>
                <View style={booking.flex3}>
                  <Text style={booking.textleft}>One ticket price</Text>
                </View>
                <View style={booking.flex2}>
                  <Text style={booking.textright}>Rp. {price}</Text>
                </View>
              </View>
              <View style={booking.row}>
                <View style={booking.flex3}>
                  <Text style={booking.textleft}>Seat choosed</Text>
                </View>
                <View style={booking.flex2}>
                  <Text style={booking.textright}>
                    {selectedSeat.length === 0 ? '-' : selectedSeat.join(', ')}
                  </Text>
                </View>
              </View>
              <View style={booking.hr} />
              <View style={booking.row}>
                <View style={booking.flex3}>
                  <Text style={booking.textleft2}>Total Payment</Text>
                </View>
                <View style={booking.flex2}>
                  <Text style={booking.textright2}>
                    Rp. {selectedSeat.length * price}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={booking.btn}>
            <View style={booking.button}>
              <Button
                title="Checkout now"
                color={'#5F2EEA'}
                onPress={
                  selectedSeat.length === 0
                    ? // eslint-disable-next-line no-alert
                      () => alert('choise a seat first')
                    : handlePayment
                }
              />
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const booking = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: -60,
  },
  bottom: {
    padding: 30,
    backgroundColor: '#F5F6F8',
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
  card: {
    height: 380,
    width: 290,
    marginTop: 30,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    // alignItems: 'center',
  },
  screen: {
    borderTopColor: '#5F2EEA',
    borderTopWidth: 5,
    borderLeftColor: 'green',
    borderLeftWidth: 1,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingBottom: 0,
    marginBottom: 10,
  },
  seat: {
    width: 110,
    height: 120,
    padding: 5,
    paddingBottom: 10,
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seat_a: {
    backgroundColor: '#D6D8E7',
    borderRadius: 3,
    width: 12,
    height: 13,
    marginBottom: 2,
    // mergin: 5,
  },
  seat_b: {
    backgroundColor: '#5F2EEA',
    borderRadius: 3,
    width: 12,
    height: 13,
    marginBottom: 2,
  },
  seat_c: {
    backgroundColor: '#6E7191',
    borderRadius: 3,
    width: 12,
    height: 13,
    marginBottom: 2,
  },
  card_head: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  icon: {width: 18, height: 18},
  card_premiere: {
    marginBottom: 5,
  },
  flex3: {
    flex: 3,
  },
  flex2: {
    flex: 2,
  },
  text1: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    lineHeight: 40,
  },
  text2: {
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  textleft: {
    color: '#D6D8E7',
  },
  textright: {
    textAlign: 'right',
    fontWeight: '600',
  },
  textleft2: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  textright2: {
    color: '#5F2EEA',
    fontSize: 15,
    textAlign: 'right',
    fontWeight: '600',
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

export default Booking;

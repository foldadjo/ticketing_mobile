/* eslint-disable no-alert */
import React, {useState, useEffect} from 'react';
import Footer from '../../component/footer';
// import axios from '../../utils/axios';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Feather';
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

function Detail(props) {
  const [date, setDate] = useState(new Date());
  const [button, setButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    scheduleId: '',
    time: '',
  });

  useEffect(() => {
    setForm({scheduleId: '', time: ''});
  }, []);
  const location = ['Search Location', 'Jakarta', 'Tangerang', 'Bogor'];
  const timeDay = ['09.00', '11.00', '13.00', '15.00'];
  const timeNight = ['17.00', '19.00', '20.00', '21.00'];

  const data = [
    {scheduleId: 1, time: '09.00,11.00,13.00,15.00,17.00,21.00'},
    {scheduleId: 2, time: '09.00,13.00,21.00'},
  ];

  const handleTime = (scheduleId, time) => {
    setForm({scheduleId: scheduleId, time: time});
    if (time === '') {
      alert('time is not available');
    }
  };

  const handleSchedule = async e => {
    try {
      e.preventDefault();
      console.log(form);
      props.navigation.navigate('Booking');
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <ScrollView style={detail.container} showsVerticalScrollIndicator={false}>
      <View style={detail.head}>
        <View style={detail.movie}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
            }}
            style={detail.card_image}
          />
        </View>
        <View style={detail.head}>
          <Text style={detail.head_name}>Dora the lost city</Text>
          <Text style={detail.head_category}>Adventure</Text>
        </View>
      </View>
      <View style={detail.row}>
        <View style={detail.flex}>
          <Text style={detail.title}>Release date</Text>
          <Text style={detail.text}>June, 28 2022</Text>
        </View>
        <View style={detail.flex}>
          <Text style={detail.title}>Directed by</Text>
          <Text style={detail.text}>Jon Watss</Text>
        </View>
      </View>
      <View style={detail.row}>
        <View style={detail.flex}>
          <Text style={detail.title}>Duration</Text>
          <Text style={detail.text}>2 hrs 13 min</Text>
        </View>
        <View style={detail.flex}>
          <Text style={detail.title}>Casts</Text>
          <Text style={detail.text}>Tom Holland, Robert Downey Jr., etc.</Text>
        </View>
      </View>
      <View style={detail.hr} />
      <View style={detail.row}>
        <View style={detail.flex}>
          <Text style={detail.text}>Synopsis</Text>
          <Text style={detail.title}>
            Thrilled by his experience with the Avengers, Peter returns home,
            where he lives with his Aunt May, under the watchful eye of his new
            mentor Tony Stark, Peter tries to fall back into his normal daily
            routine - distracted by thoughts of proving himself to be more than
            just your friendly neighborhood Spider-Man - but when the Vulture
            emerges as a new villain, everything that Peter holds most important
            will be threatened.{' '}
          </Text>
        </View>
      </View>

      {/* <View style={detail.sorting}> */}

      {/* </View> */}
      <View style={detail.bottom}>
        <View style={detail.head}>
          <Text style={detail.head_name}>Show Time and Ticket</Text>
        </View>
        <TouchableOpacity style={detail.date} onPress={() => setOpen(true)}>
          <View style={detail.flex5}>
            <Text style={detail.text}>
              {button === true ? `${date.toDateString()}` : 'Set a date'}
            </Text>
          </View>
          <View style={detail.flex2}>
            <Icon name="calendar" size={20} color={'black'} />
          </View>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          // eslint-disable-next-line no-shadow
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setButton(true);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode="date"
        />
        <SelectDropdown
          data={location}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={detail.filtering}
          defaultButtonText="Set a Location"
          renderDropdownIcon={() => (
            <Icon name="chevron-down" size={20} color={'black'} />
          )}
        />
        {data.map(item => (
          <View style={detail.card} key={item.scheduleId}>
            <View style={detail.card_head}>
              <Image
                source={require('../../assets/cineone.png')}
                style={detail.card_premiere}
              />
              <View style={detail.address}>
                <Text style={detail.card_adr}> Jakarta </Text>
              </View>
            </View>
            <View style={detail.rowtime}>
              {timeDay.map(time => (
                <TouchableOpacity
                  style={detail.time}
                  key={time}
                  onPress={() =>
                    handleTime(
                      item.scheduleId,
                      item.time.split(',').includes(time) ? time : '',
                    )
                  }>
                  <Text
                    style={
                      item.time.split(',').includes(time)
                        ? detail.time_yes
                        : detail.time_no
                    }>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={detail.rowtime}>
              {timeNight.map(time => (
                <TouchableOpacity
                  style={detail.time}
                  key={time}
                  onPress={() =>
                    handleTime(
                      item.scheduleId,
                      item.time.split(',').includes(time) ? time : '',
                    )
                  }>
                  <Text
                    style={
                      item.time.split(',').includes(time)
                        ? detail.time_yes
                        : detail.time_no
                    }>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={detail.rowtime}>
              <View style={detail.price1}>
                <Text style={detail.price_Text1}>Price</Text>
              </View>
              <View style={detail.price2}>
                <Text style={detail.price_Text2}>Rp.60000/seat</Text>
              </View>
            </View>
            <View style={detail.button}>
              <Button
                title={
                  form.time === '' || form.scheduleId !== item.scheduleId
                    ? 'Choise a Time'
                    : 'Book now'
                }
                color={'#5F2EEA'}
                onPress={
                  form.time === '' || form.scheduleId !== item.scheduleId
                    ? () => alert('choose time in this schedule first')
                    : handleSchedule
                }
              />
            </View>
          </View>
        ))}
        <TouchableOpacity style={detail.time}>
          <Text style={detail.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <Footer {...props} />
    </ScrollView>
  );
}

const detail = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: 'white',
  },
  head: {alignItems: 'center'},
  head_name: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
  },
  head_category: {
    fontSize: 20,
  },
  title: {
    color: '#8692A6',
    lineHeight: 20,
    marginTop: 5,
  },
  text: {color: 'black', fontSize: 18, margin: 5, marginLeft: 0},
  row: {
    flexDirection: 'row',
    margin: 30,
    marginBottom: 0,
    flexWrap: 'wrap',
  },
  flex: {flex: 1},
  flex5: {flex: 11, alignItems: 'center'},
  flex2: {flex: 1, alignItems: 'flex-end'},
  hr: {
    borderBottomColor: '#D6D8E7',
    borderBottomWidth: 1,
    margin: 25,
    marginBottom: 0,
    // flex: 1,
  },
  movie: {
    width: 200,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#D6D8E7',
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_image: {width: 160, height: 260, borderRadius: 5},
  bottom: {
    paddingTop: 50,
    backgroundColor: '#F5F6F8',
    marginTop: 50,
    alignItems: 'center',
  },
  date: {
    backgroundColor: '#EFF0F6',
    width: 250,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  filtering: {
    backgroundColor: '#EFF0F6',
    width: 250,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  card: {
    height: 350,
    width: 290,
    marginTop: 30,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  card_head: {
    alignItems: 'center',
  },
  card_premiere: {
    marginBottom: 5,
  },
  address: {
    flexDirection: 'row',
  },
  card_adr: {
    borderBottomColor: '#D6D8E7',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    textAlign: 'center',
  },
  rowtime: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 0,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  time: {
    // marginRight: 5,
    flex: 1,
  },
  time_yes: {
    color: 'black',
    textAlign: 'center',
  },
  time_no: {
    color: 'red',
    textAlign: 'center',
  },
  price1: {
    flex: 1,
    marginTop: 10,
  },
  price2: {
    flex: 2,
    marginTop: 10,
  },
  price_Text1: {
    fontSize: 20,
  },
  price_Text2: {
    fontSize: 20,
    color: 'black',
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#5F2EEA',
    color: 'white',
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 15,
    padding: 5,
    width: 230,
  },
  viewAll: {
    color: '#5F2EEA',
    margin: 50,
  },
});

export default Detail;

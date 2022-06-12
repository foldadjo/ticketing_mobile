import React, {useState, useEffect} from 'react';
// import axios from '../../utils/axios';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
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
  // const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  const countries = ['Search Location', 'Jakarta', 'Tangerang', 'Bogor'];

  const handleSchedule = async e => {
    try {
      e.preventDefault();
      console.log(form);
      props.navigation.navigate('Booking');
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleViewAll = () => {
    props.navigation.navigate('ViewAll');
  };
  // const handleDetail = () => {
  //   props.navigation.navigate('Detail');
  // };
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
          <Text style={detail.text}>
            {button === true ? `${date.toDateString()}` : 'Set a date'}
          </Text>
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
          data={countries}
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
          // searchPlaceHolderColor="red"
        />
        <View style={detail.card}>
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
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>09.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>11.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>13.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>15.00</Text>
            </TouchableOpacity>
          </View>
          <View style={detail.rowtime}>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>17.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>19.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_no}>20.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_no}>21.00</Text>
            </TouchableOpacity>
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
              title="Book now"
              color={'#5F2EEA'}
              onPress={handleSchedule}
            />
          </View>
        </View>
        <View style={detail.card}>
          <View style={detail.card_head}>
            <Image
              source={require('../../assets/ebu.png')}
              style={detail.card_premiere}
            />
            <View style={detail.address}>
              <Text style={detail.card_adr}> Jakarta </Text>
            </View>
          </View>
          <View style={detail.rowtime}>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>09.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>11.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>13.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>15.00</Text>
            </TouchableOpacity>
          </View>
          <View style={detail.rowtime}>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>17.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_yes}>19.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_no}>20.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={detail.time}>
              <Text style={detail.time_no}>21.00</Text>
            </TouchableOpacity>
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
              title="Book now"
              color={'#5F2EEA'}
              onPress={handleSchedule}
            />
          </View>
        </View>
        <TouchableOpacity style={detail.time} onPress={handleViewAll}>
          <Text style={detail.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={detail.hr} />
      <View style={detail.hr} />
      <View style={detail.hr} />
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

export default Booking;

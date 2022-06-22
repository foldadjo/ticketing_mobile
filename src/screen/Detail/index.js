import React, {useState, useEffect} from 'react';
import Footer from '../../component/footer';
// import axios from '../../utils/axios';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {getAllSchedule} from '../../store/action/schedule';
import {getMovieById} from '../../store/action/movie';
import {LINK_CLOUDINARY} from '@env';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  // TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';

function Detail(props) {
  const [date, setDate] = useState(new Date());
  const [button, setButton] = useState(false);
  const [open, setOpen] = useState(false);
  const page = 1;
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(2);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loc, setLoc] = useState('');
  const [viewall, setViewall] = useState('View All');
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    scheduleId: '',
    dateBooking: '',
    timeBooking: '',
  });

  useEffect(() => {
    console.log(props.route.params);
  }, []);

  useEffect(() => {
    setForm({scheduleId: '', dateBooking: '', timeBooking: ''});
  }, []);
  const location = ['Search Location', 'Jakarta', 'Tangerang', 'Bogor'];
  const timeDay = ['09:00', '11:00', '13:00', '15:00'];
  const timeNight = ['17:00', '19:00', '20:00', '21:00'];

  const [data, setData] = useState([]);
  const [dataMovie, setDataMovie] = useState([
    {
      name: '',
      category: '',
      releaseDate: '',
      image: 'tiketjauhar/movie/pfaymvwcjo53stw76qcs.png',
      cast: '',
      director: '',
      duration: '',
      synopsis: '',
    },
  ]);

  useEffect(() => {
    getData();
  }, [limit, loc]);
  const getData = async () => {
    try {
      setLoading(true);
      const result = await dispatch(
        getAllSchedule(page, limit, props.route.params.movieId, loc),
      );
      setTotalData(result.value.data.pagination.totalData);
      setTotalPage(result.value.data.pagination.totalPage);
      if (result.value.data.data === null) {
        setData([]);
      } else {
        setData(result.value.data.data);
      }
      limit >= result.value.data.pagination.totalData
        ? setViewall('hide schedule')
        : setViewall('View All');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };
  useEffect(() => {
    getMovie();
  }, []);
  const getMovie = async () => {
    try {
      const result = await dispatch(getMovieById(props.route.params.movieId));
      if (result.value.data.data === null) {
        setDataMovie([]);
      } else {
        setDataMovie(result.value.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleTime = (scheduleId, time, date) => {
    setForm({scheduleId: scheduleId, dateBooking: date, timeBooking: time});
    if (time === '') {
      alert('time is not available');
    }
  };

  const handleSchedule = async id => {
    try {
      console.log(form);
      props.navigation.navigate('Booking', {
        dataSchedule: form,
        data: data.filter(item => item.id === id),
      });
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
              uri: `${LINK_CLOUDINARY}${dataMovie[0].image}`,
            }}
            style={detail.card_image}
          />
        </View>
        <View style={detail.head}>
          <Text style={detail.head_name}>{dataMovie[0].name}</Text>
          <Text style={detail.head_category}>{dataMovie[0].category}</Text>
        </View>
      </View>
      <View style={detail.row}>
        <View style={detail.flex}>
          <Text style={detail.title}>Release date</Text>
          <Text style={detail.text}>
            {`${new Date(dataMovie[0].releaseDate.split('T')[0]).getDate()} - ${
              new Date(dataMovie[0].releaseDate.split('T')[0]).getMonth() + 1
            } - ${new Date(
              dataMovie[0].releaseDate.split('T')[0],
            ).getFullYear()}`}
          </Text>
        </View>
        <View style={detail.flex}>
          <Text style={detail.title}>Directed by</Text>
          <Text style={detail.text}>{dataMovie[0].director}</Text>
        </View>
      </View>
      <View style={detail.row}>
        <View style={detail.flex}>
          <Text style={detail.title}>Duration</Text>
          <Text style={detail.text}>{dataMovie[0].duration}</Text>
        </View>
        <View style={detail.flex}>
          <Text style={detail.title}>Casts</Text>
          <Text style={detail.text}>{dataMovie[0].cast}</Text>
        </View>
      </View>
      <View style={detail.hr} />
      <View style={detail.row}>
        <View style={detail.flex}>
          <Text style={detail.text}>Synopsis</Text>
          <Text style={detail.title}>{dataMovie[0].synopsis}</Text>
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
            <Text style={detail.text}>{`${date.toDateString()}`}</Text>
          </View>
          <View style={detail.flex2}>
            <Icon name="calendar" size={20} color={'black'} />
          </View>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
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
            setLoc(index === 0 ? '' : selectedItem);
            setLimit(2);
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
          <View style={detail.card} key={item.id}>
            <View style={detail.card_head}>
              <Image
                source={
                  item.premiere !== 'hiflix'
                    ? item.premiere !== 'Ebu.Id'
                      ? require('../../assets/cineone.png')
                      : require('../../assets/ebu.png')
                    : require('../../assets/hiflix.png')
                }
                style={detail.card_premiere}
              />
              <View style={detail.address}>
                <Text style={detail.card_adr}> {item.location} </Text>
              </View>
            </View>
            <View style={detail.rowtime}>
              {timeDay.map(time => (
                <TouchableOpacity
                  style={detail.time}
                  key={time}
                  onPress={() =>
                    handleTime(
                      item.id,
                      item.time.split(',').includes(time) ? time : '',
                      `${date.getFullYear()}-${
                        (date.getMonth() + 1).length === 2
                          ? date.getMonth() + 1
                          : '0' + (date.getMonth() + 1)
                      }-${date.getDate()}`,
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
                      item.id,
                      item.time.split(',').includes(time) ? time : '',
                      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
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
                <Text style={detail.price_Text2}>Rp.{item.price}/seat</Text>
              </View>
            </View>
            <View style={detail.button}>
              <Button
                title={
                  form.timeBooking === '' || form.scheduleId !== item.id
                    ? 'Choise a Time'
                    : 'Book now'
                }
                color={'#5F2EEA'}
                onPress={
                  form.time === '' || form.scheduleId !== item.id
                    ? () => alert('choose time in this schedule first')
                    : () => handleSchedule(item.id)
                }
              />
            </View>
          </View>
        ))}
        {data.length <= 0 ? (
          <View style={detail.time}>
            <Text style={detail.viewAll}>Schedule not found</Text>
          </View>
        ) : totalPage === 1 && data.length <= 2 ? (
          <View style={detail.time}>
            <Text style={detail.viewAll}> data schedule no more than 2 </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={detail.time}
            onPress={
              limit >= totalData ? () => setLimit(2) : () => setLimit(limit + 2)
            }>
            {loading === true ? (
              <View style={detail.viewAll}>
                <ActivityIndicator size="small" color="#5F2EEA" />
              </View>
            ) : (
              <Text style={detail.viewAll}>{viewall}</Text>
            )}
          </TouchableOpacity>
        )}
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

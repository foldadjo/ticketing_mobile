import React, {useState, useEffect} from 'react';
import Footer from '../../component/footer';
import {useDispatch} from 'react-redux';
import {getAllMovie} from '../../store/action/movie';
import {LINK_CLOUDINARY} from '@env';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  TextInput,
  Image,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Home(props) {
  const [mail, setMail] = useState('');
  const nowShowing = `${new Date().getMonth() + 1}`;
  const [monthfil, setMonthfil] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataSoon, setDataSoon] = useState([]);
  const limit = 10;
  const dispatch = useDispatch();

  const month = [
    {number: 1, title: 'Januari'},
    {number: 2, title: 'Februari'},
    {number: 3, title: 'Maret'},
    {number: 4, title: 'April'},
    {number: 5, title: 'Mei'},
    {number: 6, title: 'Juni'},
    {number: 7, title: 'Juli'},
    {number: 8, title: 'Agustus'},
    {number: 9, title: 'September'},
    {number: 10, title: 'Oktober'},
    {number: 11, title: 'November'},
    {number: 12, title: 'Desember'},
  ];
  useEffect(() => {
    getData();
  }, [monthfil]);
  const getData = async () => {
    try {
      setLoading(true);
      const result = await dispatch(
        getAllMovie(1, limit, nowShowing, '', 'id ASC'),
      );
      if (result.value.data.data === null) {
        setData([]);
      } else {
        setData(result.value.data.data);
        const resultall = await dispatch(
          getAllMovie(1, limit, monthfil, '', 'id ASC'),
        );
        if (resultall.value.data.data === null) {
          setDataSoon([]);
        } else {
          const movieComingsoon = resultall.value.data.data.filter(
            item =>
              item.releaseDate.split('T')[0].split('-')[1] !==
              result.value.data.data[0].releaseDate.split('T')[0].split('-')[1],
          );

          setDataSoon(movieComingsoon);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setMonthfil('');
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleMonth = e => {
    setMonthfil(`${e}`);
  };

  const handlemail = async e => {
    try {
      e.preventDefault();
      console.log(mail);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleViewAll = () => {
    props.navigation.navigate('ViewAllNavigator');
  };
  const handleDetail = movieId => {
    props.navigation.navigate('Detail', {movieId: movieId});
  };

  return (
    <ScrollView
      style={home.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#5F2EEA', '#D6D8E7']}
        />
      }>
      <View style={home.margin}>
        <Text style={home.tag}>
          Nearest Cinema, Newest Movie, Find out now!
        </Text>
        <Text style={home.title}> Find out now!</Text>
      </View>
      <View style={home.center}>
        <Image source={require('../../assets/home.png')} style={home.image} />
      </View>
      <View style={home.showing}>
        <View style={home.row}>
          <View style={home.now}>
            <Text style={home.now_text}>Now Showing</Text>
          </View>
          <View style={home.viewAll}>
            <TouchableOpacity onPress={handleViewAll}>
              <Text style={home.viewAll_Text}> View All</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal={true} style={home.row}>
          {data.map(item => (
            <View style={home.movie} key={item.id}>
              <Image
                source={{
                  uri: `${LINK_CLOUDINARY}${item.image}`,
                }}
                style={home.card_image}
              />
              <View style={home.movie_titleview}>
                <Text style={home.movie_title}>
                  {item.name.length > 18
                    ? item.name.substring(0, 15) + '...'
                    : item.name}
                </Text>
              </View>
              <Text style={home.movie_category}>
                {item.category.length > 18
                  ? item.category.substring(0, 15) + '...'
                  : item.category}
              </Text>
              <View style={home.button}>
                <Button
                  title="Detail"
                  color={'#5F2EEA'}
                  onPress={() => handleDetail(item.id)}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={home.row}>
        <View style={home.now}>
          <Text style={home.now_text2}>Upcoming Movie</Text>
        </View>
        <View style={home.viewAll}>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={home.viewAll_Text}> View All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView horizontal={true} style={home.row}>
        {month.map(item => (
          <TouchableOpacity
            style={monthfil === `${item.number}` ? home.month2 : home.month}
            key={item.number}
            onPress={
              monthfil === `${item.number}`
                ? () => handleMonth('')
                : () => handleMonth(item.number)
            }>
            <Text
              style={
                monthfil === `${item.number}`
                  ? home.month_text2
                  : home.month_text
              }>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {loading === true ? (
        <View style={home.row}>
          <View style={home.movie}>
            <View style={{alignItems: 'center', flex: 1, flexDirection: 'row'}}>
              <ActivityIndicator size="large" color="#5F2EEA" />
            </View>
          </View>
          <View style={home.movie}>
            <View style={{alignItems: 'center', flex: 1, flexDirection: 'row'}}>
              <ActivityIndicator size="large" color="#5F2EEA" />
            </View>
          </View>
        </View>
      ) : (
        <ScrollView horizontal={true} style={home.row}>
          {dataSoon.map(item => (
            <View style={home.movie} key={item.id}>
              <Image
                source={{
                  uri: `${LINK_CLOUDINARY}${item.image}`,
                }}
                style={home.card_image}
              />
              <View style={home.movie_titleview}>
                <Text style={home.movie_title}>
                  {item.name.length > 18
                    ? item.name.substring(0, 15) + '...'
                    : item.name}
                </Text>
              </View>
              <Text style={home.movie_category}>
                {item.category.length > 18
                  ? item.category.substring(0, 15) + '...'
                  : item.category}
              </Text>
              <View style={home.button}>
                <Button
                  title="Detail"
                  color={'#5F2EEA'}
                  onPress={() => handleDetail(item.id)}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <View style={home.margin}>
        <View style={home.card}>
          <Text style={home.tag}>Be the vanguard of the</Text>
          <Text style={home.title}> Moviegoers </Text>
          <View style={home.formulir}>
            <TextInput
              placeholder="Type your email"
              autoComplete="email"
              keyboardType="email-address"
              style={home.form}
              onChangeText={newText => setMail(newText)}
              defaultValue={mail}
            />
          </View>
          <View style={home.button2}>
            <Button title="Join Now" color={'#5F2EEA'} onPress={handlemail} />
          </View>
          <Text style={(home.tag, {lineHeight: 20, textAlign: 'center'})}>
            By joining you as a Tickitz member, {'\n'} we will always send you
            the {'\n'}
            latest latest updates via email .
          </Text>
        </View>
      </View>
      <Footer {...props} />
    </ScrollView>
  );
}

const home = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    margin: 30,
    marginBottom: 10,
  },
  margin: {
    marginHorizontal: 25,
  },
  tag: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 10,
  },
  title: {
    fontSize: 35,
    color: '#5F2EEA',
    fontWeight: '600',
  },
  center: {
    alignItems: 'center',
    margin: 50,
  },
  image: {
    width: 300,
    height: 340,
  },
  showing: {backgroundColor: '#D6D8E7', paddingBottom: 20},
  now: {flex: 2},
  now_text: {color: '#5F2EEA', fontSize: 25, fontWeight: '500'},
  now_text2: {color: 'black', fontSize: 25, fontWeight: '500'},
  viewAll: {flex: 1, alignItems: 'flex-end', top: 10},
  viewAll_Text: {color: '#5F2EEA'},
  movie: {
    width: 160,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#D6D8E7',
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    alignItems: 'center',
  },
  movie_title: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
  },
  movie_titleview: {
    overflow: 'hidden',
    height: 35,
  },
  movie_category: {
    lineHeight: 30,
  },
  month: {
    marginRight: 20,
    borderColor: '#5F2EEA',
    borderWidth: 1,
    padding: 3,
    alignItems: 'center',
    borderRadius: 3,
    width: 82,
  },
  month2: {
    marginRight: 20,
    backgroundColor: '#5F2EEA',
    padding: 3,
    alignItems: 'center',
    borderRadius: 3,
    width: 82,
  },
  month_text: {
    color: '#5F2EEA',
    fontWeight: '500',
  },
  month_text2: {
    color: 'white',
    fontWeight: '500',
  },
  formulir: {marginTop: 20},
  form: {
    backgroundColor: '#FFFFFF',
    borderColor: '#8692A6',
    borderRadius: 8,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 20,
    marginTop: 10,
    width: 250,
  },
  button: {
    backgroundColor: '#5F2EEA',
    color: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
    padding: 5,
    width: 100,
  },
  button2: {
    backgroundColor: '#5F2EEA',
    color: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
    padding: 5,
    width: 250,
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 50,
    borderRadius: 10,
    shadowOffset: 30,
    shadowOpacity: 10,
    shadowColor: '#FFFFFF',
    marginBottom: 10,
  },
  card_image: {width: 110, height: 160, borderRadius: 5},
});

export default Home;

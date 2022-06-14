import React, {useState} from 'react';
// import axios from '../../utils/axios';
import Footer from '../../component/footer';

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

function Home(props) {
  const [mail, setMail] = useState('');
  const [monthfil, setMonthfil] = useState('');
  // const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const limit = 10;
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
  // useEffect(() => {
  //   getdataMovie();
  // }, [getdataMovie, page]);

  const handleStatus = () => {
    if (status === 'active') {
      setStatus('notActive');
    } else {
      setStatus('active');
    }
  };

  const handlemail = async e => {
    try {
      e.preventDefault();
      // const resultLogin = await axios.post("auth/login", form);
      // dispatch(getUserById(resultLogin.data.data.id));
      console.log(mail);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleViewAll = () => {
    props.navigation.navigate('ViewAll');
  };
  const handleDetail = () => {
    props.navigation.navigate('Detail');
  };
  return (
    <ScrollView style={home.container} showsVerticalScrollIndicator={false}>
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
          <View style={home.movie}>
            <Image
              source={{
                uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
              }}
              style={home.card_image}
            />
            <Text style={home.movie_title}>Dora the lost city</Text>
            <Text style={home.movie_category}>Adventure</Text>
            <View style={(home.button, {width: 100})}>
              <Button title="Detail" color={'#5F2EEA'} onPress={handleDetail} />
            </View>
          </View>
          <View style={home.movie}>
            <Image
              source={{
                uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
              }}
              style={home.card_image}
            />
            <Text style={home.movie_title}>Dora the lost city</Text>
            <Text style={home.movie_category}>Adventure</Text>
            <View style={(home.button, {width: 100})}>
              <Button title="Detail" color={'#5F2EEA'} onPress={handleDetail} />
            </View>
          </View>
          <View style={home.movie}>
            <Image
              source={{
                uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
              }}
              style={home.card_image}
            />
            <Text style={home.movie_title}>Dora the lost city</Text>
            <Text style={home.movie_category}>Adventure</Text>
            <View style={(home.button, {width: 100})}>
              <Button title="Detail" color={'#5F2EEA'} onPress={handleDetail} />
            </View>
          </View>
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
          <TouchableOpacity style={home.month} key={item.number}>
            <Text style={home.month_text}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView horizontal={true} style={home.row}>
        <View style={home.movie}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
            }}
            style={home.card_image}
          />
          <Text style={home.movie_title}>Dora the lost city</Text>
          <Text style={home.movie_category}>Adventure</Text>
          <View style={(home.button, {width: 100})}>
            <Button title="Detail" color={'#5F2EEA'} onPress={handleDetail} />
          </View>
        </View>
        <View style={home.movie}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
            }}
            style={home.card_image}
          />
          <Text style={home.movie_title}>Dora the lost city</Text>
          <Text style={home.movie_category}>Adventure</Text>
          <View style={(home.button, {width: 100})}>
            <Button title="Detail" color={'#5F2EEA'} onPress={handleDetail} />
          </View>
        </View>
        <View style={home.movie}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
            }}
            style={home.card_image}
          />
          <Text style={home.movie_title}>Dora the lost city</Text>
          <Text style={home.movie_category}>Adventure</Text>
          <View style={(home.button, {width: 100})}>
            <Button title="Detail" color={'#5F2EEA'} onPress={handleDetail} />
          </View>
        </View>
      </ScrollView>
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
          <View style={home.button}>
            <Button title="Join Now" color={'#5F2EEA'} onPress={handlemail} />
          </View>
          <Text style={(home.tag, {lineHeight: 20, textAlign: 'center'})}>
            By joining you as a Tickitz member, {'\n'} we will always send you
            the {'\n'}
            latest latest updates via email .
          </Text>
        </View>
      </View>
      <Footer />
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
    width: 150,
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
  month_text: {
    color: '#5F2EEA',
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
    width: 250,
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 50,
    borderRadius: 10,
    shadowOffset: 30,
    shadowOpacity: 10,
    shadowColor: '#FFFFFF',
    marginBottom: 30,
  },
  card_image: {width: 120, height: 180, borderRadius: 5},
});

export default Home;

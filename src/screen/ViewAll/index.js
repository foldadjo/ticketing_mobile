import React, {useState} from 'react';
import Footer from '../../component/footer';
// import axios from '../../utils/axios';
import SelectDropdown from 'react-native-select-dropdown';
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

function ViewAll(props) {
  const [search, setSearch] = useState('');
  // const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  const countries = ['Sort', 'A to Z', 'Z to A'];

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

  const handleDetail = () => {
    props.navigation.navigate('Detail');
  };
  return (
    <ScrollView style={view.container} showsVerticalScrollIndicator={false}>
      <View style={view.row}>
        <View style={view.now}>
          <Text style={view.now_text}>List Movie</Text>
        </View>
      </View>
      <View style={view.row}>
        {/* <View style={view.sorting}> */}
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
          buttonStyle={view.sorting}
          defaultButtonText="Sort"
          // searchPlaceHolderColor="red"
        />
        {/* </View> */}
        <View style={view.filtering}>
          <TextInput
            placeholder="Search movie name"
            autoComplete="off"
            keyboardType="default"
            onChangeText={newText => setSearch(newText)}
            defaultValue={search}
          />
        </View>
      </View>
      <ScrollView horizontal={true} style={view.row}>
        {month.map(item => (
          <TouchableOpacity style={view.month}>
            <Text style={view.month_text}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={view.row}>
        <View style={view.movie}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
            }}
            style={view.card_image}
          />
          <Text style={view.movie_title}>Dora the lost city</Text>
          <Text style={view.movie_category}>Adventure</Text>
          <View style={(view.button, {width: 100})}>
            <Button title="Detail" color={'#5F2EEA'} onPress={handleDetail} />
          </View>
        </View>
        <View style={view.movie}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
            }}
            style={view.card_image}
          />
          <Text style={view.movie_title}>Dora the lost city</Text>
          <Text style={view.movie_category}>Adventure</Text>
          <View style={(view.button, {width: 100})}>
            <Button title="Detail" color={'#5F2EEA'} onPress={handleDetail} />
          </View>
        </View>
        <View style={view.movie}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
            }}
            style={view.card_image}
          />
          <Text style={view.movie_title}>Dora the lost city</Text>
          <Text style={view.movie_category}>Adventure</Text>
          <View style={(view.button, {width: 100})}>
            <Button title="Detail" color={'#5F2EEA'} onPress={handleDetail} />
          </View>
        </View>
        <View style={view.movie}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
            }}
            style={view.card_image}
          />
          <Text style={view.movie_title}>Dora the lost city</Text>
          <Text style={view.movie_category}>Adventure</Text>
          <View style={(view.button, {width: 100})}>
            <Button title="Detail" color={'#5F2EEA'} onPress={handleDetail} />
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const view = StyleSheet.create({
  container: {
    marginBottom: -50,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    margin: 30,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 35,
    color: '#5F2EEA',
    fontWeight: '600',
  },
  now: {flex: 2},
  now_text: {color: 'black', fontSize: 25, fontWeight: '500'},
  sorting: {
    flex: 1,
    borderColor: '#5F2EEA',
    borderWidth: 1,

    borderRadius: 10,
    backgroundColor: 'white',
  },
  filtering: {
    flex: 3,
    borderColor: '#5F2EEA',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginLeft: 10,
  },
  movie: {
    width: 140,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#D6D8E7',
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 20,
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
  button: {
    backgroundColor: '#5F2EEA',
    color: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
    padding: 5,
    width: 250,
  },
  card_image: {width: 120, height: 180, borderRadius: 5},
});

export default ViewAll;

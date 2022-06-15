import React, {useState} from 'react';
import Footer from '../../component/footer';
// import axios from '../../utils/axios';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
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
} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function ViewAll(props) {
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState('sort');
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const sort = ['ID movie', 'A to Z', 'Z to A'];
  const [monthfil, setMonthfil] = useState('');

  const data = [
    {movieId: 1, name: 'Spiderman: no way home'},
    {movieId: 2, name: 'Dr Strang'},
    {movieId: 3, name: 'Dora the lost city'},
    {movieId: 4, name: 'Dora the lost city'},
    {movieId: 5, name: 'Dora the lost city'},
    {movieId: 6, name: 'Dora the lost city'},
    {movieId: 7, name: 'Spiderman: no way home'},
    {movieId: 8, name: 'Dr Strang'},
    {movieId: 9, name: 'Dora the lost city'},
    {movieId: 10, name: 'Dora the lost city'},
    {movieId: 11, name: 'Dora the lost city'},
    {movieId: 12, name: 'Dora the lost city'},
  ];

  console.log(sorting);
  console.log(search);
  console.log(monthfil);

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

  const onRefresh = React.useCallback(() => {
    setSorting('sort');
    setSearch('');
    setMonthfil('');
    setRefreshing(true);
    setPage(1);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleDetail = () => {
    props.navigation.navigate('Detail');
  };
  const handleMonth = e => {
    setMonthfil(`${e}`);
  };
  return (
    <ScrollView
      style={view.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#5F2EEA', '#D6D8E7']}
        />
      }>
      <View style={view.row}>
        <View style={view.now}>
          <Text style={view.now_text}>List Movie</Text>
        </View>
      </View>
      <View style={view.row}>
        <SelectDropdown
          data={sort}
          onSelect={(selectedItem, index) => {
            setSorting(selectedItem);
          }}
          buttonTextAfterSelection={() => {
            return sorting;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={view.sorting}
          buttonTextStyle={view.sort_text}
          defaultButtonText={'sort'}
          renderDropdownIcon={() => (
            <Icon name="chevron-down" size={20} color={'#5F2EEA'} />
          )}
        />
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
          <TouchableOpacity
            style={monthfil === `${item.number}` ? view.month2 : view.month}
            key={item.number}
            onPress={
              monthfil === `${item.number}`
                ? () => handleMonth('')
                : () => handleMonth(item.number)
            }>
            <Text
              style={
                monthfil === `${item.number}`
                  ? view.month_text2
                  : view.month_text
              }>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={view.row}>
        {data
          .filter((item, idx) => idx >= 4 * (page - 1) && idx < page * 4)
          .map(item => (
            <View style={view.movie} key={item.id}>
              <Image
                source={{
                  uri: 'https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
                }}
                style={view.card_image}
              />
              <Text style={view.movie_title}>
                {item.name.length > 15
                  ? item.name.substring(0, 12) + '...'
                  : item.name}
              </Text>
              <Text style={view.movie_category}>Adventure</Text>
              <View style={(view.button, {width: 100})}>
                <Button
                  title="Detail"
                  color={'#5F2EEA'}
                  onPress={handleDetail}
                />
              </View>
            </View>
          ))}
      </View>
      <View style={view.page}>
        <TouchableOpacity
          onPress={page <= 1 ? () => '' : () => setPage(page - 1)}
          style={page <= 1 ? view.pageN : view.pageA}>
          <Text style={view.pagetext}>previous page..</Text>
        </TouchableOpacity>
        <View style={view.pageMid}>
          <Text style={view.pagetext}>{page}</Text>
        </View>
        <TouchableOpacity
          onPress={page >= data.length / 4 ? () => '' : () => setPage(page + 1)}
          style={page >= data.length / 4 ? view.pageN : view.pageA}>
          <Text style={view.pagetext}>Next Page..</Text>
        </TouchableOpacity>
      </View>
      <Footer {...props} />
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
    margin: 25,
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
    paddingLeft: 15,
  },
  sort_text: {color: 'black', paddingBottom: 5, fontSize: 15},
  filtering: {
    flex: 2,
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
    marginRight: 15,
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
  page: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  pagetext: {
    color: 'white',
    fontWeight: '600',
  },
  pageA: {
    backgroundColor: '#5F2EEA',
    width: 110,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageN: {
    backgroundColor: 'white',
    width: 110,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageMid: {
    backgroundColor: '#5F2EEA',
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ViewAll;

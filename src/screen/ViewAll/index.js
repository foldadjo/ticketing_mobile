import React, {useState, useEffect} from 'react';
import Footer from '../../component/footer';
import {useDispatch} from 'react-redux';
import {getAllMovie} from '../../store/action/movie';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
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
} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function ViewAll(props) {
  //filering
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState('sort');
  const [sorting2, setSorting2] = useState('');
  const sort = ['ID movie', 'A to Z', 'Z to A'];
  const [monthfil, setMonthfil] = useState('');

  //rendering
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  //pagination and data
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [page, sorting, monthfil, search]);
  const getData = async () => {
    try {
      setLoading(true);
      const result = await dispatch(
        getAllMovie(page, limit, monthfil, search, sorting2),
      );
      if (result.value.data.data === null) {
        setData([]);
      } else {
        setData(result.value.data.data);
        setTotalData(result.value.data.pagination.totalData);
        setTotalPage(result.value.data.pagination.totalPage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };
  console.log(data);

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
    getData();
    setSorting('sort');
    setSearch('');
    setMonthfil('');
    setRefreshing(true);
    setPage(1);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleDetail = movieId => {
    props.navigation.navigate('Detail', {movieId: movieId});
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
            if (selectedItem === 'ID movie') {
              setSorting2('id');
            } else if (selectedItem === 'A to Z') {
              setSorting2('name ASC');
            } else if (selectedItem === 'Z to A') {
              setSorting2('name DESC');
            } else {
              setSorting2('');
            }
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
        {data.map(item => (
          <View style={view.movie} key={item.id}>
            <Image
              source={{
                uri: `${LINK_CLOUDINARY}${item.image}`,
              }}
              style={view.card_image}
            />
            <Text style={view.movie_title}>
              {item.name.length > 15
                ? item.name.substring(0, 12) + '...'
                : item.name}
            </Text>
            <Text style={view.movie_category}>
              {item.category.length > 13
                ? item.category.substring(0, 11) + '...'
                : item.category}
            </Text>
            <View style={(view.button, {width: 100})}>
              {loading === true ? (
                <ActivityIndicator size="large" color="#5F2EEA" />
              ) : (
                <Button
                  title="Detail"
                  color={'#5F2EEA'}
                  onPress={() => handleDetail(item.id)}
                />
              )}
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
          {loading === true ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <View>
              <Text style={view.pagetext}>{page}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={page >= totalPage ? () => '' : () => setPage(page + 1)}
          style={page >= totalPage ? view.pageN : view.pageA}>
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

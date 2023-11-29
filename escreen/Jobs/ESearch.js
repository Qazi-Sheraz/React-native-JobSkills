import {
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useContext, useState, useRef } from 'react';
import JScreen from '../../customComponents/JScreen';
import JText from '../../customComponents/JText';
import JHeader from '../../customComponents/JHeader';
import Feather from 'react-native-vector-icons/Feather';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JShadowView from '../../customComponents/JShadowView';
import { JToast } from '../../functions/Toast';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';
import JScrollView from '../../customComponents/JScrollView';
import JJobTile from '../../customComponents/JJobTile';
import { _search } from '../../functions/CFilter';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import JRecentJob from '../../customComponents/JRecentJob';
import RBSheet from 'react-native-raw-bottom-sheet';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JRecentJobTile from '../../customComponents/JRecentJobTile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JRow from '../../customComponents/JRow';
import JChevronIcon from '../../customComponents/JChevronIcon';
import JButton from '../../customComponents/JButton';

const ESearch = ({ navigation }) => {
  const refRBSheet = useRef();
  const [name, setName] = useState('');
  const [seeAll, setSeeAll] = useState(false);

  const store = useContext(StoreContext);

  const [search, setSearch] = useState('');
  // console.log(search)
  // const getData = async () => {
  //   try {
  //     // await AsyncStorage.removeItem('@recent')
  //     const jsonValue = await AsyncStorage.getItem('@recent')

  //     store.setRecentSearch(jsonValue != null ? JSON.parse(jsonValue).filter((e) => e.id == store.userInfo?.id) : [])
  //     console.log("job===>>>", store.recentSearch)
  //   } catch (e) {
  //     // error reading value
  //   }
  // }
  const getData = async () => {
    try {
      // await AsyncStorage.removeItem('@recent')
      const jsonValue = await AsyncStorage.getItem('@recent');
  
      const parsedData = jsonValue != null ? JSON.parse(jsonValue).filter((e) => e.id == store.userInfo?.id) : [];
  
      // Create a map to keep track of seen search names
      const seenSearchNames = new Map();
      
      // Filter out duplicates based on search name and user ID
      const filteredData = parsedData.filter((item) => {
        const searchName = item.search.trim(); // Remove leading/trailing whitespace
        const searchKey = `${item.id}-${searchName}`;
        
        if (!seenSearchNames.has(searchKey)) {
          seenSearchNames.set(searchKey, true);
          return true;
        }
        
        return false;
      });
  
      store.setRecentSearch(filteredData);
    } catch (e) {
      // Handle error reading value
    }
  };
  

  useEffect(() => {
    getData();
  }, [])



  return (
    <JScreen
      style={{ paddingHorizontal: RFPercentage(2) }}
      header={
        <JHeader
          left={
            <JChevronIcon onPress={() => {
              navigation.goBack();
              store.setFilterData([]);
            }} color='#00000090' />
          }
          right={store.token?.user?.owner_type.includes('Candidate') === true &&
            <Feather
              onPress={() => {
                navigation.navigate('CFilter'),
                  store.setFilterData([])
              }}
              name="filter"
              size={RFPercentage(3.5)}
              color={colors.black[0]}
            />
          }

        />
      }>

      <JText fontSize={RFPercentage(3)}>{store.lang.find_your_Job}</JText>
      <JShadowView
        shadowColor={colors.purple[0]}
        containerStyle={{
          marginVertical: RFPercentage(2),
          borderWidth: RFPercentage(0.1),
          borderColor: `${colors.purple[0]}50`,
          justifyContent: 'space-between',
          paddingLeft: RFPercentage(1),
          height: heightPercentageToDP(6),
          flexDirection: store.lang.id == 0 ? 'row' : 'row-reverse',
          alignItems: 'center',
        }}
        isPressable={false}>
        <TextInput
          // autoFocus
          style={{
            textAlign: store.lang.id == 0 ? 'left' : 'right',
            color: colors.black[0],
            width: '85%',
          }}
          value={search}
          onChangeText={e => {
            setSearch(e);
            // if (e?.length > 0) {
            //   _search(e, store,true);
            // } else {
            //   store.setFilterData([]);

            // }

          }}
          placeholder={store.lang.search}
          placeholderTextColor={colors.placeHolderColor[0]}
        />
        {store.filterDataApiLoader === true ? (
          <ActivityIndicator
            size={RFPercentage(3.5)}
            color={colors.black[0]}
            style={{
              marginRight: RFPercentage(1),
              position: 'absolute',
              right: 0,
            }}
          />
        ) : (
          <Feather
            onPress={() => {
              if (search?.length > 0) {
                _search({
                  search: search,
                  id: store?.userInfo?.id
                }, store, true);
              } else {
                JToast({
                  type: 'danger',
                  text1: store.lang.eror,
                  text1: store.lang.enter_something,
                });
              }
            }}
            name="search"
            size={RFPercentage(3.5)}
            color={search?.length > 0 ? colors.black[0] : '#00000040'}
            style={{
              marginHorizontal: RFPercentage(1),

            }}
          />
        )}
      </JShadowView>
      <JScrollView>
        {store.filterData?.length > 0 ? (
          store.filterData.map((item, index) => (
            <React.Fragment key={index}>
              <JJobTile
                favouriteData={store.favouriteList}
                jobId={item.id}
                onPress={() =>
                  navigation.navigate('CJobDetails', {
                    id: item.job_id,
                    jid: item.id,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                type="job"
                title={item.job_title}
                location={item.full_location}
                category={store.lang.id == 0 ? item?.job_category_english : item?.job_category_arabic}
                img={item.company_image}
                containerStyle={{ marginVertical: RFPercentage(1) }}
              />
            </React.Fragment>
          ))
        ) : (
          <>
            <JText
              style={{ marginBottom: RFPercentage(2) }}
              fontSize={RFPercentage(3)}>
              {store.lang.Recent_search}
            </JText>
            {/* {Array.from(new Set(store.recentSearch)).slice(0, 5).map((item, index) => ( */}
            {store.recentSearch.slice(0, 5).map((item, index) => (
                <JRecentJob
                  key={index}
                  onPress={() => {
                    setSearch(item?.search)
                    // _search(item,store,false)
                    // refRBSheet.current.open();
                  }}
                  JobName={item?.search}

                />

              ))}
            {/* <JButton onPress={()=> setSeeAll(true)}/> */}
          </>
        )}
      </JScrollView>
      {/* <RBSheet
          ref={refRBSheet}
          closeOnDragDown={false}
          closeOnPressMask={false}
          height={heightPercentageToDP(100)}
          customStyles={{
            wrapper: {
              backgroundColor: '#00000080',
            },
            draggableIcon: {
              backgroundColor: colors.black[0],
              display: 'none',
            },
          }}>
          <SafeAreaView>
            <JGradientHeader
              center={
                <JText
                  fontColor={colors.white[0]}
                  fontWeight="bold"
                  fontSize={RFPercentage(2.5)}>
                  {name}
                </JText>
              }
              left={
                <Feather
                  onPress={() => {
                    refRBSheet.current.close();
                  }}
                  name="chevron-left"
                  size={RFPercentage(3.5)}
                  color={colors.white[0]}
                />
              }
            />
            <JScrollView style={{padding: RFPercentage(2)}}>
              {[0, 1, 2].map((item, index) => (
                <>
                  <JRecentJobTile
                // disabled={true}
                    onSelect={() => setModalVisible(true)}
                    // onPress={() => navigation.navigate('JobDetails')}
                    image={false}
                    star={false}
                    item={item}
                    key={index}
                  />
                </>
              ))}
            </JScrollView>
          </SafeAreaView>
        </RBSheet> */}
    </JScreen>
  );
};

export default observer(ESearch);

const styles = StyleSheet.create({});

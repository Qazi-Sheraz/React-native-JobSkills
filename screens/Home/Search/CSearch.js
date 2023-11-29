import {
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import JScreen from '../../../customComponents/JScreen';
import JText from '../../../customComponents/JText';
import JHeader from '../../../customComponents/JHeader';
import Feather from 'react-native-vector-icons/Feather';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../../config/colors';
import JShadowView from '../../../customComponents/JShadowView';
import { JToast } from '../../../functions/Toast';
import { useEffect } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { useState } from 'react';
import JScrollView from '../../../customComponents/JScrollView';
import JJobTile from '../../../customComponents/JJobTile';
import { _search } from '../../../functions/CFilter';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import JRecentJob from '../../../customComponents/JRecentJob';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useRef } from 'react';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import JRecentJobTile from '../../../customComponents/JRecentJobTile';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import url from '../../../config/url';
import JEmpty from '../../../customComponents/JEmpty';

const CSearch = ({ navigation }) => {

  const refRBSheet = useRef();
  const [name, setName] = useState('');

  const store = useContext(StoreContext);
  const [search, setSearch] = useState(['']);

  const getData = async () => {
    try {
      // await AsyncStorage.removeItem('@recent')
      const jsonValue = await AsyncStorage.getItem('@recent')

      store.setRecentSearch(jsonValue != null ? JSON.parse(jsonValue) : [])
      //  console.log("job===>>>",store.recentSearch)
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <JScreen
      style={{ paddingHorizontal: RFPercentage(2) }}
      header={
        <JHeader
          left={
            <JChevronIcon
              color={colors.black[0]}
              onPress={() => {
                store.setFilterData(''), navigation.goBack();
              }}
            />
          }
          right={
            <Feather
              onPress={() => navigation.navigate('CFilter')}
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
            color: colors.black[0],
            textAlign: store.lang.id == 0 ? 'left' : 'right',
            width: '85%',
          }}
          onChangeText={(search) => {
            setSearch(search); // Set the 'search' variable to the current input value
            _search(search, store);
            // if (search?.length >= 1) {
            //   _search(search, store); // Call the API if the search input is not empty
            //   // console.log('fillll');
            // } else {
            //   _search(search, store);
            //   store.setFilterData([])// Clear the filtering data if the search input is empty
            //   console.log('emptyyyyy',search?.length);
            // }
          }}
          placeholder={store.lang.search}
          placeholderTextColor={colors.placeHolderColor[0]}
        />
        <Feather
          name="search"
          size={RFPercentage(3.5)}
          color={search?.length > 0 ? colors.black[0] : '#00000040'}
          style={{
            marginHorizontal: RFPercentage(1),
            position: 'absolute',
            right: 0,
          }}
        />
      </JShadowView>
     
      {store.filterDataApiLoader === true ? (
        <ActivityIndicator size={RFPercentage(3.5)} color={colors.black[0]} />
      ) : (
        <JScrollView>
          {store.filterData?.length > 0 ?
            store.filterData?.map((item, index) => (
              <React.Fragment key={index}>
                <JJobTile
                  favouriteData={store.favouriteList}
                  jobId={item.id}
                  onPress={() =>
                    navigation.navigate('CJobDetails', {
                      id: item.job_id,
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
            : (<>
              <JText
                style={{ marginBottom: RFPercentage(2) }}
                fontSize={RFPercentage(3)}>
                {store.lang.Recent_search}
              </JText>
              {Array.from(new Set(store.recentSearch)).filter(e => e.token === store.token.token).slice(0, 5).map((item, index) => (
                <JRecentJob
                  key={index}
                  onPress={() => {
                    setSearch(item.search)
                    // _search(item,store,false)
                    // refRBSheet.current.open();
                  }}
                  JobName={item.search}
                />
              ))}
            </>)
          }
        </JScrollView>
      )}
      <RBSheet
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
          <JScrollView style={{ padding: RFPercentage(2) }}>
            {/* {[0, 1, 2].map((item, index) => (
              <>
                <JRecentJobTile
              // disabled={true}
                  onSelect={() => setModalVisible(true)}
                  // onPress={() => navigation.navigate('JobDetails')}
                  image={false}
                  title={'Project'}
                  key={index}
                />
              </>
            ))} */}
          </JScrollView>
        </SafeAreaView>
      </RBSheet>
    </JScreen>
  );
};

export default observer(CSearch);

const styles = StyleSheet.create({});

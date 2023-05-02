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
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../../config/colors';
import JShadowView from '../../../customComponents/JShadowView';
import {JToast} from '../../../functions/Toast';
import {useEffect} from 'react';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import {observer} from 'mobx-react';
import {useState} from 'react';
import JScrollView from '../../../customComponents/JScrollView';
import JJobTile from '../../../customComponents/JJobTile';
import {_search} from '../../../functions/CFilter';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import JRecentJob from '../../../customComponents/JRecentJob';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import JRecentJobTile from '../../../customComponents/JRecentJobTile';

const CSearch = ({navigation}) => {
  const refRBSheet = useRef();
  const [name, setName] = useState('');
  const data = [
    {id: 0, JobName: 'UI/UX Designer'},
    {id: 1, JobName: 'Motion Graphic Designer'},
    {id: 2, JobName: 'Laraval Developer'},
    {id: 3, JobName: 'Interior Designer'},
  ];
  const store = useContext(StoreContext);
  const [search, setSearch] = useState('');

  const _getFilterList = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      'https://dev.jobskills.digital/api/search-jobs-filters',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result.data);
        store.setFilterList(result.data);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    _getFilterList();
  }, []);
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JHeader
          left={
            <Feather
              onPress={() => {
                navigation.goBack();
                store.setFilterData([]);
              }}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.black[0]}
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
      <JText fontSize={RFPercentage(3)}>Find your Job</JText>
      <JShadowView
        shadowColor={colors.purple[0]}
        containerStyle={{
          marginVertical: RFPercentage(2),
          borderWidth: RFPercentage(0.1),
          borderColor: `${colors.purple[0]}50`,
          justifyContent: 'space-between',
          paddingLeft: RFPercentage(1),
          height: heightPercentageToDP(6),
          flexDirection: 'row',
          alignItems: 'center',
        }}
        isPressable={false}>
        <TextInput
          // autoFocus
          style={{
            color: colors.black[0],
            width: '100%',
          }}
          onChangeText={e => {
            setSearch(e);
            if (e.length < 1) {
              store.setFilterData([]);
            }
          }}
          placeholder="Search"
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
              if (search.length > 0) {
                _search(search, store);
              } else {
                JToast({
                  type: 'error',
                  text1: 'Enter something...!',
                });
              }
            }}
            name="search"
            size={RFPercentage(3.5)}
            color={search.length > 0 ? colors.black[0] : '#00000040'}
            style={{
              marginRight: RFPercentage(1),
              position: 'absolute',
              right: 0,
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
                  navigation.navigate('CSelectedJob', {
                    id: item.job_id,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                type="job"
                title={item.job_title}
                location={item.city_name}
                category={item.job_shift}
                img={item.company_url}
                containerStyle={{marginVertical: RFPercentage(1)}}
              />
            </React.Fragment>
          ))
        ) : (
          <>
            <JText
              style={{marginBottom: RFPercentage(2)}}
              fontSize={RFPercentage(3)}>
              Recent Searches
            </JText>
            {data.map((item, index) => (
              <JRecentJob
                onPress={() => {
                  setName(item.JobName);
                  refRBSheet.current.open();
                }}
                JobName={item.JobName}
              />
            ))}
          </>
        )}
      </JScrollView>
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
          <JScrollView style={{padding: RFPercentage(2)}}>
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

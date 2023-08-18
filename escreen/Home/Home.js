import {FlatList, StyleSheet, Image, View, ActivityIndicator, Button} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import JScreen from '../../customComponents/JScreen';
import JHeader from '../../customComponents/JHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JLogoImage from '../../customComponents/JLogoImage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useContext} from 'react';
import {StoreContext} from '../../mobx/store';
import colors from '../../config/colors';
import JText from '../../customComponents/JText';
import JScrollView from '../../customComponents/JScrollView';
import JGradientView from '../../customComponents/JGradientView';
import moment from 'moment';
import JRecentJobTile from '../../customComponents/JRecentJobTile';
import JFindTitle from '../../customComponents/JFindTitle';
import RBSheet from 'react-native-raw-bottom-sheet';
import EDrawerContent from '../../drawer/EDrawerContent';
import {observer} from 'mobx-react';
import JRow from '../../customComponents/JRow';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import JIcon from '../../customComponents/JIcon';
import JNotfoundData from '../../customComponents/JNotfoundData';
import JApiError from '../../customComponents/JApiError';
import { _dashboard } from '../../functions/Candidate/BottomTab';
import { useCallback } from 'react';
import { Linking } from 'react-native';

const Home = () => {
  const navigation=useNavigation();
  const refRBSheet = useRef();
  const isFoucs = useIsFocused();
  const store = useContext(StoreContext);
  const [update, setUpdate] = useState(true);
  const [data1, setData1] = useState();
  
  const onRefresh = useCallback(() => {
    store.setEHomeApiLoader(true);
    setTimeout(() => {
      _dashboard(store);
      store.setEHomeApiLoader(false);
    }, 1000);
  }, [store]);

useEffect(() => {
  _dashboard(store);
}, [isFoucs])
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      internet={true}
      header={
        <JHeader
          containerStyle={{
            flexDirection: 'row',
          }}
          left={
            <JIcon
              icon="fe"
              onPress={() => navigation.openDrawer(EDrawerContent)}
              name="menu"
              size={RFPercentage(3.5)}
            />
          }
          center={
            <JLogoImage
              height={heightPercentageToDP(5)}
              width={widthPercentageToDP(15)}
              tintColor={null}
            />
          }
          right={
            <JIcon
              icon={'ma'}
              onPress={() => navigation.navigate('CNotification')}
              name="bell-badge-outline"
              size={RFPercentage(3.5)}
            />
          }
        />
      }>
      {store.eHomeApiLoader ? (
        <ActivityIndicator />
      ) : store.eHomeApiError == true ? (
        <JApiError
          onTryAgainPress={() => {
            _dashboard(store);
          }}
        />
      ) : (
        // <JText>Loading</JText>
        <React.Fragment>
         
          <JFindTitle
            JobTitle={store.lang.job_title}
            onPress={() => navigation.navigate('ESearch')}
          />

          <JScrollView refreshing={store.eHomeApiLoader} onRefresh={onRefresh}>
            <FlatList
              style={{alignSelf: 'center', marginVertical: RFPercentage(2)}}
              horizontal
              data={[
                {
                  name: store.lang.total,
                  count: store.employeHome?.counts?.totalJobs,
                },
                {
                  name: store.lang.open,
                  count: store.employeHome?.counts?.jobCount,
                },
                {
                  name: store.lang.paused,
                  count: store.employeHome?.counts?.pausedJobCount,
                },

                {
                  name: store.lang.close,
                  count: store.employeHome?.counts?.closedJobCount,
                },
              ]}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View
                  style={{
                    marginHorizontal: RFPercentage(0.6),
                  }}>
                  <JGradientView
                    containerStyle={{
                      width: RFPercentage(12),
                      height: RFPercentage(12),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: RFPercentage(1),
                    }}>
                    {index === 0 ? (
                      <AntDesign
                        size={RFPercentage(3)}
                        name="videocamera"
                        color={colors.white[0]}
                      />
                    ) : index === 1 ? (
                      <Ionicons
                        size={RFPercentage(3)}
                        name="briefcase-outline"
                        color={colors.white[0]}
                      />
                    ) : index === 2 ? (
                      <AntDesign
                        size={RFPercentage(3)}
                        name="pausecircleo"
                        color={colors.white[0]}
                      />
                    ) : (
                      <AntDesign
                        size={RFPercentage(3)}
                        name="closecircleo"
                        color={colors.white[0]}
                      />
                    )}

                    <JText fontColor={colors.white[0]} fontAlign={'center'}>
                      {item.count}
                    </JText>
                  </JGradientView>
                  <JText
                    // fontSize={RFPercentage(2)}
                    fontAlign="center"
                    fontColor={colors.black[0]}>
                    {`${item.name}\n${store.lang.jobs}`}
                  </JText>
                </View>
              )}
              keyExtractor={data => data.name}
              inverted={store.lang.id == 0 ? false : true}
            />

            <JText
              fontSize={RFPercentage(2)}
              fontWeight="bold"
              fontColor={colors.black[0]}>
              {store.lang.upcoming_Meetings}
            </JText>

            {store.employeHome?.meetings?.length > 0 ? (
              <FlatList
                data={store.employeHome?.meetings}
                renderItem={({item, index}) => (
                  <JRow
                    disabled={false}
                    style={{
                      marginVertical: RFPercentage(1),
                      borderBottomWidth: RFPercentage(0.1),
                      borderBottomColor: colors.border[0],
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.purple[0],
                        width: '25%',
                        alignItems: 'center',
                        paddingVertical: RFPercentage(3),
                        borderTopEndRadius:
                          store.lang.id == 0
                            ? RFPercentage(2)
                            : RFPercentage(0),
                        borderBottomEndRadius:
                          store.lang.id == 0
                            ? RFPercentage(2)
                            : RFPercentage(0),
                        borderTopStartRadius:
                          store.lang.id == 0
                            ? RFPercentage(0)
                            : RFPercentage(2),
                        borderBottomStartRadius:
                          store.lang.id == 0
                            ? RFPercentage(0)
                            : RFPercentage(2),
                        shadowColor: '#000000',
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                        shadowOffset: {
                          height: 1,
                          width: 1,
                        },
                        elevation: 4,
                      }}>
                      <JText style={{color: colors.white[0]}}>
                        {moment(item.start_date_and_time).format('HH:mm')}{' '}
                        {item.meridiem}
                      </JText>
                      <JText style={{color: colors.white[0]}}>
                        {moment(item.start_date_and_time).format('ddd DD')}
                      </JText>
                      <JText style={{color: colors.white[0]}}>
                        {moment(item.start_date_and_time).format('MMM YYYY')}
                      </JText>
                    </View>
                    <View
                      style={{
                        paddingHorizontal: RFPercentage(1),
                        width: '75%',
                      }}>
                      <JText fontWeight="bold" fontSize={RFPercentage(2)}>
                        {item.meeting_topic}
                      </JText>
                      <JRow  style={{
                          marginTop: RFPercentage(1),
                          // backgroundColor:'red',
                          justifyContent:'space-between'
                        }}>
                      <JRow style={{
                          // backgroundColor:'blue',
                          width:RFPercentage(22)
                        }}>
                        <Image
                          style={{
                            width: RFPercentage(4),
                            height: RFPercentage(4),
                            borderRadius: RFPercentage(2),
                          }}
                          source={{
                            uri:
                              item.employer_images != null
                                ? require('./../../assets/images/person.png')
                                : item.employer_image,
                          }}
                        />
                        <JText
                          style={{
                            marginHorizontal: RFPercentage(1),
                            fontSize: RFPercentage(1.9),
                          }}>
                          {item.employer_name}
                        </JText>
                      </JRow>

                      <JRow
                        disabled={false}
                        onPress={() => {
                          refRBSheet.current.open(), setData1(item);
                        }}
                        style={{
                          alignSelf:
                            store.lang.id == 0 ? 'flex-end' : 'flex-start',
                          borderWidth: RFPercentage(0.2),
                          borderColor: colors.purple[0],
                          paddingVertical: RFPercentage(0.5),
                          paddingHorizontal: RFPercentage(1),
                          // marginVertical: RFPercentage(0.5),
                        }}>
                        <JText
                          style={{marginRight: RFPercentage(0.5)}}
                          fontWeight="bold">
                          {store.lang.start}
                        </JText>
                        <JIcon
                          icon={'en'}
                          name="controller-play"
                          size={RFPercentage(2)}
                        />
                      </JRow>
                      </JRow>
                    </View>
                  </JRow>
                )}
              />
            ) : (
              <JNotfoundData />
            )}

            <JText
              style={{marginVertical: RFPercentage(1)}}
              fontSize={RFPercentage(2)}
              fontWeight="bold"
              fontColor={colors.black[0]}>
              {store.lang.Recent_Jobs}
            </JText>
            {store.employeHome?.recentJobs?.length > 0 ? (
              // store.employeHome?.recentJobs?.map((item, index) => (

              <FlatList
                data={store.employeHome?.recentJobs}
                renderItem={({item, index}) => (
                  <JRecentJobTile
                    update={update}
                    setUpdate={setUpdate}
                    star={false}
                    item={item}
                  />
                )}
              />
            ) : (
              // ))
              <JNotfoundData />
            )}
          </JScrollView>
        </React.Fragment>
      )}
      <RBSheet
        ref={refRBSheet}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        height={heightPercentageToDP(23)}
        customStyles={{
          container: {
            borderTopLeftRadius: RFPercentage(2.5),
            borderTopRightRadius: RFPercentage(2.5),
          },
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: colors.black[0],
            display: 'none',
          },
        }}>
        <View
          style={{
            paddingHorizontal: RFPercentage(3),
            paddingTop: RFPercentage(1),
          }}>
          <JText
            style={{
              marginVertical: RFPercentage(3),
              fontSize: RFPercentage(2.5),
              fontWeight: 'bold',
            }}>
            {store.lang.meeting_Info}
          </JText>
          {data1?.office_location !== null ? (
            <>
              <JText style={styles.rbtxt}>{store.lang.office_base}</JText>
              <JText
                style={styles.rbtxt2}
                onPress={() => {
                  Linking.openURL(data1?.office_location);
                }}>
                {data1?.office_location == null
                  ? 'N/A'
                  : data1?.office_location}
              </JText>
            </>
          ) : data1?.join_url !== null ? (
            <>
              <JText style={styles.rbtxt}>{store.lang.meeting_link}</JText>
              <JText
                style={styles.rbtxt2}
                onPress={() => {
                  Linking.openURL(data1?.join_url);
                }}>
                {data1?.join_url == null ? 'N/A' : data1?.join_url}
              </JText>
            </>
          ) : (
            <JNotfoundData />
          )}
        </View>
      </RBSheet>
    </JScreen>
  );
};

export default observer(Home);

const styles = StyleSheet.create({
  rbtxt: {
    marginVertical: RFPercentage(0.5),
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  rbtxt2: {
    marginVertical: RFPercentage(0.5),
    fontSize: RFPercentage(2),
    color:'#008AD8',
  },
});

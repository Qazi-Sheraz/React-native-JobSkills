import {FlatList, StyleSheet, Image, View, Pressable, ActivityIndicator} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import JScreen from '../../customComponents/JScreen';
import JHeader from '../../customComponents/JHeader';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JLogoImage from '../../customComponents/JLogoImage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import JShadowView from '../../customComponents/JShadowView';
import translation from '../../config/translation';
import {useContext} from 'react';
import {StoreContext} from '../../mobx/store';
import colors from '../../config/colors';
import JText from '../../customComponents/JText';
import JScrollView from '../../customComponents/JScrollView';
import JGradientView from '../../customComponents/JGradientView';
import JSideHeading from '../../customComponents/JSideHeading';
import moment from 'moment';
import JRecentJobTile from '../../customComponents/JRecentJobTile';
import JFindTitle from '../../customComponents/JFindTitle';
import RBSheet from 'react-native-raw-bottom-sheet';
import EDrawerContent from '../../drawer/EDrawerContent';
import {Observer, observer, useObserver} from 'mobx-react';
import JRow from '../../customComponents/JRow';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import url from '../../config/url';

const Home = ({isempty = false,}) => {
  const navigation=useNavigation();
  const refRBSheet = useRef();
  const isFoucs = useIsFocused();
  const store = useContext(StoreContext);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  const _dashboard = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token.token}`,
    );
    
    fetch(`${url.baseUrl}/dashboardEmployer`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
     
        // console.log(result);
        setData(result);
      })
      .catch(error => {
        console.log('error', error);
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    if (isFoucs) {
      _dashboard();
    }
  }, [loader, isFoucs]);

  return (
    <JScreen
      isError={error}
      onTryAgainPress={() => _dashboard()}
      style={{paddingHorizontal: RFPercentage(2)}}
      internet={true}
      header={
        <JHeader
          left={
            <Feather
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
            <MaterialCommunityIcons
              // onPress={() => navigation.navigate('CNotification')}
              onPress={() => {
                console.log(store.lang);
                store.lang.id == 0 ? store.setLang('ud') : store.setLang('en');
              }}
              name="bell-badge-outline"
              size={RFPercentage(3.5)}
            />
          }
        />
      }>
      {loader ? (
        <ActivityIndicator />
      ) : (
        // <JText>Loading</JText>
        <React.Fragment>
          <JFindTitle JobTitle={store.lang.job_title} />

          <JScrollView>
            <FlatList
              style={{alignSelf: 'center', marginVertical: RFPercentage(2)}}
              horizontal
              data={[
                {
                  name: store.lang.total,
                  count: data?.counts?.totalJobs,
                },
                {
                  name: store.lang.open,
                  count: data?.counts?.jobCount,
                },
                {
                  name: store.lang.paused,
                  count: data?.counts?.pausedJobCount,
                },

                {
                  name: store.lang.close,
                  count: data?.counts?.closedJobCount,
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


            {data?.meetings?.length > 0 ? (
              <>
                <JRow
                  disabled={false}
                  onPress={() => refRBSheet.current.open()}
                  style={{
                    marginTop: RFPercentage(1),
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
                        store.lang.id == 0 ? RFPercentage(2) : RFPercentage(0),
                      borderBottomEndRadius:
                        store.lang.id == 0 ? RFPercentage(2) : RFPercentage(0),
                      borderTopStartRadius:
                        store.lang.id == 0 ? RFPercentage(0) : RFPercentage(2),
                      borderBottomStartRadius:
                        store.lang.id == 0 ? RFPercentage(0) : RFPercentage(2),
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
                      {moment().format('HH:MM A')}
                    </JText>
                    <JText style={{color: colors.white[0]}}>
                      {moment().format('ddd DD')}
                    </JText>
                    <JText style={{color: colors.white[0]}}>
                      {moment().format('MMM YYYY')}
                    </JText>
                  </View>
                  <View
                    style={{paddingHorizontal: RFPercentage(2), width: '75%'}}>
                    <JText fontWeight="bold" fontSize={RFPercentage(2.2)}>
                      {store.lang.project_Manager}
                    </JText>
                    <JRow
                      style={{
                        marginTop: RFPercentage(1),
                      }}>
                      <Image
                        style={{
                          width: RFPercentage(4),
                          height: RFPercentage(4),
                          borderRadius: RFPercentage(4),
                        }}
                        source={{
                          uri: 'https://media.istockphoto.com/id/1358205700/photo/shot-of-a-young-man-using-his-smartphone-to-send-text-messages.jpg?s=1024x1024&w=is&k=20&c=KAY3jM0WHkdPdQEPwMl1B2gGKDb_hP_596yrU-5yuSs=',
                        }}
                      />
                      <JText
                        style={{
                          marginHorizontal: RFPercentage(1),
                          fontSize: RFPercentage(1.9),
                        }}>
                        Taqi Haider
                      </JText>
                    </JRow>

                    <JRow
                      disabled={false}
                      style={{
                        alignSelf:
                          store.lang.id == 0 ? 'flex-end' : 'flex-start',
                        borderWidth: RFPercentage(0.2),
                        borderColor: colors.purple[0],
                        paddingVertical: RFPercentage(0.5),
                        paddingHorizontal: RFPercentage(0.8),
                      }}>
                      <JText
                        style={{marginRight: RFPercentage(0.5)}}
                        fontWeight="bold">
                        {store.lang.start}
                      </JText>
                      <Entypo name="controller-play" size={RFPercentage(2)} />
                    </JRow>
                  </View>
                </JRow>
              </>
            ) : (
              <View
                style={{
                  height: heightPercentageToDP(12),
                  // backgroundColor: colors.tileColor[0],
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: RFPercentage(6), height: RFPercentage(6)}}
                  source={require('../../assets/images/empty/empty.png')}
                />
                <JText style={{marginTop: RFPercentage(1)}}>
                  {store.lang.not_found}
                </JText>
              </View>
            )}

            <JText
              style={{marginVertical: RFPercentage(1)}}
              fontSize={RFPercentage(2)}
              fontWeight="bold"
              fontColor={colors.black[0]}>
              {store.lang.Recent_Jobs}
            </JText>
            {data?.recentJobs?.length > 0 ? (
              data?.recentJobs?.map((item, index) => (
                <JRecentJobTile item={item} key={index} />
              ))
            ) : (
              <View
                style={{
                  height: heightPercentageToDP(22),
                  // backgroundColor: colors.tileColor[0],
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: RFPercentage(6), height: RFPercentage(6)}}
                  source={require('../../assets/images/empty/empty.png')}
                />
                <JText style={{marginTop: RFPercentage(1)}}>
                  {store.lang.not_found}
                </JText>
              </View>
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
              marginVertical: RFPercentage(1),
              fontSize: RFPercentage(2.5),
              fontWeight: 'bold',
            }}>
            {store.lang.meeting_Info}
          </JText>
          <JText style={styles.rbtxt}>{store.lang.meeting_ID}</JText>
          <JText style={styles.rbtxt2}>3457654</JText>
          <JText style={styles.rbtxt}>{store.lang.password}</JText>
          <JText style={styles.rbtxt2}>34fgg654</JText>
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
  },
});

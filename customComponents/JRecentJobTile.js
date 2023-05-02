import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Modal,
  SafeAreaView,
} from 'react-native';

import React, {memo, useContext} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from './JText';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JStatusChecker from './JStatusChecker';
import {useState} from 'react';
import {StoreContext} from '../mobx/store';
import {_saveToFavoriteList} from '../functions/Candidate/BottomTab.js';
import {Observer, observer} from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useNavigation} from '@react-navigation/native';
import JRow from './JRow';
import JIcon from './JIcon';
import JButton from './JButton';
import {useEffect} from 'react';
import {baseUrl} from '../ApiUrls';
import Toast from 'react-native-toast-message';

function JRecentJobTile({
  isempty = false,
  img,
  image = true,
  item,
  index,
  option = false,
  type = 'job',
  onPress,
  containerStyle,
  bookmarked,
  onIconPress,
  status,
  favouriteData = [],
  jobId,
  onSelect,
  disabled = false,
}) {
 
  const [loader, setLoader] = useState();
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [stat, setStat] = useState(item.status);
  const [modalVisible, setModalVisible] = useState(false);
  const[status1,setStatus1] = useState()

  const _getjobStatus = (id,status1) => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
    );
  
// console.log(`${baseUrl}/employer/job/${item.id}/status/${id}`,item)
    fetch(`${baseUrl}/employer/job/${item.id}/status/${id}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result.jobs);

        if (result.success === true) {
      
           setStat(status1)
           console.log(status1)
        }
        else{

          Toast.show({
            type: 'error',
            text1: message,
          });
        }
      })
      .catch(error => {
        console.log('error', error);
       alert('Error')
      })
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    // _getjobStatus();
  }, [loader]);

  return isempty === true ? (
    <View
      style={{
        height: heightPercentageToDP(14),
        backgroundColor: colors.tileColor[0],
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{width: RFPercentage(6), height: RFPercentage(6)}}
        source={require('../assets/images/empty/empty.png')}
      />
      <JText style={{marginTop: RFPercentage(1)}}>{store.lang.not_found}</JText>
    </View>
  ) : (
    <Observer>
      {() => (
        <JRow
          disabled={false}
          onPress={onPress}
          style={[
            {
              height: heightPercentageToDP(14),
              backgroundColor: colors.tileColor[0],

              marginBottom: RFPercentage(1),
            },
            containerStyle,
          ]}>
          {image && (
            <View
              style={{
                width: '28%',
                justifyContent: 'center',
                paddingHorizontal:
                  store.lang.id == 0 ? RFPercentage(1) : RFPercentage(0),
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('JobDetails', {id: item.job_id})
                }
                style={{
                  height: RFPercentage(12),
                  width: RFPercentage(12),
                  borderWidth: RFPercentage(0.1),
                  borderColor: colors.inputBorder[0],
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: RFPercentage(10),
                    width: RFPercentage(10),
                  }}
                  resizeMode="contain"
                  source={{uri: item.company_url}}
                />
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{
              width: image ? '72%' : '100%',
              justifyContent: 'center',
              paddingHorizontal: RFPercentage(1),
            }}>
            <JText fontWeight="bold">{item?.job_title}</JText>
            <JRow
              style={{
                marginTop: RFPercentage(0.5),
              }}>
              <JText fontColor={colors.danger[0]}>{store.lang.expire_on}</JText>
              <JText>
                {/* 12 MAR 2023 */}
                {moment(item.expire_on, 'DD-MM-YYYY').format('DD MMM,YYYY')}
              </JText>
            </JRow>
            <JRow
              style={{
                justifyContent: 'space-between',
                marginTop: RFPercentage(0.5),
              }}>
              <JRow
                disabled={false}
                onPress={() =>
                  navigation.navigate('JobApplication', {id: item.id})
                }>
                <EvilIcons name="user" size={RFPercentage(3)} />
                <JText>
                  {item ? item.applicant : 2} {store.lang.applicant}
                </JText>
              </JRow>
 {/* {respponce.condition === close ? ( */}
              {stat === store.lang.closed ? (
                <JRow
                  style={{
                    backgroundColor: colors.danger[0],
                    paddingVertical: RFPercentage(0.5),
                    paddingHorizontal: RFPercentage(0.8),
                  }}>
                  <JText
                    style={{
                      marginRight: RFPercentage(0.5),
                      color: colors.white[0],
                    }}
                    fontWeight="bold">
                    {store.lang.closed}
                  </JText>
                </JRow>
              
              ) : stat === store.lang.live ? (
                <Menu>
                  <MenuTrigger>
                    <JRow
                      style={{
                        backgroundColor: colors.green[0],
                        paddingVertical: RFPercentage(0.5),
                        paddingHorizontal: RFPercentage(0.8),
                        shadowColor: '#000000',
                        shadowOpacity: 0.4,
                        shadowRadius: 2,
                        shadowOffset: {
                          height: 1,
                          width: 1,
                        },
                        elevation: 4,
                      }}>
                      <JText
                        style={{
                          marginRight: RFPercentage(0.5),
                          color: colors.white[0],
                        }}
                        fontWeight="bold">
                       {store.lang.live }
                      </JText>
                      <Entypo
                        name="chevron-small-down"
                        color={colors.white[0]}
                        size={RFPercentage(2)}
                      />
                    </JRow>
                  </MenuTrigger>

                  <MenuOptions style={{paddingVertical: RFPercentage(0.5)}}>
                    {[{name:store.lang.paused,}, {name:store.lang.closed,},].map(
                      (item, index) => (
                        <MenuOption
                          style={{
                            marginLeft: RFPercentage(1),
                          }}
                          key={index}
                          onSelect={() => {
                           setStatus1(item.name)
                           setModalVisible(true);
                          }}>
                          <JRow>
                            <JText
                              style={{marginLeft: RFPercentage(2)}}
                              fontSize={RFPercentage(2)}>
                              {item.name}
                            </JText>
                          </JRow>
                        </MenuOption>
                      ),
                    )}
                  </MenuOptions>
                </Menu>
              ) : stat === store.lang.paused? (
                <Menu>
                  <MenuTrigger>
                    <JRow
                      style={{
                        backgroundColor: colors.purple[0],
                        paddingVertical: RFPercentage(0.5),
                        paddingHorizontal: RFPercentage(0.8),
                        shadowColor: '#000000',
                        shadowOpacity: 0.4,
                        shadowRadius: 2,
                        shadowOffset: {
                          height: 1,
                          width: 1,
                        },
                        elevation: 4,
                      }}>
                      <JText
                        style={{
                          marginRight: RFPercentage(0.5),
                          color: colors.white[0],
                        }}
                        fontWeight="bold">
                        {store.lang.paused}
                      </JText>
                      <Entypo
                        name="chevron-small-down"
                        color={colors.white[0]}
                        size={RFPercentage(2)}
                      />
                    </JRow>
                  </MenuTrigger>

                  <MenuOptions style={{paddingVertical: RFPercentage(0.5)}}>
                    {[
                      {name:store.lang.live,}, {name:store.lang.closed,}].map((item, index) => (
                      <MenuOption
                        style={{
                          marginLeft: RFPercentage(1),
                        }}
                        key={index}
                        onSelect={() => {
                          setStatus1(item.name); 
                          setModalVisible(true);
                         
                        }}>
                        <JRow>
                          <JText
                            style={{marginLeft: RFPercentage(2)}}
                            fontSize={RFPercentage(2)}>
                            {item.name}
                          </JText>
                        </JRow>
                      </MenuOption>
                    ))}
                  </MenuOptions>
                </Menu>
              )
              :
              (
                <JRow
                  style={{
                    backgroundColor: colors.drafted[0],
                    paddingVertical: RFPercentage(0.5),
                    paddingHorizontal: RFPercentage(0.8),
                  }}>
                  <JText
                    style={{
                      marginRight: RFPercentage(0.5),
                      color: colors.white[0],
                    }}
                    fontWeight="bold">
                    {store.lang.drafted}
                  </JText>
                </JRow>
              )}
            </JRow>

            {loader ? (
              <ActivityIndicator
                style={{
                  fontSize: RFPercentage(3),
                  position: 'absolute',
                  padding: RFPercentage(0.4),
                  top: 0,
                  right: 0,
                }}
                color={colors.purple[0]}
              />
            ) : (
              <MaterialCommunityIcons
                onPress={() => {
                  _saveToFavoriteList(store, setLoader, jobId);
                }}
                style={{
                  position: 'absolute',
                  padding: RFPercentage(0.4),
                  top: 0,
                  right: store.lang.id == 0 ? 0 : null,
                  marginHorizontal: option === true ? RFPercentage(3) : null,
                }}
                name={
                  favouriteData.some(item => item.job_id === jobId)
                    ? 'star'
                    : 'star-outline'
                }
                size={RFPercentage(3)}
                color={colors.purple[0]}
              />
            )}
            {option === true && (
              <Menu
                style={{
                  position: 'absolute',
                  right: store.lang.id == 0 ? 0 : null,
                  top: 0,
                }}>
                <MenuTrigger
                  style={{
                    width: RFPercentage(3),
                    height: RFPercentage(4),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <JIcon icon={'sm'} name={'options-vertical'} size={20} />
                </MenuTrigger>

                <MenuOptions>
                  <MenuOption onSelect={onSelect}>
                    <JRow>
                      <JIcon icon="io" name={'eye-outline'} />
                      <JText style={styles.menutxt}> Preview </JText>
                    </JRow>
                  </MenuOption>
                  <MenuOption onSelect={onSelect}>
                    <JRow>
                      <JIcon icon="io" name={'share-social-outline'} />
                      <JText style={styles.menutxt}> Share</JText>
                    </JRow>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            )}
          </View>
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <SafeAreaView style={styles.container}>
              <View style={styles.modal}>
                <JText style={styles.header}>Attention!</JText>
                <JText style={styles.msg}>
                  Are you sure want to change the status?
                </JText>
                <JRow style={{justifyContent: 'space-between'}}>
                  <JButton
                    onPress={() => setModalVisible(false)}
                    style={{
                      backgroundColor: '#E5E5E5',
                      width: '50%',
                      borderWidth: RFPercentage(0),
                    }}
                    children={'No'}
                  />
                  <JButton
                    onPress={() => {
                    
                     {
                      status1 === store.lang.drafted
                         ? _getjobStatus(0,'Drafted')
                         : status1 === store.lang.live
                         ? _getjobStatus(1,'Live')
                         : status1 === store.lang.closed
                         ? _getjobStatus(2,'Closed')
                         : _getjobStatus(3,'Paused');
                     }
                     
                    setModalVisible(!modalVisible);
                    }}
                    style={{width: '50%'}}
                    children={'Yes'}
                  />
                </JRow>
              </View>
            </SafeAreaView>
          </Modal>
        </JRow>
      )}
    </Observer>
  );
}
export default JRecentJobTile;
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  modal: {
    height: RFPercentage(25),
    width: '80%',
    backgroundColor: '#ffff',
    alignItems: 'center',
    padding: RFPercentage(2),
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  menutxt: {
    fontSize: RFPercentage(2),
    marginVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },
});

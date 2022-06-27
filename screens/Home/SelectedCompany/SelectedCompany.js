import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import JScreen from '../../../customComponents/JScreen';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useState} from 'react';
import axios from 'axios';
import url from '../../../config/url';
import Toast from 'react-native-toast-message';
import JGradientView from '../../../customComponents/JGradientView';
import JText from '../../../customComponents/JText';
import JButton from '../../../customComponents/JButton';
import JScrollView from '../../../customComponents/JScrollView';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../../config/colors';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import CLSelectedJob from '../../../loaders/Candidate/SelectedJob/CLSelectedJob';
import JTagText from '../../../customComponents/JTagText';
import JJobTile from '../../../customComponents/JJobTile';
import JEmpty from '../../../customComponents/JEmpty';
export default function SelectedJob({route, navigation}) {
  const [companyData, setCompanyData] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState();
  const [id, setId] = useState(route.params.id);
  const refRBSheet = useRef();
  const simpleText = RFPercentage(2);
  const headingWeight = {
    weight: 'bold',
    size: RFPercentage(3),
  };

  const _getDetail = () => {
    console.log(id);
    var config = {
      method: 'get',
      url: `${url.baseUrl}/company-details/${id}`,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setCompanyData(response.data);
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
        setError(true);

        Toast.show({
          type: 'error',
          text1: 'Error while getting Data',
        });
        setLoader(false);
      });
  };
  useEffect(() => {
    _getDetail();

    return () => {};
  }, []);

  return loader ? (
    <CLSelectedJob />
  ) : (
    <JScreen isError={error} onTryAgainPress={() => _getDetail()}>
      <JGradientView
        containerStyle={{
          height: heightPercentageToDP(25),
          paddingHorizontal: RFPercentage(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: RFPercentage(1.5),
          }}>
          <Feather
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={RFPercentage(3.5)}
            color={colors.white[0]}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome
              style={{marginRight: RFPercentage(2)}}
              onPress={() => alert('Star')}
              name="star-o"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />

            <Menu>
              <MenuTrigger>
                <Entypo
                  name="dots-three-vertical"
                  size={RFPercentage(3.5)}
                  color={colors.white[0]}
                />
              </MenuTrigger>

              <MenuOptions>
                {['Share Job', 'Email To Friend', 'Report Abuse'].map(
                  (item, index) => (
                    <MenuOption
                      style={{
                        marginLeft: RFPercentage(1),
                        paddingVertical: RFPercentage(1.5),
                      }}
                      key={index}
                      onSelect={() => {
                        refRBSheet.current.open();
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {index === 0 ? (
                          <AntDesign
                            size={RFPercentage(3)}
                            color={colors.black[0]}
                            name="sharealt"
                          />
                        ) : index === 1 ? (
                          <AntDesign
                            size={RFPercentage(3)}
                            color={colors.black[0]}
                            name="mail"
                          />
                        ) : (
                          <Feather
                            size={RFPercentage(3)}
                            color={colors.black[0]}
                            name="flag"
                          />
                        )}
                        <JText fontSize={RFPercentage(2)}>
                          {'   '}
                          {item}
                        </JText>
                      </View>
                    </MenuOption>
                  ),
                )}
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
            }}>
            <Image
              style={{
                height: RFPercentage(4),
                width: RFPercentage(4),
                marginRight: RFPercentage(1),
              }}
              source={{uri: companyData.company.company_url}}
            />
            <JText
              fontWeight={headingWeight.weight}
              fontSize={headingWeight.size}
              fontColor={colors.white[0]}>
              {companyData.company.ceo}
            </JText>
          </View>
          <TouchableOpacity
            onPress={() => alert('Follow')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: RFPercentage(4),
              paddingVertical: RFPercentage(1),
              backgroundColor: 'rgba(149, 145, 145, 0.35)',
            }}>
            <JText fontColor={colors.white[0]} fontSize={simpleText}>
              Follow
            </JText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
            marginTop: RFPercentage(1),
          }}>
          <AntDesign
            style={{marginRight: RFPercentage(0.5)}}
            size={RFPercentage(3)}
            color={colors.white[0]}
            name="mail"
          />
          <JText fontColor={colors.white[0]} fontSize={simpleText}>
            {companyData.company.user.email}
          </JText>
        </View>

        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
            marginTop: RFPercentage(1),
          }}>
          <Ionicons
            style={{marginRight: RFPercentage(0.5)}}
            size={RFPercentage(3)}
            color={colors.white[0]}
            name="location-outline"
          />
          <JText
            style={styles.gradient_headings}
            fontColor={colors.white[0]}
            fontSize={simpleText}>
            {companyData.company.location}
          </JText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: RFPercentage(1),
          }}>
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <AntDesign
                style={{marginRight: RFPercentage(0.5)}}
                size={RFPercentage(3)}
                color={colors.white[0]}
                name="phone"
              />
              <JText fontColor={colors.white[0]} fontSize={simpleText}>
                {companyData.company.user.phone
                  ? companyData.company.user.phone
                  : 'N/A'}
              </JText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
            }}>
            <FontAwesome
              style={{marginRight: RFPercentage(0.5)}}
              size={RFPercentage(3)}
              color={colors.white[0]}
              name="globe"
            />
            <JText
              //   onPress={() =>
              //     Linking.openURL(companyData.company.website)
              //   }
              fontColor={colors.white[0]}
              fontSize={simpleText}>
              {companyData.company.website}
            </JText>
          </View>
        </View>
      </JGradientView>
      <JScrollView style={{paddingHorizontal: RFPercentage(3)}} enable={false}>
        <JText
          style={{marginTop: RFPercentage(1.5)}}
          fontSize={headingWeight.size}>
          About :
        </JText>
        {companyData.company.details ? (
          <JTagText fontSize={simpleText}>
            {companyData.company.details}
          </JTagText>
        ) : (
          <JText fontAlign="center" fontSize={simpleText}>
            N/A
          </JText>
        )}

        <JText
          style={{marginTop: RFPercentage(1.5)}}
          fontSize={headingWeight.size}>
          Recent Job Openings :
        </JText>
        {companyData.data.jobDetails.length > 0 ? (
          companyData.data.jobDetails.map((item, index) => (
            <React.Fragment key={index}>
              <JJobTile
                onPress={() =>
                  navigation.navigate('CSelectedJob', {
                    id: item.job_id,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                type="job"
                title={item.job_title}
                location={item.city_name}
                category={item.job_category.name}
                img={item.company.company_url}
                containerStyle={{marginVertical: RFPercentage(1)}}
              />
            </React.Fragment>
          ))
        ) : (
          <JEmpty />
        )}
      </JScrollView>

      <JButton
        onPress={() => alert('Visit')}
        style={{
          width: '60%',
          height: heightPercentageToDP(5),
          marginBottom: RFPercentage(2),
        }}
        children={'Visit'}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={150}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: colors.black[0],
          },
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',

            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {['pinterest', 'google', 'facebook', 'linkedin', 'twitter'].map(
            (item, index) => (
              <View style={{alignItems: 'center'}} key={index}>
                <FontAwesome
                  onPress={() => alert(item)}
                  name={item}
                  size={RFPercentage(3.5)}
                  color={colors.purple[0]}
                />
                <JText
                  fontWeight="600"
                  style={{
                    marginTop: RFPercentage(1),
                    textTransform: 'capitalize',
                  }}>
                  {item}
                </JText>
              </View>
            ),
          )}
        </View>
      </RBSheet>
    </JScreen>
  );
}

const styles = StyleSheet.create({
  jobDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFPercentage(0.7),
  },
  jobDetails_heading: {
    width: '50%',
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
  },
  jobDetails_text: {width: '50%'},
  gradient_headings: {
    textTransform: 'capitalize',
  },
});

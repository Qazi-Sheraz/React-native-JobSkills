import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import JScreen from '../../../customComponents/JScreen';

import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useState} from 'react';

import url from '../../../config/url';
import Toast from 'react-native-toast-message';
import JGradientView from '../../../customComponents/JGradientView';
import JText from '../../../customComponents/JText';
import JButton from '../../../customComponents/JButton';
import JScrollView from '../../../customComponents/JScrollView';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../../config/colors';
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
import {StoreContext} from '../../../mobx/store';
import {observer} from 'mobx-react';
import {_saveToFollowing} from '../../../functions/Candidate/DFollowing';
import JRow from '../../../customComponents/JRow';
import JChevronIcon from '../../../customComponents/JChevronIcon';

function SelectedJob({route, navigation}) {
  const [companyData, setCompanyData] = useState({});
  const [loader, setLoader] = useState(true);
  const [apiLoader, setApiLoader] = useState(false);
  const [error, setError] = useState();
  const store = useContext(StoreContext);

  const refRBSheet = useRef();
  const simpleText = RFPercentage(2);
  const headingWeight = {
    weight: 'bold',
    size: RFPercentage(3),
  };

  const _getDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${url.baseUrl}/company-details/${route.params.id}`, requestOptions)
      .then(response => response.json())
      .then(function (response) {
        // console.log('Selected Company', response);
        setCompanyData(response);
        setLoader(false);
      })
      .catch(function (error) {
        // console.log(error);
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
        <JRow
          style={{
            justifyContent: 'space-between',
            paddingVertical: RFPercentage(1.5),
          }}>
          <JChevronIcon />
          <JRow>
            <Menu>
              <MenuTrigger>
                <Entypo
                  name="dots-three-vertical"
                  size={RFPercentage(2.8)}
                  color={colors.white[0]}
                />
              </MenuTrigger>

              <MenuOptions>
                {[store.lang.share_company, store.lang.report_to_company].map(
                  (item, index) => (
                    <MenuOption
                      style={{
                        marginHorizontal: RFPercentage(1),
                        paddingVertical: RFPercentage(1.3),
                      }}
                      key={index}
                      onSelect={() => {
                        refRBSheet.current.open();
                      }}>
                      <JRow>
                        {index === 0 ? (
                          <AntDesign
                            size={RFPercentage(2.8)}
                            color={colors.black[0]}
                            name="sharealt"
                          />
                        ) : (
                          <Feather
                            size={RFPercentage(2.8)}
                            color={colors.black[0]}
                            name="flag"
                          />
                        )}
                        <JText
                          fontSize={RFPercentage(2)}
                          style={{marginHorizontal: RFPercentage(1)}}>
                          {item}
                        </JText>
                      </JRow>
                    </MenuOption>
                  ),
                )}
              </MenuOptions>
            </Menu>
          </JRow>
        </JRow>
        <JRow
          style={{
            justifyContent: 'space-between',
          }}>
          <JRow>
            <Image
              style={{
                height: RFPercentage(4),
                width: RFPercentage(4),
                marginHorizontal: RFPercentage(1),
              }}
              source={{uri: companyData.company.company_url}}
            />
            <JText
              fontWeight={headingWeight.weight}
              fontSize={headingWeight.size}
              fontColor={colors.white[0]}>
              {companyData.company?.company_name}
            </JText>
          </JRow>
          {apiLoader ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: RFPercentage(4),
                paddingVertical: RFPercentage(1),
                backgroundColor: 'rgba(149, 145, 145, 0.35)',
              }}>
              <JText fontColor={colors.white[0]} fontSize={simpleText}>
                {store.lang.loading}
              </JText>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                _saveToFollowing(store, setApiLoader, companyData.company.id)
              }
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: RFPercentage(4),
                paddingVertical: RFPercentage(1),
                backgroundColor: 'rgba(149, 145, 145, 0.35)',
              }}>
              <JText fontColor={colors.white[0]} fontSize={simpleText}>
                {store.followingList.some(
                  item => item.company_id === companyData.company.id,
                )
                  ? store.lang.followed
                  : store.lang.follow}
              </JText>
            </TouchableOpacity>
          )}
        </JRow>
        <JRow
          style={{
            marginTop: RFPercentage(1),
          }}>
          <AntDesign
            style={{marginHorizontal: RFPercentage(0.5)}}
            size={RFPercentage(2.8)}
            color={colors.white[0]}
            name="mail"
          />
          <JText fontColor={colors.white[0]} fontSize={simpleText}>
            {companyData?.company?.user?.email}
          </JText>
        </JRow>

        <JRow
          style={{
            marginTop: RFPercentage(1),
          }}>
          <Ionicons
            style={{marginHorizontal: RFPercentage(0.5)}}
            size={RFPercentage(2.8)}
            color={colors.white[0]}
            name="location-outline"
          />
          <JText
            style={styles.gradient_headings}
            fontColor={colors.white[0]}
            fontSize={simpleText}>
            {companyData.company.location}
          </JText>
        </JRow>

        <JRow
          style={{
            justifyContent: 'space-between',
            marginVertical: RFPercentage(1),
          }}>
          <JRow>
            <JRow>
              <AntDesign
                style={{marginHorizontal: RFPercentage(0.5)}}
                size={RFPercentage(2.8)}
                color={colors.white[0]}
                name="phone"
              />
              <JText fontColor={colors.white[0]} fontSize={simpleText}>
                {companyData.company.user.phone
                  ? companyData.company.user.phone
                  : 'N/A'}
              </JText>
            </JRow>
          </JRow>
          <JRow>
            <FontAwesome
              style={{marginHorizontal: RFPercentage(0.5)}}
              size={RFPercentage(2.8)}
              color={colors.white[0]}
              name="globe"
            />
            <JText
              onPress={() => Linking.openURL(companyData?.company?.website)}
              fontColor={colors.white[0]}
              fontSize={simpleText}>
              {companyData?.company?.website}
            </JText>
          </JRow>
        </JRow>
      </JGradientView>
      <JScrollView style={{paddingHorizontal: RFPercentage(3)}} enable={false}>
        <JText
          style={{marginTop: RFPercentage(1.5)}}
          fontSize={headingWeight.size}>
          {store.lang.about} :
        </JText>
        {companyData?.company?.details ? (
          <JTagText fontSize={simpleText}>
            {companyData?.company?.details}
          </JTagText>
        ) : (
          <JText fontAlign="center" fontSize={simpleText}>
            N/A
          </JText>
        )}

        <JText
          style={{marginTop: RFPercentage(1.5)}}
          fontSize={headingWeight.size}>
          {store.lang.recent_job_openings} :
        </JText>
        {companyData?.data?.jobDetails?.length > 0 ? (
          companyData?.data?.jobDetails.map((item, index) => (
            <React.Fragment key={index}>
              <JJobTile
                favouriteData={store.favouriteList}
                jobId={item.id}
                onPress={() =>
                  navigation.navigate('JobDetails', {
                    id: item.job_id,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                type="job"
                title={item.job_title}
                location={`${
                  store.lang.id == 0
                    ? item.city?.name !== null && item.city?.name
                    : item.city?.arabic_title !== null &&
                      item.city?.arabic_title
                } ${
                  store.lang.id == 0
                  ? item.state?.name !== null && item.state?.name
                    : item.state?.arabic_title !== null &&
                      item.state?.arabic_title
                } ${
                  store.lang.id == 0
                  ? item.country?.name !== null && item.country?.name
                    : (item.country?.arabic_title !== null ?
                      item.country?.arabic_title:'N/A')
                }`}
                category={
                  store.lang.id == 0
                    ? item.job_category?.name
                    : item.job_category?.arabic_title
                }
                img={item.company?.company_url}
                containerStyle={{
                  marginVertical: RFPercentage(1),
                  marginHorizontal: RFPercentage(0),
                }}
              />
            </React.Fragment>
          ))
        ) : (
          <JEmpty />
        )}
      </JScrollView>

      <JButton
        onPress={() => Linking.openURL(companyData.company.website)}
        style={{
          width: '60%',
          height: heightPercentageToDP(5),
          marginBottom: RFPercentage(2),
        }}
        children={store.lang.visit}
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
        <JRow
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
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
        </JRow>
      </RBSheet>
    </JScreen>
  );
}

export default observer(SelectedJob);
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

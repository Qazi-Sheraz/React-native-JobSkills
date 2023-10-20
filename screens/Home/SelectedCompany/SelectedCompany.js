import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Modal,
  Share,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import JScreen from '../../../customComponents/JScreen';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import url from '../../../config/url';
import Toast from 'react-native-toast-message';
import JGradientView from '../../../customComponents/JGradientView';
import JText from '../../../customComponents/JText';
import JButton from '../../../customComponents/JButton';
import JScrollView from '../../../customComponents/JScrollView';
import { RFPercentage } from 'react-native-responsive-fontsize';
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
import { StoreContext } from '../../../mobx/store';
import { observer } from 'mobx-react';
import { _saveToFollowing } from '../../../functions/Candidate/DFollowing';
import JRow from '../../../customComponents/JRow';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import { JToast } from '../../../functions/Toast';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import { Formik } from 'formik';
import * as yup from 'yup';
import JInput from '../../../customComponents/JInput';
import { useRoute } from '@react-navigation/native';
import validUrl from 'valid-url';
function SelectedJob({ route, navigation }) {
  const{params}=useRoute();
  const [companyData, setCompanyData] = useState({});
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [heading, setHeading] = useState();
  const [error, setError] = useState();
  const store = useContext(StoreContext);
  const refRBSheet = useRef();

  const simpleText = RFPercentage(2);
  const headingWeight = {
    weight: 'bold',
    size: RFPercentage(2.5),
  };
  // console.log(route.params.id)
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

        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.error_while_getting_data,
        });
        setLoader(false);
      });
  };
  const _reportCompany = (values) => {
    var formdata = new FormData();
    formdata.append("userId", store.token?.user?.id);
    formdata.append("companyId", companyData?.company?.id);
    formdata.append("note", values.note);

    var myHeaders = new Headers();

    myHeaders.append('Authorization', `Bearer ${store?.token?.token}`);

    fetch(`${url.baseUrl}/report-to-company`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then((result) => {
        if (result.success) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          setModalVisible(false)
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.an_error_occurred_please_try_again_later,
        });
      })
      .finally(() => {
        setLoader1(false)
      });
  };


  const baseUrl = "https://dev.jobskills.digital";
const companyName = params?.c_name?encodeURIComponent(params?.c_name || ""):encodeURIComponent(companyData?.company?.user?.first_name || "");
  const shareItem = async () => {

    try {
      await Share.share({
        // title:'Company_url',
        message: `https://dev.jobskills.digital/${companyName}?id=${route.params?.id}`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  // console.log(companyData?.company_url)
  useEffect(() => {
    _getDetail();

    return () => { };
  }, []);

  return loader ? (
    <CLSelectedJob />
  ) : (
    <JScreen isError={error} onTryAgainPress={() => _getDetail()}>
      <JGradientView
        containerStyle={{
          // height: heightPercentageToDP(25),
          paddingHorizontal: RFPercentage(2),
          paddingBottom: RFPercentage(2),
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
                        item == store.lang.report_to_company ? (
                          setHeading(item), 
                          setModalVisible(true))

                          : shareItem();
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
                          style={{ marginHorizontal: RFPercentage(1) }}>
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
            width:'100%',
          }}>
          <JRow style={{width:'60%'}}>
            <Image
              style={{
                height: RFPercentage(3),
                width: RFPercentage(3),
                marginHorizontal: RFPercentage(0.2),
              }}
              source={{ uri: companyData?.company?.company_url }}
            />
            <JText
              fontWeight={headingWeight.weight}
              style={{marginHorizontal:RFPercentage(0.5)}}
              fontSize={headingWeight.size}
              fontColor={colors.white[0]}>
                
              {companyData?.company?.company_name?.length > 40 ? companyData?.company?.company_name?.slice(0, 40) + ".... " :companyData?.company?.company_name}
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
                _saveToFollowing(store, setApiLoader, companyData?.company?.id)
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
                  item => item?.company_id === companyData?.company?.id,
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
            style={{ marginHorizontal: RFPercentage(0.5) }}
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
            style={{ marginHorizontal: RFPercentage(0.5) }}
            size={RFPercentage(2.8)}
            color={colors.white[0]}
            name="location-outline"
          />
          <JText
            style={styles.gradient_headings}
            fontColor={colors.white[0]}
            fontSize={simpleText}>
            {companyData?.company?.location?.length > 35 ? companyData?.company?.location?.slice(0, 35) + " . . . .":companyData?.company?.location }
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
                style={{ marginHorizontal: RFPercentage(0.5) }}
                size={RFPercentage(2.6)}
                color={colors.white[0]}
                name="phone"
              />
              <JText fontColor={colors.white[0]} fontSize={simpleText}>
                {companyData?.company?.user?.phone
                  ?companyData?.company?.user?.region_code + companyData?.company?.user?.phone
                  : 'N/A'}
              </JText>
            </JRow>
          </JRow>
          <JRow>
            <FontAwesome
              style={{ marginHorizontal: RFPercentage(0.5) }}
              size={RFPercentage(2.5)}
              color={colors.white[0]}
              name="globe"
            />
          
            <JText
             onPress={() => {
              const url = companyData?.company?.website;
              if (validUrl.isWebUri(url)) {
                Linking.openURL(url);
              } else {
                JToast({
                  type: 'danger',
                  text1: store.lang.the_URL_is_not_valid,
                });
              }
            }}
              fontColor={colors.white[0]}
              fontSize={simpleText}>
              {companyData?.company?.website?.length > 20 ? companyData?.company?.website?.slice(0, 20) + " . . .":companyData?.company?.website }
            </JText>
          </JRow>
        </JRow>
      </JGradientView>
      <JScrollView style={{ paddingHorizontal: RFPercentage(3) }} enable={false}>
        <JText
          style={{ marginTop: RFPercentage(1.5) }}
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
          style={{ marginTop: RFPercentage(1.5) }}
          fontSize={headingWeight.size}>
          {store.lang.recent_job_openings} :
        </JText>
        {companyData?.data?.jobDetails?.length > 0 ? (
          companyData?.data?.jobDetails.map((item, index) => (
            <React.Fragment key={index}>
              <JJobTile
                favouriteData={store.favouriteList}
                jobId={item?.id}
                onPress={() =>
                  navigation.navigate('CJobDetails', {
                    id: item?.job_id,
                  })
                }
                onIconPress={() => alert('Icon Press')}
                type="job"
                title={item?.job_title}
                location={`${store.lang.id == 0
                  ? item.city?.name !== null && item.city?.name
                  : item.city?.arabic_title !== null &&
                  item.city?.arabic_title
                  } ${store.lang.id == 0
                    ? item.state?.name !== null && item.state?.name
                    : item.state?.arabic_title !== null &&
                    item.state?.arabic_title
                  } ${store.lang.id == 0
                    ? item.country?.name !== null && item.country?.name
                    : (item.country?.arabic_title !== null ?
                      item.country?.arabic_title : 'N/A')
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
      onPress={() => {
        const url = companyData?.company?.website;
        if (validUrl.isWebUri(url)) {
          Linking.openURL(url);
        } else {
          JToast({
            type: 'danger',
            text1: store.lang.the_URL_is_not_valid,
          });
        }
      }}
        // onPress={() => Linking.openURL(companyData?.company?.website)}
        style={{
          width: '60%',
          height: heightPercentageToDP(5),
          marginBottom: RFPercentage(2),
        }}
        children={store.lang.visit}
      />
     
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <JGradientHeader
            center={
              <JText
                fontColor={colors.white[0]}
                fontWeight="bold"
                fontSize={RFPercentage(2.5)}>
                {heading}
              </JText>
            }
          />
          <Formik

            initialValues={
              {
                note: '',
              }
            }
            onSubmit={values => {
              // console.log(values.interview_type=== 'Office Base'? 0:'Zoom' && 1);
              setLoader1(true);
              _reportCompany(values);
              setLoader1(false);
            }}
            validationSchema={yup.object().shape({ note: yup.string().required(store.lang.Note_is_required).label(store.lang.Note), }
            )}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
              setFieldValue,
            }) => (
              <View
                style={styles.modalView1}>

                <JInput
                  containerStyle={{ marginVertical: RFPercentage(2) }}
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  isRequired
                  heading={store.lang.add_note}
                  value={values.note}
                  error={touched.note && errors.note && true}
                  multiline={true}
                  onChangeText={handleChange('note')}
                  onBlur={() => setFieldTouched('note')}
                />
                <JRow
                  style={{
                    justifyContent: 'flex-end',
                    marginTop: RFPercentage(5),
                  }}>
                  <JButton
                    onPress={() => { setLoader1(false); setModalVisible(false) }}
                    style={{
                      marginHorizontal: RFPercentage(2),
                      backgroundColor: '#fff',
                      borderColor: '#000040',
                    }}>
                    {store.lang.close}
                  </JButton>
                  <JButton
                    disabled={loader1 ? true : false}
                    isValid={isValid}
                    onPress={() => handleSubmit()}>

                    {loader1 ? store.lang.loading : store.lang.report}

                  </JButton>
                </JRow>
              </View>
            )}
          </Formik>
          {/* <Pressable style={{height:'15%',width:'100%'}} onPress={()=> setModalVisible(!modalVisible)}/> */}
        </View>
      </Modal>
      {/* <RBSheet
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
              <View style={{ alignItems: 'center' }} key={index}>
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
      </RBSheet> */}
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
  jobDetails_text: { width: '50%' },
  gradient_headings: {
    textTransform: 'capitalize',
  },
  centeredView: {
    flex: 1, backgroundColor: '#00000090',
  },
  modalView1: {
    padding: RFPercentage(2),
    justifyContent: 'space-between',
    backgroundColor: colors.white[0],
    borderBottomLeftRadius: RFPercentage(2),
    borderBottomRightRadius: RFPercentage(2),
    width: '100%',
    // height:'60%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

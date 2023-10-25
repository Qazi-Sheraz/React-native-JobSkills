import {
  Modal,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  Image,
  StatusBar,
} from 'react-native';
import React, { useEffect, useContext, useRef, useCallback, useState } from 'react';
import JScreen from '../../customComponents/JScreen';
import moment from 'moment';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { StoreContext } from '../../mobx/store';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import JRow from '../../customComponents/JRow';
import DEVOTEAM from '../../assets/svg/Icon/DEVOTEAM.svg';
import Placeholder from '../../assets/svg/Icon/Placeholder.svg';
import Calendar from '../../assets/svg/Icon/Calendar.svg';
import JScrollView from '../../customComponents/JScrollView';
import Entypo from 'react-native-vector-icons/Entypo';
import JButton from '../../customComponents/JButton';
import JInput from '../../customComponents/JInput';
import Pdf from 'react-native-pdf';
import { Formik } from 'formik';
import * as yup from 'yup';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import JChevronIcon from '../../customComponents/JChevronIcon';
import { observer } from 'mobx-react';
import JErrorText from '../../customComponents/JErrorText';
import url from '../../config/url';
import JIcon from '../../customComponents/JIcon';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import JGradientView from '../../customComponents/JGradientView';
import { _saveToFavoriteList } from '../../functions/Candidate/BottomTab';
import RBSheet from 'react-native-raw-bottom-sheet';
import JApplyJob from '../../customComponents/JApplyJob';
import { JToast } from '../../functions/Toast';
import { Share } from 'react-native';
import CLSelectedJob from '../../loaders/Candidate/SelectedJob/CLSelectedJob';


const JobDetails = ({ route }) => {
  const store = useContext(StoreContext);
  const phoneInput = useRef(null);
  const navigation = useNavigation();
  const _selectOneFile = async setFieldValue => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],

        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });


      // console.log(size)
      //Printing the log realted to the file
      // console.log('URI : ' + res[0].uri);
      // console.log('Type : ' + res[0].type);
      // console.log('File Name : ' + res[0].name);
      // console.log('File Size : ' + res[0].size);
      //Setting the state to show single file attributes
      setFieldValue('resume', res[0]);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection

        JToast({
          type: 'error',
          text2: store.lang.canceled_from_single_doc_picker,
        });
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }

  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [heading, setHeading] = useState();
  const [jobCount, setJobCount] = useState();
  const [jobUrl, setJobUrl] = useState();
  const [error, setError] = useState(false);
  const [status, setStatus] = useState({});
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const refRBSheet = useRef();

  const _addCandidate = (values) => {
    setLoader1(true)
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );

    var formdata = new FormData();
    formdata.append('first_name', values?.firstName);
    formdata.append('last_name', values?.lastName);
    formdata.append('email', values?.email);
    formdata.append('phone', phone);
    formdata.append('region_code', code ? code : '966');
    formdata.append('file',
      {
        uri: values.resume?.uri,
        name: values.resume?.name,
        filename: values.resume?.name,
        type: values.resume?.type,
      },
      // values?.resume?.uri,
    );
    formdata.append('no_preference', '1');
    formdata.append('jobid', JSON.stringify(route.params.jid));
    formdata.append('is_default', '1');
    formdata.append('title', values.resume?.name);
    formdata.append('type', '1');

    // console.log('formdata', formdata)
    fetch(
      `${url.baseUrl}/employer/add-candidate`,

      {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        if (result.success == true) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          setLoader1(false)
          setModalVisible(!modalVisible)
          //  console.log(values)
        } else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
          setLoader1(false)
          setModalVisible(!modalVisible)
        }
      })
      .catch(error => {
        console.log('error===>>>>>', error);

      })
      .finally(() => {
        setLoader1(false)

      });
  };
  // console.log('id:',route.params?.id)
  const _getjobDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );

    fetch(
      store.token?.user?.owner_type.includes('Candidate')
        ? `${url.baseUrl}/job-details/${route.params?.id}`
        : `${url.baseUrl}/employer/job-details/${route.params?.id}`,

      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result.job[0]);
        store.setJobDetail(result.job[0]);
        setJobCount(result);
        setJobUrl(result.job_url)
      })
      .catch(error => {
        // console.log('error', error);
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const _report = values => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${store.token?.token}`);

    var formdata = new FormData();
    formdata.append("userId", store.token?.user?.id);
    formdata.append("jobId", store.jobDetail?.id);
    formdata.append("note", values.note);


    fetch(`${url.baseUrl}/report-job`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {

        if (result.success) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
        }

        else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      }).catch(error => { }
        // console.log('error', error)
      )
      .finally(() => {
        setLoader1(false)
        setModalVisible1(false)
      });

  };
  const _emailfriend = values => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${store.token?.token}`);

    var formdata = new FormData();
    formdata.append("user_id", store.token?.user?.id);
    formdata.append("job_id", store.jobDetail?.id);
    formdata.append("job_url", jobUrl);
    formdata.append("friend_name", values.friendName);
    formdata.append("friend_email", values.friendEmail);
    fetch(`${url.baseUrl}/email-job`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {

        if (result.success) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
        }

        else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      }).catch(error => { }
        // console.log('error', error)
      )
      .finally(() => {
        setLoader1(false)
        setModalVisible1(false)
      });

  };
  const onRefresh = useCallback(() => {
    setLoader(true);
    setTimeout(() => {
      _getjobDetail(store);
      setLoader(false);
    }, 1000);
  }, [store]);
  useEffect(() => {
    _getjobDetail();
  }, []);
  // console.log('jobUrl')
  // const id =store.jobDetail?.job_id;
  // console.log(id)
  const baseUrl = "https://dev.jobskills.digital";
  const id = route.params?.id;
  const companyNames = encodeURIComponent(store.jobDetail?.company_name || "");
  const jobTitle = encodeURIComponent(store.jobDetail?.job_title || "");
  // console.log(encodeURIComponent(store.jobDetail?.company_name || ""))
  const shareItem = async () => {
    try {
      await Share.share({
        message: `${baseUrl}/${companyNames}/job-details/${id}/${jobTitle}`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };



  const data = [
    {
      heading: `${store.lang.job_category} :`,
      name:
        store.jobDetail?.job_details?.job_category === null
          ? 'N/A'
          : store.lang.id === 0 ? store.jobDetail.job_details?.job_category : store.lang.id === 1 ? store.jobDetail.job_details?.job_category_urdu : store.jobDetail.job_details?.job_category_arabic,
    },
    {
      heading: `${store.lang.career_level} :`,
      name:
        store.jobDetail?.job_details?.career_level === null
          ? 'N/A'
          : store.lang.id === 0 ? store.jobDetail.job_details?.career_level : store.lang.id === 1 ? store.jobDetail.job_details?.career_level_urdu : store.jobDetail.job_details?.career_level_arabic,
    },
    {
      isScroll: true,
      heading: `${store.lang.job_tag} :`,
      name:

        store.jobDetail.job_details?.job_tag == null
          ? 'N/A'
          :
          store.jobDetail?.job_details?.job_tag.map(u => store.lang.id === 0 ? u.name : store.lang.id === 1 ? u.urdu_title : u.arabic_title).join(', ')


    },

    {
      heading: `${store.lang.job_Shift} :`,
      name:
        store.jobDetail?.job_details?.job_shift === null
          ? 'N/A'
          : store.lang.id === 0 ? store.jobDetail.job_details?.job_shift : store.lang.id === 1 ? store.jobDetail.job_details?.job_shift_urdu : store.jobDetail.job_details?.job_shift_arabic,
    },

    {
      heading: `${store.lang.position} :`,
      name:
        store.jobDetail?.job_details?.postion === null
          ? 'N/A'
          : store.jobDetail.job_details?.postion,
    },
    {
      heading: `${store.lang.job_Experience} :`,
      name:
        store.jobDetail?.job_details?.job_experience === null
          ? 'N/A'
          : store.jobDetail?.job_details?.job_experience,
    },
    {
      heading: `${store.lang.Salary_Period} :`,
      name:
        store.jobDetail?.job_details?.salary_period === null
          ? 'N/A'
          : store.lang.id === 0 ? store.jobDetail.job_details?.salary_period : store.lang.id === 1 ? store.jobDetail.job_details?.salary_period_urdu : store.jobDetail.job_details?.salary_period_arabic,
    },
    {
      heading: `${store.lang.Is_Freelance} :`,
      name: store.jobDetail?.job_details?.is_freelance === false ? store.lang.no : store.lang.yes,
    },
  ];
  // console.log('job details',store.token?.user?.owner_type.includes('Candidate'))
  // console.log(store.jobDetail?.company_image)
  return (
    loader ? (
      <CLSelectedJob />
    ) : (
      <JScreen
        isError={error}
        onTryAgainPress={() => _getjobDetail()}
        style={{ paddingHorizontal: RFPercentage(2) }}
        header={

          <JGradientView
            containerStyle={{
              // height: heightPercentageToDP(25),/
              paddingHorizontal: RFPercentage(2),
              paddingBottom: RFPercentage(1),
            }}>
            {/* height={heightPercentageToDP(25)}
            alignItems={store.lang.id == 0 ? 'flex-start' : 'flex-end'}
            paddingTop={RFPercentage(1)}
            left={JChevronIcon} */}
            <JRow
              style={{
                justifyContent: 'space-between',
                paddingVertical: RFPercentage(1.5),
              }}>
              <JChevronIcon />
              {store.token?.user?.owner_type.includes('Candidate') &&
                <JRow>
                  {loader1 ? (
                    <ActivityIndicator
                      size={RFPercentage(3)}
                      style={{ marginRight: RFPercentage(2) }}
                      color={colors.white[0]}
                    />
                  ) : (
                    <JIcon
                      icon={'fa'}
                      style={{ marginHorizontal: RFPercentage(2) }}
                      onPress={() =>
                        _saveToFavoriteList(store, setLoader1, store.jobDetail?.id)
                      }
                      name={
                        store.favouriteList.some(e => e.job_id === store.jobDetail?.id)
                          ? 'star'
                          : 'star-o'
                      }
                      size={RFPercentage(3)}
                      color={colors.white[0]}
                    />
                  )}

                  <Menu>
                    <MenuTrigger>
                      <JIcon
                        icon={'en'}
                        name="dots-three-vertical"
                        size={RFPercentage(2.6)}
                        color={colors.white[0]}
                      />
                    </MenuTrigger>

                    <MenuOptions>
                      {[
                        store.lang.share_job,
                        store.lang.email_to_friend,
                        store.lang.report_abuse,
                      ].map((item, index) => (
                        <MenuOption
                          style={{
                            marginHorizontal: RFPercentage(1),
                            paddingVertical: RFPercentage(1.3),
                          }}
                          key={index}
                          onSelect={() => {
                            item == store.lang.share_job ?
                              shareItem() :
                              setModalVisible1(true)
                            setHeading(item)
                          }}>
                          <JRow>
                            {index === 0 ? (
                              <JIcon
                                icon={'an'}
                                size={RFPercentage(3)}
                                color={colors.black[0]}
                                name="sharealt"
                              />
                            ) : index === 1 ? (
                              <JIcon
                                icon={'an'}
                                size={RFPercentage(3)}
                                color={colors.black[0]}
                                name="mail"
                              />
                            ) : (
                              <JIcon
                                icon={'fe'}
                                size={RFPercentage(3)}
                                color={colors.black[0]}
                                name="flag"
                              />
                            )}
                            <JText
                              style={{ marginHorizontal: RFPercentage(1) }}
                              fontSize={RFPercentage(2)}>
                              {item}
                            </JText>
                          </JRow>
                        </MenuOption>
                      ))}
                    </MenuOptions>
                  </Menu>
                </JRow>}
            </JRow>
            <View style={{ marginVertical: RFPercentage(1), width: '100%' }}>
              <JRow style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <JText style={[styles.headertxt, { width: '52%', }]}>
                  {store.jobDetail?.job_title?.length > 40 ? store.jobDetail?.job_title?.slice(0, 40) + " . . . " : store.jobDetail?.job_title}
                </JText>

                <JText style={{ fontSize: RFPercentage(1.8), color: '#ffff', }}>
                  {'\r'}
                  {store.lang.date_posted}{' '}
                  {moment(store.jobDetail.job_publish_date, 'DD-MM-YYYY',).format('DD-MM-YYYY')}
                </JText>
              </JRow>
              <JRow>

                <Image
                  style={{ height: RFPercentage(2.8), width: RFPercentage(2.8) }}
                  source={{ uri: store.jobDetail?.company_image }}
                />
                <JText style={styles.companyTxt}>{store.jobDetail?.company_name?.length > 45 ? store.jobDetail?.company_name?.slice(0, 45) + " . . . ." : store.jobDetail?.company_name}</JText>
              </JRow>
              <JRow>
                <Placeholder />
                <JText style={styles.txt}>
                  {`${store.lang.id === 0
                    ? store.jobDetail?.city_name
                    : store.lang.id === 1
                      ? store.jobDetail?.city_name_urdu
                      : store.jobDetail?.city_name_arabic}, ${store.lang.id === 0
                        ? store.jobDetail?.state_name
                        : store.lang.id === 1
                          ? store.jobDetail?.state_name_urdu
                          : store.jobDetail?.state_name_arabic}, ${store.lang.id === 0
                            ? store.jobDetail?.country_name
                            : store.lang.id === 1
                              ? store.jobDetail?.country_name_urdu
                              : store.jobDetail?.country_name_arabic}`}
                </JText>
              </JRow>
              <JRow style={{ justifyContent: 'space-between' }}>
                <JRow>
                  <Calendar />

                  <JText style={styles.txt}>
                    {store.lang.expire_on}{' '}{moment(store.jobDetail?.job_expiry_date, 'DD-MM-YYYY').format('DD-MM-YYYY')}
                  </JText>
                </JRow>
                <JText style={styles.txt}>
                  {jobCount?.jobCount} {store.lang.open_jobs}
                </JText>
              </JRow>
            </View>
          </JGradientView>

        }>

        <>

          <JScrollView style={styles.container}
            refreshing={loader} onRefresh={onRefresh}>
            {/* {store.token?.user?.owner_type.includes('Candidate')&&
            <>
             <JText
             
             style={styles.headertxt1}>
             {store.lang.about} :
           </JText>
           <JTagText
             fontAlign={store.lang.id == 0 ? 'left' : 'right'}
             style={styles.txt1}>
             {store.jobDetail?.description !== null
               ? store.jobDetail?.description
               : 'N/A'}
           </JTagText></>} */}
            <JText style={styles.headertxt1}>
              {store.lang.job_Requirement}
            </JText>
            <View style={{ marginHorizontal: RFPercentage(1.3) }}>
              <JText style={styles.headertxt2}>{store.lang.job_skills} :</JText>

              {store.jobDetail?.job_requirement?.job_skills.map(skill => (
                <JText style={styles.txt1}>
                  {store.lang.id === 0
                    ? skill.name
                    : store.lang.id === 1
                      ? skill?.urdu_title
                      : skill?.arabic_title}
                </JText>
              ))}

              <JText style={styles.headertxt2}>
                {store.lang.degree_level} :
              </JText>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={store.jobDetail?.job_requirement?.degree_level}
                  horizontal
                  renderItem={({ item }) => (
                    <JText style={styles.dg}>
                      {store.lang.id === 0
                        ? item?.name
                        : store.lang.id === 1
                          ? item?.urdu_title
                          : item?.arabic_title}
                    </JText>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  inverted={store.lang.id == 0 ? false : true} />
              </View>

              <JText style={styles.headertxt2}>
                {store.lang.assessment_Required}
              </JText>
              {store.jobDetail?.job_requirement?.assessment_required.map(
                item => (
                  <JText style={styles.txt1}>{item?.assessment_name}</JText>
                ),
              )}
            </View>
            <JText style={styles.headertxt1}>{store.lang.job_Details}</JText>
            {/* <JText style={{textAlign:'center',fontSize:RFPercentage(2),marginTop: RFPercentage(-2),marginLeft: RFPercentage(-4),}}></JText> */}

            {data?.map((item, index) =>
              item.isScroll ? (
                <JRow>
                  <JText key={index} style={styles.headertxt3}>
                    {item.heading}
                  </JText>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      width: '100%',
                      flexDirection:
                        store.lang.id === 0 ? 'row' : 'row-reverse',
                    }}>
                    <JText style={[styles.txt2, { width: '60%' }]}>
                      {item.name}
                    </JText>
                  </ScrollView>
                </JRow>
              ) : (
                <JRow>
                  <JText key={index} style={styles.headertxt3}>
                    {item.heading}
                  </JText>
                  <JText style={[styles.txt2, { width: '60%' }]}>{item.name}</JText>
                </JRow>
              ),
            )}

            <JText style={styles.headertxt1}>{store.lang.description} </JText>
            <JText style={[styles.txt2, { paddingBottom: RFPercentage(4) }]}>
              {store.jobDetail?.job_description?.description}
            </JText>
          </JScrollView>

          <>
            {/* {console.log('status',!loader&& status.message)} */}
            <View style={styles.bottomV}>
              {store.token?.user?.owner_type.includes('Candidate') === false ?
                <JButton
                  onPress={() => {
                    setModalVisible(true)
                    setCode('')
                  }}
                  fontStyle={{
                    fontSize: RFPercentage(1.9),
                    fontWeight: 'bold',
                    paddingHorizontal: RFPercentage(5),
                  }}
                  children={store.lang.add_jobseeker}
                /> :
                <>
                  {status.message == '4' ? (
                    <JRow
                      style={{
                        paddingHorizontal: RFPercentage(1),
                        paddingVertical: RFPercentage(1),
                        backgroundColor: colors.danger[0],
                        justifyContent: 'center',
                      }}>
                      <JText fontColor={colors.white[0]} fontWeight="bold">
                        {store.lang.assessment_Required}
                      </JText>
                      <JText
                        onPress={() =>
                          Linking.openURL(jobUrl)
                        }
                        style={{ marginLeft: RFPercentage(1) }}
                        fontColor={colors.primary[0]}
                        fontWeight="bold">
                        {store.lang.click_here}
                      </JText>
                    </JRow>
                  ) : status.message == '3' ? (
                    <JRow
                      style={{
                        paddingHorizontal: RFPercentage(1),
                        paddingVertical: RFPercentage(1),
                        backgroundColor: colors.danger[0],
                        justifyContent: 'center',
                      }}>
                      <JText fontColor={colors.white[0]} fontWeight="bold">
                        {store.lang.upload_your_CV}
                      </JText>
                      <JText
                        onPress={() => navigation.navigate('Resume')}
                        style={{ marginLeft: RFPercentage(1) }}
                        fontColor={colors.primary[0]}
                        fontWeight="bold">
                        {store.lang.click_here}
                      </JText>
                    </JRow>
                  ) : status.message == '2' ? (
                    <JRow
                      style={{
                        paddingHorizontal: RFPercentage(1),
                        paddingVertical: RFPercentage(1),
                        backgroundColor: colors.green[0],
                        justifyContent: 'center',
                      }}>
                      <JText fontColor={colors.white[0]} fontWeight="bold">
                        {store.lang.already_applied}
                      </JText>
                    </JRow>
                  ) :  <JApplyJob
                  status={status}
                  setStatus={setStatus}
                  id={store.jobDetail?.id}
                  token={store.token?.token}
                  jobId={store.jobDetail?.job_id}
                />}

                </>}
            </View>
            {/* <JApplyJob
              status={status}
              setStatus={setStatus}
              id={store.jobDetail?.id}
              token={store.token?.token}
              jobId={store.jobDetail?.job_id}
            /> */}
            </>

          {/* <JModal 
          modalVisible={modalVisible2}
          onPressNo={modalVisible2}
          msg={'Canceled from single doc picker'}
          btn={false} /> */}
          <Modal style={{}} animationType="fade" transparent={true} visible={modalVisible}>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                regional_code: '',
                is_default: false,
              }}

              onSubmit={values => {
                _addCandidate(values);
              }}
              validationSchema={yup.object().shape({
                resume: yup.object().shape({
                  uri: yup.string().required(store.lang.PDF),
                }),
                firstName: yup.string()
                  .transform(value => value.trim())
                  .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, store.lang.First_Name_must_contain_alphabet_character)
                  .matches(/^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/, store.lang.Symbols_are_not_allowed_in_the_First_Name)
                  .required(store.lang.First_Name_is_a_required_field).label(store.lang.first_name),
                lastName: yup.string()
                  .transform(value => value.trim())
                  .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, store.lang.Last_Name_must_contain_alphabet_character)
                  .matches(/^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/, store.lang.Symbols_are_not_allowed_in_the_Last_Name)
                  .required(store.lang.Last_Name_is_a_required_field).label(store.lang.last_name),
                email: yup
                  .string()
                  .min(0, store.lang.Email_address_cannot_be_empty)
                  .max(100, store.lang.Email_address_must_be_at_most_100_characters_long)
                  .email(store.lang.Must_be_a_valid_email)
                  .required(store.lang.Email_is_a_required_field)
                  .label(store.lang.Email),
                // phone: yup.string().max(14).required().label('Phone'),
                phone: yup.string().min(10).max(15).matches(/^\+?[0-9]\d*$/, store.lang.Phone_Number_must_be_a_digit).required().label(store.lang.phone),
              })}>

              {({
                values,
                errors,
                isValid,
                touched,
                handleSubmit,
                handleChange,
                setFieldTouched,
                setFieldValue,
              }) => (
                <JScreen style={styles.centeredView}>
          
                  <ScrollView style={styles.modalView}>
                    <JGradientHeader
                      center={
                        <JText
                          fontColor={colors.white[0]}
                          fontWeight="bold"
                          fontSize={RFPercentage(2.5)}>
                          {store.lang.add_jobseeker}
                        </JText>
                      }
                    />
                    <View style={{ padding: RFPercentage(2) }}>
                      <JInput
                        style={{
                          textAlign: store.lang.id == 0 ? 'left' : 'right',
                        }}
                        containerStyle={{ marginTop: RFPercentage(1) }}
                        isRequired
                        maxLength={100}
                        heading={store.lang.first_name}
                        value={values.firstName}
                        error={touched.firstName && errors.firstName && true}
                        onChangeText={handleChange('firstName')}
                        onBlur={() => setFieldTouched('firstName')}
                      />
                      {touched.firstName && errors.firstName && (
                        <JErrorText>{errors.firstName}</JErrorText>
                      )}
                      <JInput
                        style={{
                          textAlign: store.lang.id == 0 ? 'left' : 'right',
                        }}
                        containerStyle={{ marginTop: RFPercentage(1) }}
                        isRequired
                        maxLength={100}
                        heading={store.lang.last_name}
                        value={values.lastName}
                        error={touched.lastName && errors.lastName && true}
                        onChangeText={handleChange('lastName')}
                        onBlur={() => setFieldTouched('lastName')}
                      />
                      {touched.lastName && errors.lastName && (
                        <JErrorText>{errors.lastName}</JErrorText>
                      )}
                      <JInput
                        style={{
                          textAlign: store.lang.id == 0 ? 'left' : 'right',
                        }}
                        containerStyle={{ marginTop: RFPercentage(1) }}
                        isRequired
                        maxLength={100}
                        heading={store.lang.email}
                        value={values.email}
                        error={touched.email && errors.email && true}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                      />
                      {touched.email && errors.email && (
                        <JErrorText>{errors.email}</JErrorText>
                      )}
                      <View style={{ marginBottom: RFPercentage(2) }}>
                        <JRow
                          style={{
                            marginTop: RFPercentage(1),
                          }}>
                          <JText fontWeight="500" fontSize={RFPercentage(2.5)}>
                            {store.lang.phone_number}
                          </JText>
                        </JRow>
                        <PhoneInput
                        textInputProps={{maxLength:15}}
                          ref={phoneInput}
                          defaultValue={values.phone}
                          defaultCode={'SA'}
                          placeholder={store.lang.phone_number}
                          containerStyle={{
                            width: '100%',
                            borderBottomWidth: RFPercentage(0.1),
                          }}
                          textInputStyle={{
                            color: colors.black[0],
                            fontSize: RFPercentage(2.1),
                            marginTop: RFPercentage(0.1),
                          }}
                          textContainerStyle={{
                            paddingVertical: 5,
                            backgroundColor: 'transparent',
                          }}
                          onChangeFormattedText={(text, c) => {
                            setFieldValue('phone', text);
                            setFieldValue('regional_code', c);
                          }}
                          onChangeCountry={(e) => {
                            setCode(e.callingCode[0])
                            // setFieldValue('regional_code', e.callingCode[0]);
                          }}
                          onChangeText={(e) => {
                            // setFieldValue('phone', e);
                            setPhone(e)
                          }}
                        />

                      </View>
                      {touched.phone && errors.phone && (
                        <JErrorText>{errors.phone}</JErrorText>
                      )}
                      <JRow>
                        <JText fontSize={RFPercentage(2.5)}>
                          {store.lang.resume}
                        </JText>
                        <JText
                          fontColor={colors.danger[0]}
                          fontSize={RFPercentage(2.5)}>
                          *
                        </JText>
                      </JRow>

                      <JText
                        fontSize={RFPercentage(2)}
                        fontColor={colors.placeHolderColor[0]}
                        style={{
                          marginBottom: RFPercentage(2),
                          marginTop: RFPercentage(1),
                        }}>
                        {store.lang.sure_updated_resume}
                      </JText>
                      {values.resume?.uri ? (
                        values.resume?.size <= 1000000 ? (
                          <View style={{ alignSelf: 'center' }}>
                            <Pdf
                              trustAllCerts={false}
                              source={{ uri: values.resume?.uri }}
                              onLoadComplete={(numberOfPages, filePath) => {
                                // console.log(
                                //   `Number of pages: ${numberOfPages}`,
                                // );
                              }}
                              onPageChanged={(page, numberOfPages) => {
                                // console.log(`Current page: ${page}`);
                              }}
                              onError={error => {
                                // console.log(error);
                              }}
                              onPressLink={uri => {
                                // console.log(`Link pressed: ${uri}`);
                              }}
                              style={{
                                alignSelf: 'center',
                                width: Dimensions.get('window').width / 3,
                                height: Dimensions.get('window').height / 3,
                              }}
                            />
                            <Entypo
                              onPress={() => _selectOneFile(setFieldValue)}
                              name="circle-with-cross"
                              size={RFPercentage(3.5)}
                              color={colors.danger[0]}
                              style={{
                                position: 'absolute',
                                zIndex: 1,
                                right: RFPercentage(-2),
                                top: RFPercentage(-1),
                              }}
                            />
                          </View>
                        ) : (
                          <>
                            <JText style={{ marginVertical: RFPercentage(1), color: 'red' }}>
                              {store.lang.file_size_exceeds_MB_limit}
                            </JText>
                            <JRow
                              style={{
                                justifyContent: 'center',
                                marginHorizontal: RFPercentage(3),
                                borderColor: colors.primary[1],
                              }}>
                              <JButton
                                onPress={() => _selectOneFile(setFieldValue)}
                                style={{
                              
                                  backgroundColor: colors.white[0],
                                  borderColor: colors.black[1],
                                }}
                                children={store.lang.upload_resume}
                              />
                            </JRow>
                          </>
                        )
                      ) : (
                        <JRow
                          style={{
                            justifyContent: 'center',
                            marginHorizontal: RFPercentage(3),
                            borderColor: colors.primary[1],
                          }}>
                          <JButton
                            onPress={() => _selectOneFile(setFieldValue)}
                            style={{
                             
                              backgroundColor: colors.white[0],
                              borderColor: colors.black[1],
                            }}
                            children={store.lang.upload_resume}
                          />
                        </JRow>
                      )}

                      <JRow
                        style={{
                          marginTop: RFPercentage(5),
                          justifyContent: 'center',
                          borderColor: colors.primary[1],
                        }}>
                        <JButton
                          isValid={isValid}
                          disabled={loader1 ? true : false}
                          onPress={() => {
                            if (values.resume?.size <= 1000000) {
                              handleSubmit();
                            }
                          }}
                          style={{
                            width: '46%',
                          }}
                          children={loader1 ? store.lang.loading : store.lang.add}
                        />
                      </JRow>
                    </View>
                  </ScrollView>
                  <Pressable
                    style={{ height: '15%', width: '100%' }}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </JScreen>
              )}
            </Formik>
          </Modal>
          <Modal animationType="slide" transparent={true} visible={modalVisible1}>
            <SafeAreaView style={styles.centeredView}>
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
                  heading === store.lang.email_to_friend
                    ? {
                      friendName: '', // Add additional fields for friend name and email
                      friendEmail: '',
                    }
                    : {
                      note: '',
                    }
                }
                onSubmit={values => {
                  // console.log(values.interview_type=== 'Office Base'? 0:'Zoom' && 1);
                  setLoader1(true);
                  heading === store.lang.email_to_friend
                    ? _emailfriend(values)
                    : _report(values);
                }}
                validationSchema={yup.object().shape(heading === store.lang.email_to_friend
                  ? {
                    friendName: yup.string()
                      .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'Friend Name must contain at least 1 alphabet character and can include English, Urdu, Arabic, and spaces')
                      .matches(/^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/, 'Symbols are not allowed in the Friend Name')
                      .required('Friend Name is required').label('Friend Name'),
                    friendEmail: yup.string().max(100, 'Email address must be at most 100 characters long')
                      .email('Must be a valid email').required('Friend Email is required').label('Friend Email'),
                  }
                  : { note: yup.string().required('Note is required').label('Note'), }
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
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.modalView1}>
                    {heading == store.lang.email_to_friend ?
                      (<>
                        <JText style={{ fontWeight: '500', fontSize: RFPercentage(2.5), marginVertical: RFPercentage(1), }}>{store.lang.job_URL}</JText>
                        <JText style={styles.textm}>{jobUrl}</JText>

                        <JInput
                          containerStyle={{ marginVertical: RFPercentage(2) }}
                          style={{
                            textAlign: store.lang.id == 0 ? 'left' : 'right',
                          }}
                          isRequired
                          heading={store.lang.friend_name}
                          value={values.friendName}
                          error={touched.friendName && errors.friendName && true}
                          multiline={true}
                          onChangeText={handleChange('friendName')}
                          onBlur={() => setFieldTouched('friendName')}
                        />
                        <JInput
                          containerStyle={{ marginVertical: RFPercentage(2) }}
                          style={{
                            textAlign: store.lang.id == 0 ? 'left' : 'right',
                          }}
                          isRequired
                          heading={store.lang.friend_email}
                          value={values.friendEmail}
                          error={touched.friendEmail && errors.friendEmail && true}
                          multiline={true}
                          onChangeText={handleChange('friendEmail')}
                          onBlur={() => setFieldTouched('friendEmail')}
                        />
                      </>) :
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
                      />}
                    <JRow
                      style={{
                        justifyContent: 'flex-end',
                        marginTop: RFPercentage(5),
                      }}>
                      <JButton
                        onPress={() => setModalVisible1(false)}
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

                        {loader1 ? store.lang.loading : heading == store.lang.report_abuse ? store.lang.report : store.lang.send_to_friend}

                      </JButton>
                    </JRow>
                  </ScrollView>
                )}
              </Formik>
              {/* <Pressable style={{height:'15%',width:'100%'}} onPress={()=> setModalVisible(!modalVisible)}/> */}
            </SafeAreaView>
          </Modal>

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
                  <View style={{ alignItems: 'center' }} key={index}>
                    <JIcon
                      icon={'fa'}
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
        </>

      </JScreen>)
  );
};

export default observer(JobDetails);

const styles = StyleSheet.create({
  headertxt: { fontSize: RFPercentage(2.2), fontWeight: 'bold', color: '#ffff' },
  headertxt1: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginVertical: RFPercentage(1),


  },

  headertxt2: {
    fontSize: RFPercentage(2),
    fontWeight: '700',
    marginVertical: RFPercentage(1),

  },
  headertxt3: {
    fontSize: RFPercentage(2),
    width: '40%',
    fontWeight: '800',
    marginVertical: RFPercentage(1),
  },
  companyTxt: { fontSize: RFPercentage(1.8), width: '90%', color: '#ffff', margin: RFPercentage(1) },
  txt: { fontSize: RFPercentage(1.8), color: '#ffff', margin: RFPercentage(1) },
  txt1: {
    fontSize: RFPercentage(1.9),
    fontWeight: '500',
    marginVertical: RFPercentage(0.5),
  },
  txt2: {
    fontSize: RFPercentage(1.9),
    fontWeight: '500',
  },

  container: { paddingVertical: RFPercentage(2), marginBottom: RFPercentage(1) },
  dg: {
    marginVertical: RFPercentage(2),
    marginHorizontal: RFPercentage(1),
    padding: RFPercentage(1),
    fontSize: RFPercentage(1.8),
    backgroundColor: '#F8FAFC',
    textAlign: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  bottomV: { height: RFPercentage(7), width: '100%', padding: RFPercentage(1) },
  centeredV: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalView: {
    backgroundColor: colors.white[0],
    borderRadius: RFPercentage(3),
    // paddingBottom: RFPercentage(2),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,


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
  textm: { width: '100%', backgroundColor: colors.border[0], padding: RFPercentage(0.5), textAlign: "center", fontSize: RFPercentage(1.9) },

});

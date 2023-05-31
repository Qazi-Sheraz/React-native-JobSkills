import {
  Modal,
  Alert,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect,useContext,useRef} from 'react';
import JScreen from '../../customComponents/JScreen';
import moment from 'moment';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {StoreContext} from '../../mobx/store';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import JRow from '../../customComponents/JRow';
import DEVOTEAM from '../../assets/svg/Icon/DEVOTEAM.svg';
import Placeholder from '../../assets/svg/Icon/Placeholder.svg';
import Calendar from '../../assets/svg/Icon/Calendar.svg';
import JScrollView from '../../customComponents/JScrollView';
import Entypo from 'react-native-vector-icons/Entypo';
import JButton from '../../customComponents/JButton';
import {useState} from 'react';
import JInput from '../../customComponents/JInput';
import Pdf from 'react-native-pdf';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Pressable} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {observer} from 'mobx-react';
import Toast from 'react-native-toast-message';
import JErrorText from '../../customComponents/JErrorText';
import url from '../../config/url';

const JobDetails = ({route}) => {
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
      console.log('URI : ' + res[0].uri);
      console.log('Type : ' + res[0].type);
      console.log('File Name : ' + res[0].name);
      console.log('File Size : ' + res[0].size);
      //Setting the state to show single file attributes
      setFieldValue('resume', res[0]);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
    
  };
  // console.log(route.params.jid)
  const [modalVisible, setModalVisible] = useState(false);
  const [jobDetail, setJobDetail] = useState([]);
  const [jobCount, setJobCount] = useState();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  const _addCandidate = (values) => {

    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );
  
    var formdata = new FormData();
    formdata.append('first_name', values?.firstName);
    formdata.append('last_name', values?.lastName);
    formdata.append('email', values?.email);
    formdata.append('phone',values?.phone);
    formdata.append('file',
      {
        uri: values.resume.uri,
        name: values.resume.name,
        filename: values.resume.name,
        type: values.resume.type,
      },
      // values?.resume?.uri,
    );
    formdata.append('no_preference', '1');
    formdata.append('jobid', JSON.stringify(route.params.jid));
    formdata.append('is_default', '1');
    formdata.append('title', values.resume?.name);
    formdata.append('type', '1');


console.log(formdata)
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
        console.log(result)
       
        if (result.success === true) {
          Toast.show({
            type: 'success',
            text1: result.message,
          });
          //  console.log(values)
        } else {
          Toast.show({
            type: 'error',
            text1:result.message,
           
          });
        }
      })
      .catch(error => {
        console.log('error===>>>>>', error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const _getjobDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );

    fetch(
      `${url.baseUrl}/employer/job-details/${route.params.id}`,

      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result.job[0]);
        setJobDetail(result.job[0]);
        setJobCount(result);
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
    _getjobDetail();
  }, [loader]);

  const data = [
    {
      heading: store.lang.job_category,
      name:
        jobDetail?.job_details?.job_category === null
          ? 'N/A'
          : store.lang.id===0?jobDetail.job_details?.job_category:store.lang.id===1?jobDetail.job_details?.job_category_urdu:jobDetail.job_details?.job_category_arabic,
    },
    {
      heading: store.lang.career_level,
      name:
        jobDetail?.job_details?.career_level === null
          ? 'N/A'
          :store.lang.id===0?jobDetail.job_details?.career_level:store.lang.id===1?jobDetail.job_details?.career_level_urdu:jobDetail.job_details?.career_level_arabic,
    },
    {
      isScroll:true,
      heading: store.lang.job_tag,
      name:
      
        jobDetail.job_details?.job_tag == null
          ? 'N/A'
          : 
          jobDetail?.job_details?.job_tag.map(u => store.lang.id===0?u.name: store.lang.id===1?u.urdu_title:u.arabic_title).join(', ')
           
         
    },

    {
      heading: store.lang.job_Shift,
      name:
        jobDetail?.job_details?.job_shift === null
          ? 'N/A'
          : store.lang.id===0?jobDetail.job_details?.job_shift:store.lang.id===1?jobDetail.job_details?.job_shift_urdu:jobDetail.job_details?.job_shift_arabic,
    },

    {
      heading: store.lang.position,
      name:
        jobDetail?.job_details?.postion === null
          ? 'N/A'
          : jobDetail.job_details?.postion,
    },
    {
      heading: store.lang.job_Experience,
      name:
        jobDetail?.job_details?.job_experience === null
          ? 'N/A'
          : jobDetail?.job_details?.job_experience,
    },
    {
      heading: store.lang.Salary_Period,
      name:
        jobDetail?.job_details?.salary_period === null
          ? 'N/A'
          : store.lang.id===0?jobDetail.job_details?.salary_period:store.lang.id===1?jobDetail.job_details?.salary_period_urdu:jobDetail.job_details?.salary_period_arabic,
    },
    {
      heading: store.lang.Is_Freelance,
      name: jobDetail?.job_details?.is_freelance === false ? store.lang.no : store.lang.yes,
    },
  ];
  return (
    <JScreen
      isError={error}
      onTryAgainPress={() => _getjobDetail()}
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        loader ? null : (
          <JGradientHeader
            height={heightPercentageToDP(25)}
            alignItems={store.lang.id == 0 ? 'flex-start' : 'flex-end'}
            paddingTop={RFPercentage(1)}
            left={JChevronIcon}
            children={
              <View style={{marginTop: RFPercentage(2), width: '100%'}}>
                <JRow style={{justifyContent: 'space-between'}}>
                  <JText style={styles.headertxt}>{jobDetail?.job_title}</JText>

                  <JText style={{fontSize: RFPercentage(1.8), color: '#ffff'}}>
                    {'\r'}
                    {store.lang.date_posted}
                    {moment(jobDetail.job_publish_date, 'DD,MM,YYYY').format(
                      'DD MMM,YYYY',
                    )}
                  </JText>
                </JRow>
                <JRow>
                  <DEVOTEAM />
                  <JText style={styles.txt}>{jobDetail.company_name}</JText>
                </JRow>
                <JRow>
                  <Placeholder />
                  <JText style={styles.txt}>
                    {store.lang.id === 0
                      ? jobDetail?.city_name
                      : store.lang.id === 1
                      ? jobDetail?.city_name_urdu
                      : jobDetail?.city_name_arabic}
                    ,
                    {store.lang.id === 0
                      ? jobDetail?.state_name
                      : store.lang.id === 1
                      ? jobDetail?.state_name_urdu
                      : jobDetail?.state_name_arabic}
                    {store.lang.id === 0
                      ? jobDetail?.country_name
                      : store.lang.id === 1
                      ? jobDetail?.country_name_urdu
                      : jobDetail?.country_name_arabic}
                  </JText>
                </JRow>
                <JRow style={{justifyContent: 'space-between'}}>
                  <JRow>
                    <Calendar />

                    <JText style={styles.txt}>
                      {store.lang.expire_on}{' '}
                      {moment(jobDetail?.job_expiry_date, 'DD,MM,YYYY').format(
                        'DD MMM,YYYY',
                      )}
                    </JText>
                  </JRow>
                  <JText style={styles.txt}>
                    {jobCount?.jobCount} {store.lang.open_jobs}
                  </JText>
                </JRow>
              </View>
            }
          />
        )
      }>
      {loader ? (
        <ActivityIndicator />
      ) : (
        <>
          <JScrollView style={styles.container}>
            <JText style={styles.headertxt1}>
              {store.lang.job_Requirement}
            </JText>
            <View style={{marginHorizontal: RFPercentage(1.3)}}>
              <JText style={styles.headertxt2}>{store.lang.job_skills}</JText>

              {jobDetail?.job_requirement?.job_skills.map(skill => (
                <JText style={styles.txt1}>{store.lang.id===0?skill.name:store.lang.id===1?skill.urdu_title:skill.arabic_title}</JText>
              ))}

              <JText style={styles.headertxt2}>{store.lang.degree_level}</JText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                {jobDetail?.job_requirement?.degree_level.map(level => (
                  <JRow style={{marginHorizontal: RFPercentage(1)}}>
                    <JText style={styles.dg}>{store.lang.id===0?level.name:store.lang.id===1?level.urdu_title:level.arabic_title}</JText>
                  </JRow>
                ))}
              </ScrollView>

              <JText style={styles.headertxt2}>
                {store.lang.assessment_Required}
              </JText>
              {jobDetail?.job_requirement?.assessment_required.map(item => (
                <JText style={styles.txt1}>{item.assessment_name}</JText>
              ))}
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
                    <JText style={[styles.txt2, {width: '60%'}]}>
                      {item.name}
                    </JText>
                  </ScrollView>
                </JRow>
              ) : (
                <JRow>
                  <JText key={index} style={styles.headertxt3}>
                    {item.heading}
                  </JText>
                  <JText style={styles.txt2}>{item.name}</JText>
                </JRow>
              ),
            )}

            <JText style={styles.headertxt1}>{store.lang.description} </JText>
            <JText style={[styles.txt2, {paddingBottom: RFPercentage(3)}]}>
              {jobDetail?.job_description?.description}
            </JText>
          </JScrollView>
          <View style={styles.bottomV}>
            <JButton
              onPress={() => setModalVisible(true)}
              fontStyle={{
                fontSize: RFPercentage(1.9),
                fontWeight: 'bold',
                paddingHorizontal: RFPercentage(5),
              }}
              children={store.lang.add_candidate}
            />
          </View>

          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                is_default: false,
              }}
              onSubmit={values => {
                // console.log(values);

                _addCandidate(values);
                setModalVisible(!modalVisible);
              }}
              validationSchema={yup.object().shape({
                resume: yup.object().shape({
                  uri: yup.string().required('PDF'),
                }),
                firstName: yup.string().required().label('First Name'),
                lastName: yup.string().required().label('Last Name'),
                email: yup
                  .string()
                  .min(0, 'Email address cannot be empty')
                  .email('Must be a valid email')
                  .required()
                  .label('Email'),
                phone: yup.string().max(14).required().label('Phone'),
              })}>
              {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                setFieldTouched,
                setFieldValue,
              }) => (
                <SafeAreaView style={styles.centeredView}>
                  <ScrollView style={styles.modalView}>
                    <JGradientHeader
                      center={
                        <JText
                          fontColor={colors.white[0]}
                          fontWeight="bold"
                          fontSize={RFPercentage(2.5)}>
                          {store.lang.add_candidate}
                        </JText>
                      }
                    />
                    {/* {console.log(route.params.jid)} */}
                    <View style={{padding: RFPercentage(2)}}>
                      <JInput
                      style={{
                        textAlign: store.lang.id == 0 ? 'left' : 'right',
                      }}
                        containerStyle={{marginTop: RFPercentage(1)}}
                        isRequired
                        heading={store.lang.first_name}
                        value={values.firstName}
                        error={touched.firstName && errors.firstName && true}
                        onChangeText={handleChange('firstName')}
                        onBlur={() => setFieldTouched('firstName')}
                      />
                      <JInput
                      style={{
                        textAlign: store.lang.id == 0 ? 'left' : 'right',
                      }}
                        containerStyle={{marginTop: RFPercentage(1)}}
                        isRequired
                        heading={store.lang.last_name}
                        value={values.lastName}
                        error={touched.lastName && errors.lastName && true}
                        onChangeText={handleChange('lastName')}
                        onBlur={() => setFieldTouched('lastName')}
                      />
                      <JInput
                      style={{
                        textAlign: store.lang.id == 0 ? 'left' : 'right',
                      }}
                        containerStyle={{marginTop: RFPercentage(1)}}
                        isRequired
                        heading={store.lang.email}
                        value={values.email}
                        error={touched.email && errors.email && true}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                      />

                      <View style={{marginBottom: RFPercentage(2)}}>
                        <JRow
                          style={{
                            marginTop: RFPercentage(1),
                          }}>
                          <JText fontWeight="500" fontSize={RFPercentage(2.5)}>
                            {store.lang.phone}
                          </JText>
                        </JRow>
                        <PhoneInput
                          ref={phoneInput}
                          defaultValue={values.phone}
                          defaultCode="PK"
                          containerStyle={{
                            width: '100%',
                            borderBottomWidth: RFPercentage(0.1),
                            paddingVertical: 0,
                          }}
                          textContainerStyle={{
                            paddingVertical: 0,
                            backgroundColor: 'transparent',
                          }}
                          onChangeFormattedText={text => {
                            setFieldValue('phone', text);
                          }}
                        />
                        {touched.phone && errors.phone && (
                          <JErrorText>{errors.phone}</JErrorText>
                        )}
                      </View>
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
                        values.resume.size <= 2000000 ? (
                          <View style={{alignSelf: 'center'}}>
                            <Pdf
                              trustAllCerts={false}
                              source={{uri: values.resume.uri}}
                              onLoadComplete={(numberOfPages, filePath) => {
                                console.log(
                                  `Number of pages: ${numberOfPages}`,
                                );
                              }}
                              onPageChanged={(page, numberOfPages) => {
                                console.log(`Current page: ${page}`);
                              }}
                              onError={error => {
                                console.log(error);
                              }}
                              onPressLink={uri => {
                                console.log(`Link pressed: ${uri}`);
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
                            <JText style={{marginVertical: RFPercentage(1)}}>
                              File size exceeds 2 MB limit
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
                                  width: '46%',
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
                              width: '46%',
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
                          // isValid={isValid}
                          onPress={() => {
                            if (values.resume.size <= 2000000) {
                              handleSubmit();
                            } else {
                              Toast.show({
                                type: 'error',
                                text1: 'error',
                              });
                            }
                          }}
                          style={{
                            width: '46%',
                          }}
                          children={loader ? 'Loading' : store.lang.add}
                        />
                      </JRow>
                    </View>
                  </ScrollView>
                  <Pressable
                    style={{height: '15%', width: '100%'}}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </SafeAreaView>
              )}
            </Formik>
          </Modal>
        </>
      )}
    </JScreen>
  );
};

export default observer(JobDetails);

const styles = StyleSheet.create({
  headertxt: {fontSize: RFPercentage(1.9), fontWeight: 'bold', color: '#ffff'},
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
  txt: {fontSize: RFPercentage(1.8), color: '#ffff', margin: RFPercentage(1)},
  txt1: {
    fontSize: RFPercentage(1.9),
    fontWeight: '500',
    marginVertical: RFPercentage(0.5),
  },
  txt2: {
    fontSize: RFPercentage(1.9),
    fontWeight: '500',
  },

  container: {paddingVertical: RFPercentage(2)},
  dg: {
    marginVertical: RFPercentage(2),
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
  bottomV: {height: RFPercentage(9), width: '100%', padding: RFPercentage(1)},
  centeredView: {
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
});

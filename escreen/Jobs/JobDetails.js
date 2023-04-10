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
} from 'react-native';
import React, {useEffect} from 'react';
import JScreen from '../../customComponents/JScreen';
import moment from 'moment';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {StoreContext} from '../../mobx/store';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import JIcon from '../../customComponents/JIcon';
import JRow from '../../customComponents/JRow';
import DEVOTEAM from '../../assets/svg/Icon/DEVOTEAM.svg';
import Placeholder from '../../assets/svg/Icon/Placeholder.svg';
import Calendar from '../../assets/svg/Icon/Calendar.svg';
import Star from '../../assets/svg/Icon/Star.svg';
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
import {useRef} from 'react';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {useContext} from 'react';
import {observer} from 'mobx-react';
import {baseUrl} from '../../ApiUrls';

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

  const [modalVisible, setModalVisible] = useState(false);
  const [jobDetail, setJobDetail] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  const _getjobDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
    );

    fetch(
      `${baseUrl}/employer/job-details/${route.params.id}`,

      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      },
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.job);
        setJobDetail(result.job[0]);
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
          : jobDetail.job_details?.job_category,
    },
    {
      heading: store.lang.career_level,
      name:
        jobDetail?.job_details?.career_level === null
          ? 'N/A'
          : jobDetail.job_details?.career_level,
    },
    {
      heading: store.lang.job_tag,
      name:
        jobDetail.job_details?.job_tag === null
          ? 'N/A'
          : jobDetail.job_details?.job_tag,
    },
    {
      heading: store.lang.job_type,
      name:
        jobDetail?.job_details?.job_type === null
          ? 'N/A'
          : jobDetail.job_details?.job_type,
    },
    {
      heading: store.lang.job_Shift,
      name:
        jobDetail?.job_details?.job_shift === null
          ? 'N/A'
          : jobDetail.job_details?.job_shift,
    },
    {
      heading: store.lang.functional_Area,
      name:
        jobDetail?.job_details?.functional_area === null
          ? 'N/A'
          : jobDetail.job_details?.functional_area,
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
          : jobDetail?.job_details?.salary_period,
    },
    {
      heading: store.lang.Is_Freelance,
      name: jobDetail?.job_details?.is_freelance === false ? 'false' : 'true',
    },
  ];
  return (
    <JScreen
      isError={error}
      onTryAgainPress={() => _getjobDetail()}
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          height={heightPercentageToDP(25)}
          alignItems={store.lang.id == 0 ? 'flex-start' : 'flex-end'}
          paddingTop={RFPercentage(1)}
          left={JChevronIcon}
          right={<Star />}
          children={
            <View style={{marginTop: RFPercentage(2), width: '100%'}}>
              <JRow style={{justifyContent: 'space-between'}}>
                <JText style={styles.headertxt}>{jobDetail.job_title}</JText>

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
                  {jobDetail.city_name},{jobDetail.state_name}{' '}
                  {jobDetail.country_name}
                </JText>
              </JRow>
              <JRow style={{justifyContent: 'space-between'}}>
                <JRow>
                  <Calendar />

                  <JText style={styles.txt}>
                    {store.lang.expire_on}{' '}
                    {moment(jobDetail.job_expiry_date, 'DD,MM,YYYY').format(
                      'DD MMM,YYYY',
                    )}
                  </JText>
                </JRow>
                <JText style={styles.txt}>5 {store.lang.open_jobs}</JText>
              </JRow>
            </View>
          }
        />
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

              <JText style={styles.txt1}>
                {jobDetail?.job_requirement?.job_skills}
              </JText>
              <JText style={styles.headertxt2}>{store.lang.degree_level}</JText>
              <JRow>
                <JText style={styles.dg}>
                  {jobDetail?.job_requirement?.degree_level}
                </JText>
              </JRow>
              <JText style={styles.headertxt2}>
                {store.lang.assessment_Required}
              </JText>
              <JText style={styles.txt1}>
                {jobDetail?.job_requirement?.assessment_required}
              </JText>
            </View>
            <JText style={styles.headertxt1}>{store.lang.job_Details}</JText>
            {/* <JText style={{textAlign:'center',fontSize:RFPercentage(2),marginTop: RFPercentage(-2),marginLeft: RFPercentage(-4),}}></JText> */}

            {data?.map((item, index) => (
              <JRow>
                <JText key={index} style={styles.headertxt3}>
                  {item.heading}
                </JText>
                <JText style={styles.txt2}>{item.name}</JText>
              </JRow>
            ))}

            <JText style={styles.headertxt1}>{store.lang.description} </JText>
            <JText style={styles.txt2}>
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
                FirstName: '',
                LastName: '',
                Email: '',
                is_default: false,
              }}
              onSubmit={values => {
                console.log(values);

                var myHeaders = new Headers();
                myHeaders.append(
                  'Authorization',
                  `Bearer ${store.token.token}`,
                );

                //  setModalVisible(!modalVisible);
              }}
              validationSchema={yup.object().shape({
                resume: yup.object().shape({
                  uri: yup.string().required('PDF'),
                }),
                name: yup.string().required().label('Name'),
              })}>
              {({values, errors, touched, handleSubmit, setFieldValue}) => (
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

                    <View style={{padding: RFPercentage(2)}}>
                      <JInput
                        containerStyle={{marginTop: RFPercentage(1)}}
                        isRequired
                        heading={store.lang.first_name}
                        // value={values.name}
                        // error={touched.name && errors.name && true}
                        // onChangeText={handleChange('name')}
                        // onBlur={() => setFieldTouched('name')}
                      />
                      <JInput
                        containerStyle={{marginTop: RFPercentage(1)}}
                        isRequired
                        heading={store.lang.last_name}
                        // value={values.name}
                        // error={touched.name && errors.name && true}
                        // onChangeText={handleChange('name')}
                        // onBlur={() => setFieldTouched('name')}
                      />
                      <JInput
                        containerStyle={{marginTop: RFPercentage(1)}}
                        isRequired
                        heading={store.lang.email}
                        // value={values.name}
                        // error={touched.name && errors.name && true}
                        // onChangeText={handleChange('name')}
                        // onBlur={() => setFieldTouched('name')}
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
                        <View style={{alignSelf: 'center'}}>
                          <Pdf
                            trustAllCerts={false}
                            source={{uri: values.resume.uri}}
                            onLoadComplete={(numberOfPages, filePath) => {
                              console.log(`Number of pages: ${numberOfPages}`);
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
                            handleSubmit();
                          }}
                          style={{
                            width: '46%',
                          }}
                          children={store.lang.add}
                        />
                      </JRow>
                    </View>
                  </ScrollView>
                  <Pressable
                    style={{height: '20%', width: '100%'}}
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
    marginVertical: RFPercentage(1),
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

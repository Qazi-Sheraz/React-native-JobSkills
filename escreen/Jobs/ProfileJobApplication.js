import { ActivityIndicator, Image, SafeAreaView, StyleSheet, FlatList, View, Modal, Linking } from 'react-native';
import React, { useState, useRef, useContext, useEffect } from 'react';
import JScreen from '../../customComponents/JScreen';
import JHeader from '../../customComponents/JHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import JIcon from '../../customComponents/JIcon';
import JRow from '../../customComponents/JRow';
import JAssessmentResult from '../../customComponents/JAssessmentResult';
import JButton from '../../customComponents/JButton';
import JStatusbar from '../../customComponents/JStatusbar';
import JSkills from '../../customComponents/JSkills';
import RBSheet from 'react-native-raw-bottom-sheet';
import Download from '../../assets/svg/Icon/Download.svg';
import Eyes from '../../assets/svg/Icon/Eyes.svg';
import Flag from '../../assets/svg/Icon/Flag.svg';
import * as yup from 'yup';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';
import JChevronIcon from '../../customComponents/JChevronIcon';
import url from '../../config/url';
import JGradientHeader from '../../customComponents/JGradientHeader';
import { Formik } from 'formik';
import JInput from '../../customComponents/JInput';
import JApiError from '../../customComponents/JApiError';
import JNotfoundData from '../../customComponents/JNotfoundData';
import { JToast } from '../../functions/Toast';
import JScrollView from '../../customComponents/JScrollView';
import CLCandidateDetails from '../../loaders/Employer/candidateDetails/CLCandidateDetails';

const ProfileJobApplication = ({ route }) => {
  const store = useContext(StoreContext);
  const { params } = useRoute();
  console.log('params', params);

  const [details, setDetails] = useState();
  const [applicationId, setApplicationID] = useState();
  const [statusIndex, setStatusIndex] = useState();
  const [loader, setLoader] = useState(true);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [error, setError] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);



  const handleButtonPress = (button) => {
    setButtonPressed(button);
    bottomSheetRef.current.open();
  };

  const bottomSheetRef = useRef();
  const navigation = useNavigation();

  const _candidateDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );

    fetch(`${url.baseUrl}/candidate-details/${params?.candidate_id}?job_id=${params?.job_id}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setApplicationID(result?.job_application_id[0])
        setDetails(result)

      })

      .catch(error => {
        console.log('error', error);
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  // console.log('pdf======',store.pdf)
  const _reportSubmit = values => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${store.token?.token}`);

    var formdata = new FormData();
    formdata.append("userId", store.token?.user?.id);
    formdata.append("candidateId", details?.candidateDetails[0]?.id);
    formdata.append("note", values.note);
    //  console.log('formdata',formdata)


    fetch(`${url.baseUrl}/employer/report-to-candidate`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {

        if (result.success === true) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: result.message,
          });
          setLoader(false);
          setModalVisible(!modalVisible);
        }

        else {
          // console.log('error',message);
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      }).catch(error => { }
        // console.log('error', error)
      );

  };

  const _getStatusbar = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${store.token?.token}`, {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    });
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(
      `${url.baseUrl}/candidate/job-application/${params?.job_id}/status/${params.candidate_id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('jobApplicationStatus',result.jobApplicationStatus)
        setStatusIndex(result.jobApplicationStatus);
      })
      .catch(error => { })
      .finally(() => {
        setLoaderStatus(false);
      });
  };
  console.log('applicationId', applicationId)
  const _viewResum = () => {
    var myHeaders = new Headers();

    fetch(`${url.baseUrl}/employer/resume-view/${applicationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${store.token?.token}`,
        'Accept': 'application/json',
      },
      redirect: 'follow',
    })

      .then(response => response.json())
      .then(result => {
        console.log('result===>', result?.data);
        store.setPdf(result?.data);
      })

      .catch(error => {
        console.log('error===>', error);
        store.setPdfApiError(true);
      })
      .finally(() => {
        store.setPdfApiLoader(false);
      });
  };
  useEffect(() => {
    _getStatusbar()
    _candidateDetails()
    _viewResum();

  }, []);
  return (
    <>
      {loader ? (
        <CLCandidateDetails />
      ) : error == true ?
        <JApiError
          onTryAgainPress={() => {
            _candidateDetails(),
              setError(false)
          }}
        /> : (
          <View style={styles.maincontainer}>
            <JHeader
              left={<JChevronIcon color={colors.black[0]} />}
              right={
                store.pdfApiLoader ? (
                  <ActivityIndicator />
                ) : (
                  <Menu>
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
                      <MenuOption
                        onSelect={() => {
                          setModalVisible(true);
                        }}>
                        <JRow>
                          <Flag />
                          <JText style={styles.menutxt}>
                            {store.lang.report_candidate}
                          </JText>
                        </JRow>
                      </MenuOption>
                      {/* <MenuOption
                        onSelect={() => {
                          _viewResum();
                          if (store.pdf) {
                            Linking.openURL(store.pdf);
                          }
                          else {
                            JToast({
                              type: 'error',
                              text1: 'Invaild URl',
                            });
                          }
                        }}>
                        <JRow>
                          <Download />
                          <JText style={styles.menutxt}>
                            {store.lang.download_resume}
                          </JText>
                        </JRow>
                      </MenuOption> */}
                      <MenuOption
                        onSelect={() => {
                          store.setPdfApiLoader(true)
                          _viewResum()
                          navigation.navigate('ViewResume', { ...params })
                          
                        }}>
                        <JRow>
                          <Eyes />
                          <JText style={styles.menutxt}>
                            {store.lang.view_resume}
                          </JText>
                        </JRow>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                )
              }
            />

            <View style={styles.main}>
              <Image
                style={styles.img}
                source={{
                  uri: details?.candidateDetails[0]?.profile_image
                    ? details?.candidateDetails[0]?.profile_image
                    : 'N/A',
                }}
              />

              <JText style={styles.headertxt}>
                {details?.candidateDetails[0]?.full_name
                  ? details?.candidateDetails[0]?.full_name
                  : 'N/A'}
              </JText>
              {details?.lastestExperience[0].id && (
                <JText style={styles.titleJob}>
                  {details?.lastestExperience[0]?.experience_title}
                </JText>
              )}
              {details?.candidateDetails[0]?.email && (
                <JText style={styles.txt}>
                  {details?.candidateDetails[0]?.email}
                </JText>
              )}
              {details?.lastestExperience[0]?.country?.id && (
                <JText style={styles.txt}>
                  {store.lang.id == 0 ? `${details?.lastestExperience[0]?.country?.name}, ${details?.lastestExperience[0]?.state?.name}, ${details?.lastestExperience[0]?.city?.name}` : `${details?.lastestExperience[0]?.country?.arabic_title}, ${details?.lastestExperience[0]?.state?.arabic_title}, ${details?.lastestExperience[0]?.city?.arabic_title}`}
                </JText>
              )}



              <JRow
                style={{
                  width: '60%',
                  justifyContent: 'space-between',
                  marginVertical: RFPercentage(1),
                }}>
                {details?.candidateDetails[0]?.region_code &&
                  details?.candidateDetails[0]?.phone && (
                    <JText style={styles.txt}>
                      {`+${details?.candidateDetails[0]?.region_code}-${details?.candidateDetails[0]?.phone}`}
                    </JText>
                  )}
                <JText style={styles.txt}>
                  {details?.candidateDetails[0]?.dob}
                </JText>
              </JRow>

              {loader ?
                <ActivityIndicator /> :
                <JStatusbar item={statusIndex} />}

              <JScrollView
                style={{ width: '100%', marginVertical: RFPercentage(1.5) }}>
                <View style={styles.rView}>
                  <JText style={styles.results}>
                    {store.lang.assessment_result}
                  </JText>
                  {details?.candidateAssessment[0]?.assessment_name?.length > 0 ? (
                    <>
                      {details?.candidateAssessment?.slice(0, 4).map((item, index) => (

                        <JAssessmentResult
                          title={item?.assessment_name}
                          percent={item?.percentage && `${item?.percentage} %`}
                          color={colors.purple[0]}
                        />
                      ))}

                      <JButton
                        style={{ marginTop: RFPercentage(0.5) }}
                        onPress={() => handleButtonPress('button1')}
                        children={store.lang.see_more}
                      />
                    </>
                  ) : (
                    <JNotfoundData />
                  )}
                </View>

                <View style={styles.experience}>
                  <JText style={styles.title}>{store.lang.experience}</JText>
                  {details?.candidateExperiences[0]?.experience_title?.length >
                    0 ? (
                    <JSkills
                      JobTitle={
                        details?.candidateExperiences[0]?.experience_title &&
                        details?.candidateExperiences[0]?.experience_title
                      }
                      date={details?.candidateExperiences[0]?.start_date}
                      Locate={
                        details?.candidateExperiences[0]?.country_name &&
                          details?.candidateExperiences[0]?.state_name &&
                          details?.candidateExperiences[0]?.city_name === undefined
                          ? '---'
                          : store.lang.id == 0 ? `${details?.candidateExperiences[0]?.country_name}, ${details?.candidateExperiences[0]?.state_name}, ${details?.candidateExperiences[0]?.city_name}`
                            : `${details?.candidateExperiences[0]?.country_arabic_name}, ${details?.candidateExperiences[0]?.state_arabic_name}, ${details?.candidateExperiences[0]?.city_arabic_name}`
                      }
                      txt={details?.candidateExperiences[0]?.description}
                    />
                  ) : (
                    <JNotfoundData />
                  )}
                </View>

                <View style={styles.experience}>
                  <JText style={styles.title}>{store.lang.education}</JText>
                  {details?.candidateEducation[0]?.id ? (
                    <FlatList
                      data={details?.candidateEducation}
                      renderItem={({ item, index }) => (
                        <JSkills
                          JobTitle={item.degree_title}
                          date={item.year}
                          Locate={`${item.institute}, ${store.lang.id == 0 ? item?.country_name : item?.country_arabic_name}`}
                          txt={item.degree_level}
                        />
                      )}
                      keyExtractor={(item) => item.toString()}
                    />
                  ) : (
                    <JNotfoundData />
                  )}
                </View>

                <View style={styles.rView}>
                  <JText style={styles.results}>{store.lang.skills}</JText>
                  {details?.candidateSkill[0]?.skill_name?.length > 0 ? (
                    <>
                      {details?.candidateSkill?.slice(0, 4).map((item, index) => (
                        <JAssessmentResult
                          title={store.lang.id == 0 ? item.skill_name : item.arabic_title}
                          percent={item.percentage && `${item.percentage} %`}
                          color={'#B7834A'}
                        />
                      ))}

                      <JButton
                        style={{ marginTop: RFPercentage(0.5) }}
                        onPress={() => handleButtonPress('button2')}
                        children={store.lang.see_more}
                      />
                    </>
                  ) : (
                    <JNotfoundData />
                  )}
                </View>

              </JScrollView>
            </View>
          </View>)}
      <RBSheet
        ref={bottomSheetRef}
        // closeOnDragDown={false}
        closeOnPressMask={true}
        // height={heightPercentageToDP(40)}
        customStyles={{
          container: {
            borderTopLeftRadius: RFPercentage(2.5),
            borderTopRightRadius: RFPercentage(2.5),
            paddingBottom: RFPercentage(4),
          },
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: colors.black[0],
            display: 'none',
          },
        }}>
        {buttonPressed === 'button1' && (
          <View style={styles.RBView}>
            <JText style={styles.RBHeader}>
              {store.lang.assessment_result}
            </JText>

            <FlatList
              data={details?.candidateAssessment}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <JAssessmentResult
                  title={item.assessment_name}
                  percent={item.percentage && `${item.percentage} %`}
                  color={colors.purple[0]}
                />
              )}
              keyExtractor={item => item.toString()}
            />
          </View>
        )}
        {buttonPressed === 'button2' && (
          <View style={styles.RBView}>
            <JText style={styles.RBHeader}>{store.lang.skills}</JText>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={details?.candidateSkill}
              renderItem={({ item, index }) => (
                <JAssessmentResult
                  title={store.lang.id == 0 ? item.skill_name : item.arabic_title}
                  percent={item.percentage && `${item.percentage} %`}
                  color={'#B7834A'}
                />

              )}
              keyExtractor={item => item.toString()}
            />
          </View>
        )}
      </RBSheet>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <SafeAreaView style={styles.centeredView}>
          <JGradientHeader
            center={
              <JText
                fontColor={colors.white[0]}
                fontWeight="bold"
                fontSize={RFPercentage(2.5)}>
                {store.lang.add_note}
              </JText>
            }
          />
          <Formik
            initialValues={{
              note: '',
            }}
            onSubmit={values => {
              // console.log(values.interview_type=== 'Office Base'? 0:'Zoom' && 1);
              setLoader(true);
              _reportSubmit(values);
            }}
            validationSchema={yup.object().shape({
              note: yup.string().required('Note is required').label('Note'),
            })}>
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
              <JScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalView}>
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
                    onPress={() => setModalVisible(false)}
                    style={{
                      marginHorizontal: RFPercentage(2),
                      backgroundColor: '#fff',
                      borderColor: '#000040',
                    }}>
                    {store.lang.close}
                  </JButton>
                  <JButton
                    isValid={isValid}
                    onPress={() => handleSubmit()}>
                    {loader ? store.lang.loading : store.lang.submit}
                  </JButton>
                </JRow>
              </JScrollView>
            )}
          </Formik>
          {/* <Pressable style={{height:'15%',width:'100%'}} onPress={()=> setModalVisible(!modalVisible)}/> */}
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default observer(ProfileJobApplication);

const styles = StyleSheet.create({
  maincontainer: { flex: 1, backgroundColor: colors.tileColor[0] },
  main: {
    height: '90%',
    width: '100%',
    alignItems: 'center',
  },
  img: {
    height: RFPercentage(13),
    width: RFPercentage(13),
    borderRadius: RFPercentage(6.5),
    marginTop: RFPercentage(-5),
  },
  headertxt: {
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
    color: colors.purple[0],
    marginVertical: RFPercentage(0.5),
  },
  titleJob: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
  },
  txt: { fontSize: RFPercentage(2), marginVertical: RFPercentage(0.5) },
  rView: {
    // width: '100%',
    backgroundColor: '#ffff',
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(2),
    marginBottom: RFPercentage(1),
  },
  results: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginVertical: RFPercentage(1),
  },
  RBView: { paddingHorizontal: RFPercentage(2.5), paddingVertical: RFPercentage(2) },
  RBHeader: {
    fontSize: RFPercentage(2.8),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
  },
  RBtxt: {
    fontSize: RFPercentage(2.4),
    fontWeight: '600',
    marginVertical: RFPercentage(0.7),
    width: '100%',
  },
  menutxt: {
    fontSize: RFPercentage(2.2),
    marginVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },
  experience: {
    backgroundColor: '#ffff',
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(2),
    marginBottom: RFPercentage(1),
  },
  title: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1, backgroundColor: '#00000090',
  },
  modalView: {
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

 import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import JButton from './JButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useState} from 'react';
import colors from '../config/colors';
import JText from './JText';
import JRow from './JRow';
import JGradientHeader from './JGradientHeader';
import {Formik} from 'formik';
import * as yup from 'yup';
import JInput from './JInput';
import DocumentPicker from 'react-native-document-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import url from '../config/url';
import { StoreContext } from '../mobx/store';
import { JToast } from '../functions/Toast';
import Pdf from 'react-native-pdf';

const questions = [
  'Its my dream job',
  `It's allow me to grow in my profession`,
  `It's My only option`,
  `It's allow me to achieve my goals`,
];
const JApplyJob = ({token, jobId, id, setStatus, status}) => {
  const store= useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [option, setOption] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const [loader, setLoader] = useState(true);
  const [apiLoader, setApiLoader] = useState(false);



  const resumes = [];
  // console.log('Resume', status.data.resumes);
  if (status?.success !== true && loader === false) {
    status.data &&
      Object.keys(status.data.resumes).map((item, index) => {
        resumes.push({id: item, name: status.data.resumes[item]});
      });
  }

  // console.log('JOb ID', jobId);

  // console.log('ID', id);
  // console.log('ID', status.data);

  const _getStatus = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(`${url.baseUrl}/apply-job/${jobId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('GET APPLIED JOB STATUS', result);
        // store.setStatus(result);
        setStatus(result);
        setLoader(false);
      })
      .catch(error => {
        console.log('GET APPLIED JOB STATUS', error);
        setLoader(false);
      });
  };
  useEffect(() => {
    _getStatus();
    return () => {};
  }, []);

  return (
    <>
      {status?.success !== false && loader === false && (
        <JButton
          isValid={!loader}
          onPress={() => setModalVisible(true)}
          style={{
            
            position: 'absolute',
            bottom: RFPercentage(1),
          }}
          children={`${store.lang.apply_job}`}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalView}>
            <JGradientHeader
              center={
                <JText
                  fontColor={colors.white[0]}
                  fontWeight="bold"
                  fontSize={RFPercentage(2.5)}>
                  {store.lang.questionnaire}
                </JText>
              }
            />
            <View style={{padding: RFPercentage(2)}}>
              <JText fontSize={RFPercentage(2.5)}>{store.lang.question}</JText>
              <JText
                fontSize={RFPercentage(2)}
                style={{
                  marginBottom: RFPercentage(2),
                  marginTop: RFPercentage(1),
                }}>
                {store.lang.why_do_you_want_this_job}
              </JText>

              {questions.map((item, index) => (
                <Pressable
                  onPress={() => setOption(index)}
                  style={{
                    paddingVertical: RFPercentage(2),
                    paddingHorizontal: RFPercentage(1),
                    backgroundColor:
                      option !== index ? colors.white[0] : colors.primary[0],
                    marginTop: RFPercentage(1),
                    justifyContent: 'center',
                    borderWidth:
                      option === index ? RFPercentage(0.2) : RFPercentage(0.2),
                    borderColor:
                      option === index ? colors.primary[0] : colors.black[0],
                  }}
                  key={index}>
                  <JText fontWeight="bold" fontSize={RFPercentage(1.8)}>
                    {item}
                  </JText>
                </Pressable>
              ))}

              <JRow
                style={{
                  marginTop: RFPercentage(5),
                  justifyContent: 'space-between',
                  marginHorizontal: RFPercentage(3),
                  borderColor: colors.primary[1],
                }}>
                <JButton
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    width: '46%',
                    backgroundColor: colors.white[0],
                    borderColor: colors.black[1],
                  }}
                  children={store.lang.close}
                />

                <JButton
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setModalVisible1(!modalVisible1);
                  }}
                  style={{
                    width: '46%',
                  }}
                  children={store.lang.add}
                />
              </JRow>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible1(!modalVisible1);
        }}>
        <Formik
          initialValues={{
            resume: '',
            expected: '',
            note: '',
          }}
          onSubmit={values => {
            // console.log(values);
            //  setModalVisible(!modalVisible);

            // console.log(token);
            setApiLoader(true);
            var myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            var formdata = new FormData();
            formdata.append('job_id', id);
            formdata.append('resume_id', values.resume.id);
            formdata.append('expected_salary', values.expected);
            formdata.append('notes', values.note);
            formdata.append('questionnaire_answer', questions[option]);
            formdata.append('application_type', 'apply');

            // console.log(formdata);
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow',
            };
            fetch('https://dev.jobskills.digital/api/apply-job', requestOptions)
              .then(response => response.json())
              .then(result => {
                // console.log(result);

                if (result.success === false) {
                  JToast({
                    type: 'error',
                    text1: result.message,
                  });
                  // alert(result.message);
                  setModalVisible1(false)
                } else {
                  JToast({
                    type: 'success',
                    text1: result.message,
                  });
                  _getStatus();
                  setModalVisible1(false)
                }
                setApiLoader(false);
              })
              .catch(error => {
                // console.log('error', error);
                setApiLoader(false);
              });
          }}
          validationSchema={yup.object().shape({
            resume: yup.object().shape({
              id: yup.string().required('PDF'),
            }),
            expected: yup.string().required().label('Expected'),
            note: yup.string().required().label('Note'),
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
            <SafeAreaView style={styles.centeredView}>
              <View style={styles.modalView}>
                <JGradientHeader
                  center={
                    <JText
                      fontColor={colors.white[0]}
                      fontWeight="bold"
                      fontSize={RFPercentage(2.5)}>
                      {store.lang.full_detail}
                    </JText>
                  }
                />
                <ScrollView style={{padding: RFPercentage(2)}}>
                  <JRow>
                    <JText fontSize={RFPercentage(2.5)}>{store.lang.resume}</JText>
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
                  {/* {values.resume?.uri ? (
                        values.resume?.size <= 2000000 ? (
                          <View style={{alignSelf: 'center'}}>
                            <Pdf
                              trustAllCerts={false}
                              source={{uri: values.resume?.uri}}
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
                      )} */}

                  <Pressable
                    onPress={() => setDropDown(true)}
                    style={{
                      borderWidth: RFPercentage(0.2),
                      width: '100%',
                    }}>
                    <JText
                      style={{
                        paddingVertical: RFPercentage(2),
                        paddingHorizontal: RFPercentage(1),
                        fontWeight: 'bold',
                        fontSize: RFPercentage(1.8),
                      }}>
                      {values.resume.name
                        ? values.resume.name
                        : store.lang.select_an_option}
                    </JText>
                  </Pressable>
                  {dropDown === true && (
                    <View
                      style={{
                        position: 'absolute',
                        top: RFPercentage(15.9),
                        width: '100%',
                        backgroundColor: colors.white[0],
                        zIndex: 1,
                      }}>
                      {resumes.map((item, index) => (
                        <Pressable
                          onPress={() => {
                            setFieldValue('resume', item);
                            setDropDown(false);
                          }}
                          key={index}
                          style={{
                            borderWidth: RFPercentage(0.1),
                            width: '100%',
                            borderTopWidth: 0,
                          }}>
                          <JText
                            style={{
                              paddingVertical: RFPercentage(2),
                              paddingHorizontal: RFPercentage(1),
                              textTransform: 'capitalize',
                            }}>
                            {item.name}
                          </JText>
                        </Pressable>
                      ))}
                    </View>
                  )} 

                  {/* {singleFile ? (
                    <Pdf
                      source={{uri: singleFile.uri}}
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
                        children={'Upload Resume'}
                      />
                    </JRow>
                  )} */} 

                  <JText
                    fontSize={RFPercentage(2)}
                    fontColor={colors.placeHolderColor[0]}
                    style={{
                      marginTop: RFPercentage(2),
                    }}>
                    {store.lang.expected_salary_range}
                  </JText>

                  <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  keyboardType={'numeric'}
                    containerStyle={{marginTop: RFPercentage(1)}}
                    isRequired
                    heading={store.lang.expected_salary}
                    value={values.expected}
                    error={touched.expected && errors.expected && true}
                    onChangeText={handleChange('expected')}
                    onBlur={() => setFieldTouched('expected')}
                  />

                  <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                    containerStyle={{marginTop: RFPercentage(2)}}
                    isRequired
                    value={values.note}
                    heading={`${store.lang.note}:`}
                    error={touched.note && errors.note && true}
                    onChangeText={handleChange('note')}
                    onBlur={() => setFieldTouched('note')}
                  />

                  <JRow
                    style={{
                      marginTop: RFPercentage(5),
                      justifyContent: 'space-between',
                      marginHorizontal: RFPercentage(3),
                      borderColor: colors.primary[1],
                    }}>
                    <JButton
                      onPress={() => {
                        setModalVisible1(!modalVisible1);
                      }}
                      style={{
                        width: '46%',
                        backgroundColor: colors.white[0],
                        borderColor: colors.black[1],
                      }}
                      children={store.lang.save_as_draft}
                    />

                    <JButton
                      isValid={!apiLoader}
                      onPress={() => {
                        handleSubmit();
                      }}
                      style={{
                        width: '46%',
                      }}
                      children={apiLoader ? store.lang.loading : store.lang.apply}
                    />
                  </JRow>
                </ScrollView>
              </View>
            </SafeAreaView>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default JApplyJob;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    alignItems: 'center',

    backgroundColor: '#00000080',
  },
  modalView: {
    backgroundColor: colors.white[0],
    marginTop: StatusBar.currentHeight,

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

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

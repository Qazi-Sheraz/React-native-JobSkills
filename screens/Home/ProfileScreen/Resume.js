import {
  View,
  Modal,
  Switch,
  FlatList,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React,
{
  useState,
  useEffect,
  useContext,
} from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import RNFS from 'react-native-fs'
import Pdf from 'react-native-pdf';
import url from '../../../config/url';
import { observer } from 'mobx-react';
import colors from '../../../config/colors';
import JRow from '../../../customComponents/JRow';
import { JToast } from '../../../functions/Toast';
import { StoreContext } from '../../../mobx/store';
import JText from '../../../customComponents/JText';
import JInput from '../../../customComponents/JInput';
import JEmpty from '../../../customComponents/JEmpty';
import Entypo from 'react-native-vector-icons/Entypo';
import PdfFile from '../../../assets/svg/PdfFile.svg';
import JScreen from '../../../customComponents/JScreen';
import JButton from '../../../customComponents/JButton';
import DocumentPicker from 'react-native-document-picker';
import JResumeView from '../../../customComponents/JResumeView';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import JGradientHeader from '../../../customComponents/JGradientHeader';

const Resume = ({ navigation }) => {
  const store = useContext(StoreContext);
  const [resumes, setResumes] = useState([]);
  const [loader, setLoader] = useState(true);
  const [apiLoader, setApiLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const _selectOneFile = async (setFieldValue) => {
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
      // console.log('ressss', res[0])
      console.log('URI : ' + res[0]?.uri);
      // console.log('Type : ' + res[0]?.type);
      console.log('File Name : ' + res[0]?.name);
      // console.log('File Size : ' + res[0]?.size);
      //Setting the state to show single file attributes

      setFieldValue('resume', res[0]);

    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        JToast({
          type: 'error',
          text2: 'Canceled from single doc picker',
        });
        // alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  // console.log(pdf)
  const _deleteCV = id => {
    // Alert.alert('Delete CV', 'Are you sure to delete?', [
    //   {
    //     text: 'Cancel',
    //     //  onPress: () => console.log('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    //   { text: 'OK', onPress: () => _delete() },
    // ]);

    // const _delete = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(`${url.baseUrl}/delete-resumes/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setResumes(resumes.filter(e => e.id !== id));
        setLoader(true)
        _getResume()
        setLoader(false)
      })
    // .catch(error => console.log('error', error));
    // };
  };
  const _getResume = () => {
    setModalVisible(false);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${url.baseUrl}/resumes`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('Resumes', result);
        setResumes(result.data);
        setLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.error_while_getting_data,
        });
        setLoader(false);
      });
  };

  const readResume = async (uri) => {
    try {
      const base64String = await RNFS.readFile(uri, 'base64');
      console.log(base64String);
      return base64String;
    } catch (error) {
      console.error('Error reading PDF:', error);
      return null; // Handle the error as needed
    }
  };

  useEffect(() => {
    _getResume();
  }, []);
  return (
    <JScreen
      headerShown={true}
      header={
        <JGradientHeader
          center={
            <JText
              fontWeight="bold"
              fontColor={colors.white[0]}
              fontSize={RFPercentage(2.5)}>
              {store.lang.resume}
            </JText>
          }
          left={
            <JChevronIcon />
          }
          right={
            loader ? (
              <ActivityIndicator color={colors.white[0]} />
            ) : (
              <Entypo
                name="upload"
                size={RFPercentage(3.5)}
                color={colors.white[0]}
                onPress={() => setModalVisible(true)}
              />
            )
          }
        />
      }>
      {loader == true ? null : (
        <FlatList
          numColumns={'2'}
          ListEmptyComponent={<JEmpty />}
          // contentContainerStyle={{flex: 1}}
          // ListEmptyComponent={
          //   <View
          //     style={{
          //       flex: 1,
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //     }}>
          //     <Entypo
          //       onPress={() => setModalVisible(true)}
          //       name="upload"
          //       size={RFPercentage(20)}
          //     />
          //     <JText
          //       style={{
          //         marginTop: RFPercentage(1.5),
          //       }}
          //       fontSize={RFPercentage(2.5)}
          //       fontWeight="bold">
          //       Upload Resume
          //     </JText>
          //     <JText style={{marginTop: RFPercentage(0.5)}}>
          //       Maximum size 2MB
          //     </JText>
          //   </View>
          // }
          data={resumes?.reverse()}
          renderItem={({ item, index }) => (
            <JResumeView
              item={item}
              setModalVisible={setModalVisible}
              _deleteCV={_deleteCV}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          JToast({
            type: 'danger',
            text1: store.lang.modal_has_been_closed,
          });
          setModalVisible(!modalVisible);
        }}>
        <Formik
          initialValues={{
            resume: '',
            name: '',
            is_default: false,
          }}
          onSubmit={values => {
            // console.log(values);

            var myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${store.token.token}`);

            var formdata = new FormData();
            formdata.append('title', values.name);
            formdata.append('file', {
              uri: values.resume.uri,
              name: values.resume.name,
              filename: values.resume.name,
              type: values.resume.type,
            });
            formdata.append(
              'is_default',
              values.is_default == true ? '1' : '0',
            );
            // console.log(formdata);
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow',
            };
            setApiLoader(true);
            fetch(
              'https://dev.jobskills.digital/api/resumes-create',
              requestOptions,
            )
              .then(response => response.json())
              .then(result => {
                // console.log(result);
                _getResume();
                JToast({
                  type: 'success',
                  text1: store.lang.success,
                  text2: result.message,
                });
                setApiLoader(false);
                setModalVisible(false);
              })
              .catch(error => {
                // console.log('error', error);
                JToast({
                  type: 'danger',
                  text1: store.lang.eror,
                  text2: store.lang.error_while_uploading_CV,
                });
                setApiLoader(false);
                // setModalVisible(false);
              });

            //  setModalVisible(!modalVisible);
          }}
          validationSchema={yup.object().shape({
            resume: yup.object().shape({
              uri: yup.string().required('PDF'),
            }),
            name: yup.string()
              .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'Name must contain at least 1 alphabet character and can include English, Urdu, Arabic, and spaces')
              .matches(/^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/, 'Symbols are not allowed in the Name')
              .required().label('Name'),
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
                  right={
                    <Entypo
                      onPress={() => {
                        setApiLoader(false);
                        setModalVisible(false);
                      }}
                      name="circle-with-cross"
                      size={RFPercentage(3.5)}
                      color={colors.white[0]}
                    />
                  }
                />
                <ScrollView style={{ padding: RFPercentage(2) }}>
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

                  {values.resume?.uri ? (
                    values.resume?.size <= 1000000 ? (
                      <View style={{ alignSelf: 'center', width: '70%', }}>
                        {/* <Pdf
                          trustAllCerts={false}
                          source={{ uri: values.resume?.uri }}
                          onLoadComplete={(numberOfPages, filePath) => {
                            // console.log(
                            //   `Number of pages: ${numberOfPages}`,
                            // );
                            alert('uploaded')
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
                        /> */}
                        <View style={{
                          alignSelf: 'center',
                          width: Dimensions.get('window').width / 3,
                          height: Dimensions.get('window').height / 5,
                          // backgroundColor:'red'
                        }}>
                          <PdfFile />

                        </View>
                        <JText style={{ textAlign: 'center', fontWeight: '600' }}>{values.resume?.name}</JText>



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

                  <JInput
                    containerStyle={{ marginTop: RFPercentage(1) }}
                    isRequired
                    heading={store.lang.name}
                    value={values.name}
                    maxLength={100}
                    error={touched.name && errors.name && true}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                  />
                  <JRow
                    style={{
                      // justifyContent: 'space-between',
                      marginVertical: RFPercentage(2),
                    }}>
                    <JText fontWeight={'500'} fontSize={RFPercentage(2.5)}>
                      {store.lang.is_default}
                    </JText>

                    <Switch
                      trackColor={{ true: colors.purple[0] }}
                      onValueChange={e => {
                        setFieldValue('is_default', e);
                      }}
                      value={values.is_default}
                    />
                  </JRow>
                  <JRow
                    style={{
                      marginTop: RFPercentage(5),
                      justifyContent: 'center',
                      marginHorizontal: RFPercentage(3),
                      borderColor: colors.primary[1],
                    }}>
                    <JButton
                      disabled={apiLoader ? true : false}
                      isValid={isValid}
                      onPress={() => {
                        if (values.resume?.size <= 1000000) {
                          handleSubmit();
                        }
                      }}
                      style={{
                        width: '46%',
                      }}
                      children={apiLoader ? store.lang.loading : store.lang.upload}
                    />
                  </JRow>
                </ScrollView>
              </View>
            </SafeAreaView>
          )}
        </Formik>
      </Modal>
    </JScreen>
  );
};

export default observer(Resume);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalView: {
    backgroundColor: colors.white[0],
    // marginTop: StatusBar?.currentHeight,

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

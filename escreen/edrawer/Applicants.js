import { ActivityIndicator, Pressable, SafeAreaView, ScrollView,Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import {Formik} from 'formik';
import * as yup from 'yup';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JScreen from '../../customComponents/JScreen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import JIcon from '../../customComponents/JIcon';
import JInput from '../../customComponents/JInput';
import PhoneInput from 'react-native-phone-number-input';
import JErrorText from '../../customComponents/JErrorText';
import JRow from '../../customComponents/JRow';
import Entypo from 'react-native-vector-icons/Entypo';
import JButton from '../../customComponents/JButton';
import { useNavigation } from '@react-navigation/native';
import { StoreContext } from '../../mobx/store';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import Toast from 'react-native-toast-message';
import url from '../../config/url';
import { JToast } from '../../functions/Toast';

const Applicants = () => {
  const {navigate,goBack}=useNavigation();
  const phoneInput = useRef(null);
  const store = useContext(StoreContext);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
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
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const _addApplicants = (values) => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token.token}`,
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
    formdata.append('jobid', "9");
    formdata.append('is_default', '1');
    formdata.append('title', values.resume?.name);
    formdata.append('type', '1');

// console.log(formdata)
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
        // console.log(result)
       
        if (result.success === true) {
          JToast({
            type: 'success',
            text1: 'success',
          });

          //  console.log(values)
        } else {
          JToast({
            type:'danger',
            text1:result.message
           
          });
        }
      })
      .catch(error => {
        // console.log('error===>>>>>', error);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              Add Applicants
            </JText>
          }
          left={
            <JIcon
              icon="fe"
              onPress={() => goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }
        />
      }>
      {/* {loader? <ActivityIndicator/>: */}
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
          // setLoader(true);
          _addApplicants(values);

          // setModalVisible(!modalVisible);
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
            .max(100, 'Email address must be at most 100 characters long')
            .email('Must be a valid email')
            .required()
            .label('Email'),
          phone: yup
            .string()
            .max(14)
            .required()
            .label('Phone'),
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: RFPercentage(2),
            }}>
            <JInput
              containerStyle={{marginTop: RFPercentage(1)}}
              isRequired
              heading={'First Name: '}
              value={values.firstName}
              error={touched.firstName && errors.firstName && true}
              onChangeText={handleChange('firstName')}
              onBlur={() => setFieldTouched('firstName')}
            />
            <JInput
              containerStyle={{marginTop: RFPercentage(1)}}
              isRequired
              heading={'Last Name: '}
              value={values.lastName}
              error={touched.lastName && errors.lastName && true}
              onChangeText={handleChange('lastName')}
              onBlur={() => setFieldTouched('lastName')}
            />
            <JInput
              containerStyle={{marginTop: RFPercentage(1)}}
              isRequired
              maxLength={100}
              heading={store.lang.email}
              value={values.email}
              error={touched.email && errors.email && true}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />

            <View style={{marginBottom: RFPercentage(2)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: RFPercentage(1),
                }}>
                <JText fontWeight="500" fontSize={RFPercentage(2.5)}>
                  Phone:
                </JText>
              </View>
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
              <JText fontSize={RFPercentage(2.5)}>Resume</JText>
              <JText fontColor={colors.danger[0]} fontSize={RFPercentage(2.5)}>
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
              Be sure to include an updated resume
            </JText>

            {values.resume?.uri ? (
              <View style={{alignSelf: 'center'}}>
                <Pdf
                  trustAllCerts={false}
                  source={{uri: values.resume.uri}}
                  onLoadComplete={(numberOfPages, filePath) => {
                    // console.log(`Number of pages: ${numberOfPages}`);
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
                isValid={isValid}
                onPress={() => {
                  handleSubmit();
                }}
                style={{
                  width: '46%',
                }}
                children={'Add'}
              />
            </JRow>
          </ScrollView>
        )}
      </Formik>
    </JScreen>
  );
}

export default Applicants

const styles = StyleSheet.create({})
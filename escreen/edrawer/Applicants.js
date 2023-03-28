import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
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
const Applicants = () => {
  const {navigate,goBack}=useNavigation();
  const phoneInput = useRef(null);
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader  center={
          <JText  fontColor={colors.white[0]}
          fontWeight="bold"
          fontSize={RFPercentage(2.5)}>Applicants</JText>
        }
          left={
            <JIcon
              icon="fe"
              onPress={() => goBack()}
              name="chevron-left"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />
          }/>
      }>

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
            myHeaders.append('Authorization', `Bearer ${store.token.token}`);

            //  setModalVisible(!modalVisible);
          }}
          validationSchema={yup.object().shape({
            resume: yup.object().shape({
              uri: yup.string().required('PDF'),
            }),
            name: yup.string().required().label('Name'),
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
              <ScrollView style={styles.modalView}>
               
                <View style={{padding: RFPercentage(2)}}>
                  <JInput
                    containerStyle={{marginTop: RFPercentage(1)}}
                    isRequired
                    heading={'First Name: '}
                    // value={values.name}
                    // error={touched.name && errors.name && true}
                    // onChangeText={handleChange('name')}
                    // onBlur={() => setFieldTouched('name')}
                  />
                  <JInput
                    containerStyle={{marginTop: RFPercentage(1)}}
                    isRequired
                    heading={'Last Name: '}
                    // value={values.name}
                    // error={touched.name && errors.name && true}
                    // onChangeText={handleChange('name')}
                    // onBlur={() => setFieldTouched('name')}
                  />
                  <JInput
                    containerStyle={{marginTop: RFPercentage(1)}}
                    isRequired
                    heading={'Email: '}
                    // value={values.name}
                    // error={touched.name && errors.name && true}
                    // onChangeText={handleChange('name')}
                    // onBlur={() => setFieldTouched('name')}
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
                    Be sure to include an updated resume
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
                        children={'Upload Resume'}
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
                      children={'Add'}
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
  </JScreen>
  )
}

export default Applicants

const styles = StyleSheet.create({})
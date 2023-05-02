import { StyleSheet, Text, View } from 'react-native'
import React, {useState,useRef} from 'react'
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import JInput from '../../customComponents/JInput';
import PhoneInput from 'react-native-phone-number-input';
import JSelectInput from '../../customComponents/JSelectInput';
import {Formik} from 'formik';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
const ECompanyInformation = () => {
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation();
    const phoneInput = useRef(null);
  return (
    <JScreen headerShown={false}>
      <Formik
        initialValues={{
          ceo_name: '',
          ownership: '',
          industry: '',
          size: '',
          location: '',
          offices: '',
          website: '',
          fax: '',
          employeDetail: '',
        }}
        // onSubmit={values => {
        //   console.log(values);
        //   _postData(values);
        // }}
        // validationSchema={yup.object().shape({
        //   title: yup.string().required().label('Title'),
        //   company: yup.string().required().label('Company'),
        //   county: yup.string().required().label('Country'),
        //   city: yup.string().required().label('City'),
        //   state: yup.string().required().label('State'),
        //   start: yup.string().required().label('Start'),
        //   end: yup.string().required().label('End'),
        //   description: yup.string().required().label('Description'),
        // })}
      >
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
          <>
            <JGradientHeader
              center={
                <JText
                  fontColor={colors.white[0]}
                  fontWeight="bold"
                  fontSize={RFPercentage(2.5)}>
                  Employer
                </JText>
              }
              right={
                loader ? (
                  <ActivityIndicator
                    color={colors.white[0]}
                    size={RFPercentage(2)}
                  />
                ) : (
                  <JText
                    onPress={() => isValid && handleSubmit()}
                    fontColor={
                      !isValid ? `${colors.white[0]}70` : colors.white[0]
                    }>
                    Save
                  </JText>
                )
              }
              left={
                <Feather
                  onPress={() => navigation.goBack()}
                  name="chevron-left"
                  size={RFPercentage(3.5)}
                  color={colors.white[0]}
                />
              }
            />
            <ScrollView
              contentContainerStyle={{paddingBottom: RFPercentage(8)}}
              style={{
                marginHorizontal: RFPercentage(2),
              }}>
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'CEO Name:'}
                value={values.ceo_name}
                error={touched.ceo_name && errors.ceo_name && true}
                onChangeText={handleChange('ceo_name')}
                onBlur={() => setFieldTouched('ceo_name')}
              />
              {touched.ceo_name && errors.ceo_name && (
                <JErrorText>{errors.ceo_name}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.ownership.name}
                header={'Owner Ship'}
                heading={'Owner Ship :'}
                setValue={e => {
                  setFieldValue('ownership', e);
                }}
                error={touched.ownership && errors.ownership && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.ownership && errors.ownership && (
                <JErrorText>{errors.ownership}</JErrorText>
              )}
              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.industry.name}
                header={'Industry'}
                heading={'Industry :'}
                setValue={e => {
                  setFieldValue('industry', e);
                }}
                error={touched.industry && errors.industry && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.industry && errors.industry && (
                <JErrorText>{errors.industry}</JErrorText>
              )}
              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.size.name}
                header={'Size'}
                heading={'Size :'}
                setValue={e => {
                  setFieldValue('size', e);
                }}
                error={touched.size && errors.size && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.size && errors.size && (
                <JErrorText>{errors.size}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Location:'}
                value={values.location}
                error={touched.location && errors.location && true}
                onChangeText={handleChange('location')}
                onBlur={() => setFieldTouched('location')}
              />
              {touched.location && errors.location && (
                <JErrorText>{errors.location}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'No of Offices:'}
                value={values.offices}
                error={touched.offices && errors.offices && true}
                onChangeText={handleChange('offices')}
                onBlur={() => setFieldTouched('offices')}
              />
              {touched.offices && errors.offices && (
                <JErrorText>{errors.offices}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Website:'}
                value={values.website}
                error={touched.website && errors.website && true}
                onChangeText={handleChange('website')}
                onBlur={() => setFieldTouched('website')}
              />
              {touched.website && errors.website && (
                <JErrorText>{errors.website}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Fax:'}
                value={values.fax}
                error={touched.fax && errors.fax && true}
                onChangeText={handleChange('fax')}
                onBlur={() => setFieldTouched('fax')}
              />
              {touched.fax && errors.fax && (
                <JErrorText>{errors.fax}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Employe Detail:'}
                value={values.employeDetail}
                error={touched.employeDetail && errors.employeDetail && true}
                onChangeText={handleChange('employeDetail')}
                onBlur={() => setFieldTouched('employeDetail')}
              />
              {touched.employeDetail && errors.employeDetail && (
                <JErrorText>{errors.employeDetail}</JErrorText>
              )}

            
            </ScrollView>
          </>
        )}
      </Formik>
    </JScreen>
  );
}

export default ECompanyInformation

const styles = StyleSheet.create({})
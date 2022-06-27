import {StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import JGradientProfileHeader from '../../../customComponents/JGradientProfileHeader';
import JInput from '../../../customComponents/JInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {RFPercentage} from 'react-native-responsive-fontsize';

import JErrorText from '../../../customComponents/JErrorText';

import JText from '../../../customComponents/JText';
import JScrollView from '../../../customComponents/JScrollView';

function CGeneralInformation({navigation}) {
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientProfileHeader
          onBackPress={() => navigation.goBack()}
          onSavePress={() => alert('Save')}
          heading={'Contacts'}
        />
      }>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          fatherName: '',
          dob: '',
          gender: '',
          country: '',
          state: '',
          city: '',
          language: '',
          martialStatus: '',
          immediateAvailable: '',
        }}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string().required('First Name is a required field'),
          lastName: yup.string().required('Last Name is a required field'),
          fatherName: yup.string().required('Father Name is a required field'),
          dob: yup.string().required('DOB is a required field'),
          gender: yup.string().required('Gender is a required field'),
          country: yup.string().required('Country is a required field'),
          state: yup.string().required('State is a required field'),
          city: yup.string().required('City is a required field'),
          language: yup.string().required('Language is a required field'),
          martialStatus: yup
            .string()
            .required('Martial Status is a required fieldd'),
          immediateAvailable: yup
            .string()
            .required('Immediate Available is a required field'),
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
          <JScrollView style={{marginTop: RFPercentage(2)}}>
            <JInput
              containerStyle={styles.input}
              value={values.firstName}
              heading={'First Name'}
              error={touched.firstName && errors.firstName && true}
              autoFocus
              placeholder="First Name"
              onChangeText={handleChange('firstName')}
              onBlur={() => setFieldTouched('firstName')}
            />
            {touched.firstName && errors.firstName && (
              <JErrorText>{errors.firstName}</JErrorText>
            )}

            <JInput
              containerStyle={styles.input}
              value={values.lastName}
              heading={'Last Name'}
              error={touched.lastName && errors.lastName && true}
              placeholder="Last Name"
              onChangeText={handleChange('lastName')}
              onBlur={() => setFieldTouched('lastName')}
            />
            {touched.lastName && errors.lastName && (
              <JErrorText>{errors.lastName}</JErrorText>
            )}

            <JInput
              containerStyle={styles.input}
              value={values.fatherName}
              heading={'Father Name'}
              error={touched.fatherName && errors.fatherName && true}
              placeholder="Father Name"
              onChangeText={handleChange('fatherName')}
              onBlur={() => setFieldTouched('fatherName')}
            />
            {touched.fatherName && errors.fatherName && (
              <JErrorText>{errors.fatherName}</JErrorText>
            )}

            <JInput
              containerStyle={styles.input}
              value={values.dob}
              heading={'Date Of Birth'}
              error={touched.dob && errors.dob && true}
              placeholder="Date Of Birth"
              onChangeText={handleChange('dob')}
              onBlur={() => setFieldTouched('dob')}
            />
            {touched.dob && errors.dob && <JErrorText>{errors.dob}</JErrorText>}

            <JInput
              containerStyle={styles.input}
              value={values.gender}
              heading={'Gender'}
              error={touched.gender && errors.gender && true}
              placeholder="Gender"
              onChangeText={handleChange('gender')}
              onBlur={() => setFieldTouched('gender')}
            />
            {touched.gender && errors.gender && (
              <JErrorText>{errors.gender}</JErrorText>
            )}

            <JInput
              containerStyle={styles.input}
              value={values.country}
              heading={'Country'}
              error={touched.country && errors.country && true}
              placeholder="Country"
              onChangeText={handleChange('country')}
              onBlur={() => setFieldTouched('country')}
            />
            {touched.country && errors.country && (
              <JErrorText>{errors.country}</JErrorText>
            )}

            <JInput
              containerStyle={styles.input}
              value={values.state}
              heading={'State'}
              error={touched.state && errors.state && true}
              placeholder="State"
              onChangeText={handleChange('state')}
              onBlur={() => setFieldTouched('state')}
            />
            {touched.state && errors.state && (
              <JErrorText>{errors.state}</JErrorText>
            )}

            <JInput
              containerStyle={styles.input}
              value={values.city}
              heading={'City'}
              error={touched.city && errors.city && true}
              placeholder="City"
              onChangeText={handleChange('city')}
              onBlur={() => setFieldTouched('city')}
            />
            {touched.city && errors.city && (
              <JErrorText>{errors.city}</JErrorText>
            )}

            <JInput
              containerStyle={styles.input}
              value={values.language}
              heading={'Language'}
              error={touched.language && errors.language && true}
              placeholder="Language"
              onChangeText={handleChange('language')}
              onBlur={() => setFieldTouched('language')}
            />
            {touched.language && errors.language && (
              <JErrorText>{errors.language}</JErrorText>
            )}

            <JInput
              containerStyle={styles.input}
              value={values.martialStatus}
              heading={'Martial Status'}
              error={touched.martialStatus && errors.martialStatus && true}
              placeholder="Martial Status"
              onChangeText={handleChange('martialStatus')}
              onBlur={() => setFieldTouched('martialStatus')}
            />
            {touched.martialStatus && errors.martialStatus && (
              <JErrorText>{errors.martialStatus}</JErrorText>
            )}

            <JInput
              containerStyle={styles.input}
              value={values.immediateAvailable}
              heading={'Immediate Available'}
              error={
                touched.immediateAvailable && errors.immediateAvailable && true
              }
              placeholder="Immediate Available"
              onChangeText={handleChange('immediateAvailable')}
              onBlur={() => setFieldTouched('immediateAvailable')}
            />
            {touched.immediateAvailable && errors.immediateAvailable && (
              <JErrorText>{errors.immediateAvailable}</JErrorText>
            )}
          </JScrollView>
        )}
      </Formik>
    </JScreen>
  );
}
export default observer(CGeneralInformation);
const styles = StyleSheet.create({
  input: {
    marginBottom: RFPercentage(2),
  },
});

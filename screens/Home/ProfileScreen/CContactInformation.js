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
import PhoneInput from 'react-native-phone-number-input';

import JText from '../../../customComponents/JText';

function CContactInformation({navigation}) {
  const phoneInput = useRef(null);

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
          email: '',
          phone: '',
        }}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email('Must be a valid email'),
          phone: yup
            .string()
            .min(7, 'Password Must be at least 7 characters')
            .max(15, 'Password must be at most 15 characters'),
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
          <View style={{marginTop: RFPercentage(3)}}>
            <JInput
              value={values.email}
              heading={'Email'}
              error={touched.email && errors.email && true}
              autoFocus
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <JErrorText>{errors.email}</JErrorText>
            )}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: RFPercentage(3),
                }}>
                <JText fontWeight="500" fontSize={RFPercentage(2.5)}>
                  Phone
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
          </View>
        )}
      </Formik>
    </JScreen>
  );
}
export default observer(CContactInformation);
const styles = StyleSheet.create({});

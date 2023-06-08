import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import JGradientProfileHeader from '../../../customComponents/JGradientProfileHeader';
import JInput from '../../../customComponents/JInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import JErrorText from '../../../customComponents/JErrorText';
import PhoneInput from 'react-native-phone-number-input';

import JText from '../../../customComponents/JText';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import colors from '../../../config/colors';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import {_getProfile} from '../../../functions/Candidate/MyProfile';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

function CContactInformation({refRBSheet, user}) {
  // console.log(user);
  const phoneInput = useRef(null);
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const _postData = values => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);
    var formdata = new FormData();

    formdata.append('phone', values.phone);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setLoader(true);
    fetch('https://dev.jobskills.digital/api/update-profile', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result.success === false) {
          alert('Error while saving data');
        } else {
          _getProfile(store);
          alert(result);
        }
        setLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        setLoader(false);
      });
  };
  return (
    <Formik
      initialValues={{
        email: user.email_address,
        phone: user.mobile_number,
      }}
      onSubmit={values => {
        // console.log(values);
        _postData(values);
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email('Must be a valid email'),
        // phone: yup
        //   .string()
        //   .min(13, 'Password Must be at least 7 characters')
        //   .max(15, 'Password must be at most 15 characters'),
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
        <JScreen headerShown={false}>
          <JGradientHeader
            center={
              <JText
                fontColor={colors.white[0]}
                fontWeight="bold"
                fontSize={RFPercentage(2.5)}>
                Contact
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

          <View
            style={{
              marginTop: RFPercentage(3),
              paddingHorizontal: RFPercentage(2),
            }}>
            {/* <JInput
              value={values.email}
              heading={'Email'}
              error={touched.email && errors.email && true}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <JErrorText>{errors.email}</JErrorText>
            )} */}
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
        </JScreen>
      )}
    </Formik>
  );
}
export default observer(CContactInformation);
const styles = StyleSheet.create({});

import {StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import JInput from '../../customComponents/JInput';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import JIcon from '../../customComponents/JIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import Key from '../../assets/svg/Icon/Key.svg';
import CurrentP from '../../assets/svg/Icon/CurrentP.svg';
import JButton from '../../customComponents/JButton';
import JRow from '../../customComponents/JRow';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import JErrorText from '../../customComponents/JErrorText';
import url from '../../config/url';
import Toast from 'react-native-toast-message';
import { StoreContext } from '../../mobx/store';
import JChevronIcon from '../../customComponents/JChevronIcon';

import { observer } from 'mobx-react';
const ChangePassword = () => {
  const navigation = useNavigation();
  const [reset, setReset] = useState();
  const [loader, setLoader] = useState();
  const store = useContext(StoreContext);
  const _resetPassword = values => {
    var formdata = new FormData();
    formdata.append('password_current', values.password_current);
    formdata.append('password', values.password);
    formdata.append('password_confirmation', values.password_confirmation);
    console.log(formdata);

    var myHeaders = new Headers();

    myHeaders.append('Authorization', `Bearer ${store?.token?.token}`);

    fetch(`${url.baseUrl}/change-password`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result?.success == true) {
          setReset(result);
          Toast.show({
            type: 'success',
            text1: result.message,
          });
          navigation.navigate('EAccountSetting');
        } else {
          Toast.show({
            type: 'error',
            text1: result?.message,
          });
        }
      })

      .catch(error => {
        console.log('error', error);
        Toast.show({
          type: 'error',
          text1: error,
        });
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
              {store.lang.change_password}
            </JText>
          }
          left={
            <JChevronIcon/>
          }
        />
      }>
      <Formik
        initialValues={{
          password_current: '',
          password: '',
          password_confirmation: '',
        }}
        onSubmit={values => {
          console.log(values);
          _resetPassword(values);
        }}
        validationSchema={yup.object().shape({
          password_current: yup.string().required().label('Current Password'),
          password: yup
            .string()
            .min(8, 'Password Must be at least 8 characters')
            .required('Password is a required field'),
          password_confirmation: yup
            .string()
            .required('Confirm Password is a required field')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <>
            <View style={{flex: 1, marginTop: RFPercentage(4)}}>
              <JInput
                headingWeight="bold"
                heading={store.lang.current_password}
                icon={<CurrentP marginHorizontal={RFPercentage(2)} />}
                value={values.password_current}
                error={
                  touched.password_current && errors.password_current && true
                }
                onChangeText={handleChange('password_current')}
                onBlur={() => setFieldTouched('password_current')}
              />
              {touched.password_current && errors.password_current && (
                <JErrorText>{errors.password_current}</JErrorText>
              )}
              <JInput
                headingWeight="bold"
                heading={store.lang.new_password}
                icon={<Key marginHorizontal={RFPercentage(2)} />}
                value={values.password}
                error={touched.password && errors.password && true}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                containerStyle={{marginVertical: RFPercentage(2)}}
              />
              {touched.password && errors.password && (
                <JErrorText>{errors.password}</JErrorText>
              )}
              <JInput
                headingWeight="bold"
                heading={store.lang.confirm_password}
                icon={<Key marginHorizontal={RFPercentage(2)} />}
                value={values.password_confirmation}
                error={
                  touched.password_confirmation &&
                  errors.password_confirmation &&
                  true
                }
                onChangeText={handleChange('password_confirmation')}
                onBlur={() => setFieldTouched('password_confirmation')}
              />
              {touched.password_confirmation &&
                errors.password_confirmation && (
                  <JErrorText>{errors.password_confirmation}</JErrorText>
                )}
            </View>
            <JRow
              style={{
                justifyContent: 'space-around',
                marginBottom: RFPercentage(3),
              }}>
              <JButton
                style={styles.btn}
                backgroundColor={'#fff'}
                borderColor={colors.black[0]}
                children={store.lang.cancel}
              />
              <JButton
                isValid={isValid}
                onPress={() => handleSubmit()}
                style={styles.btn}
                children={loader ? 'Loading' : store.lang.update}
              />
            </JRow>
          </>
        )}
      </Formik>
    </JScreen>
  );
};

export default observer(ChangePassword);

const styles = StyleSheet.create({btn: {width: '48%',}});

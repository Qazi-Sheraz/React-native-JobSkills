import { StyleSheet, View, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import JScreen from '../../customComponents/JScreen';
import JCircularLogo from '../../customComponents/JCircularLogo';
import JText from '../../customComponents/JText';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import JInput from '../../customComponents/JInput';
import JButton from '../../customComponents/JButton';
import JDivider from '../../customComponents/JDivider';
import * as yup from 'yup';
import { Formik } from 'formik';
import JErrorText from '../../customComponents/JErrorText';
import JFooter from '../../customComponents/JFooter';
import CheckBox from '@react-native-community/checkbox';
import JIcon from '../../customComponents/JIcon';
import { StoreContext } from '../../mobx/store';
import { observer } from 'mobx-react';
import JRow from '../../customComponents/JRow';
import { JToast } from '../../functions/Toast';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
const Registration = ({ navigation, route }) => {
  const [loader, setLoader] = useState(false);
  const store = useContext(StoreContext);
  console.log(route.params?.type)

  const _register = values => {
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    var formdata = new FormData();
    formdata.append('type', route.params?.type == 1 ? '1' : '0');
    formdata.append('email', values.email);
    formdata.append('password', values.password);
    formdata.append('first_name', values.first_name);
    formdata.append('last_name', values.last_name);
    formdata.append('password_confirmation', values.confirmPassword);
    formdata.append('privacyPolicy', values.policy ? '1' : '0');
    route.params?.type !== 1 &&(
    formdata.append('company_name', values.company_name))
    console.log(formdata);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    
    fetch('https://dev.jobskills.digital/api/users/register', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        // console.log('Response', JSON.stringify(response.token));
        if (result.success == false) {
          JToast({
            type: 'danger',
            text1: store.lang.register_error,
            text2: result.message,
          });
        } else {
          JToast({
            type: 'success',
            text1: result,
            text2: store.lang.kindly_check_your_email
          });
          navigation.navigate('CLogin', {
            type: route.params?.type,
            email: values.email,
            password: values.password,
          });
        }
        setLoader(false);
        // navigation.navigate('CVerifiedEmail', {
        //   email: values.email,
        //   password: values.password,
        //   type: route.params.type,
        // });
      })
      .catch(error => {
        console.log('Error', error);
        JToast({
          type: 'danger',
         text1: store.lang.eror,
          text2: error.response && error.response.data,
        });
        setLoader(false);
      });
  };
  const gooleLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices();

        const userInfo = await GoogleSignin.signIn();
        store.setGoogleUserInfo(userInfo);
        const getToken = await GoogleSignin.getTokens()
        store.setGoogleToken(getToken.accessToken);
        console.log('getToken=====>',getToken.accessToken)

    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('user cancelled the login flow', error);
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log('operation (e.g. sign in) is in progress already', error);
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('play services not available or outdated', error);
            // play services not available or outdated
        } else {
            console.log('some other error happened', error);
            // some other error happened
        }
    }
};
console.log('GoogleData========>', store.googleUserInfo?.user?.email)
useEffect(() => {
  GoogleSignin.configure();
  // store.setGoogleUserInfo({})
  // store.setGoogleToken({})
}, [])
  return (
    <JScreen>
      <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
        <JCircularLogo multiple={1.2} />
        <JText
          fontSize={RFPercentage(2.8)}
          fontWeight={'bold'}
          children={store.lang.create_account}
          style={{ marginTop: RFPercentage(2) }}
        />
      </View>
      <Formik
        initialValues={
          route.params?.type == 1?
          {
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          // company_name: '',
          confirmPassword: '',
          hide: true,
          chide: true,
          policy: false,
        }
       : {
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          company_name: '',
          confirmPassword: '',
          hide: true,
          chide: true,
          policy: false,
        }}
        onSubmit={values => {
          // console.log(values);
          _register(values);
        }}
        validationSchema={yup.object().shape(
          route.params?.type == 1?
          {
          first_name: yup
            .string()
            .min(3, store.lang.First_Name_Must_be_at_least_3_characters)
            .max(100, store.lang.Name_must_be_at_most_100_characters_long)
            .transform(value => value.trim())
            .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, store.lang.First_Name_must_contain_at_least_1_alphabet_character_and_can_include_English_Urdu_Arabic_and_spaces)
            .matches(/^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/, store.lang.Symbols_are_not_allowed_in_the_First_Name)
            .required(store.lang.First_Name_is_a_required_field),
          last_name: yup
            .string()
            .min(3, store.lang.Last_Name_Must_be_at_least_3_characters)
            .max(100, store.lang.Name_must_be_at_most_100_characters_long)
            .transform(value => value.trim())
            .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, store.lang.Last_Name_must_contain_at_least_1_alphabet_character_and_can_include_English_Urdu_Arabic_and_spaces)
            .matches(/^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/, store.lang.Symbols_are_not_allowed_in_the_Last_Name)
            .required(store.lang.Last_Name_is_a_required_field),
          
          email: yup
            .string()
            .min(0, store.lang.Email_address_cannot_be_empty)
            .max(100, store.lang.Email_address_must_be_at_most_100_characters_long)
            .email(store.lang.Must_be_a_valid_email)
            .required(store.lang.Email_is_a_required_field),
          password: yup
            .string()
            .min(8, store.lang.Password_Must_be_at_least_8_characters)
            .max(16, store.lang.Password_must_be_at_most_16_characters)
            .required(store.lang.Password_is_a_required_field),
          confirmPassword: yup
            .string()
            .required(store.lang.Confirm_Password_is_a_required_field)
            .oneOf([yup.ref(store.lang.Password), null], store.lang.Password_must_match),
          policy: yup
            .boolean()
            .required(store.lang.Policy_is_a_required_field)
            .test('is boolean', 'Must be true', value => value === true),
        }
         : {
          first_name: yup
            .string()
            .min(3,store.lang.First_Name_Must_be_at_least_3_characters)
            .max(100, store.lang.First_Name_must_be_at_most_100_characters_long)
            .transform(value => value.trim())
            .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, store.lang.First_Name_must_contain_at_least_1_alphabet_character_and_can_include_English_Urdu_Arabic_and_spaces)
            .matches(/^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/, store.lang.Symbols_are_not_allowed_in_the_First_Name)
            .required(store.lang.First_Name_is_a_required_field),
          last_name: yup
            .string()
            .min(3, store.lang.Last_Name_Must_be_at_least_3_characters)
            .max(100, store.lang.Name_must_be_at_most_100_characters_long)
            .transform(value => value.trim())
            .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, store.lang.Last_Name_must_contain_at_least_1_alphabet_character_and_can_include_English_Urdu_Arabic_and_spaces)
            .matches(/^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/, store.lang.Symbols_are_not_allowed_in_the_Last_Name)
            .required(store.lang.Last_Name_is_a_required_field),
          company_name: yup
            .string()
            .min(3, store.lang.Company_Name_Must_be_at_least_3_characters)
            .max(100, store.lang.Company_Name_must_be_at_most_100_characters_long)
            .transform(value => value.trim())
            .matches(
              /^[A-Za-z\u0600-\u06FF\s]*[A-Za-z\u0600-\u06FF][A-Za-z\u0600-\u06FF\s\d\W]*$/,
              store.lang.Company_Name_must_only_contain_alphabetic_characters
            )
            .required(store.lang.Company_Name_is_a_required_field),
        
            email: yup
            .string()
            .min(0, store.lang.Email_address_cannot_be_empty)
            .max(100, store.lang.Email_address_must_be_at_most_100_characters_long)
            .email(store.lang.Must_be_a_valid_email)
            .required(store.lang.Email_is_a_required_field),
          password: yup
            .string()
            .min(8, store.lang.Password_Must_be_at_east_8_characters)
            .max(16, store.lang.Password_must_be_at_most_15_characters)
            .required(store.lang.Password_is_a_required_field),
          confirmPassword: yup
            .string()
            .required(store.lang.Confirm_Password_is_a_required_field)
            .oneOf([yup.ref(store.lang.password), null], store.lang.Passwords_must_match),
          policy: yup
            .boolean()
            .required(store.lang.Policy_is_a_required_field)
            .test('is boolean', 'Must be true', value => value === true),
        }
        )}>
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
          <View
            style={{
              flex: 0.6,
              marginHorizontal: RFPercentage(3),
              justifyContent: 'center',
            }}>
            <ScrollView
              style={{ marginBottom: RFPercentage(2) }}
              showsVerticalScrollIndicator={false}>
              <JInput
                maxLength={100}
                style={{ textAlign: store.lang.id === 0 ? 'left' : 'right' }}
                value={values.first_name}
                heading={store.lang.first_name}
                error={touched.first_name && errors.first_name && true}
                icon={
                  <Feather
                    name="user"
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.5)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.5),
                    }}
                    size={RFPercentage(2.8)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={store.lang.first_name}
                onChangeText={handleChange('first_name')}
                onBlur={() => setFieldTouched('first_name')}
              />
              {touched.first_name && errors.first_name && (
                <JErrorText>{errors.first_name}</JErrorText>
              )}
              <JInput
                maxLength={100}
                style={{ textAlign: store.lang.id === 0 ? 'left' : 'right' }}
                value={values.last_name}
                heading={store.lang.last_name}
                error={touched.last_name && errors.last_name && true}
                icon={
                  <Feather
                    name="user"
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.5)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.5),
                    }}
                    size={RFPercentage(2.8)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={store.lang.last_name}
                onChangeText={handleChange('last_name')}
                onBlur={() => setFieldTouched('last_name')}
                containerStyle={{ marginTop: RFPercentage(3) }}
              />
              {touched.last_name && errors.last_name && (
                <JErrorText>{errors.last_name}</JErrorText>
              )}
              <JInput
                style={{ textAlign: store.lang.id === 0 ? 'left' : 'right' }}
                maxLength={100}
                value={values.email}
                error={touched.email && errors.email && true}
                heading={store.lang.email}
                icon={
                  <Feather
                    name="mail"
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.5)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.5),
                    }}
                    size={RFPercentage(2.7)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={store.lang.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                containerStyle={{ marginTop: RFPercentage(3) }}
              />
              {touched.email && errors.email && (
                <JErrorText>{errors.email}</JErrorText>
              )}
              {route.params?.type !== 1 &&
              <JInput
                style={{ textAlign: store.lang.id === 0 ? 'left' : 'right' }}
                value={values.company_name}
                error={touched.company_name && errors.company_name && true}
                heading={store.lang.company_name}
                icon={
                  <JIcon
                    icon={'an'}
                    name="home"
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.3)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.3),
                    }}
                    size={RFPercentage(3)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={store.lang.company_name}
                onChangeText={handleChange('company_name')}
                onBlur={() => setFieldTouched('company_name')}
                containerStyle={{ marginTop: RFPercentage(3) }}
              />}
              {touched.company_name && errors.company_name && (
                <JErrorText>{errors.company_name}</JErrorText>
              )}

              <JInput
                style={{ textAlign: store.lang.id === 0 ? 'left' : 'right' }}
                forPassword={true}
                eye={values.hide}
                maxLength={30}
                onPressEye={() => setFieldValue('hide', !values.hide)}
                error={touched.password && errors.password && true}
                value={values.password}
                heading={store.lang.password}
                icon={
                  <MaterialCommunityIcons
                    name="shield-key-outline"
                    shield-key-outline
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.3)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.3),
                    }}
                    size={RFPercentage(3.2)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={store.lang.password}
                onChangeText={handleChange('password')}
                containerStyle={{ marginTop: RFPercentage(2) }}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <JErrorText>{errors.password}</JErrorText>
              )}

              <JInput
                style={{ textAlign: store.lang.id === 0 ? 'left' : 'right' }}
                forPassword={true}
                eye={values.chide}
                maxLength={30}
                onPressEye={() => setFieldValue('chide', !values.chide)}
                error={
                  touched.confirmPassword && errors.confirmPassword && true
                }
                value={values.confirmPassword}
                heading={store.lang.confirm_password}
                icon={
                  <MaterialCommunityIcons
                    name="shield-key-outline"
                    shield-key-outline
                    style={{
                      marginRight:
                        store.lang.id == 0
                          ? RFPercentage(1.3)
                          : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0
                          ? RFPercentage(0)
                          : RFPercentage(1.3),
                    }}
                    size={RFPercentage(3.2)}
                    color={colors.purple[0]}
                  />
                }
                placeholder={store.lang.confirm_password}
                onChangeText={handleChange('confirmPassword')}
                containerStyle={{ marginTop: RFPercentage(3) }}
                onBlur={() => setFieldTouched('confirmPassword')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <JErrorText>{errors.confirmPassword}</JErrorText>
              )}

              <JRow
                style={{
                  marginTop: RFPercentage(3),
                  paddingLeft: RFPercentage(1),
                }}>
                <CheckBox
                  tintColors={{ true: colors.purple[0], false: 'black' }}
                  boxType="square"
                  value={values.policy}
                  onValueChange={value => setFieldValue('policy', value)}
                />

                <JText style={{ marginHorizontal: RFPercentage(2)}}>
                  {store.lang.you_agree_to_the_JobSkills}{'\n'}
                  <JText
                    fontWeight="bold"
                    style={{ marginHorizontal: RFPercentage(2) }}>
                    {store.lang.terms_and_conditions}
                  </JText>
                </JText>
              </JRow>
              {touched.policy && errors.policy && (
                <JErrorText>{errors.policy}</JErrorText>
              )}

              <JButton
              disabled={loader?true:false}
                isValid={isValid}
                style={{ marginTop: RFPercentage(3) }}
                onPress={() => handleSubmit()}
                children={
                  loader
                    ? store.lang.loading
                    : route.params?.type === 1 ? store.lang.register_as_jobseeker
                      : store.lang.register_as_employee

                }
              />
            </ScrollView>
          </View>
        )}
      </Formik>
      <View style={{ flex: 0.1, alignItems: 'center' }}>
        <JDivider children={store.lang.or_register_with} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: RFPercentage(1),
            justifyContent: 'space-evenly',
            width: '80%',
          }}>
          {['google', 'facebook', 'linkedin', 'twitter'].map((item, index) => (
            <FontAwesome
            onPress={() => {
              if (item == 'google') {
                // gooleLogin()
                alert('google')
              }
              else if (item == 'facebook') {
                // store.setGoogleUserInfo('')
                alert('facebook')
              }
              else if (item == 'linkedin') {
                alert('linkedin')
              }
              else {
                alert('twitter')
              }
            }}
              key={index}
              name={item}
              size={RFPercentage(3.5)}
              color={colors.purple[0]}
            />
          ))}
        </View>
      </View>

      <JFooter
        onPress={() =>
          navigation.navigate('CLogin', { type: route.params?.type })
        }
        children={store.lang.already_Login}
      />
    </JScreen>
  );
};
export default observer(Registration)
const styles = StyleSheet.create({});


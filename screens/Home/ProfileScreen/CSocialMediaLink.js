import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
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
import JGradientHeader from '../../../customComponents/JGradientHeader';
import colors from '../../../config/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import {_getProfile} from '../../../functions/Candidate/MyProfile';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import url from '../../../config/url';
import Toast from 'react-native-toast-message';
function CSocialMediaLink({refRBSheet, data, user}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  // console.log(store.token?.user?.facebook_url,)
  return (
    <Formik
      initialValues={{
        facebook_url: store.token?.user?.facebook_url,
        linkedin_url: store.token?.user?.linkedin_url,
        twitter_url: store.token?.user?.twitter_url,
      }}
      onSubmit={values => {
        // console.log(values);
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
        var formdata = new FormData();
        formdata.append('facebook_url', values?.facebook_url);
        formdata.append('twitter_url', values?.twitter_url);
        formdata.append('linkedin_url', values?.linkedin_url);
        console.log(formdata)
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        setLoader(true);
        fetch(`${url.baseUrl}/companyUpdate/${store.token?.user?.owner_id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            if (result.success === false) {
              Toast.show({
                type: 'error',
                text1: 'Error while saving data',
              });
            } else {
              Toast.show({
                type: 'success',
                text1: 'Successfully update',
              });
              navigation.goBack()

              // _getProfile(store);
              // alert(result);
            }
            setLoader(false);
          })
          .catch(error => {
            console.log('error', error);
            setLoader(false);
          });
      }}
      // validationSchema={yup.object().shape({
      //   fb: yup.string().required().label('Facebook'),
      //   ln: yup.string().required().label('LinkedIn'),
      //   tw: yup.string().required().label('Twitter'),
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
        <JScreen headerShown={false}>
          <JGradientHeader
            center={
              <JText
                fontColor={colors.white[0]}
                fontWeight="bold"
                fontSize={RFPercentage(2.5)}>
                Social Media Links
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

          <View style={{paddingHorizontal: RFPercentage(2)}}>
            <JInput
              value={values.facebook_url}
              heading={'Facebook URL :'}
              error={touched.facebook_url && errors.facebook_url && true}
              containerStyle={styles.input}
              // placeholder="Facebook"
              onChangeText={handleChange('facebook_url')}
              onBlur={() => setFieldTouched('facebook_url')}
            />
            {touched.facebook_url && errors.facebook_url && <JErrorText>{errors.facebook_url}</JErrorText>}

            <JInput
              value={values.linkedin_url}
              containerStyle={styles.input}
              heading={'LinkedIn URL :'}
              error={touched.linkedin_url && errors.linkedin_url && true}
              //   autoFocus
              // placeholder={"LinkedIn"}
              onChangeText={handleChange('linkedin_url')}
              onBlur={() => setFieldTouched('linkedin_url')}
            />
            {touched.linkedin_url && errors.linkedin_url && <JErrorText>{errors.linkedin_url}</JErrorText>}

            <JInput
              value={values.twitter_url}
              heading={'Twitter URL :'}
              error={touched.twitter_url && errors.twitter_url && true}
              containerStyle={styles.input}
              // placeholder="Twitter"
              onChangeText={handleChange('twitter_url')}
              onBlur={() => setFieldTouched('twitter_url')}
            />
            {touched.twitter_url && errors.twitter_url && <JErrorText>{errors.twitter_url}</JErrorText>}
          </View>
        </JScreen>
      )}
    </Formik>
  );
}
export default observer(CSocialMediaLink);
const styles = StyleSheet.create({
  input: {
    marginTop: RFPercentage(2),
  },
});

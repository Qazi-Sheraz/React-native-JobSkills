import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import React, {useRef, useContext, useState} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import JInput from '../../../customComponents/JInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JErrorText from '../../../customComponents/JErrorText';
import JText from '../../../customComponents/JText';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import colors from '../../../config/colors';
import {StoreContext} from '../../../mobx/store';
import {_getProfile} from '../../../functions/Candidate/MyProfile';
import {useNavigation, useRoute} from '@react-navigation/native';
import url from '../../../config/url';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import {JToast} from '../../../functions/Toast';
import Twitterx from '../../../assets/svg/Icon/Twitterx.svg';
function CSocialMediaLink({refRBSheet, data, user}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const {params} = useRoute();
  // console.log(params.fb)
  return (
    <Formik
      initialValues={{
        facebook_url: params?.fb !== null ? params?.fb : '',
        linkedin_url: params?.ln !== null ? params?.ln : '',
        twitter_url: params?.tw !== null ? params?.tw : '',
      }}
      onSubmit={values => {
        // console.log(values);
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
        var formdata = new FormData();
        formdata.append('facebook_url', values?.facebook_url);
        formdata.append('twitter_url', values?.twitter_url);
        formdata.append('linkedin_url', values?.linkedin_url);
        // console.log(formdata)
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        setLoader(true);
        fetch(
          store.token?.user?.owner_type.includes('Candidate') == false
            ? `${url.baseUrl}/companyUpdate/${store.token?.user?.owner_id}`
            : `${url.baseUrl}/update-profile`,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            if (result.success === false) {
              JToast({
                type: 'danger',
                text1: store.lang.eror,
                text2: store.lang.error_while_saving_data,
              });
              setLoader(false);
            } else {
              store.token?.user?.owner_type.includes('Candidate') == false
                ? JToast({
                    type: 'success',
                    text1: store.lang.success,
                    text2: store.lang.successfully_update,
                  })
                : JToast({
                    type: 'success',
                    text1: store.lang.success,
                    text2: result.message,
                  });
              store.token?.user?.owner_type.includes('Candidate') == true &&
                _getProfile(store);
              navigation.goBack();
            }
            setLoader(false);
          })
          .catch(error => {
            // console.log('error', error);
            setLoader(false);
          });
      }}
      validationSchema={yup.object().shape({
        facebook_url: yup
          .string()
          .transform(value => value.trim())
          .max(288)
          .test(
            'no-leading-space',
            `${store.lang.facebook} ${store.lang.cannot_start_with_a_space}`,
            value => {
              if (value && value.startsWith(' ')) {
                return false; // Return false to indicate a validation error
              }
              return true; // Return true if the validation passes
            },
          )
          .url(`${store.lang.facebook} ${store.lang.the_URL_is_not_valid}`),
        linkedin_url: yup
          .string()
          .transform(value => value.trim())
          .max(288)
          .test(
            'no-leading-space',
            `${store.lang.linkedIn} ${store.lang.cannot_start_with_a_space}`,
            value => {
              if (value && value.startsWith(' ')) {
                return false; // Return false to indicate a validation error
              }
              return true; // Return true if the validation passes
            },
          )
          .url(`${store.lang.linkedIn} ${store.lang.the_URL_is_not_valid}`),
        twitter_url: yup
          .string()
          .transform(value => value.trim())
          .max(288)
          .test(
            'no-leading-space',
            `X (${store.lang.twitter} ${store.lang.cannot_start_with_a_space}`,
            value => {
              if (value && value.startsWith(' ')) {
                return false; // Return false to indicate a validation error
              }
              return true; // Return true if the validation passes
            },
          )
          .url(`X (${store.lang.twitter}) ${store.lang.the_URL_is_not_valid}`),
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
                {store.lang.social_media_links}
              </JText>
            }
            right={
              <JText
                disabled={loader ? true : false}
                onPress={() => {
                  handleSubmit();
                }}
                fontColor={!isValid ? `${colors.white[0]}70` : colors.white[0]}>
                {loader ? (
                  <ActivityIndicator
                    color={colors.white[0]}
                    size={RFPercentage(2)}
                  />
                ) : (
                  store.lang.save
                )}
              </JText>
            }
            left={<JChevronIcon />}
          />

          <View style={{paddingHorizontal: RFPercentage(2)}}>
            <JInput
              style={{
                textAlign: store.lang.id == 0 ? 'left' : 'right',
              }}
              value={values.facebook_url}
              maxLength={255}
              heading={`${store.lang.facebook_url}:`}
              error={touched.facebook_url && errors.facebook_url && true}
              containerStyle={styles.input}
              placeholder="https://www.facebook.com"
              onChangeText={handleChange('facebook_url')}
              onBlur={() => setFieldTouched('facebook_url')}
            />
            {touched.facebook_url && errors.facebook_url && (
              <JErrorText>{errors.facebook_url}</JErrorText>
            )}

            <JInput
              style={{
                textAlign: store.lang.id == 0 ? 'left' : 'right',
              }}
              value={values.linkedin_url}
              containerStyle={styles.input}
              maxLength={255}
              heading={`${store.lang.linkedIn_url}:`}
              error={touched.linkedin_url && errors.linkedin_url && true}
              //   autoFocus
              placeholder={'https://www.linkdin.com'}
              onChangeText={handleChange('linkedin_url')}
              onBlur={() => setFieldTouched('linkedin_url')}
            />
            {touched.linkedin_url && errors.linkedin_url && (
              <JErrorText>{errors.linkedin_url}</JErrorText>
            )}

            <JInput
              style={{
                textAlign: store.lang.id == 0 ? 'left' : 'right',
              }}
              value={values.twitter_url}
              maxLength={255}
              // icon={<Twitterx height={RFPercentage(2)} width={RFPercentage(2)} fill={colors.black[0]}/>}
              heading={` ${store.lang.twitter_url}:`}
              error={touched.twitter_url && errors.twitter_url && true}
              containerStyle={styles.input}
              placeholder="https://www.x.com"
              onChangeText={handleChange('twitter_url')}
              onBlur={() => setFieldTouched('twitter_url')}
            />
            {touched.twitter_url && errors.twitter_url && (
              <JErrorText>{errors.twitter_url}</JErrorText>
            )}
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

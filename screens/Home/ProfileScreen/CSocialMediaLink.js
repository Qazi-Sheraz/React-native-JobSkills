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
import {useNavigation, useRoute} from '@react-navigation/native';
import url from '../../../config/url';
import Toast from 'react-native-toast-message';
import JChevronIcon from '../../../customComponents/JChevronIcon';

function CSocialMediaLink({refRBSheet, data, user}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const {params}=useRoute()
// console.log(params.fb)
  return (
    <Formik
      initialValues={{
        facebook_url: params?.fb!==null?params?.fb:'',
        linkedin_url: params?.ln!==null?params?.ln:'',
        twitter_url: params?.tw!==null?params?.tw:'',
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
        fetch(store.token?.user?.owner_type.includes('Candidate') == false?`${url.baseUrl}/companyUpdate/${store.token?.user?.owner_id}`:`${url.baseUrl}/update-profile`, requestOptions)
          .then(response => response.json())
          .then(result => {
            // console.log(result);
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
              store.token?.user?.owner_type.includes('Candidate') == true&& _getProfile(store)
              navigation.goBack()

              // _getProfile(store);
              // alert(result);
            }
            setLoader(false);
          })
          .catch(error => {
            // console.log('error', error);
            setLoader(false);
          });
      }}
      // validationSchema={yup.object().shape({
      //   fb: yup.string().url().required().label('Facebook'),
      //   ln: yup.string().url().required().label('LinkedIn'),
      //   tw: yup.string().url().required().label('Twitter'),
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
                {store.lang.social_media_links}
              </JText>
            }
            right={
              
                <JText
                disabled={loader?true:false}
                  onPress={() => {setLoader(true)
                    isValid && handleSubmit()}}
                  fontColor={
                    !isValid ? `${colors.white[0]}70` : colors.white[0]
                  }>
                  {loader ? 
                <ActivityIndicator
                  color={colors.white[0]}
                  size={RFPercentage(2)}
                />:store.lang.save}
                </JText>
              
            }
            left={
              <JChevronIcon/>
            }
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
            {touched.facebook_url && errors.facebook_url && <JErrorText>{errors.facebook_url}</JErrorText>}

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
              placeholder={"https://www.linkdin.com"}
              onChangeText={handleChange('linkedin_url')}
              onBlur={() => setFieldTouched('linkedin_url')}
            />
            {touched.linkedin_url && errors.linkedin_url && <JErrorText>{errors.linkedin_url}</JErrorText>}

            <JInput
            style={{
              textAlign: store.lang.id == 0 ? 'left' : 'right',
            }}
              value={values.twitter_url}
              maxLength={255}
              heading={`${store.lang.twitter_url}:`}
              error={touched.twitter_url && errors.twitter_url && true}
              containerStyle={styles.input}
              placeholder="https://www.twitter.com"
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

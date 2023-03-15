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
function CSocialMediaLink({refRBSheet, data, user}) {
  const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  return (
    <Formik
      initialValues={{
        fb: user.facebook_url,
        ln: user.linkedin_url,
        tw: user.twitter_url,
      }}
      onSubmit={values => {
        console.log(values);
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${store.token.token}`);
        var formdata = new FormData();
        formdata.append('facebook_url', values.fb);
        formdata.append('twitter_url', values.tw);
        formdata.append('linkedin_url', values.ln);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        setLoader(true);
        fetch(
          'https://dev.jobskills.digital/api/update-profile',
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            console.log(result);
            if (result.success === false) {
              alert('Error while saving data');
            } else {
              _getProfile(store);
              alert(result);
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
              value={values.fb}
              heading={'Facebook'}
              error={touched.fb && errors.fb && true}
              containerStyle={styles.input}
              placeholder="Facebook"
              onChangeText={handleChange('fb')}
              onBlur={() => setFieldTouched('fb')}
            />
            {touched.fb && errors.fb && <JErrorText>{errors.fb}</JErrorText>}

            <JInput
              value={values.ln}
              containerStyle={styles.input}
              heading={'LinkedIn'}
              error={touched.ln && errors.ln && true}
              //   autoFocus
              placeholder="LinkedIn"
              onChangeText={handleChange('ln')}
              onBlur={() => setFieldTouched('ln')}
            />
            {touched.ln && errors.ln && <JErrorText>{errors.ln}</JErrorText>}

            <JInput
              value={values.tw}
              heading={'Twitter'}
              error={touched.tw && errors.tw && true}
              containerStyle={styles.input}
              placeholder="Twitter"
              onChangeText={handleChange('tw')}
              onBlur={() => setFieldTouched('tw')}
            />
            {touched.tw && errors.tw && <JErrorText>{errors.tw}</JErrorText>}
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

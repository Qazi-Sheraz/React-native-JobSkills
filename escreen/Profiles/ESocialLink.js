import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import JScreen from '../../customComponents/JScreen';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { baseUrl } from '../../ApiUrls';
import JChevronIcon from '../../customComponents/JChevronIcon';
import url from '../../config/url';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
const ESocialLink = () => {
  const store = useContext(StoreContext);
 
  return (
    <Formik
    initialValues={{
      fb: user.facebook_url,
      ln: user.linkedin_url,
      tw: user.twitter_url,
    }}
    onSubmit={values => {
      // console.log(values);
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${store.token.token}`,);
      var formdata = new FormData();
      formdata.append('facebook_url', values.fb);
      formdata.append('twitter_url', values.tw);
      formdata.append('linkedin_url', values.ln);
      // console.log(formdata)
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      setLoader(true);
      fetch(
        `${url.baseUrl}/companyUpdate/8`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          // console.log(result);
          if (result.success === false) {
            alert('Error while saving data');
          } else {
            // _getProfile(store);
            alert(result);
          }
          setLoader(false);
        })
        .catch(error => {
          // console.log('error', error);
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
          left={JChevronIcon}
        />

        <View style={{paddingHorizontal: RFPercentage(2)}}>
          <JInput
          style={{
            textAlign: store.lang.id == 0 ? 'left' : 'right',
          }}
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
          style={{
            textAlign: store.lang.id == 0 ? 'left' : 'right',
          }}
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
          style={{
            textAlign: store.lang.id == 0 ? 'left' : 'right',
          }}
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
  )
}

export default ESocialLink

const styles = StyleSheet.create({})
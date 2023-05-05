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

const ESocialLink = () => {
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
      myHeaders.append('Authorization', `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDZjZDg5MzZkNmQ0ZWE3NTQ5N2RlZDZhMDgwNjliNzM1NmRmYmQ5YzZlODRmZmFiZTE2NjQ4N2VkN2ExMWFkMzk1YzgyZjZkNGRkNWZkMGUiLCJpYXQiOjE2ODAyNTA2NDYuNzg0NjAxLCJuYmYiOjE2ODAyNTA2NDYuNzg0NjA0LCJleHAiOjE3MTE4NzMwNDYuNzc3NzY2LCJzdWIiOiI4NCIsInNjb3BlcyI6W119.XQA1UjOHQZkuqkLbAY0V8quXIn6dBY_ZIl8Igkko0Kv1ODdOrVXmUsnbUu59jeIg_I8mVgcnH3XGRSoEDAXb5YSocyD1POwDo7_ED1dc4TYeniS7RrBwoJ4ZTyLFdc0rWo7inelD9n2HoLHquTsh6_tz4QAyc8xaB4_58H3LvKo86FEWoBTY4NsP3CAGzylD-8-SEIHze-HfeYjaaRoVlDeQpY6d3mfqzmBummF7nKHtkLSgTCEEaEsIx2yhZTrapWL-5GKdx-aj1qmKbTE5WYGUgMVu-39Mz7GCvYMryN5HF-9Y4guufDMT0atrXnc7BkyRe0lIVfNE3ga9GcSePLDkzMrCbBjmfTmvKuxoT-sXyXFb7_vu8FogA6Pc7v77LTciuuc9duwRSpK3_fxMy4dZucnFTGx7tTWSwlipQWthwa3wd0gVs5F9cXpgVxLk4Pndxuq-PF8_DvpbWNOCXsm0KWO59zbPgSVyil18KUv4F9NduT49z3MQgzfY9yjE1rkSgRW5Va4PGQhVEle5f2Dce-bysgPhWWK0wrQtLd1AVpbhLIIqI4obDo-2OFdK62GwLor1RfKU0Qc_WiP-8UOljUnVBskGVRVlqvDL8yblrM7ro73JbgpJPlV4Uz67FaC22iyhLbJsRnbQpJVKWgfcw6jyGqjKPaspsFYpPoM`);
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
        `${baseUrl}/companyUpdate/8`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.success === false) {
            alert('Error while saving data');
          } else {
            // _getProfile(store);
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
          left={JChevronIcon}
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
  )
}

export default ESocialLink

const styles = StyleSheet.create({})
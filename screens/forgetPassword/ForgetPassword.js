import {StyleSheet, Text, View} from 'react-native';
import JScreen from '../../customComponents/JScreen';
import JCircularLogo from '../../customComponents/JCircularLogo';
import JText from '../../customComponents/JText';
import {Formik} from 'formik';
import JInput from '../../customComponents/JInput';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {StoreContext} from '../../mobx/store';
import React, {useState, useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import JFooter from '../../customComponents/JFooter';
import colors from '../../config/colors';
import JButton from '../../customComponents/JButton';
import {observer} from 'mobx-react';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as yup from 'yup';
import url from '../../config/url';
import {JToast} from '../../functions/Toast';
import JErrorText from '../../customComponents/JErrorText';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import JHeader from '../../customComponents/JHeader';
import JChevronIcon from '../../customComponents/JChevronIcon';
import JRow from '../../customComponents/JRow';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const {params} = useRoute();
  // console.log(params?.type);
  const type = params?.type;
  const [loader, setLoader] = useState();

  const _forgetPassword = values => {
    var formdata = new FormData();
    formdata.append('email', values?.email);
    //  console.log(formdata);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    setLoader(true);

    fetch(`${url.baseUrl}/forget-password`, requestOptions)
      .then(response => response.json())
      .then(result => {
        //  console.log('Result===>', result);

        if (result.success == true) {
          JToast({
            type: 'success',
            text1: store.lang.success,
            text2: store.lang.kindly_check_your_email_address,
          });
          navigation.navigate('CVerifiedEmail', {
            email: values.email,
            type: type,
          });
        } else {
          JToast({
            type: 'danger',
            text1: store.lang.eror,
            text2: result.message,
          });
        }
      })
      .catch(error => {
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: error.message,
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <JScreen
      header={
        <JRow style={{marginHorizontal: RFPercentage(2), marginTop: RFPercentage(4)}}>
          <JChevronIcon color={colors.black[0]} />
        </JRow>
      }>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingHorizontal: RFPercentage(2),
          marginTop: RFPercentage(2),
        }}>
        <JCircularLogo multiple={1.4} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <JText
            fontSize={RFPercentage(3.5)}
            fontWeight={'bold'}
            children={store.lang.forgot_pass}
            style={{marginTop: RFPercentage(2)}}
          />
          <JText
            fontSize={RFPercentage(2)}
            style={{marginVertical: RFPercentage(1)}}>
            {store.lang.forgot_txt}
          </JText>
        </View>
      </View>
      <Formik
        initialValues={{
          email: params?.email ? params?.email : '',
        }}
        onSubmit={values => {
          _forgetPassword(values);
          // navigation.navigate('CVerifiedEmail',{ email: values.email ,type: type})
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .min(0, store.lang.Email_address_cannot_be_empty)
            .max(
              100,
              store.lang.Email_address_must_be_at_most_100_characters_long,
            )
            .required(store.lang.Email_is_a_required_field),
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
          <View
            style={{
              flex: 0.5,
              paddingHorizontal: RFPercentage(3),
            }}>
            <JInput
              style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
              value={values.email}
              heading={store.lang.email}
              maxLength={100}
              icon={
                <Feather
                  name="mail"
                  style={{
                    marginRight:
                      store.lang.id == 0 ? RFPercentage(1.6) : RFPercentage(0),
                    marginLeft:
                      store.lang.id == 0 ? RFPercentage(0) : RFPercentage(1.6),
                  }}
                  size={RFPercentage(2.8)}
                  color={colors.purple[0]}
                />
              }
              placeholder={store.lang.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              error={touched.email && errors.email && true}
            />

            {touched.email && errors.email && (
              <JErrorText>{errors.email}</JErrorText>
            )}
            <JButton
              isValid={isValid}
              style={{
                marginTop: RFPercentage(10),
                paddingHorizontal: RFPercentage(6),
              }}
              onPress={() => handleSubmit()}
              children={loader ? store.lang.loading : store.lang.send}
            />
          </View>
        )}
      </Formik>

      <JFooter
        onPress={() => navigation.navigate('CLogin', {type: type})}
        children={store.lang.already_Login}
      />
    </JScreen>
  );
};

export default observer(ForgetPassword);

const styles = StyleSheet.create({});

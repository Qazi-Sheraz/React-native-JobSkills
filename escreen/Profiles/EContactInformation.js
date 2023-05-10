import {ActivityIndicator, ScrollView, StyleSheet, Switch} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {observer} from 'mobx-react';
import JInput from '../../customComponents/JInput';
import {Formik} from 'formik';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JErrorText from '../../customComponents/JErrorText';
import JText from '../../customComponents/JText';
import JSelectInput from '../../customComponents/JSelectInput';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../config/colors';
import JGradientHeader from '../../customComponents/JGradientHeader';
import {_getProfile} from '../../functions/Candidate/MyProfile';
import {useNavigation} from '@react-navigation/native';
import JScreen from '../../customComponents/JScreen';
import * as yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import JNewJobIcon from '../../customComponents/JNewJobIcon';
import JChevronIcon from '../../customComponents/JChevronIcon';
import url from '../../config/url';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
function EContactInformation({refRBSheet, data, user}) {
  //   const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const [info, setInfo] = useState();
  const navigation = useNavigation();
  const store = useContext(StoreContext);
  const phoneInput = useRef(null);

  const _contactInfo = values => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token.token}`,
    );
    var formdata = new FormData();
    formdata.append('name', 'Hamza');
    formdata.append('phone', '9999999999');
    formdata.append('industry_id', '2');
    formdata.append('country_id', '191');
    formdata.append('state_id', '3147');
    formdata.append('city_id', '37410');
    formdata.append('email', 'employer@jobskills.digital');
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${url.baseUrl}/companyUpdate/8`, requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result)})
      .catch(error => console.log('error', error));
  };

  const _getcountry = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token.token}`,
    );
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(`${url.baseUrl}/company/company-information`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setInfo(result)})
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    _getcountry();
  }, [loader]);

  return (
    <JScreen headerShown={false}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          countries: '',
          state: '',
          city: '',
          phone: '',
        }}
        onSubmit={values => {
          console.log(values);
          _contactInfo(values);
        }}
        validationSchema={yup.object().shape({
          // name: yup.string().required().label('Title'),
          email: yup
            .string()
            .min(0, 'Email address cannot be empty')
            .max(30, 'Email address must be at most 30 characters long')
            .email('Must be a valid email')
            .required()
            .label('Company'),
          // countries: yup.string().required().label('Country'),
          // city: yup.string().required().label('City'),
          // state: yup.string().required().label('State'),
          phone: yup
            .string()
           .max(14)
            .required()
            .label('Phone'),
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
          <>
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
                    onPress={() => handleSubmit()}
                    fontColor={
                      !isValid ? `${colors.white[0]}70` : colors.white[0]
                    }>
                    Save
                  </JText>
                )
              }
              left={JChevronIcon}
            />
            <ScrollView
              contentContainerStyle={{paddingBottom: RFPercentage(8)}}
              style={{
                marginHorizontal: RFPercentage(2),
              }}>
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={'Name:'}
                value={values.name}
                error={touched.name && errors.name && true}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
              />
              {touched.name && errors.name && (
                <JErrorText>{errors.name}</JErrorText>
              )}
              <JInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.email}
                heading={'Email:'}
                error={touched.email && errors.email && true}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <JErrorText>{errors.email}</JErrorText>
              )}

              <PhoneInput
                ref={phoneInput}
                defaultValue={values.phone}
                defaultCode="PK"
                containerStyle={{
                  width: '100%',
                  borderBottomWidth: RFPercentage(0.1),
                  paddingTop: 15,
                  marginBottom: RFPercentage(2),
                }}
                textContainerStyle={{
                  paddingVertical: 5,
                  backgroundColor: 'transparent',
                }}
                onChangeFormattedText={text => {
                  setFieldValue('phone', text);
                }}
              />
              {touched.phone && errors.phone && (
                <JErrorText>{errors.phone}</JErrorText>
              )}
              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.countries?.name}
                id={values.countries?.id}
                data={info?.countries}
                setValue={e => setFieldValue('countries', e)}
                header={'Country'}
                heading={'Country :'}
                error={touched.countries && errors.countries && true}
                rightIcon={<JNewJobIcon />}
              />
              {touched.countries && errors.countries && (
                <JErrorText>{errors.countries}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.state?.name}
                id={values.countries?.id}
                setValue={e => setFieldValue('state', e)}
                header={'State'}
                heading={'State :'}
                error={touched.state && errors.state && true}
                rightIcon={<JNewJobIcon />}
              />
              {touched.state && errors.state && (
                <JErrorText>{errors.state}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.city?.name}
                setValue={e => setFieldValue('city', e)}
                header={'City'}
                heading={'City :'}
                id={values.state?.id}
                error={touched.city && errors.city && true}
                rightIcon={<JNewJobIcon />}
              />
              {touched.city && errors.city && (
                <JErrorText>{errors.city}</JErrorText>
              )}
            </ScrollView>
          </>
        )}
      </Formik>
    </JScreen>
  );
}
export default observer(EContactInformation);
const styles = StyleSheet.create({});

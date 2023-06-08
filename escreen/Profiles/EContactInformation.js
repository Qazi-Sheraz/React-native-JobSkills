import {ActivityIndicator, ScrollView, StyleSheet, Switch} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {observer} from 'mobx-react';
import JInput from '../../customComponents/JInput';
import {Formik} from 'formik';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JErrorText from '../../customComponents/JErrorText';
import JText from '../../customComponents/JText';
import JSelectInput from '../../customComponents/JSelectInput';
import colors from '../../config/colors';
import JGradientHeader from '../../customComponents/JGradientHeader';
import {_getProfile} from '../../functions/Candidate/MyProfile';
import {useNavigation, useRoute} from '@react-navigation/native';
import JScreen from '../../customComponents/JScreen';
import * as yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import JNewJobIcon from '../../customComponents/JNewJobIcon';
import JChevronIcon from '../../customComponents/JChevronIcon';
import url from '../../config/url';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
import Toast from 'react-native-toast-message';

function EContactInformation({refRBSheet, data, user}) {
  //   const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const [info, setInfo] = useState();
  const [update, setUpdate] = useState();
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const store = useContext(StoreContext);
  const phoneInput = useRef(null);
  const {params}=useRoute();

  const _contactInfo = values => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var formdata = new FormData();
    formdata.append('name', values?.name);
    formdata.append('phone',  values?.phone.slice(1));
    formdata.append("industry_id", "2");
    formdata.append('country_id',  values?.countries.id);
    formdata.append('state_id',  values?.state.id);
    formdata.append('city_id',  values?.city.id);
    formdata.append('email',  values?.email);

    // console.log(formdata);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(
      `${url.baseUrl}/companyUpdate/${store.token?.user?.owner_id}`,
      requestOptions,
    )
      .then(response => response?.json())
      .then(result => {
        // console.log('result', result);
        // if (result?.success) {
          // setUpdate(values);
          Toast.show({
            type: 'success',
            text1: 'Successfully update',
          });
          navigation.goBack()
      })
      .catch(error =>
      Toast.show({
        type: 'error',
        text1: ('Something went wrong'),
      }))
  };

  const _getcountry = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(`${url.baseUrl}/company/company-information`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setInfo(result);
      })
      .catch(error => {console.log('error', error),setError(true)})
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    _getcountry();
  }, []);
// console.log(info?.state)
//   const searchKey = params.country;
//   const searchValue = info?.countries[searchKey];
//   // const searchKey = params.state;
//   // const searchValue = info?.countries[searchKey];
//   // const searchKey = params.city;
//   // const searchValue = info?.countries[searchKey];
  
//   // console.log('Found value:', searchValue);
  return (
    <JScreen
      headerShown={false}
      isError={error}
      onTryAgainPress={() => {
        _getcountry(), setError(false);
      }}>
      <Formik
        initialValues={{
          name: store.token?.user?.first_name,
          email: params?.user_email ? params?.user_email : '',
          countries:
            params?.country && params?.country_id
              ? {
                  name: params?.country,
                  id: params?.country_id,
                }
              : '',
          state:
            params?.state && params?.state_id
              ? {
                  name: params?.state,
                  id: params?.state_id,
                }
              : '',
          city:
            params?.city && params?.city_id
              ? {
                  name: params?.city,
                  id: params?.city_id,
                }
              : '',
          phone: '',
        }}
        onSubmit={values => {
          // console.log(values);
          _contactInfo(values);
        }}
        validationSchema={yup.object().shape({
          // name: yup.string().required().label('Title'),
          email: yup
            .string()
            .min(0, 'Email address cannot be empty')
            .email('Must be a valid email')
            .required(),
          // countries: yup.string().required().label('Country'),
          // city: yup.string().min(3,'minimum 3 leter').required().label('City'),
          // state: yup.string().required().label('State'),
          phone: yup.string().max(14).required().label('Phone'),
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
                  {store.lang.contact}
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
                      isValid ? colors.white[0] : `${colors.white[0]}70`
                    }>
                    {store.lang.save}
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
                style={{
                  textAlign: store.lang.id == 0 ? 'left' : 'right',
                }}
                containerStyle={{marginTop: RFPercentage(2)}}
                heading={`${store.lang.name}:`}
                value={values.name}
                error={touched.name && errors.name && true}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
              />
              {touched.name && errors.name && (
                <JErrorText>{errors.name}</JErrorText>
              )}
              <JInput
                style={{
                  textAlign: store.lang.id == 0 ? 'left' : 'right',
                }}
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.email}
                heading={`${store.lang.email}:`}
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
                defaultCode="SA"
                placeholder={store.lang.phone_number}
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
                data={store.lang.id==0?store.jobCreate?.english_data?.countries:store.jobCreate?.arabic_data?.countries}
                setValue={e => setFieldValue('countries', e)}
                header={store.lang.country}
                heading={`${store.lang.country}:`}
                error={touched.countries && errors.countries && true}
                rightIcon={<JNewJobIcon />}
              />
              {touched.countries && errors.countries && (
                <JErrorText>{errors.countries}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={store.lang.id==0?values.state?.name:values.state?.arabic_title}
                id={values.countries?.id}
                setValue={e => setFieldValue('state', e)}
                header={store.lang.state}
                heading={`${store.lang.state}:`}
                error={touched.state && errors.state && true}
                rightIcon={<JNewJobIcon />}
              />
              {touched.state && errors.state && (
                <JErrorText>{errors.state}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={store.lang.id==0?values.city?.name:values.city?.arabic_title}
                setValue={e => setFieldValue('city', e)}
                header={store.lang.city}
                heading={`${store.lang.city}:`}
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

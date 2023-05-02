import {ActivityIndicator, ScrollView, StyleSheet, Switch} from 'react-native';
import React ,{useState,useRef}from 'react';
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

import PhoneInput from 'react-native-phone-number-input';
function EContactInformation({refRBSheet, data, user}) {
//   const store = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const phoneInput = useRef(null);
 

  return (
    <JScreen headerShown={false}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          country: '',
          state: '',
          city: '',
        }}
        // onSubmit={values => {
        //   console.log(values);
        //   _postData(values);
        // }}
        // validationSchema={yup.object().shape({
        //   title: yup.string().required().label('Title'),
        //   company: yup.string().required().label('Company'),
        //   county: yup.string().required().label('Country'),
        //   city: yup.string().required().label('City'),
        //   state: yup.string().required().label('State'),
        //   start: yup.string().required().label('Start'),
        //   end: yup.string().required().label('End'),
        //   description: yup.string().required().label('Description'),
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
                value={values.country?.name}
                // data={data.countries}
                header={'Country'}
                heading={'Country :'}
                setValue={e => {
                  setFieldValue('country', e);
                  setFieldValue('state', null);
                  setFieldValue('city', null);
                }}
                error={touched.country && errors.country && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
              />
              {touched.country && errors.country && (
                <JErrorText>{errors.country}</JErrorText>
              )}

              <JSelectInput
                containerStyle={{marginTop: RFPercentage(2)}}
                value={values.state?.name}
                id={values.country?.id}
                setValue={e => setFieldValue('state', e)}
                header={'State'}
                heading={'State :'}
                error={touched.state && errors.state && true}
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
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
                rightIcon={
                  <Feather
                    name="chevron-down"
                    size={RFPercentage(2.5)}
                    color={colors.black[0]}
                  />
                }
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

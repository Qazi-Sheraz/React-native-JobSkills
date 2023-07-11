import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import JGradientProfileHeader from '../../../customComponents/JGradientProfileHeader';
import JInput from '../../../customComponents/JInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import JErrorText from '../../../customComponents/JErrorText';
import PhoneInput from 'react-native-phone-number-input';

import JText from '../../../customComponents/JText';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import colors from '../../../config/colors';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import {_getProfile} from '../../../functions/Candidate/MyProfile';
import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import JRow from '../../../customComponents/JRow';
import { JToast } from '../../../functions/Toast';
import url from '../../../config/url';
import { values } from 'mobx';

function CContactInformation({refRBSheet, user}) {
  
  const {params}=useRoute();
  const phoneInput = useRef(null);
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState(params?.phone);
  const [code, setCode] = useState(params?.region_code!==null&&params?.region_code);
// console.log(phone)
console.log(code)
  const regionalCodeMappings = {
    "93": "AF", // Afghanistan
    "355": "AL", // Albania
    "213": "DZ", // Algeria
    "376": "AD", // Andorra
    "244": "AO", // Angola
    "1-268": "AG", // Antigua and Barbuda
    "54": "AR", // Argentina
    "374": "AM", // Armenia
    "61": "AU", // Australia
    "43": "AT", // Austria
    "994": "AZ", // Azerbaijan
    "1-242": "BS", // Bahamas
    "973": "BH", // Bahrain
    "880": "BD", // Bangladesh
    "1-246": "BB", // Barbados
    "375": "BY", // Belarus
    "32": "BE", // Belgium
    "501": "BZ", // Belize
    "229": "BJ", // Benin
    "975": "BT", // Bhutan
    "591": "BO", // Bolivia
    "387": "BA", // Bosnia and Herzegovina
    "267": "BW", // Botswana
    "55": "BR", // Brazil
    "673": "BN", // Brunei
    "359": "BG", // Bulgaria
    "226": "BF", // Burkina Faso
    "257": "BI", // Burundi
    "238": "CV", // Cabo Verde
    "855": "KH", // Cambodia
    "237": "CM", // Cameroon
    "1": "CA", // Canada
    "236": "CF", // Central African Republic
    "235": "TD", // Chad
    "56": "CL", // Chile
    "86": "CN", // China
    "57": "CO", // Colombia
    "269": "KM", // Comoros
    "243": "CD", // Congo, Democratic Republic of the
    "242": "CG", // Congo, Republic of the
    "506": "CR", // Costa Rica
    "225": "CI", // Cote d'Ivoire (Ivory Coast)
    "385": "HR", // Croatia
    "53": "CU", // Cuba
    "357": "CY", // Cyprus
    "420": "CZ", // Czech Republic
    "45": "DK", // Denmark
    "253": "DJ", // Djibouti
    "1-767": "DM", // Dominica
    "1-809": "DO", // Dominican Republic
    "1-829": "DO", // Dominican Republic
    "1-849": "DO", // Dominican Republic
    "670": "TL", // East Timor (Timor-Leste)
    "593": "EC", // Ecuador
    "20": "EG", // Egypt
    "503": "SV", // El Salvador
    "240": "GQ", // Equatorial Guinea
    "291": "ER", // Eritrea
    "372": "EE", // Estonia
    "268": "SZ", // Eswatini (f.k.a. Swaziland)
    "251": "ET", // Ethiopia
    "679": "FJ", // Fiji
    "358": "FI", // Finland
    "33": "FR", // France
  }

  
  const _postData = values => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var formdata = new FormData();

    formdata.append('phone', phone);
    formdata.append('region_code', code==false?'966':code);
    console.log(formdata)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setLoader(true);
    fetch(`${url.baseUrl}/update-profile`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result.success === false) {
          alert('Error while saving data');
        } else {
          _getProfile(store);
          JToast({
            type: 'success',
            text1: result,
          });
          // alert(result);
          navigation.navigate('Aboutme')
        }
        setLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        setLoader(false);
      });
  };
  
  return (
    <Formik
      initialValues={{
        email: store.myProfile.user[0]?.contact_information?.email_address,
        // phone: params.phone?params.phone?.slice(3):'',
        phone:params.phone!==null?params?.phone:'',
        regional_code:params.region_code!==null?regionalCodeMappings[params?.region_code]:'',
      }}
      onSubmit={values => {
        // console.log('regional;;;;;;;',values.regional_code);
        _postData(values);
      }}
      validationSchema={yup.object().shape({
        email: yup.string().email('Must be a valid email'),
        phone: yup.string().max(12).required().label('Phone'),
        // regional_code: yup.string().min(2).required().label('code'),
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
                  onPress={() =>  handleSubmit()}
                  fontColor={
                    !isValid ? `${colors.white[0]}70` : colors.white[0]
                  }>
                  {store.lang.save}
                </JText>
              )
            }
            left={
             <JChevronIcon/>
            }
          />

          <View
            style={{
              marginTop: RFPercentage(3),
              paddingHorizontal: RFPercentage(2),
            }}>
            <JInput
              value={values.email}
              heading={`${store.lang.email}:`}
              error={touched.email && errors.email && true}
              placeholder={store.lang.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <JErrorText>{errors.email}</JErrorText>
            )}
            <View>
              <JRow
                style={{
                  marginTop: RFPercentage(3),
                }}>
                <JText fontWeight="500" fontSize={RFPercentage(2.5)}>
                  {store.lang.phone_number}
                </JText>
              </JRow>
              <PhoneInput
                  ref={phoneInput}
                  defaultValue={values.phone}
                  // defaultCode={code?.cca2?code?.cca2:"SA"}
                  defaultCode={values.regional_code!==null ? values.regional_code:  params?.region_code!==null?code:"SA"}
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
                  onChangeFormattedText={(text,c) => {
                    setFieldValue('phone', text);
                    setFieldValue('regional_code', c);
                  }}
                  onChangeCountry={(e)=>{
                    setCode(e.callingCode[0])
                  }}
                  onChangeText={(e)=>{
                    setFieldValue(e);
                    setPhone(e)
                  }}
                />
                {touched.phone && errors.phone && (
                  <JErrorText>{errors.phone}</JErrorText>
                )}
            </View>
          </View>
        </JScreen>
      )}
    </Formik>
  );
}
export default observer(CContactInformation);
const styles = StyleSheet.create({});

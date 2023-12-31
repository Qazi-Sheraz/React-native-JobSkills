import {ActivityIndicator, Alert, Platform, StyleSheet, View} from 'react-native';
import React, {useRef,useState,useContext} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import JInput from '../../../customComponents/JInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JErrorText from '../../../customComponents/JErrorText';
import PhoneInput from 'react-native-phone-number-input';
import JText from '../../../customComponents/JText';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import colors from '../../../config/colors';
import {StoreContext} from '../../../mobx/store';
import {_getProfile} from '../../../functions/Candidate/MyProfile';
import {useNavigation, useRoute} from '@react-navigation/native';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import JRow from '../../../customComponents/JRow';
import { JToast } from '../../../functions/Toast';
import url from '../../../config/url';

function CContactInformation({refRBSheet, user}) {
  
  const {params}=useRoute();
  const phoneInput = useRef(null);
  const store = useContext(StoreContext);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState(params?.phone);
  const [code, setCode] = useState(params?.region_code!==null&&params?.region_code);
  console.log(params)
 


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
    "672": "AQ",// Antarctica
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
    "241": "GA", // Gabon
    "220": "GM", // Gambia
    "995": "GE", // Georgia
    "49": "DE", // Germany
    "233": "GH", // Ghana
    "30": "GR", // Greece
    "1-473": "GD", // Grenada
    "502": "GT", // Guatemala
    "224": "GN", // Guinea
    "245": "GW", // Guinea-Bissau
    "592": "GY", // Guyana
    "509": "HT", // Haiti
    "504": "HN", // Honduras
    "36": "HU", // Hungary
    "354": "IS", // Iceland
    "91": "IN", // India
    "62": "ID", // Indonesia
    "98": "IR", // Iran
    "964": "IQ", // Iraq
    "353": "IE", // Ireland
    "972": "IL", // Israel
    "39": "IT", // Italy
    "1-876": "JM", // Jamaica
    "81": "JP", // Japan
    "962": "JO", // Jordan
    "7": "KZ", // Kazakhstan
    "254": "KE", // Kenya
    "686": "KI", // Kiribati
    "850": "KP", // North Korea
    "82": "KR", // South Korea
    "383": "XK", // Kosovo
    "965": "KW", // Kuwait
    "996": "KG", // Kyrgyzstan
    "856": "LA", // Laos
    "371": "LV", // Latvia
    "961": "LB", // Lebanon
    "266": "LS", // Lesotho
    "231": "LR", // Liberia
    "218": "LY", // Libya
    "423": "LI", // Liechtenstein
    "370": "LT", // Lithuania
    "352": "LU", // Luxembourg
    "261": "MG", // Madagascar
    "265": "MW", // Malawi
    "60": "MY", // Malaysia
    "960": "MV", // Maldives
    "223": "ML", // Mali
    "356": "MT", // Malta
    "692": "MH", // Marshall Islands
    "222": "MR", // Mauritania
    "230": "MU", // Mauritius
    "52": "MX", // Mexico
    "691": "FM", // Micronesia
    "373": "MD", // Moldova
    "377": "MC", // Monaco
    "976": "MN", // Mongolia
    "382": "ME", // Montenegro
    "212": "MA", // Morocco
    "258": "MZ", // Mozambique
    "95": "MM", // Myanmar (Burma)
    "264": "NA", // Namibia
    "674": "NR", // Nauru
    "977": "NP", // Nepal
    "31": "NL", // Netherlands
    "64": "NZ", // New Zealand
    "505": "NI", // Nicaragua
    "227": "NE", // Niger
    "234": "NG", // Nigeria
    "850": "MP", // Northern Mariana Islands
    "47": "NO", // Norway
    "968": "OM", // Oman
    "92": "PK", // Pakistan
    "680": "PW", // Palau
    "970": "PS", // Palestine
    "507": "PA", // Panama
    "675": "PG", // Papua New Guinea
    "595": "PY", // Paraguay
    "51": "PE", // Peru
    "63": "PH", // Philippines
    "48": "PL", // Poland
    "351": "PT", // Portugal
    "1-787": "PR", // Puerto Rico
    "974": "QA", // Qatar
    "262": "RE", // Reunion
    "40": "RO", // Romania
    "7": "RU", // Russia
    "250": "RW", // Rwanda
    "290": "SH", // Saint Helena
    "1-869": "KN", // Saint Kitts and Nevis
    "1-758": "LC", // Saint Lucia
    "508": "PM", // Saint Pierre and Miquelon
    "1-784": "VC", // Saint Vincent and the Grenadines
    "685": "WS", // Samoa
    "378": "SM", // San Marino
    "239": "ST", // Sao Tome and Principe
    "966": "SA", // Saudi Arabia
    "221": "SN", // Senegal
    "381": "RS", // Serbia
    "248": "SC", // Seychelles
    "232": "SL", // Sierra Leone
    "65": "SG", // Singapore
    "421": "SK", // Slovakia
    "386": "SI", // Slovenia
    "677": "SB", // Solomon Islands
    "252": "SO", // Somalia
    "27": "ZA", // South Africa
    "211": "SS", // South Sudan
    "34": "ES", // Spain
    "94": "LK", // Sri Lanka
    "249": "SD", // Sudan
    "597": "SR", // Suriname
    "47": "SJ", // Svalbard and Jan Mayen
    "46": "SE", // Sweden
    "41": "CH", // Switzerland
    "963": "SY", // Syria
    "886": "TW", // Taiwan
    "992": "TJ", // Tajikistan
    "255": "TZ", // Tanzania
    "66": "TH", // Thailand
    "228": "TG", // Togo
    "690": "TK", // Tokelau
    "676": "TO", // Tonga
    "1-868": "TT", // Trinidad and Tobago
    "216": "TN", // Tunisia
    "90": "TR", // Turkey
    "993": "TM", // Turkmenistan
    "1-649": "TC", // Turks and Caicos Islands
    "688": "TV", // Tuvalu
    "256": "UG", // Uganda
    "380": "UA", // Ukraine
    "971": "AE", // United Arab Emirates
    "44": "GB", // United Kingdom
    "1": "US", // United States
    "598": "UY", // Uruguay
    "998": "UZ", // Uzbekistan
    "678": "VU", // Vanuatu
    "379": "VA", // Vatican City
  }

  
  const _postData = values => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var formdata = new FormData();

    formdata.append('phone', values?.phone);
    formdata.append('region_code', values?.regional_code?.code);
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
            text1: store.lang.success,
            text2: result.message,
          });
          // alert(result);
          navigation.navigate('Aboutme')
        }
        setLoader(false);
      })
      .catch(error => {
        //  console.log('error', error);
        setLoader(false);
      });
  };
  
  return (
    <Formik
      initialValues={{
        email: store.myProfile.user[0]?.contact_information?.email_address,
        // phone: params.phone?params.phone?.slice(3):'',
        phone:params?.phone?params?.phone:'',
        regional_code:params?.region_code?
        {
          code:params?.region_code,
          cca:regionalCodeMappings[params?.region_code]
        }:'',
        // regional_code:params?.region_code?regionalCodeMappings[params?.region_code]:'',
      }}
      onSubmit={values => {
        // console.log('phone;;;;;;;',values.phone);
        // console.log('regional;;;;;;;',values.regional_code.code.length);
        _postData(values);
      }}
      validationSchema={yup.object().shape({
        email: yup.string().max(100, store.lang.Email_address_must_be_at_most_100_characters_long).email(store.lang.Must_be_a_valid_email),
        phone: yup.string().matches(/^\+?[0-9]\d*$/, store.lang.Phone_Number_must_be_a_digit).min(10,store.lang.Phone_must_be_atleast_10_characters).max(14,store.lang.Phone_must_be_at_most_14_characters).required(store.lang.Phone_Name_is_a_required_field).label(store.lang.Phone),

      })}>
      {({
        values,
        errors,
        touched,
        isValid,
        handleSubmit,
        handleChange,
        setFieldValue,
        setFieldTouched,
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
            isRequired
              value={values.email}
              heading={`${store.lang.email}:`}
              maxLength={100}
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
                  marginTop: RFPercentage(2),
                }}>
                <JText fontWeight={Platform.OS=='ios' ?"400":'500'} fontSize={RFPercentage(2.5)}>
                  {store.lang.phone_number}:
                </JText>
                <JText fontWeight="400" fontSize={RFPercentage(2.5)} fontColor='red'>
                    {` *`}
                    </JText>
              </JRow>
              <PhoneInput
              textInputProps={{maxLength:values.regional_code?.code?.length == 2 ? 11 : 14}}
                  ref={phoneInput}
                  defaultValue={values.phone}
                  // defaultCode={code?.cca2?code?.cca2:"SA"}
                  codeTextStyle={{fontWeight:'400'}}
                  defaultCode={values.regional_code? values.regional_code.cca:"SA"}
                  placeholder={store.lang.phone_number}
                  containerStyle={{
                    width: '100%',
                    borderBottomWidth: RFPercentage(0.1),
                    
                  }}
                  textContainerStyle={{
                    paddingVertical: 5,
                    backgroundColor: 'transparent',
                  }}
                  textInputStyle= {{
                    color: colors.black[0],
                    fontSize: RFPercentage(2.1),
                    marginTop: RFPercentage(0.1),
                    
                  }}
                
                  // onChangeFormattedText={(text,c) => {
                  //   setFieldValue('phone', text);
                  //   setFieldValue('regional_code', c);
                  // }}
                  onChangeCountry={(e)=>{
                    setFieldValue('regional_code', {code:e.callingCode[0],cca:e.cca2});
                    // setCode(e.callingCode[0])
                    // console.log(e)
                  }}
                  onChangeText={(e)=>{
                    setFieldValue('phone', e);
                    // setPhone(e)
                    // console.log(e)

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

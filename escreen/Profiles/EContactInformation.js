import { ActivityIndicator, ScrollView, StyleSheet, Switch, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import JInput from '../../customComponents/JInput';
import { Formik } from 'formik';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JErrorText from '../../customComponents/JErrorText';
import JText from '../../customComponents/JText';
import JSelectInput from '../../customComponents/JSelectInput';
import colors from '../../config/colors';
import JGradientHeader from '../../customComponents/JGradientHeader';
import { _getProfile } from '../../functions/Candidate/MyProfile';
import { useNavigation, useRoute } from '@react-navigation/native';
import JScreen from '../../customComponents/JScreen';
import * as yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import JNewJobIcon from '../../customComponents/JNewJobIcon';
import JChevronIcon from '../../customComponents/JChevronIcon';
import url from '../../config/url';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
import { _addnewJob } from '../../functions/Candidate/BottomTab';
import { JToast } from '../../functions/Toast';
import JRow from '../../customComponents/JRow';

function EContactInformation({ refRBSheet, data, user }) {
  //   const store = useContext(StoreContext);
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
  const [info, setInfo] = useState();
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const store = useContext(StoreContext);
  const phoneInput = useRef(null);
  const { params } = useRoute();
  const [phone, setPhone] = useState(params?.phone);
  const [code, setCode] = useState(params?.region_code !== null && params?.region_code);

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
  // console.log('region_code',regionalCodeMappings[params?.region_code])
  // console.log('phone',params?.phone)
  // console.log('jkkkkk',params)
  const _getcountry = values => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'Get',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      `${url.baseUrl}/country-list`,
      requestOptions,
    )
      .then(response => response?.json())
      .then(result => {
        // console.log(result);
        setInfo(result)
      })
      .catch(error => {
        setError(true)
      })
      .finally(() => {
        setLoader(false);
      })

  };

  const _contactInfo = values => {
    setLoader1(true)
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var formdata = new FormData();
    formdata.append('name', values?.name);
    formdata.append('phone', phone);
    formdata.append('region_code', code !== false ? code : '966');
    formdata.append('industry_id', '2');
    formdata.append('country_id', values?.countries.id);
    formdata.append('state_id', values?.state.id);
    formdata.append('city_id', values?.city.id);
    formdata.append('email', values?.email);

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

        JToast({
          type: 'success',
          text1: store.lang.success,
          text2: store.lang.successfully_update,
        });
        setLoader1(false)
        navigation.goBack();
      })
      .catch(error =>
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.an_error_occurred_please_try_again_later,
        }),
       
      )
      .finally(() => {
        setLoader1(false);
      })
  };
  useEffect(() => {
    _getcountry();
  }, []);
  // console.log('Found value:', store.jobCreate);
  return (
    <JScreen
      headerShown={false}
      isError={store.createApiError}
      onTryAgainPress={() => {
        _addnewJob(store);
      }}>
      {store?.createApiLoader === true ? (
        <ActivityIndicator />
      ) : (
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
                ? (store.lang.id == 0 ? {
                  name: params?.state,
                  id: params?.state_id,
                } : {
                  arabic_title: params?.state,
                  id: params?.state_id,
                })
                : '',
            city:
              params?.city && params?.city_id
                ? (store.lang.id == 0 ? {
                  name: params?.city,
                  id: params?.city_id,
                } : {
                  arabic_title: params?.city,
                  id: params?.city_id,
                })
                : '',
            phone: params?.phone ? params?.phone : '',
            regional_code: params?.region_code ? regionalCodeMappings[params?.region_code] : '',
          }}
          onSubmit={values => {
            _contactInfo(values);
          }}
          validationSchema={yup.object().shape({
            name: yup
            .string()
            .min(3, store.lang.Name_Must_be_at_least_3_characters)
            .max(100,store.lang.Name_must_be_at_most_100_characters_long)
            .transform(value => value.trim())
            .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, store.lang.Name_must_contains_only_alphabets)
            // .matches(/^[^!@#$%^&*()_+={}|[\]\\:';"<>?,./0-9]+$/, 'Symbols are not allowed in the First Name')
            .required(store.lang.Name_is_a_required_field),
            countries: yup
              .object()
              .shape()
              .required(store.lang.Country_is_required),
            city: yup
              .object()
              .shape()
              .required(store.lang.City_is_required),
            state: yup
              .object()
              .shape()
              .required(store.lang.State_is_required),
            email: yup
              .string()
              .min(0, store.lang.Email_is_a_required_field)
              .max(100, store.lang.Email_address_must_be_at_most_100_characters_long)
              .email(store.lang.Must_be_a_valid_email)
              .required(store.lang.Email_is_a_required_field),

            phone: yup.string().min(10,store.lang.Phone_must_be_atleast_10_characters).max(14,store.lang.Phone_must_be_at_most_14_characters).required(store.lang.Phone_must_be_atleast_10_characters).label(store.lang.Phone),
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
                  <JText
                    // disabled={loader ? true : false}
                    onPress={() => {
                      handleSubmit()
                    }}
                    fontColor={
                      isValid ? colors.white[0] : `${colors.white[0]}70`
                    }>
                    {loader1 ?
                      <ActivityIndicator
                        color={colors.white[0]}
                        size={RFPercentage(2)}
                      /> : store.lang.save}
                  </JText>

                }
                left={JChevronIcon}
              />
              <ScrollView
                contentContainerStyle={{ paddingBottom: RFPercentage(8) }}
                style={{
                  marginHorizontal: RFPercentage(2),
                }}>
                <JInput
                  style={{
                    textAlign: store.lang.id == 0 ? 'left' : 'right',
                  }}
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  heading={`${store.lang.name}:`}
                  maxLength={100}
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
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  value={values.email}
                  maxLength={100}
                  heading={`${store.lang.email}:`}
                  error={touched.email && errors.email && true}
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
                    <JText fontWeight="500" fontSize={RFPercentage(2.5)}>
                      {store.lang.phone_number}:
                    </JText>
                  </JRow>
                  <PhoneInput
                   textInputProps={{maxLength:15}}
                    ref={phoneInput}
                    defaultValue={values.phone}
                    // defaultCode={code?.cca2?code?.cca2:"SA"}
                    defaultCode={values.regional_code ? values.regional_code : "SA"}
                    placeholder={store.lang.phone_number}
                    containerStyle={{
                      width: '100%',
                      borderBottomWidth: RFPercentage(0.1),
                    }}
                    textInputStyle= {{
                      color: colors.black[0],
                      fontSize: RFPercentage(2.1),
                      marginTop: RFPercentage(0.1),
                    }}
                    textContainerStyle={{
                      paddingVertical: 5,
                      backgroundColor: 'transparent',
                    }}
                    onChangeFormattedText={(text, c) => {
                      setFieldValue('phone', text);
                      setFieldValue('regional_code', c);
                    }}
                    onChangeCountry={(e) => {
                      setCode(e.callingCode[0])
                    }}
                    onChangeText={(e) => {
                      setFieldValue(e);
                      setPhone(e)
                    }}
                  />
                  {touched.phone && errors.phone && (
                    <JErrorText>{errors.phone}</JErrorText>
                  )}
                </View>

                <JSelectInput
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  value={values.countries?.name}
                  id={values.countries?.id}
                  data={
                    store.lang.id == 0
                      ? store.jobCreate?.english_data?.countries
                      : store.jobCreate?.arabic_data?.countries
                  }
                  setValue={e => {
                    setFieldValue('countries', e)
                    setFieldValue('state', '');
                    setFieldValue('city', '');
                  }}
                  header={store.lang.country}
                  heading={`${store.lang.country}:`}
                  error={touched.countries && errors.countries && true}
                  rightIcon={<JNewJobIcon />}
                />
                {touched.countries && errors.countries && (
                  <JErrorText>{errors.countries}</JErrorText>
                )}

                <JSelectInput
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  value={
                    store.lang.id == 0
                      ? values.state?.name
                      : values.state?.arabic_title
                  }
                  id={values.countries?.id}
                  setValue={e => { setFieldValue('state', e); setFieldValue('city', null); }}
                  header={store.lang.state}
                  heading={`${store.lang.state}:`}
                  error={touched.state && errors.state && true}
                  rightIcon={<JNewJobIcon />}
                />
                {touched.state && errors.state && (
                  <JErrorText>{errors.state}</JErrorText>
                )}

                <JSelectInput
                  containerStyle={{ marginTop: RFPercentage(2) }}
                  value={
                    store.lang.id == 0
                      ? values.city?.name
                      : values.city?.arabic_title
                  }
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
      )}
    </JScreen>
  );
}
export default observer(EContactInformation);
const styles = StyleSheet.create({});

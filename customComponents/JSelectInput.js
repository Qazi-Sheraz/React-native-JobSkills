import {
  StyleSheet,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import JGradientHeader from './JGradientHeader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';
import JRow from './JRow';
import {useContext} from 'react';
import {StoreContext} from '../mobx/store';
import JShadowView from './JShadowView';
import {memo} from 'react';
function JSelectInput({
  containerStyle,
  heading,
  icon,

  headingWeight = '500',

  value,

  forPassword = false,

  error,

  isRequired = false,
  rightIcon,
  header,
  isDate = false,
  setValue,
  id,
  mode = 'date',
  data,
}) {
  const refRBSheet = useRef();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [county, setCountry] = useState({});
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(true);
  const [query, setQuery] = useState('');
  const [years, setYears] = useState([]);
  const [genders, setGenders] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [martial, setMartial] = useState([]);
  const [experience, setExperience] = useState([]);
  const [careerLevel, setCareerLevel] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [area, setArea] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);

  const _years = startYear => {
    setLoader(true);
    var currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push({name: startYear++});
    }
    setYears(years);
    setLoader(false);
  };

  const _getProfile = () => {
    setLoader(true);

    let genderArr = [];
    let langArr = [];
    let martialArr = [];
    let functionArea = [];
    let industry = [];
    let level = [];
    let currency = [];
    let expericeYear = [];
    let jobType = [];
    let categories = [];
    let skill = [];

    if (header === 'Job Skill') {
      Object.keys(data).forEach(function (key, index) {
        skill.push({
          id: key,
          name: data[key],
        });
      });
      setSkills(skill);
    }

    if (header === 'Job Category') {
      Object.keys(data).forEach(function (key, index) {
        categories.push({
          id: key,
          name: data[key],
        });
      });
      setCategories(categories);
    }

    if (header === 'Job Type') {
      Object.keys(data).forEach(function (key, index) {
        jobType.push({
          id: key,
          name: data[key],
        });
      });
      setJobType(jobType);
    }
    if (header === 'Experience') {
      for (var i = 1; i <= 50; i++) {
        expericeYear.push({
          name: i,
        });
      }

      setExperience(expericeYear);
    }

    if (header === 'Gender') {
      data.forEach(item => {
        genderArr.push({
          name: item,
        });
      });
      setGenders(genderArr);
    }

    if (header === 'Functional Area') {
      Object.keys(data).forEach(function (key, index) {
        functionArea.push({
          id: key,
          name: data[key],
        });
      });
      setArea(functionArea);
    }

    if (header === 'Carrer Level') {
      Object.keys(data).forEach(function (key, index) {
        level.push({
          id: key,
          name: data[key],
        });
      });
      setCareerLevel(level);
    }

    if (header === 'Industry') {
      Object.keys(data).forEach(function (key, index) {
        industry.push({
          id: key,
          name: data[key],
        });
      });
      setIndustry(industry);
    }

    if (header === 'Salary Currency') {
      Object.keys(data).forEach(function (key, index) {
        currency.push({
          id: key,
          name: data[key],
        });
      });
      setCurrency(currency);
    }

    if (header === 'Language') {
      Object.keys(data).forEach(function (key, index) {
        langArr.push({
          id: key,
          name: data[key],
        });
      });
      setLanguages(langArr);
    }

    if (header === 'Martial Status') {
      Object.keys(data).forEach(function (key, index) {
        martialArr.push({
          id: key,
          name: data[key],
        });
      });
      setMartial(martialArr);
    }

    // setCountry(arr);
    setLoader(false);
  };
  //   console.log(this.years(2019 - 20));

  const _getCountryList = () => {
    setLoader(true);
    let country = [];
    Object.keys(data).forEach(function (key, index) {
      country.push({
        id: key,
        name: data[key],
      });
    });

    setCountry(country);
    setLoader(false);
  };

  const _getCityList = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    setLoader(true);
    fetch(`https://dev.jobskills.digital/api/city-list/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        var myObject = result.city;
        console.log('cITY', myObject, id);

        setCity(myObject);
        setLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoader(false);
      });
  };

  const _getStateList = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    setLoader(true);
    fetch(`https://dev.jobskills.digital/api/state-list/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        var myObject = result.state;

        setState(myObject);
        setLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoader(false);
      });
  };

  return (
    <>
      <Pressable
        onPress={() => {
          if (isDate === false) {
            refRBSheet.current.open();
            header === 'Country'
              ? _getCountryList()
              : header === 'City'
              ? _getCityList()
              : header === 'Year'
              ? _years(2019 - 20)
              : header === 'State'
              ? _getStateList()
              : _getProfile();
          } else {
            setOpen(true);
          }
        }}
        style={[{flexDirection: 'column'}, containerStyle]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {icon}
          <JRow>
            <JText fontWeight={headingWeight} fontSize={RFPercentage(2.5)}>
              {heading}
            </JText>
            {isRequired && (
              <JText
                style={{marginLeft: RFPercentage(0.5)}}
                fontColor={colors.danger[0]}
                fontWeight={headingWeight}
                fontSize={RFPercentage(2.5)}>
                *
              </JText>
            )}
          </JRow>
          {rightIcon}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: RFPercentage(0.3),
            borderBottomWidth: RFPercentage(0.2),
            borderBottomColor: error ? colors.danger[0] : colors.inputBorder[0],
          }}>
          <View
            style={{
              paddingBottom: RFPercentage(0.5),
              fontSize: RFPercentage(2.5),
              width: forPassword ? '90%' : '100%',
              color: colors.black[0],
            }}>
            <JText>{value}</JText>
          </View>
        </View>
      </Pressable>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        height={heightPercentageToDP(100)}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: colors.black[0],
            display: 'none',
          },
        }}>
        <SafeAreaView>
          <JGradientHeader
            center={
              <JText
                fontColor={colors.white[0]}
                fontWeight="bold"
                fontSize={RFPercentage(2.5)}>
                {header}
              </JText>
            }
            left={
              <Feather
                onPress={() => {
                  setQuery('');
                  refRBSheet.current.close();
                }}
                name="chevron-left"
                size={RFPercentage(3.5)}
                color={colors.white[0]}
              />
            }
          />
          {loader ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={
                header === 'Country'
                  ? county.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'City'
                  ? city.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Year'
                  ? years
                  : header === 'Gender'
                  ? genders.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Language'
                  ? languages.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Martial Status'
                  ? martial.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Functional Area'
                  ? area.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Industry'
                  ? industry.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Carrer Level'
                  ? careerLevel.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Salary Currency'
                  ? currency.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Job Type'
                  ? jobType.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Job Category'
                  ? categories.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Job Skill'
                  ? skills.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
                  : header === 'Experience'
                  ? experience
                  : state.filter(e =>
                      e.name.toLowerCase().includes(query.toLowerCase()),
                    )
              }
              ListHeaderComponent={
                header !== 'Experience' && (
                  <JShadowView
                    shadowColor={colors.purple[0]}
                    containerStyle={{
                      marginVertical: RFPercentage(2),
                      borderWidth: RFPercentage(0.1),
                      borderColor: `${colors.purple[0]}50`,
                      justifyContent: 'space-between',
                      paddingLeft: RFPercentage(1),
                      height: heightPercentageToDP(6),
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: RFPercentage(2),
                    }}
                    isPressable={false}>
                    <TextInput
                      onChangeText={e => setQuery(e)}
                      placeholderTextColor={colors.placeHolderColor[0]}
                      placeholder="Search"
                      style={{color: colors.black[0]}}
                    />
                  </JShadowView>
                )
              }
              initialNumToRender={16}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    setValue(item);
                    refRBSheet.current.close();
                  }}
                  style={{
                    paddingVertical: RFPercentage(2),
                    marginHorizontal: RFPercentage(2),

                    marginBottom: RFPercentage(1),
                    borderBottomColor: colors.border[0],
                    borderBottomWidth: RFPercentage(0.1),
                  }}>
                  <JText fontSize={RFPercentage(1.8)}>{item.name}</JText>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
            />
          )}
        </SafeAreaView>
      </RBSheet>
      <DatePicker
        modal
        mode={mode}
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          console.log(date);
          setValue(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
export default memo(JSelectInput);
const styles = StyleSheet.create({});

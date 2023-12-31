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
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import JText from './JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import JGradientHeader from './JGradientHeader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';
import JRow from './JRow';
import {useContext} from 'react';
import {StoreContext} from '../mobx/store';
import JShadowView from './JShadowView';
import {memo} from 'react';
import JChevronIcon from './JChevronIcon';
import JIcon from './JIcon';

function JSelectInput({
  id,
  data,
  icon,
  error,
  Licon,
  value,
  header,
  heading,
  setValue,
  rightIcon,
  date1 = '',
  maximumDate,
  minimumDate,
  containerStyle,
  mode = 'date',
  isDate = false,
  disabled = false,
  isMultiple = false,
  isRequired = false,
  forPassword = false,
  headingWeight = Platform.OS == 'ios' ? '400' : '500',
  date = date1 ? date1 : new Date(),
}) {
  const store = useContext(StoreContext);
  const refRBSheet = useRef();
  // const [date, setDate] = useState(isDate1||date1 ? date1 : new Date());
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [county, setCountry] = useState({});
  const [loader, setLoader] = useState(true);

  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);
  const [tags, setTags] = useState([]);
  const [state, setState] = useState([]);
  const [years, setYears] = useState([]);
  const [title, setTitle] = useState([]);
  const [shift, setShift] = useState([]);
  const [skills, setSkills] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [genders, setGenders] = useState([]);
  const [martial, setMartial] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [ownership, setOwnership] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [experience, setExperience] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [preference, setPreference] = useState([]);
  const [careerLevel, setCareerLevel] = useState([]);
  const [Assessments, setAssessments] = useState([]);
  const [degreeLevel, setDegreeLevel] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [companySize, setCompanySize] = useState([]);
  const [selectedItems, setSelectedItems] = useState(id);

  // console.log('date1111>>',date1)
  const handleSelectItem = item => {
    if (selectedItems?.find(e => e.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const handleSetSelectedItems = () => {
    // do something with the selected items, such as sending them to a server
    setValue(selectedItems);
    // console.log(selectedItems);
  };

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
    let careerlevel = [];
    let currency = [];
    let expericeYear = [];
    let jobType = [];
    let categories = [];
    let skillArr = [];
    let titleArr = [];
    let shiftArr = [];
    let tag = [];
    let assessment = [];
    let period = [];
    let preferenceArr = [];
    let degree = [];
    let nationalityArr = [];
    let ownerArr = [];
    let sizeArr = [];
    if (header === store.lang.job_skills) {
      Object.keys(data).forEach(function (key, index) {
        skillArr.push({
          id: key,
          name: data[key],
        });
      });
      setSkills(skillArr);
    }

    if (header === store.lang.job_category) {
      Object.keys(data).forEach(function (key, index) {
        categories.push({
          id: key,
          name: data[key],
        });
      });
      setCategories(categories);
    }

    if (header === store.lang.job_type) {
      Object.keys(data).forEach(function (key, index) {
        jobType.push({
          id: key,
          name: data[key],
        });
      });
      setJobType(jobType);
    }
    if (header === store.lang.experience) {
      for (var i = 1; i <= 50; i++) {
        expericeYear.push({
          name: i,
        });
      }

      setExperience(expericeYear);
    }

    if (header === store.lang.gender) {
      data.forEach(item => {
        genderArr.push({
          name: item,
        });
      });
      setGenders(genderArr);
    }

    if (header === store.lang.functional_Area) {
      Object.keys(data).forEach(function (key, index) {
        functionArea.push({
          id: key,
          name: data[key],
        });
      });
      setArea(functionArea);
    }

    if (header == store.lang.career_level) {
      Object?.keys(data)?.forEach(function (key, index) {
        careerlevel?.push({
          id: key,
          name: data[key],
        });
      });
      setCareerLevel(careerlevel);
    }

    if (header === store.lang.Industry) {
      Object.keys(data).forEach(function (key, index) {
        industry.push({
          id: key,
          name: data[key],
        });
      });
      setIndustry(industry);
    }

    if (header === store.lang.salary_currency) {
      Object.keys(data).forEach(function (key, index) {
        currency.push({
          id: key,
          name: data[key],
        });
      });
      setCurrencies(currency);
    }

    if (header === store.lang.language) {
      Object?.keys(data)?.forEach(function (key, index) {
        langArr.push({
          id: key,
          name: data[key],
        });
      });
      setLanguages(langArr);
    }

    if (header === store.lang.marital_status) {
      Object.keys(data).forEach(function (key, index) {
        martialArr.push({
          id: key,
          name: data[key],
        });
      });
      setMartial(martialArr);
    }
    if (header === 'Job Title') {
      Object.keys(data).forEach(function (key, index) {
        titleArr.push({
          id: key,
          name: data[key],
        });
      });
      setTitle(titleArr);
    }
    if (header === store.lang.job_Shift) {
      Object.keys(data).forEach(function (key, index) {
        shiftArr.push({
          id: key,
          name: data[key],
        });
      });
      setShift(shiftArr);
    }
    if (header === store.lang.job_tag) {
      Object.keys(data).forEach(function (key, index) {
        tag.push({
          id: key,
          name: data[key],
        });
      });
      setTags(tag);
    }
    if (header === store.lang.required_assessment) {
      Object.keys(data).forEach(function (key, index) {
        assessment.push({
          id: key,
          name: data[key],
        });
      });
      setAssessments(assessment);
    }
    if (header === store.lang.Salary_Period) {
      Object.keys(data).forEach(function (key, index) {
        period.push({
          id: key,
          name: data[key],
        });
      });
      setPeriods(period);
    }
    if (header === store.lang.gender_preference) {
      Object.keys(data).forEach(function (key, index) {
        preferenceArr.push({
          id: key,
          name: data[key],
        });
      });
      setPreference(preferenceArr);
    }
    if (header === store.lang.degree_level) {
      Object?.keys(data)?.forEach(function (key, index) {
        degree.push({
          id: key,
          name: data[key],
        });
      });
      setDegreeLevel(degree);
    }
    if (header === store.lang.ownership_type) {
      Object.keys(data).forEach(function (key, index) {
        ownerArr.push({
          id: key,
          name: data[key],
        });
      });
      setOwnership(ownerArr);
    }
    if (header === store.lang.size) {
      Object.keys(data).forEach(function (key, index) {
        sizeArr.push({
          id: key,
          name: data[key],
        });
      });
      setCompanySize(sizeArr);
    }
    if (header === store.lang.job_nationality) {
      Object?.keys(data)?.forEach(function (key, index) {
        nationalityArr.push({
          id: key,
          name: data[key],
        });
      });
      setNationality(nationalityArr);
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
        // console.log('cITY', myObject, id);

        setCity(myObject);
        setLoader(false);
      })
      .catch(error => {
        // console.log('error-1', error);
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
        // console.log(result.state[0]?.arabic_title)
        setState(myObject);
        setLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        setLoader(false);
      });
  };

  useEffect(() => {}, [date1, date]);

  return (
    <>
      <Pressable
        disabled={disabled}
        onPress={() => {
          if (isDate === false) {
            refRBSheet.current.open();
            header === store.lang.country
              ? _getCountryList()
              : header === store.lang.city
              ? _getCityList()
              : header === store.lang.year
              ? _years(2019 - 20)
              : header === store.lang.state
              ? _getStateList()
              : _getProfile();
          } else {
            setOpen(true);
          }
        }}
        style={[{flexDirection: 'column'}, containerStyle]}>
        <JRow
          style={{
            justifyContent: 'space-between',
          }}>
          {icon}
          <JRow>
            <JText
              fontWeight={headingWeight}
              fontSize={RFPercentage(2.5)}
              fontColor={
                disabled == true ? colors.inputBorder[0] : colors.black[0]
              }>
              {heading}
            </JText>
            {isRequired && (
              <JText
                style={{marginHorizontal: RFPercentage(0.5)}}
                fontColor={colors.danger[0]}
                fontWeight={headingWeight}
                fontSize={RFPercentage(2.5)}>
                *
              </JText>
            )}
          </JRow>
          {!disabled && rightIcon}
        </JRow>
        <JRow
          style={{
            marginTop: RFPercentage(Platform.OS == 'android' ? 1 : 2),
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
            <JRow>
              {Licon}
              <JText>{value}</JText>
            </JRow>
          </View>
        </JRow>
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
              <JChevronIcon
                onPress={() => {
                  setQuery('');
                  refRBSheet.current.close();
                }}
              />
            }
            right={
              isMultiple && (
                <JText
                  onPress={() => {
                    handleSetSelectedItems();
                    refRBSheet.current.close();
                  }}
                  fontColor="#ffff"
                  fontSize={RFPercentage(2)}>
                  {store.lang?.done}
                </JText>
              )
            }
          />
          {loader ? (
            <ActivityIndicator />
          ) : (
            // <View style={{paddingBottom:header === store.lang.experience ?RFPercentage(22):RFPercentage(-10)}}>
            <View style={{marginBottom: RFPercentage(22)}}>
              <FlatList
                data={
                  header === store.lang.country
                    ? county.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.city
                    ? city.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.year
                    ? years
                    : header === store.lang.gender
                    ? genders.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.language
                    ? languages?.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.marital_status
                    ? martial.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.functional_Area
                    ? area.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.Industry
                    ? industry.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.career_level
                    ? careerLevel?.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.salary_currency
                    ? currencies.filter(e =>
                        !e.name
                          ? 'N/A'
                          : e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.job_type
                    ? jobType.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.job_category
                    ? categories.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.job_skills
                    ? skills.filter(e =>
                        !e.name
                          ? 'N/A'
                          : e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === 'Job Title'
                    ? title.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.job_Shift
                    ? shift.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.job_tag
                    ? tags.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.required_assessment
                    ? Assessments.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.Salary_Period
                    ? periods.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.gender_preference
                    ? preference.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.degree_level
                    ? degreeLevel?.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.job_nationality
                    ? nationality?.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.ownership_type
                    ? ownership.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.size
                    ? companySize.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                    : header === store.lang.experience
                    ? experience
                    : header === store.lang.state &&
                      state.filter(e =>
                        e.name.toLowerCase().includes(query.toLowerCase()),
                      )
                }
                ListHeaderComponent={
                  header !== store.lang.experience && (
                    <JShadowView
                      shadowColor={colors.purple[0]}
                      containerStyle={{
                        marginVertical: RFPercentage(2),
                        borderWidth: RFPercentage(0.1),
                        borderColor: `${colors.purple[0]}50`,
                        justifyContent: 'space-between',
                        paddingLeft: RFPercentage(1),
                        height: heightPercentageToDP(6),
                        flexDirection:
                          store.lang.id === 0 ? 'row' : 'row-reverse',
                        alignItems: 'center',
                        marginHorizontal: RFPercentage(2),
                      }}
                      isPressable={false}>
                      <TextInput
                        onChangeText={e => setQuery(e)}
                        placeholderTextColor={colors.placeHolderColor[0]}
                        placeholder={store.lang.search}
                        style={{
                          color: colors.black[0],
                          textAlign: store.lang.id === 0 ? 'left' : 'right',
                        }}
                      />
                    </JShadowView>
                  )
                }
                initialNumToRender={16}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (isMultiple == true) {
                        handleSelectItem(item);
                      } else {
                        setValue(item);
                        refRBSheet.current.close();
                      }
                      // console.log(item);
                    }}
                    style={{
                      backgroundColor:
                        isMultiple === true &&
                        selectedItems?.find(e => e.id == item.id)
                          ? '#b0e2f7'
                          : '#fff',
                      paddingVertical: RFPercentage(2),
                      paddingHorizontal: RFPercentage(2.5),
                      marginBottom: RFPercentage(1),
                      borderBottomColor: colors.border[0],
                      borderBottomWidth: RFPercentage(0.1),
                    }}>
                    <JRow style={{justifyContent: 'space-between'}}>
                      {header === store.lang.state ||
                      header === store.lang.city ? (
                        <JText fontSize={RFPercentage(1.8)} fontColor={'#000'}>
                          {store.lang.id == 0 ? item?.name : item?.arabic_title}
                        </JText>
                      ) : (
                        <JText fontSize={RFPercentage(1.8)} fontColor={'#000'}>
                          {item?.name}
                        </JText>
                      )}

                      {isMultiple === true &&
                        selectedItems?.find(e => e.id == item.id) && (
                          <JIcon
                            icon="fe"
                            name="check"
                            size={RFPercentage(2)}
                            color={colors.black[0]}
                          />
                        )}
                    </JRow>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
              />
            </View>
          )}
        </SafeAreaView>
      </RBSheet>
      <DatePicker
        modal
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        locale={store.lang.id==0?'en':'ar'}
        mode={mode}
        open={open}
        date={date}
        onConfirm={date => {
          setValue(date);
          setOpen(false);
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

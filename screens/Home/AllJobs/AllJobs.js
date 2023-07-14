import {
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
  ActivityIndicator,
  Modal,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useCallback} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import {_getAllJobData} from '../../../functions/Candidate/BottomTab';
import JText from '../../../customComponents/JText';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import JJobTile from '../../../customComponents/JJobTile';
import JEmpty from '../../../customComponents/JEmpty';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import colors from '../../../config/colors';
import JSearchInput from '../../../customComponents/JSearchInput';
import Feather from 'react-native-vector-icons/Feather';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import JRow from '../../../customComponents/JRow';
import JButton from '../../../customComponents/JButton';
import JMenu from '../../../customComponents/JMenu';
import Slider from '@react-native-community/slider';
import url from '../../../config/url';
import { _search } from '../../../functions/CFilter';
import { JToast } from '../../../functions/Toast';



function AllJobs({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterList, setFilterList] = useState();
  const [loader, setLoader] = useState(true);
  const [error, serError] = useState(false);

   const [value0, setValue0] = useState(0);
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [category, setCategory] = useState();
    const [gender, setGender] = useState();
    const [level, setLevel] = useState();
    const [skills, setSkills] = useState();
    const [values, setvalues] = useState();

    // console.log(category)
    // console.log(gender)
    // console.log(level)
    // console.log(skills)
    // console.log(value0)
    // console.log(value1)
    // console.log(value2)
  const store = useContext(StoreContext);

  useEffect(() => {
    _getAllJobData(store);
    return () => {};
  }, [store.favouriteList]);

  const onRefresh = useCallback(() => {
    store.setIsRefreshing(true);
    _getAllJobData(store);
    store.setIsRefreshing(false);
  }, []);
   
    
    const handleValueChange = (newValue) => {
      setValue0(newValue);
      
     
    };
    const handleValueChange1 = (newValue1) => {
      
      setValue1(newValue1);
     
    };
    const handleValueChange2 = (newValue2) => {
     
      setValue2(newValue2);

    };
 
    const _jobSearch = () => {
      
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
      var formdata = new FormData();
      formdata.append("title", "com");
      formdata.append("skill", JSON.stringify(skills?.map(Number)));
      formdata.append("categories", category);
      formdata.append(  'gender',
      gender=== 'Male'
        ? '1'
        : gender=== 'Female'
        ? '0'
        : '2',
    );
      formdata.append("career_level", level);
      formdata.append("salaryFrom", value0.toString());
      formdata.append("salaryTo", value1?.toString());
      formdata.append("jobExperience", value2.toString());
    console.log(formdata)
    var requestOptions = {
    method: 'POST',
     headers: myHeaders,
     body: formdata,
     redirect: 'follow'
};
      fetch(`${url.baseUrl}/searchJobs`, requestOptions)
        .then(response => response?.json())
        .then(result => {
          console.log('neww=====>',result.data);
          
            store.setJob(result.data)
            setModalVisible(false);
      
      })
        .catch(error => {
          serError(true);
        })
        .finally(() => {
          setLoader(false);
        });
    };
    const _jobsfilters = () => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    
      var requestOptions = {
        method: 'Get',
        headers: myHeaders,
        redirect: 'follow',
      };
      fetch(`${url.baseUrl}/search-jobs-filters`, requestOptions)
        .then(response => response?.json())
        .then(result => {
          // console.log(result);
          setFilterList(result);
        })
        .catch(error => {
          serError(true);
        })
        .finally(() => {
          setLoader(false);
        });
    };

    const data2=store.lang.id=0?filterList?.dataEnglish?.jobSkills:filterList?.dataArabic?.jobSkills;
    console.log(data2);
useEffect(() => {
  _jobsfilters();
}, [])
  return (
    <JScreen
      isError={store.appliedJobError}
      errorText={'Reload Screen!'}
      onReloadPress={() => _getFavouriteJobData(store)}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.jobs}
            </JText>
          }
          left={
            <JChevronIcon
              onPress={() => {
                store.setAllJobInput(''), navigation.goBack();
              }}
            />
          }
          right={
            // store.appliedJobList.appliedJob.length > 0 &&
            loader === false && (
              <Feather
                onPress={() => setModalVisible(true)}
                name="filter"
                size={RFPercentage(3)}
                color={colors.white[0]}
              />
            )
          }
        />
      }
      style={{marginHorizontal: RFPercentage(2)}}>
      {store.jobApiLoader === true ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
          <JSearchInput
            length={store.jobData?.jobs?.length}
            onChangeText={e => {
              store.setAllJobInput(e);
            }}
            onPressIcon={() => alert('Icon Pressed')}
          />
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={store.isRefreshing}
                onRefresh={onRefresh}
              />
            }
            data={
              store.allJobInput?.length === 0
                ? store.jobData?.jobs
                : store.jobData?.jobs.filter(e =>
                    e.job_title
                      .toLowerCase()
                      .includes(store.allJobInput.toLowerCase()),
                  )
            }
            ListEmptyComponent={() => <JEmpty />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <JJobTile
                favouriteData={store.favouriteList}
                jobId={item.id}
                onPress={() =>
                  navigation.navigate('CJobDetails', {
                    id: item.job_id,
                  })
                }
                type="job"
                containerStyle={{marginBottom: RFPercentage(2)}}
                img={item.company_image}
                title={item.job_title}
                location={item.full_location ? item.full_location : 'N/A'}
                category={
                  store.lang.id == 0
                    ? item.job_category_english
                    : item.job_category_arabic
                }
              />
            )}
            keyExtractor={data => data.id}
          />
        </React.Fragment>
      )}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <JRow style={styles.container}>
          <View style={styles.modal}>
            <ScrollView style={{paddingHorizontal: RFPercentage(2)}}>
              {/* <JText style={styles.heading}>{store.lang.job_skills}</JText> */}
              <JMenu
                isMulti
                type={store.lang.job_skills}
                filter={
                  store.lang.id = 0
                    ? filterList?.dataEnglish?.jobSkills
                    : filterList?.dataArabic?.jobSkills
                }
                values={skills}
                setvalues={setSkills}
              />

              <JText style={styles.heading}>
                {store.lang.popular_categories}
              </JText>
              <JMenu
                type={store.lang.any_category}
                filter={
                  store.lang.id = 0
                    ? filterList?.dataEnglish?.jobCategories
                    : filterList?.dataArabic?.jobCategories
                }
                values={category}
                setvalues={setCategory}
              />

              <JText style={styles.heading}>{store.lang.gender}</JText>
              <JMenu
                type={store.lang.any_gender}
                filter1={
                  (store.lang.id = 0
                    ? filterList?.dataEnglish?.genders
                    : filterList?.dataArabic?.genders)
                }
                values={gender}
                setvalues={setGender}
              />
              <JText style={styles.heading}>{store.lang.career_level}</JText>
              <JMenu
                type={`${store.lang.select} ${store.lang.career_level}`}
                filter={
                  store.lang.id = 0
                    ? filterList?.dataEnglish?.careerLevels
                    : filterList?.dataArabic?.careerLevels}
                values={level}
                setvalues={setLevel}
              />

              <JText style={[styles.heading, {marginTop: RFPercentage(3)}]}>
                {store.lang.salary_from}
              </JText>
              <JRow style={styles.showValue}>
                <JText style={styles.value}>0</JText>
                <JText style={styles.value}>150,000</JText>
              </JRow>

              <Slider
                style={styles.slid}
                minimumValue={0}
                maximumValue={150000}
                thumbStyle={{borderWidth: 2, borderColor: 'black'}}
                trackStyle={{height: 10}}
                step={100}
                value={value0}
                onValueChange={() => {
                  handleValueChange;
                }}
              />
              <JText style={{textAlign: 'center'}}>{value0}</JText>
              <JText style={[styles.heading, {marginTop: RFPercentage(3)}]}>
                {store.lang.salary_to}
              </JText>
              <JRow style={styles.showValue}>
                <JText style={styles.value}>0</JText>
                <JText style={styles.value}>150,000</JText>
              </JRow>

              <Slider
                style={styles.slid}
                minimumValue={0}
                maximumValue={150000}
                thumbStyle={{borderWidth: 2, borderColor: 'black'}}
                trackStyle={{height: 10}}
                step={100}
                value={value1}
                onValueChange={() => handleValueChange1}
              />
              <JText style={{textAlign: 'center'}}>{value1}</JText>

              <JText style={[styles.heading, {marginTop: RFPercentage(3)}]}>
                {store.lang.experience}
              </JText>
              <JRow style={styles.showValue}>
                <JText style={styles.value}>0</JText>
                <JText style={styles.value}>30</JText>
              </JRow>

              <Slider
                style={styles.slid}
                minimumValue={0}
                maximumValue={30}
                thumbStyle={{borderWidth: 2, borderColor: 'black'}}
                trackStyle={{height: 10}}
                step={1}
                value={value2}
                onValueChange={() => handleValueChange2}
              />

              <JText
                style={{textAlign: 'center', marginBottom: RFPercentage(1)}}>
                {value2}
              </JText>
            </ScrollView>
            <View style={{width: '100%', paddingBottom: RFPercentage(1)}}>
              <JButton
                disabled={loader && true}
                onPress={() => {
                  setLoader(true), _jobSearch(gender, category, level);
                }}
                style={{
                  backgroundColor: loader
                    ? colors.border[0]
                    : colors.primary[0],
                  borderColor: loader ? colors.border[0] : colors.primary[0],
                  paddingVertical: RFPercentage(0.2),
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}
                children={loader ? store.lang.loading : store.lang.search}
              />
            </View>
          </View>
          <Pressable
            style={styles.modal1}
            onPress={() => setModalVisible(false)}
          />
        </JRow>
      </Modal>
    </JScreen>
  );
}

export default observer(AllJobs);

const styles = StyleSheet.create({
  container: {flex: 1},
  modal: {

  height: '100%',
  width: '70%',
  backgroundColor: '#ffff',
  // alignItems: 'center',
 
  marginBottom:RFPercentage(2),
  shadowColor: '#000',  
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
},
  modal1: {
  height: '100%',
  width: '30%',
  
},
menutxt: {
  fontSize: RFPercentage(2),
  marginVertical: RFPercentage(0.5),
  paddingHorizontal: RFPercentage(1),
  
},
heading:{fontSize:RFPercentage(2.5),fontWeight:' bold',marginVertical: RFPercentage(1),marginTop: RFPercentage(2),},
text:{fontSize:RFPercentage(2.5)},
menuV:{
  height: RFPercentage(7),
  marginVertical: RFPercentage(1),
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: RFPercentage(1),
  backgroundColor: colors.white[0],
 
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.20,
  shadowRadius: 1.41,
  
  elevation: 2,
},
value:{textAlign: 'center',backgroundColor:colors.border[0],paddingHorizontal:RFPercentage(1)},
slid:{ width: '90%', alignSelf: 'center',backgroundColor:colors.inputBorder[0],height:3 ,marginVertical: RFPercentage(1)},
showValue:{width:'100%',justifyContent:'space-between',flexDirection: 'row'}
});

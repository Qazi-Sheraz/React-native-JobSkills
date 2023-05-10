import {ActivityIndicator, Image, ScrollView, StyleSheet, FlatList, View} from 'react-native';
import React ,{useState,useRef,useContext,useEffect}from 'react';
import JScreen from '../../customComponents/JScreen';
import JHeader from '../../customComponents/JHeader';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import JIcon from '../../customComponents/JIcon';
import JRow from '../../customComponents/JRow';
import JAssessmentResult from '../../customComponents/JAssessmentResult';
import JButton from '../../customComponents/JButton';
import JStatusbar from '../../customComponents/JStatusbar';
import JSkills from '../../customComponents/JSkills';
import RBSheet from 'react-native-raw-bottom-sheet';
import Download from '../../assets/svg/Icon/Download.svg';
import Eyes from '../../assets/svg/Icon/Eyes.svg';
import Flag from '../../assets/svg/Icon/Flag.svg';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JChevronIcon from '../../customComponents/JChevronIcon';
import { baseUrl } from '../../ApiUrls';
import url from '../../config/url';

const ProfileJobApplication = ({route}) => {
  const store = useContext(StoreContext);
  const {params}= useRoute()
  // console.log(params)
  const [details, setDetails] = useState();
  const [loader, setLoader] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(null);
  // console.log(params.id)
  const handleButtonPress = (button) => {
    setButtonPressed(button);
    bottomSheetRef.current.open();
  };
  const bottomSheetRef = useRef();
  const navigation = useNavigation();
 
  const _candidateDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token.token}`,
    );

    fetch(`${url.baseUrl}/candidate-details/${params.candidate_id}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setDetails(result);
       
      })

      .catch(error => {
         console.log('error', error);
        alert('error', error);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    _candidateDetails();
  }, [loader]);

 

  return loader ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.maincontainer}>
      <JHeader
        left={<JChevronIcon color={'Black'} />}
        right={
          <Menu>
            <MenuTrigger
              style={{
                width: RFPercentage(3),
                height: RFPercentage(4),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <JIcon icon={'sm'} name={'options-vertical'} size={20} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption>
                <JRow>
                  <Flag />
                  <JText style={styles.menutxt}>
                    {store.lang.report_candidate}
                  </JText>
                </JRow>
              </MenuOption>
              <MenuOption>
                <JRow>
                  <Download />
                  <JText style={styles.menutxt}>
                    {store.lang.download_resume}
                  </JText>
                </JRow>
              </MenuOption>
              <MenuOption onSelect={()=> {navigation.navigate('ViewResume',{...params})}}>

                <JRow>
                  <Eyes />
                  <JText style={styles.menutxt}>{store.lang.view_resume}</JText>
                </JRow>
              </MenuOption>
            </MenuOptions>
          </Menu>
        }
      />

      <View style={styles.main}>
        <Image
          style={styles.img}
          source={{
            uri: details?.candidateDetails[0]?.profile_image
              ? details?.candidateDetails[0]?.profile_image
              : 'N/A',
          }}
        />

        <JText style={styles.headertxt}>
          {details?.candidateDetails[0]?.full_name
            ? details?.candidateDetails[0]?.full_name
            : 'N/A'}
        </JText>
        {details?.lastestExperience[0].id &&
        <JText style={styles.titleJob}>
           {details?.lastestExperience [0].id}
        </JText>}
        {details?.candidateDetails[0]?.email&&
        <JText style={styles.txt}>
          {details?.candidateDetails[0]?.email}
        </JText>}
        {details?.candidateDetails[0]?.full_location &&
        <JText style={styles.txt}>
           {details?.candidateDetails[0]?.full_location}
        </JText>}
        <JRow
          style={{
            width: '60%',
            justifyContent: 'space-between',
            marginVertical: RFPercentage(1),
          }}>
            {details?.candidateDetails[0]?.region_code && details?.candidateDetails[0]?.phone &&
          <JText style={styles.txt}>
             {`+${details?.candidateDetails[0]?.region_code}-${details?.candidateDetails[0]?.phone}`}
              
          </JText>}
          <JText style={styles.txt}>{details?.candidateDetails[0]?.dob}</JText>
        </JRow>

        <JStatusbar />

        <ScrollView style={{width: '100%',marginVertical: RFPercentage(1.5),}}>
          <View style={styles.rView}>
            <JText style={styles.results}>{store.lang.assessment_result}</JText>

            <FlatList
              data={details?.candidateAssessment?.slice(0, 4)}
              renderItem={({item, index}) => (
                <JAssessmentResult
                  title={item.assessment_name}
                  percent={item.percentage && `${item.percentage} %`}
                  color={colors.purple[0]}
                />
              )}
              keyExtractor={(item, index) => index}
            />

            <JButton
              style={{marginTop: RFPercentage(0.5)}}
              onPress={() => handleButtonPress('button1')}
              children={store.lang.see_more}
            />
          </View>

          <View style={styles.experience}>
            <JText style={styles.title}>{store.lang.experience}</JText>
            {details?.candidateExperiences[0]?.experience_title&& (
            <JSkills
              JobTitle={details?.candidateExperiences[0]?.experience_title && details?.candidateExperiences[0]?.experience_title}
              date={details?.candidateExperiences[0]?.start_date}
              Locate={details?.candidateExperiences[0]?.country_name && details?.candidateExperiences[0]?.state_name && details?.candidateExperiences[0]?.city_name === undefined ? '---' :`${details?.candidateExperiences[0]?.country_name }, ${details?.candidateExperiences[0]?.state_name}, ${details?.candidateExperiences[0]?.city_name}`}
              txt={details?.candidateExperiences[0]?.description}
            />
            )}
          </View>

          <View style={styles.experience}>
            <JText style={styles.title}>{store.lang.education}</JText>

            <FlatList
              data={details?.candidateEducation}
              renderItem={({item, index}) => (
                <JSkills
                  JobTitle={item.degree_title}
                  date={item.year}
                  Locate={`${item.institute}, ${item.country_name}`}
                  txt={item.degree_level}
                />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View style={styles.rView}>
            <JText style={styles.results}>{store.lang.skills}</JText>

            <FlatList
              data={details?.candidateSkill?.slice(0, 4)}
              renderItem={({item, index}) => (
                <JAssessmentResult
                  title={item.skill_name}
                  percent={item.percentage && `${item.percentage} %`}
                  color={'#B7834A'}
                />
              )}
              keyExtractor={item => item.toString()}
            />

            <JButton
              style={{marginTop: RFPercentage(0.5)}}
              onPress={() => handleButtonPress('button2')}
              children={store.lang.see_more}
            />
          </View>
          <RBSheet
            ref={bottomSheetRef}
            // closeOnDragDown={false}
            closeOnPressMask={true}
            // height={heightPercentageToDP(40)}
            customStyles={{
              container: {
                borderTopLeftRadius: RFPercentage(2.5),
                borderTopRightRadius: RFPercentage(2.5),
                paddingBottom: RFPercentage(-3),
              },
              wrapper: {
                backgroundColor: '#00000080',
              },
              draggableIcon: {
                backgroundColor: colors.black[0],
                display: 'none',
              },
            }}>
            {buttonPressed === 'button1' && (
              <View style={styles.RBView}>
                <JText style={styles.RBHeader}>
                  {store.lang.assessment_result}
                </JText>

                <FlatList
                  data={details?.candidateAssessment}
                  renderItem={({item, index}) => (
                    <JAssessmentResult
                      title={item.assessment_name}
                      percent={item.percentage && `${item.percentage} %`}
                      color={colors.purple[0]}
                    />
                  )}
                  keyExtractor={item => item.toString()}
                />
              </View>
            )}
            {buttonPressed === 'button2' && (
              <View style={styles.RBView}>
                <JText style={styles.RBHeader}>{store.lang.skills}</JText>
                <FlatList
                  data={details?.candidateSkill}
                  renderItem={({item, index}) => (
                    <JAssessmentResult
                      title={item.skill_name}
                      percent={item.percentage && `${item.percentage} %`}
                      color={'#B7834A'}
                    />
                  )}
                  keyExtractor={item => item.toString()}
                />
              </View>
            )}
          </RBSheet>
        </ScrollView>
      </View>
    </View>
  );
};

export default observer(ProfileJobApplication);

const styles = StyleSheet.create({
  maincontainer: {flex: 1, backgroundColor: colors.tileColor[0]},
  main: {
    height: '90%',
    width: '100%',
    alignItems: 'center',
  },
  img: {
    height: RFPercentage(13),
    width: RFPercentage(13),
    borderRadius: RFPercentage(6.5),
    marginTop: RFPercentage(-5),
  },
  headertxt: {
    fontSize: RFPercentage(2.7),
    fontWeight: 'bold',
    color: colors.purple[0],
    marginVertical: RFPercentage(0.5),
  },
  titleJob: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
  },
  txt: {fontSize:RFPercentage(2),marginVertical: RFPercentage(0.5)},
  rView:{
    // width: '100%',
    backgroundColor: '#ffff',
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(2),
    marginBottom: RFPercentage(1),
  },
  results: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    marginVertical: RFPercentage(1),
  },
  RBView: {paddingHorizontal: RFPercentage(2.5), paddingTop: RFPercentage(2)},
  RBHeader: {
    fontSize: RFPercentage(2.8),
    fontWeight: 'bold',
    marginVertical: RFPercentage(0.5),
  },
  RBtxt: {
    fontSize: RFPercentage(2.4),
    fontWeight: '600',
    marginVertical: RFPercentage(0.7),
    width: '100%',
  },
  menutxt: {
    fontSize: RFPercentage(2.2),
    marginVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },
  experience:{
    backgroundColor: '#ffff',
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(2),
    marginBottom: RFPercentage(1),
  },
  title: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
  },
});

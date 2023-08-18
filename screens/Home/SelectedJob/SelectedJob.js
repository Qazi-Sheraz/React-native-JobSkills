import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import JScreen from '../../../customComponents/JScreen';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useState} from 'react';
import url from '../../../config/url';
import Toast from 'react-native-toast-message';
import JGradientView from '../../../customComponents/JGradientView';
import JText from '../../../customComponents/JText';
import JButton from '../../../customComponents/JButton';
import JScrollView from '../../../customComponents/JScrollView';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../../config/colors';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import CLSelectedJob from '../../../loaders/Candidate/SelectedJob/CLSelectedJob';
import JTagText from '../../../customComponents/JTagText';
import {useCallback} from 'react';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import JApplyJob from '../../../customComponents/JApplyJob';
import JRow from '../../../customComponents/JRow';
import {_saveToFavoriteList} from '../../../functions/Candidate/BottomTab';
import {observer, useObserver} from 'mobx-react';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import { ScrollView } from 'react-native-gesture-handler';
import { JToast } from '../../../functions/Toast';


 
function SelectedJob({route, navigation}) {
  const [jobData, setJobData] = useState({});
  const [loader, setLoader] = useState(true);
  const [starLoader, setStarLoader] = useState(false);
  const [status, setStatus] = useState({});
  const [error, setError] = useState();
  const refRBSheet = useRef();
  const simpleText = RFPercentage(1.9);
  const store = useContext(StoreContext);
  const headingWeight = {
    weight: 'bold',
    size: RFPercentage(2.5),
  };

  const _getDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${url.baseUrl}/job-details/${route.params?.id}`, requestOptions)
      .then(response => response.json())
      .then(function (response) {
        // console.log('Get Selected Job Data', response);
        setJobData(response);
        setLoader(false);
      })
      .catch(function (error) {
        // console.log(error);
        setError(true);

        JToast({
          type: 'danger',
          text1: 'Error while getting Data',
        });
        setLoader(false);
      });
  };
  useEffect(() => {
    _getDetail();

    return () => {};
  }, [route.params?.id]);
// console.log(jobData?.job[0]?.job_requirement?.job_skills)
  return loader ? (
    <CLSelectedJob />
  ) : (
    <JScreen isError={error} onTryAgainPress={() => _getDetail()}>
      <JGradientView
        containerStyle={{
          height: heightPercentageToDP(25),
          paddingHorizontal: RFPercentage(2),
        }}>
        <JRow
          style={{
            justifyContent: 'space-between',
            paddingVertical: RFPercentage(1.5),
          }}>
          <JChevronIcon />
          <JRow>
            {starLoader ? (
              <ActivityIndicator
                size={RFPercentage(3)}
                style={{marginRight: RFPercentage(2)}}
                color={colors.white[0]}
              />
            ) : (
              <FontAwesome
                style={{marginHorizontal: RFPercentage(2)}}
                onPress={() =>
                  _saveToFavoriteList(store, setStarLoader, jobData?.job.id)
                }
                name={
                  store.favouriteList.some(e => e.job_id === jobData?.job.id)
                    ? 'star'
                    : 'star-o'
                }
                size={RFPercentage(3.5)}
                color={colors.white[0]}
              />
            )}

            <Menu>
              <MenuTrigger>
                <Entypo
                  name="dots-three-vertical"
                  size={RFPercentage(2.6)}
                  color={colors.white[0]}
                />
              </MenuTrigger>

              <MenuOptions>
                {[
                  store.lang.share_job,
                  store.lang.email_to_friend,
                  store.lang.report_abuse,
                ].map((item, index) => (
                  <MenuOption
                    style={{
                      marginHorizontal: RFPercentage(1),
                      paddingVertical: RFPercentage(1.3),
                    }}
                    key={index}
                    onSelect={() => {
                      refRBSheet.current.open();
                    }}>
                    <JRow>
                      {index === 0 ? (
                        <AntDesign
                          size={RFPercentage(3)}
                          color={colors.black[0]}
                          name="sharealt"
                        />
                      ) : index === 1 ? (
                        <AntDesign
                          size={RFPercentage(3)}
                          color={colors.black[0]}
                          name="mail"
                        />
                      ) : (
                        <Feather
                          size={RFPercentage(3)}
                          color={colors.black[0]}
                          name="flag"
                        />
                      )}
                      <JText
                        style={{marginHorizontal: RFPercentage(1)}}
                        fontSize={RFPercentage(2)}>
                        {item}
                      </JText>
                    </JRow>
                  </MenuOption>
                ))}
              </MenuOptions>
            </Menu>
          </JRow>
        </JRow>

        <JText
          fontWeight={headingWeight.weight}
          fontSize={headingWeight.size}
          fontColor={colors.white[0]}>
          {jobData?.job[0]?.job_title}
        </JText>

        <JRow>
          <Image
            style={{
              height: RFPercentage(2.5),
              width: RFPercentage(2.3),
              marginHorizontal: RFPercentage(1),
            }}
            source={{uri: jobData?.job[0]?.company?.company_url}}
          />
          <JText fontColor={colors.white[0]} fontSize={simpleText}>
            {jobData?.job[0]?.company_name !== null &&
              jobData?.job[0]?.company_names}
          </JText>
        </JRow>

        <JRow
          style={{
            marginTop: RFPercentage(1),
          }}>
          <EvilIcons
            size={RFPercentage(2.8)}
            color={colors.white[0]}
            name="location"
          />
          <JText fontColor={colors.white[0]} fontSize={simpleText}>
            {store.lang.id == 0
              ? jobData?.job[0]?.city_name
              : jobData?.job[0]?.city_name_arabic}
            {'\r'}
            {store.lang.id == 0
              ? jobData?.job[0]?.state_name
              : jobData?.job[0]?.state_name_arabic}
            {'\r'}
            {store.lang.id == 0
              ? jobData?.job[0]?.country_name
              : jobData?.job[0]?.country_name_arabic}
          </JText>
        </JRow>

        <JRow
          style={{
            justifyContent: 'space-between',
            marginVertical: RFPercentage(1),
          }}>
          <JRow>
            <JRow>
              <EvilIcons
                size={RFPercentage(2.8)}
                color={colors.white[0]}
                name="calendar"
              />
              <JText fontColor={colors.white[0]} fontSize={simpleText}>
                {store.lang.date_posted}
                {moment(jobData?.job?.job_publish_date).format('DD/MM/YYYY')}
              </JText>
            </JRow>
          </JRow>
          <JText fontColor={colors.white[0]} fontSize={simpleText}>
            {store.lang.expiry}
            {moment(jobData?.job?.job_expiry_date).format('DD/MM/YYYY')}
          </JText>
        </JRow>
        <JText
          fontAlign="right"
          fontWeight={headingWeight.weight}
          fontColor={colors.white[0]}>
          {jobData?.jobCount} {store.lang.open_jobs}
        </JText>
      </JGradientView>
      {status.success == false && status.message === '3' ? (
        <JRow
          style={{
            paddingHorizontal: RFPercentage(1),
            paddingVertical: RFPercentage(1),
            backgroundColor: colors.danger[0],
            justifyContent: 'center',
          }}>
          <JText fontColor={colors.white[0]} fontWeight="bold">
            {store.lang.assessment_Required}
          </JText>
          <JText
            onPress={() =>
              Linking.openURL(
                `https://dev.jobskills.digital/job-details/${jobData?.job?.job_id}`,
              )
            }
            style={{marginLeft: RFPercentage(1)}}
            fontColor={colors.primary[0]}
            fontWeight="bold">
            {store.lang.click_here}
          </JText>
        </JRow>
      ) : status.success == false && status.message === '2' ? (
        <JRow
          style={{
            paddingHorizontal: RFPercentage(1),
            paddingVertical: RFPercentage(1),
            backgroundColor: colors.danger[0],
            justifyContent: 'center',
          }}>
          <JText fontColor={colors.white[0]} fontWeight="bold">
            {store.lang.upload_your_CV}
          </JText>
          <JText
            onPress={() => navigation.navigate('Resume')}
            style={{marginLeft: RFPercentage(1)}}
            fontColor={colors.primary[0]}
            fontWeight="bold">
            {store.lang.click_here}
          </JText>
        </JRow>
      ) : status.success == false && status.message === '1' ? (
        <JRow
          style={{
            paddingHorizontal: RFPercentage(1),
            paddingVertical: RFPercentage(1),
            backgroundColor: colors.green[0],
            justifyContent: 'center',
          }}>
          <JText fontColor={colors.white[0]} fontWeight="bold">
            {store.lang.already_applied}
          </JText>
        </JRow>
      ) : null}
      <JScrollView
        contentContainerStyle={{
          paddingBottom: RFPercentage(10),
        }}
        style={{paddingHorizontal: RFPercentage(3)}}
        enable={false}>
        <JText
          style={{marginTop: RFPercentage(1.5)}}
          fontSize={headingWeight.size}>
          {store.lang.about} :
        </JText>
        <JTagText
          fontAlign={store.lang.id == 0 ? 'left' : 'right'}
          fontSize={simpleText}>
          {jobData?.job[0]?.description !== null
            ? jobData?.job[0]?.description
            : 'N/A'}
        </JTagText>
        <JText
          style={{marginVertical: RFPercentage(1.5)}}
          fontSize={headingWeight.size}>
          {store.lang.job_Requirement}
        </JText>
        <View style={{marginHorizontal: RFPercentage(1.3)}}>
        <JText fontWeight="bold" fontSize={simpleText}>
          {store.lang.job_skills} :
        </JText>
        {jobData?.job[0]?.job_requirement?.job_skills.map(skill => (
                <JText style={styles.txt1}>{store.lang.id===0?skill.name:store.lang.id===1?skill.urdu_title:skill.arabic_title}</JText>
              ))}
        <JText
          style={{marginTop: RFPercentage(1)}}
          fontWeight="bold"
          fontSize={simpleText}>
          {store.lang.degree_level} :
        </JText>
        <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                {jobData?.job[0]?.job_requirement?.degree_level.map(level => (
                  <JRow style={{marginHorizontal: RFPercentage(1)}}>
                    <JText style={styles.dg}>{store.lang.id===0?level.name:store.lang.id===1?level.urdu_title:level.arabic_title}</JText>
                  </JRow>
                ))}
              </ScrollView>

        <JText
          style={{marginTop: RFPercentage(1)}}
          fontWeight="bold"
          fontSize={simpleText}>
          {store.lang.assessment_Required} :
        </JText>
        <JText fontSize={simpleText}>
          {jobData?.job[0]?.job_requirement?.assessment_required
            ? jobData?.job[0]?.job_requirement?.assessment_required.map(
                (item, index) => item.assessment_name,
              )
            : 'N/A'}
        </JText>
</View>
        <JText
          style={{marginVertical: RFPercentage(1)}}
          fontSize={headingWeight.size}>
          {store.lang.job_Details}
        </JText>
      
        <JRow style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>
            {store.lang.job_category} :
          </JText>
          <JText style={styles.jobDetails_text}>
            {jobData?.job?.job_category?.name
              ? jobData?.job?.job_category?.name
              : 'N/A'}
          </JText>
        </JRow>

        <JRow style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>
            {store.lang.career_level} :
          </JText>
          <JText style={styles.jobDetails_text}>
            {jobData?.job.career_level
              ? jobData?.job?.career_level?.level_name
              : 'NA'}
          </JText>
        </JRow>

        <JRow style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>
            {store.lang.job_tag} :
          </JText>
          <JText
            // onPress={() => console.log(jobData.job.jobs_tag)}
            style={styles.jobDetails_text}>
            {jobData?.job?.jobs_tag?.length > 0
              ? jobData?.job?.jobs_tag.map((item, index) => item.name + ',')
              : 'N/A'}
          </JText>
        </JRow>

        <JRow style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>
            {store.lang.job_type} :
          </JText>
          <JText style={styles.jobDetails_text}>
            {jobData?.job?.job_type ? jobData?.job?.job_type?.name : 'N/A'}
          </JText>
        </JRow>

        <JRow style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>
            {store.lang.job_Shift} :
          </JText>
          <JText style={styles.jobDetails_text}>
            {jobData?.job?.job_shift ? jobData?.job?.job_shift.shift : 'N/A'}
          </JText>
        </JRow>

        <JRow style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>
            {store.lang.functional_Area} :
          </JText>
          <JText style={styles.jobDetails_text}>
            {jobData?.job?.functional_area
              ? jobData?.job?.functional_area.name
              : 'N/A'}
          </JText>
        </JRow>

        <JRow style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>
            {store.lang.position} :
          </JText>
          <JText style={styles.jobDetails_text}>
            {jobData?.job?.position ? jobData?.job?.position : 'N/A'}
          </JText>
        </JRow>

        <JRow style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>
            {store.lang.job_Experience} :
          </JText>
          <JText style={styles.jobDetails_text}>
            {jobData?.job?.experience ? jobData?.job?.experience : 'N/A'}
          </JText>
        </JRow>

        <JRow style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>
            {store.lang.Salary_Period} :
          </JText>
          <JText style={styles.jobDetails_text}>
            {jobData?.job?.salary_period
              ? jobData?.job?.salary_period.period
              : 'N/A'}
          </JText>
        </JRow>

        <JRow style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>
            {store.lang.Is_Freelance} :
          </JText>
          <JText style={styles.jobDetails_text}>
            {jobData?.job[0]?.is_freelance ? 'Yes' : 'No'}
          </JText>
        </JRow>
        <JText
          style={{marginTop: RFPercentage(1.5)}}
          fontSize={headingWeight.size}>
          {store.lang.description}
        </JText>

        {jobData?.job?.company?.details ? (
          <JTagText fontSize={simpleText}>
            {jobData?.job?.company?.details}
          </JTagText>
        ) : (
          <JText fontAlign="center" fontSize={simpleText}>
            N/A
          </JText>
        )}
      </JScrollView>

      <JApplyJob
        status={status}
        setStatus={setStatus}
        id={jobData?.job?.id}
        token={store.token?.token}
        jobId={jobData?.job?.job_id}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={150}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: colors.black[0],
          },
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',

            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {['pinterest', 'google', 'facebook', 'linkedin', 'twitter'].map(
            (item, index) => (
              <View style={{alignItems: 'center'}} key={index}>
                <FontAwesome
                  onPress={() => alert(item)}
                  name={item}
                  size={RFPercentage(3.5)}
                  color={colors.purple[0]}
                />
                <JText
                  fontWeight="600"
                  style={{
                    marginTop: RFPercentage(1),
                    textTransform: 'capitalize',
                  }}>
                  {item}
                </JText>
              </View>
            ),
          )}
        </View>
      </RBSheet>
    </JScreen>
  );
}
export default observer(SelectedJob);
const styles = StyleSheet.create({
  jobDetails: {
    marginBottom: RFPercentage(0.7),
  },
  dg: {
    marginVertical: RFPercentage(2),
    padding: RFPercentage(1),
    fontSize: RFPercentage(1.8),
    backgroundColor: '#F8FAFC',
    textAlign: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  headertxt: {fontSize: RFPercentage(1.9), fontWeight: 'bold', color: '#ffff'},
  headertxt1: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginVertical: RFPercentage(1),
  },

  headertxt2: {
    fontSize: RFPercentage(2),
    fontWeight: '700',
    marginVertical: RFPercentage(1),
  },
  headertxt3: {
    fontSize: RFPercentage(2),
    width: '40%',
    fontWeight: '800',
    marginVertical: RFPercentage(1),
  },
  txt: {fontSize: RFPercentage(1.8), color: '#ffff', margin: RFPercentage(1)},
  txt1: {
    fontSize: RFPercentage(1.9),
    fontWeight: '500',
    marginVertical: RFPercentage(0.5),
  },
  txt2: {
    fontSize: RFPercentage(1.9),
    fontWeight: '500',
  },

  jobDetails_heading: {
    width: '50%',
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
  },
  jobDetails_text: {width: '50%'},
});

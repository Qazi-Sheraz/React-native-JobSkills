import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import JScreen from '../../../customComponents/JScreen';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useState} from 'react';
import axios from 'axios';
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
export default function SelectedJob({route, navigation}) {
  const [jobData, setJobData] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState();
  const [id, setId] = useState(route.params.id);
  const refRBSheet = useRef();
  const simpleText = RFPercentage(2);
  const headingWeight = {
    weight: 'bold',
    size: RFPercentage(3),
  };

  const _getDetail = () => {
    var config = {
      method: 'get',
      url: `${url.baseUrl}/job-details/${id}`,
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data);
        setJobData(response.data);
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
        setError(true);

        Toast.show({
          type: 'error',
          text1: 'Error while getting Data',
        });
        setLoader(false);
      });
  };
  useEffect(() => {
    _getDetail();

    return () => {};
  }, []);

  return loader ? (
    <CLSelectedJob />
  ) : (
    <JScreen isError={error} onTryAgainPress={() => _getDetail()}>
      <JGradientView
        containerStyle={{
          height: heightPercentageToDP(25),
          paddingHorizontal: RFPercentage(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: RFPercentage(1.5),
          }}>
          <Feather
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={RFPercentage(3.5)}
            color={colors.white[0]}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome
              style={{marginRight: RFPercentage(2)}}
              onPress={() => alert('Star')}
              name="star-o"
              size={RFPercentage(3.5)}
              color={colors.white[0]}
            />

            <Menu>
              <MenuTrigger>
                <Entypo
                  name="dots-three-vertical"
                  size={RFPercentage(3.5)}
                  color={colors.white[0]}
                />
              </MenuTrigger>

              <MenuOptions>
                {['Share Job', 'Email To Friend', 'Report Abuse'].map(
                  (item, index) => (
                    <MenuOption
                      style={{
                        marginLeft: RFPercentage(1),
                        paddingVertical: RFPercentage(1.5),
                      }}
                      key={index}
                      onSelect={() => {
                        refRBSheet.current.open();
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
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
                          style={{marginLeft: RFPercentage(2)}}
                          fontSize={RFPercentage(2)}>
                          {item}
                        </JText>
                      </View>
                    </MenuOption>
                  ),
                )}
              </MenuOptions>
            </Menu>
          </View>
        </View>

        <JText
          fontWeight={headingWeight.weight}
          fontSize={headingWeight.size}
          fontColor={colors.white[0]}>
          {jobData.job.job_title}
        </JText>

        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Image
            style={{
              height: RFPercentage(2.3),
              width: RFPercentage(2.3),
              marginRight: RFPercentage(1),
            }}
            source={{uri: jobData.job.company.company_url}}
          />
          <JText fontColor={colors.white[0]} fontSize={simpleText}>
            {jobData.job.company.user.first_name}
          </JText>
        </View>

        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
            marginTop: RFPercentage(1),
          }}>
          <EvilIcons
            size={RFPercentage(3.5)}
            color={colors.white[0]}
            name="location"
          />
          <JText fontColor={colors.white[0]} fontSize={simpleText}>
            {jobData.job.city_name}
          </JText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: RFPercentage(1),
          }}>
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <EvilIcons
                size={RFPercentage(3.5)}
                color={colors.white[0]}
                name="calendar"
              />
              <JText fontColor={colors.white[0]} fontSize={simpleText}>
                Posted :
                {moment(jobData.job.job_publish_date).format('DD MMMM YYYY')}
              </JText>
            </View>
          </View>
          <JText fontColor={colors.white[0]} fontSize={simpleText}>
            Expiry :{moment(jobData.job.job_expiry_date).format('DD MMMM YYYY')}
          </JText>
        </View>
        <JText
          fontAlign="right"
          fontWeight={headingWeight.weight}
          fontColor={colors.white[0]}>
          Open Jobs:{jobData.data.jobsCount}
        </JText>
      </JGradientView>
      <JScrollView style={{paddingHorizontal: RFPercentage(3)}} enable={false}>
        <JText
          style={{marginTop: RFPercentage(1.5)}}
          fontSize={headingWeight.size}>
          About :
        </JText>
        {jobData.job.description ? (
          <JTagText fontSize={simpleText}>{jobData.job.description}</JTagText>
        ) : (
          <JText fontAlign="center" fontSize={simpleText}>
            N/A
          </JText>
        )}

        <JText
          style={{marginVertical: RFPercentage(1.5)}}
          fontSize={headingWeight.size}>
          Job Requirements :
        </JText>
        <JText fontWeight="bold" fontSize={simpleText}>
          Skill :
        </JText>
        <JText fontSize={simpleText}>
          {jobData.job.jobs_skill.map((item, index) => item.name)}
        </JText>

        <JText
          style={{marginTop: RFPercentage(1)}}
          fontWeight="bold"
          fontSize={simpleText}>
          Degree Level :
        </JText>
        <JText fontSize={simpleText}>
          {jobData.job.degree_level
            ? jobData.job.degree_level.map((item, index) => item.name)
            : 'N/A'}
        </JText>

        <JText
          style={{marginTop: RFPercentage(1)}}
          fontWeight="bold"
          fontSize={simpleText}>
          Assessment required :
        </JText>
        <JText fontSize={simpleText}>
          {jobData.job.assessment
            ? jobData.job.assessment.map((item, index) => item.assessment_name)
            : 'N/A'}
        </JText>

        <JText
          style={{marginVertical: RFPercentage(1)}}
          fontSize={headingWeight.size}>
          Job Details
        </JText>
        <View style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>Job Category</JText>
          <JText style={styles.jobDetails_text}>
            {jobData.job.job_category.name}
          </JText>
        </View>

        <View style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>Career Level</JText>
          <JText style={styles.jobDetails_text}>
            {jobData.job.career_level
              ? jobData.job.career_level.level_name
              : 'NA'}
          </JText>
        </View>

        <View style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>Job Tag</JText>
          <JText
            // onPress={() => console.log(jobData.job.jobs_tag)}
            style={styles.jobDetails_text}>
            {jobData.job.jobs_tag.length > 0
              ? jobData.job.jobs_tag.map((item, index) => item.name + ',')
              : 'N/A'}
          </JText>
        </View>

        <View style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>Job Type</JText>
          <JText style={styles.jobDetails_text}>
            {jobData.job.job_type ? jobData.job.job_type.name : 'N/A'}
          </JText>
        </View>

        <View style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>Job Shift</JText>
          <JText style={styles.jobDetails_text}>
            {jobData.job.job_shift ? jobData.job.job_shift.shift : 'N/A'}
          </JText>
        </View>

        <View style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>Functional Area</JText>
          <JText style={styles.jobDetails_text}>
            {jobData.job.functional_area
              ? jobData.job.functional_area.name
              : 'N/A'}
          </JText>
        </View>

        <View style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>Positions</JText>
          <JText style={styles.jobDetails_text}>
            {jobData.job.position ? jobData.job.position : 'N/A'}
          </JText>
        </View>

        <View style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>Job Experience</JText>
          <JText style={styles.jobDetails_text}>
            {jobData.job.experience ? jobData.job.experience : 'N/A'}
          </JText>
        </View>

        <View style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>Salary Period</JText>
          <JText style={styles.jobDetails_text}>
            {jobData.job.salary_period
              ? jobData.job.salary_period.period
              : 'N/A'}
          </JText>
        </View>

        <View style={styles.jobDetails}>
          <JText style={styles.jobDetails_heading}>Is Freelance</JText>
          <JText style={styles.jobDetails_text}>
            {jobData.job.is_freelance ? 'Yes' : 'No'}
          </JText>
        </View>
        <JText
          style={{marginTop: RFPercentage(1.5)}}
          fontSize={headingWeight.size}>
          Description :
        </JText>

        {jobData.job.company.details ? (
          <JTagText fontSize={simpleText}>
            {jobData.job.company.details}
          </JTagText>
        ) : (
          <JText fontAlign="center" fontSize={simpleText}>
            N/A
          </JText>
        )}
      </JScrollView>
      <JButton
        onPress={() => alert('Apply')}
        style={{
          width: '60%',
          height: heightPercentageToDP(5),
          marginBottom: RFPercentage(2),
        }}
        children={'Apply Job'}
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

const styles = StyleSheet.create({
  jobDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFPercentage(0.7),
  },
  jobDetails_heading: {
    width: '50%',
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
  },
  jobDetails_text: {width: '50%'},
});

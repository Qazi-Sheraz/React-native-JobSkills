import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import {Formik} from 'formik';
import * as yup from 'yup'; 

import {RFPercentage} from 'react-native-responsive-fontsize';

import JErrorText from '../../../customComponents/JErrorText';

import JText from '../../../customComponents/JText';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import colors from '../../../config/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import JSelectInput from '../../../customComponents/JSelectInput';
import {useNavigation} from '@react-navigation/native';
import { useContext } from 'react';
import { StoreContext } from '../../../mobx/store';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import url from '../../../config/url';
import { JToast } from '../../../functions/Toast';
import { _getProfile } from '../../../functions/Candidate/MyProfile';

function CSkills({data}) {
  const store=useContext(StoreContext);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(false);
 

  return (
    <Formik
      initialValues={{
        skill: [],
      }}
      validationSchema={yup.object().shape({
        
              skill: yup
              .array()
              .of(
                yup.object().shape({
                  id: yup.string().required('skill ID is required'),
                  name: yup.string().required('skill name is required'),
                }),
              )
              .required('skill is required')
              .min(1, 'At least one skill is required'),
 
      })}
      onSubmit={values => {
        // console.log(values);
       

        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
        var formdata = new FormData();
        formdata.append('candidateSkills', JSON.stringify(values?.skill.map((i)=>i.id).map(Number)));
      //  console.log(formdata)

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };
        setLoader1(true);
        fetch(
          `${url.baseUrl}/update-skills`,
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
          // console.log(result)
              JToast({
                type: 'success',
                text1: result,
              });
              _getProfile(store)
              setLoader1(false)
              navigation.navigate('Aboutme')
               
          })
          .catch(error => {
            // console.log('error', error);
            setLoader(false);
          });

        // _postData(values);
      }}
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
        <JScreen headerShown={false}>
          <JGradientHeader
            center={
              <JText
                fontColor={colors.white[0]}
                fontWeight="bold"
                fontSize={RFPercentage(2.5)}>
                {store.lang.job_skills}
              </JText>
            }
            right={
              loader1 ? (
                <ActivityIndicator
                  color={colors.white[0]}
                  size={RFPercentage(2)}
                />
              ) : (
                <JText
                  onPress={() => isValid && handleSubmit(values)}
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
{store.myProfileApiLoader?<ActivityIndicator/>:
        (  <View
            style={{
              marginTop: RFPercentage(3),
              paddingHorizontal: RFPercentage(2),
            }}>
            <JSelectInput
            isMultiple={true}
              containerStyle={{marginTop: RFPercentage(2)}}
              value={values.skill?.map(i => i?.name)?.join(', ')}
              id={values.skill}
              data={store.lang.id==0?store.myProfile?.dataEnglish?.skills:store.myProfile?.dataArabic?.skills}
              header={store.lang.job_skills}
              heading={`${store.lang.job_skills}:`}
              setValue={e => setFieldValue('skill', e)}
              error={touched.skill && errors.skill && true}
              rightIcon={
                <Feather
                  name="chevron-down"
                  size={RFPercentage(2.5)}
                  color={colors.black[0]}
                />
              }
            />
            {touched.skill && errors.skill && (
              <JErrorText>{errors.skill}</JErrorText>
            )}
          </View>)}
        </JScreen>
      )}
    </Formik>
  );
}
export default observer(CSkills);
const styles = StyleSheet.create({});

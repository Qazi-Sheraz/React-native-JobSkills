import {ScrollView, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import {Observer, observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import JText from '../../../customComponents/JText';
import JButton from '../../../customComponents/JButton';
import JSelectInput from '../../../customComponents/JSelectInput';
import colors from '../../../config/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

import {Formik} from 'formik';
import JErrorText from '../../../customComponents/JErrorText';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import {_search, _searchFilter} from '../../../functions/CFilter';
import { ActivityIndicator } from 'react-native';
import url from '../../../config/url';

const CFilter = ({navigation}) => {
  const store = useContext(StoreContext);

  const _getFilterList = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      `${url.baseUrl}/search-jobs-filters`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        store.setFilterList(result);
      })
      .catch(error => {
        // console.log('job===error', error);
        store.setFilterApiError(true);
      })
      .finally(() => {
        store.setFilterApiLoader(false);
      });
  };
useEffect(() => {
  store.setFilterApiLoader(true)
_getFilterList();
}, [])

  return (
    <Observer>
      {() => (
<JScreen
 isError={store.filterApiError}
 onTryAgainPress={() => {
  _getFilterList(), store.setFilterApiError(false);
 }}
          header={
            <JGradientHeader
              center={
                <JText
                  fontColor={colors.white[0]}
                  fontWeight="bold"
                  fontSize={RFPercentage(2.5)}>
                  {store.lang.filter}
                </JText>
              }
            />
          }>
           { store.filterApiLoader?<ActivityIndicator/>
        :(
          <Formik
            initialValues={{
              category: '',
              skill: '',
              gender: '',
              level: '',
            }}
            onSubmit={values => {
              // console.log(values);
              _searchFilter(values, store, navigation);
            }}>
            {({
              values,
              errors,
              touched,
              handleSubmit,
              setFieldValue,
            }) => (
              <>
                <ScrollView
                  contentContainerStyle={{paddingBottom: RFPercentage(8)}}
                  style={{
                    marginHorizontal: RFPercentage(2),
                  }}>
                 

                  <JSelectInput
                    containerStyle={{marginTop: RFPercentage(2)}}
                    data={store.lang.id==0?store.filterList?.dataEnglish?.jobCategories:store.filterList?.dataArabic?.jobCategories}
                    value={values.category?.name}
                    header={store.lang.job_category}
                    heading={`${store.lang.job_category} :`}
                    setValue={e => setFieldValue('category', e)}
                    error={touched.category && errors.category && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.category && errors.category && (
                    <JErrorText>{errors.category}</JErrorText>
                  )}

                  <JSelectInput
                    containerStyle={{marginTop: RFPercentage(2)}}
                    data={store.lang.id==0?store.filterList?.dataEnglish?.jobSkills:store.filterList?.dataArabic?.jobSkills}
                    value={values.skill?.name}
                    header={store.lang.job_skills}
                    heading={`${store.lang.job_skills} :`}
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

                  <JSelectInput
                    containerStyle={{marginTop: RFPercentage(2)}}
                    data={store.lang.id==0?store.filterList?.dataEnglish?.genders:store.filterList?.dataArabic?.genders}
                    value={values.gender?.name}
                    header={store.lang.gender}
                    heading={`${store.lang.gender} :`}
                    setValue={e => setFieldValue('gender', e)}
                    error={touched.gender && errors.gender && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.gender && errors.gender && (
                    <JErrorText>{errors.gender}</JErrorText>
                  )}

                  <JSelectInput
                    containerStyle={{marginTop: RFPercentage(2)}}
                    data={store.lang.id==0?store.filterList?.dataEnglish?.careerLevels:store.filterList?.dataArabic?.careerLevels}
                    value={values.level?.name}
                    header={store.lang.career_level}
                    heading={`${store.lang.career_level} :`}
                    setValue={e => setFieldValue('level', e)}
                    error={touched.level && errors.level && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.level && errors.level && (
                    <JErrorText>{errors.level}</JErrorText>
                  )}

                 
                </ScrollView>

                <JButton
                  // isValid={!store.filterDataApiLoader}
                  onPress={() => handleSubmit()}
                  style={{
                    position: 'absolute',
                    bottom: RFPercentage(5),
                    width: RFPercentage(20),
                  }}>
                  {store.filterDataApiLoader? store.lang.loading: store.lang.save}
                </JButton>
              </>
            )}
          </Formik>)}
        </JScreen>
      )}
    </Observer>
  );
};

export default CFilter;

const styles = StyleSheet.create({});

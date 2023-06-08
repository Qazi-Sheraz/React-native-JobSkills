import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
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

const CFilter = ({navigation}) => {
  const store = useContext(StoreContext);

  return (
    <Observer>
      {() => (
        <JScreen
          header={
            <JGradientHeader
              center={
                <JText
                  fontColor={colors.white[0]}
                  fontWeight="bold"
                  fontSize={RFPercentage(2.5)}>
                  {'Filter'}
                </JText>
              }
            />
          }>
          <Formik
            initialValues={{
              type: '',
              category: '',
              skill: '',
              gender: '',
              level: '',
              area: '',
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
                    data={store.filterList.jobTypes}
                    value={values.type?.name}
                    header={'Job Type'}
                    heading={'Job Type :'}
                    setValue={e => setFieldValue('type', e)}
                    error={touched.type && errors.type && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.type && errors.type && (
                    <JErrorText>{errors.type}</JErrorText>
                  )}

                  <JSelectInput
                    containerStyle={{marginTop: RFPercentage(2)}}
                    data={store.filterList.jobCategories}
                    value={values.category?.name}
                    header={'Job Category'}
                    heading={'Job Category :'}
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
                    data={store.filterList.jobSkills}
                    value={values.skill?.name}
                    header={'Job Skill'}
                    heading={'Job Skill :'}
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
                    data={store.filterList.genders}
                    value={values.gender?.name}
                    header={'Gender'}
                    heading={'Gender :'}
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
                    data={store.filterList.careerLevels}
                    value={values.level?.name}
                    header={'Carrer Level'}
                    heading={'Career Level :'}
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

                  <JSelectInput
                    containerStyle={{marginTop: RFPercentage(2)}}
                    data={store.filterList.functionalAreas}
                    value={values.area?.name}
                    header={'Functional Area'}
                    heading={'Functional Area :'}
                    setValue={e => setFieldValue('area', e)}
                    error={touched.area && errors.area && true}
                    rightIcon={
                      <Feather
                        name="chevron-down"
                        size={RFPercentage(2.5)}
                        color={colors.black[0]}
                      />
                    }
                  />
                  {touched.area && errors.area && (
                    <JErrorText>{errors.area}</JErrorText>
                  )}
                </ScrollView>

                <JButton
                  // isValid={!store.filterDataApiLoader}
                  onPress={() => handleSubmit()}
                  style={{
                    position: 'absolute',
                    bottom: RFPercentage(1),
                    width: RFPercentage(20),
                  }}>
                  {store.filterDataApiLoader == true ? 'Loading' : 'Save'}
                </JButton>
              </>
            )}
          </Formik>
        </JScreen>
      )}
    </Observer>
  );
};

export default CFilter;

const styles = StyleSheet.create({});

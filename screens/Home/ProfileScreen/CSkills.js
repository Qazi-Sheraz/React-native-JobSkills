import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import {Formik} from 'formik';

import {RFPercentage} from 'react-native-responsive-fontsize';

import JErrorText from '../../../customComponents/JErrorText';

import JText from '../../../customComponents/JText';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import colors from '../../../config/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import JSelectInput from '../../../customComponents/JSelectInput';
import {useNavigation} from '@react-navigation/native';

function CSkills({data}) {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  return (
    <Formik
      initialValues={{
        skill: '',
      }}
      onSubmit={values => {
        // console.log(values.skill);
      }}
      // validationSchema={yup.object().shape({

      // })}
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
                Skills
              </JText>
            }
            right={
              loader ? (
                <ActivityIndicator
                  color={colors.white[0]}
                  size={RFPercentage(2)}
                />
              ) : (
                <JText
                  onPress={() => isValid && handleSubmit()}
                  fontColor={
                    !isValid ? `${colors.white[0]}70` : colors.white[0]
                  }>
                  Save
                </JText>
              )
            }
            left={
              <Feather
                onPress={() => navigation.goBack()}
                name="chevron-left"
                size={RFPercentage(3.5)}
                color={colors.white[0]}
              />
            }
          />

          <View
            style={{
              marginTop: RFPercentage(3),
              paddingHorizontal: RFPercentage(2),
            }}>
            <JSelectInput
              containerStyle={{marginTop: RFPercentage(2)}}
              value={values.skill?.name}
              data={data.skills}
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
          </View>
        </JScreen>
      )}
    </Formik>
  );
}
export default observer(CSkills);
const styles = StyleSheet.create({});

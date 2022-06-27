import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import JScreen from '../../../customComponents/JScreen';
import JGradientProfileHeader from '../../../customComponents/JGradientProfileHeader';
import JInput from '../../../customComponents/JInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {RFPercentage} from 'react-native-responsive-fontsize';

import JErrorText from '../../../customComponents/JErrorText';

import JText from '../../../customComponents/JText';
import JScrollView from '../../../customComponents/JScrollView';
import {Picker, onOpen} from 'react-native-actions-sheet-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Jdata from '../../../data/experience.json';
function CExperienceInformation({navigation}) {
  const [data, setData] = useState(Jdata);
  const [query, setQuery] = useState('');
  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter(item =>
        item.name
          .toLocaleLowerCase('en')
          .includes(query.toLocaleLowerCase('en')),
      );
    }
  }, [data, query]);

  const onSearch = text => {
    setQuery(text);
  };
  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientProfileHeader
          onBackPress={() => navigation.goBack()}
          onSavePress={() => alert('Save')}
          heading={'Contacts'}
        />
      }>
      <Formik
        initialValues={{
          currentSalary: '',
          expectedSalary: '',
          experience: '',
        }}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={yup.object().shape({
          experience: yup.string().required('Experience is a required field'),
          currentSalary: yup
            .string()
            .required('First Name is a required field'),
          expectedSalary: yup
            .string()
            .required('Last Name is a required field'),
        })}>
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
          <JScrollView style={{marginTop: RFPercentage(2)}}>
            <JInput
              containerStyle={styles.input}
              value={values.currentSalary}
              heading={'Current salary'}
              error={touched.currentSalary && errors.currentSalary && true}
              autoFocus
              placeholder="USD"
              onChangeText={handleChange('currentSalary')}
              onBlur={() => setFieldTouched('currentSalary')}
            />
            {touched.currentSalary && errors.currentSalary && (
              <JErrorText>{errors.currentSalary}</JErrorText>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onOpen('country');
              }}>
              <JText>Open ActionSheet</JText>
            </TouchableOpacity>

            <Picker
              id="country"
              data={filteredData}
              inputValue={query}
              searchable={true}
              label="Select Currency"
              setSelected={item => setFieldValue('gender', item.name)}
              onSearch={onSearch}
              closeText={
                <Entypo name="circle-with-cross" size={RFPercentage(3.5)} />
              }
            />
          </JScrollView>
        )}
      </Formik>
    </JScreen>
  );
}
export default observer(CExperienceInformation);
const styles = StyleSheet.create({});

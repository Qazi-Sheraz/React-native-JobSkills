import {StyleSheet, SafeAreaView, View} from 'react-native';
import React from 'react';
import JGradientHeader from '../../customComponents/JGradientHeader';
import colors from '../../config/colors';
import JText from '../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JInput from '../../customComponents/JInput';
import JIcon from '../../customComponents/JIcon';
import JRow from '../../customComponents/JRow';
import JButton from '../../customComponents/JButton';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useState} from 'react';
import {useContext} from 'react';
import {StoreContext} from '../../mobx/store';
import {JToast} from '../../functions/Toast';
import {_dashboard} from '../../functions/Candidate/BottomTab';
import JErrorText from '../../customComponents/JErrorText';
const CompanyName = () => {
  const store = useContext(StoreContext);
  const [loader1, setLoader1] = useState(false);
  return (
    <SafeAreaView style={styles.centeredView}>
      <JGradientHeader
        center={
          <JText
            fontColor={colors.white[0]}
            fontWeight="bold"
            fontSize={RFPercentage(2.5)}>
            {store.lang.company_name}
          </JText>
        }
      />

      <Formik
        initialValues={{
          companyname: '',
        }}
        onSubmit={values => {
          setLoader1(true);
          var formdata = new FormData();
          formdata.append('companyName', values.companyname);
          console.log('companyname form', formdata);

          var myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
          };
          console.log(store.token?.token);
          fetch(
            'https://dev.jobskills.digital/api/update/employee/company',
            requestOptions,
          )
            .then(response => response.json())
            .then(result => {
              console.log('Result company===>', result);

              if (result.success) {
                JToast({
                  type: 'success',
                  text1: store.lang.success,
                  text12: store.lang.company_name_successfully_added,
                });
                setLoader1(false);
                _dashboard(store);
              }
            })
            .catch(error => {
              console.log('errorrrrr', error);
              // setModalVisible(false)
              JToast({
                type: 'danger',
                text1: store.lang.eror,
                text2: store.lang.cannot_proceed_your_request,
              });
              setLoader1(false);
            });
        }}
        validationSchema={yup.object().shape({
          companyname: yup
            .string()
            // .min(3, 'Company Name Must be at least 3 characters')
            .max(
              100,
              store.lang.Company_Name_must_be_at_most_100_characters_long,
            )
            .transform(value => value.trim())
            .matches(
              /^[A-Za-z\u0600-\u06FF\s]*[A-Za-z\u0600-\u06FF][A-Za-z\u0600-\u06FF\s\d\W]*$/,
              store.lang.Company_Name_must_only_contain_alphabetic_characters,
            )
            .required(store.lang.Company_Name_is_a_required_field),
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
          <View style={styles.modalView1}>
            <JText
              style={{
                color: colors.info[0],
                fontWeight: 'bold',
                fontSize: RFPercentage(2.3),
              }}>
              {store.employeHome?.error}
            </JText>
            <JInput
              isRequired
              style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
              value={values.companyname}
              error={touched.companyname && errors.companyname && true}
              heading={store.lang.company_name}
              icon={
                <JIcon
                  icon={'an'}
                  name="home"
                  style={{
                    marginRight:
                      store.lang.id == 0 ? RFPercentage(1.3) : RFPercentage(0),
                    marginLeft:
                      store.lang.id == 0 ? RFPercentage(0) : RFPercentage(1.3),
                  }}
                  size={RFPercentage(3)}
                  color={colors.purple[0]}
                />
              }
              placeholder={store.lang.company_name}
              onChangeText={handleChange('companyname')}
              onBlur={() => setFieldTouched('companyname')}
              containerStyle={{marginTop: RFPercentage(3)}}
            />
            {touched.companyname && errors.companyname && (
              <JErrorText>{errors.companyname}</JErrorText>
            )}
            <JRow
              style={{
                justifyContent: 'flex-end',
                marginTop: RFPercentage(5),
              }}>
              {/* <JButton
              onPress={() => {
                setModalVisible(false)
              }}
              style={{
                marginHorizontal: RFPercentage(2),
                backgroundColor: '#fff',
                borderColor: '#000040',
              }}>
              {store.lang.close}
            </JButton> */}
              <JButton
                disabled={loader1 ? true : false}
                isValid={isValid}
                onPress={() => handleSubmit()}>
                {loader1 ? store.lang.loading : store.lang.submit}
              </JButton>
            </JRow>
          </View>
        )}
      </Formik>
      {/* <Pressable style={{height:'15%',width:'100%'}} onPress={()=> setModalVisible(!modalVisible)}/> */}
    </SafeAreaView>
  );
};

export default CompanyName;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#00000090',
  },
  modalView1: {
    padding: RFPercentage(2),
    backgroundColor: colors.white[0],
    borderBottomLeftRadius: RFPercentage(2),
    borderBottomRightRadius: RFPercentage(2),
    width: '100%',
    // height:'60%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

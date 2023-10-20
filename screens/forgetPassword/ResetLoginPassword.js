import { StyleSheet, Text, View } from 'react-native'
import React , { useContext,useState }from 'react'
import JScreen from '../../customComponents/JScreen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JCircularLogo from '../../customComponents/JCircularLogo';
import JText from '../../customComponents/JText';
import { Formik } from 'formik';
import * as yup from 'yup';
import JInput from '../../customComponents/JInput';
import JRow from '../../customComponents/JRow';
import JButton from '../../customComponents/JButton';
import colors from '../../config/colors';
import { StoreContext } from '../../mobx/store';
import { useNavigation, useRoute } from '@react-navigation/native';
import JFooter from '../../customComponents/JFooter';
import JIcon from '../../customComponents/JIcon';
import { observer } from 'mobx-react';
import JErrorText from '../../customComponents/JErrorText';
import url from '../../config/url';
import Toast from 'react-native-toast-message';
import { JToast } from '../../functions/Toast';
const ResetLoginPassword = () => {
    const navigation=useNavigation();
    const store = useContext(StoreContext);
    const [loader,setLoader]=useState();
    const {params}=useRoute();
    // console.log(params);
    const type = params?.type;

    const _resetPass = values => {
        var formdata = new FormData();
        formdata.append("email", params?.email);
        formdata.append('password', values.password);
    formdata.append('confirm_password', values.password_confirmation);
        // console.log(formdata);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
        };
 
        setLoader(true);
 
        fetch(`${url.baseUrl}/password-reset`, requestOptions)
          .then(response => response.json())
          .then(result => {
            // console.log('Result===>', result);
 
            if (result.success == true) {
              JToast({
               type: 'success',
               text1: result.message,
             });
             navigation.navigate('CLogin',{type: type})
            } else {
              JToast({
               type: 'danger',
               text1: result.message,
             });
              
            }
          })
          .catch(error => {
            JToast({
             type: 'danger',
             text1: error.message,
           });
            
          })
          .finally(() => {
            setLoader(false);
          });
      };
  return (
    <JScreen>
     <View
        style={{
          flex: 0.3,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingHorizontal: RFPercentage(2),
          marginTop: RFPercentage(4),
          
        }}>
        <JCircularLogo multiple={1.4} />
      <View style={{justifyContent: 'center',
        alignItems: 'center',justifyContent:'flex-end'}}>
        <JText
          fontSize={RFPercentage(3.5)}
          fontWeight={'bold'}
          children={store.lang.reset_password}
          style={{marginTop: RFPercentage(2)}}
        />
        <JText
          fontSize={RFPercentage(2)}
          style={{marginVertical: RFPercentage(1)}}>
          {store.lang.reset_password_txt}
        </JText>
      </View>
    </View>

    <Formik
    initialValues={{
      password: '',
      password_confirmation: '',
    }}
    onSubmit={values => {
    //   console.log(values);
      _resetPass(values);
    }}
    validationSchema={yup.object().shape({
      password: yup
        .string()
        .min(8, store.lang.Password_Must_be_at_least_8_characters)
        .required(store.lang.Password_is_a_required_field),
      password_confirmation: yup
        .string()
        .required(store.lang.Confirm_Password_is_a_required_field)
        .oneOf([yup.ref(store.lang.Password), null], store.lang.Password_must_match),
    })}>
    {({
      values,
      handleChange,
      errors,
      setFieldTouched,
      touched,
      isValid,
      handleSubmit,
    }) => (
      <>
        <View
            style={{
              flex: 0.6,
              padding: RFPercentage(3),
            }}>
         
          <JInput
          style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
            headingWeight="bold"
            heading={store.lang.new_password}
            maxLength={30}
            icon={ <JIcon
            icon={'ma'}
                name="shield-key-outline"
                shield-key-outline
                style={{
                  marginRight:
                    store.lang.id == 0 ? RFPercentage(1.5) : RFPercentage(0),
                  marginLeft:
                    store.lang.id == 0 ? RFPercentage(0) : RFPercentage(1.5),
                }}
                size={RFPercentage(3)}
                color={colors.purple[0]}
              />}
            value={values.password}
            error={touched.password && errors.password && true}
            onChangeText={handleChange('password')}
            onBlur={() => setFieldTouched('password')}
            containerStyle={{marginVertical: RFPercentage(2)}}
          />
          {touched.password && errors.password && (
            <JErrorText>{errors.password}</JErrorText>
          )}
          <JInput
          style={{textAlign: store.lang.id === 0 ? 'left' : 'right'}}
            headingWeight="bold"
            heading={store.lang.confirm_password}
            maxLength={30}
            icon={ <JIcon
                icon={'ma'}
                    name="shield-key-outline"
                    shield-key-outline
                    style={{
                      marginRight:
                        store.lang.id == 0 ? RFPercentage(1.5) : RFPercentage(0),
                      marginLeft:
                        store.lang.id == 0 ? RFPercentage(0) : RFPercentage(1.5),
                    }}
                    size={RFPercentage(3)}
                    color={colors.purple[0]}
                  />}
            value={values.password_confirmation}
            error={
              touched.password_confirmation &&
              errors.password_confirmation &&
              true
            }
            onChangeText={handleChange('password_confirmation')}
            onBlur={() => setFieldTouched('password_confirmation')}
          />
          {touched.password_confirmation &&
            errors.password_confirmation && (
              <JErrorText>{errors.password_confirmation}</JErrorText>
            )}
             <JButton
              isValid={isValid}
              style={{
                marginTop: RFPercentage(10),
                paddingHorizontal: RFPercentage(6),
              }}
              onPress={() => handleSubmit()}
              children={loader?store.lang.loading:store.lang.reset}
            />
        </View>
       
      </>
    )}
  </Formik>

    <JFooter
      onPress={() => navigation.navigate('CLogin',{type: type})}
      children={store.lang.already_Login}
    />
   
  </JScreen>
  
  )
}

export default observer(ResetLoginPassword)

const styles = StyleSheet.create({})
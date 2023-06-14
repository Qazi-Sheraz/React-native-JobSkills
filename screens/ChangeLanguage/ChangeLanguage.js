import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JText from '../../customComponents/JText';
import JScreen from '../../customComponents/JScreen';
import JChevronIcon from '../../customComponents/JChevronIcon';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../config/colors';
import JGradientHeader from '../../customComponents/JGradientHeader';
import JButton from '../../customComponents/JButton';
import {useState} from 'react';
import JCircleCheck from '../../customComponents/JCircleCheck';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { StoreContext } from '../../mobx/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import url from '../../config/url';
import Toast from 'react-native-toast-message';
import RNRestart from 'react-native-restart';

const ChangeLanguage = () => {
  const navigation=useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const store = useContext(StoreContext);
  const isFoucs = useIsFocused();
  const [data, setData] = useState([
    {id: 0, name: 'English (United Kingdom)', selected: false,short:"en"},
    // {id: 1, name: 'اردو', selected: false,short:"ur"},
    {id: 2, name:  'العربية', selected: false,short:"ar"},
  ]);
  // console.log(data.short)

  const _changeLanguage =  (selectedLanguage) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${store.token?.token}`);
// console.log(selectedLanguage)
    var formdata = new FormData();
    formdata.append("languageName",selectedLanguage);
    // console.log(formdata);
    fetch(`${url.baseUrl}/change-language`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        if(result.success== true){
          Toast.show({
            type: 'success',
            text1: result.message,
          });
            RNRestart.restart()
        }
        else{
          Toast.show({
            type: 'error',
            text1: result.message,
          });
        }
      })
      .catch(error => console.log('error', error));
  };


  // const handleSave = async () => {
  //   const selectedLanguage = data.find(item => item.selected);
  //   if (selectedLanguage) {
  //     const lang = selectedLanguage.short;
  //     // console.log(selectedLanguage);
  //     try {
  //       await AsyncStorage.setItem('selectedLanguage', selectedLanguage.short);
  //       store.setLang(selectedLanguage.short)

  //       _changeLanguage(selectedLanguage.short);
  //     } catch (error) {
  //       // console.log('Error storing language:', error);
  //     }
  //   }
  // };
  const handleSave = async () => {
    if (selectedLanguage) {
      const lang = selectedLanguage;
      try {
        await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
        store.setLang(selectedLanguage);
        _changeLanguage(selectedLanguage);
      } catch (error) {
        console.log('Error storing language:', error);
      }
    }
  };
  const getStoredLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (storedLanguage) {
        // Language was found in AsyncStorage, set it as the selected language
        setSelectedLanguage(storedLanguage);
      } else {
        // Set the default language as the selected language
        setSelectedLanguage(data.find(item => item.selected).short);
      }
    } catch (error) {
      console.log('Error retrieving stored language:', error);
    }
  };
  useEffect(() => {
    getStoredLanguage();
  }, [])
  // console.log(fetchSelectedLanguage())

  return (
    <JScreen
      style={{paddingHorizontal: RFPercentage(2)}}
      header={
        <JGradientHeader
          center={
            <JText
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.change_language}
            </JText>
          }
          left={JChevronIcon}
        />
      }>
      <View style={{flex: 1, marginVertical: RFPercentage(3)}}>
        <JText style={styles.header}>{store.lang.jobskills_language}</JText>
        {data.map((item, index) => (
          <JCircleCheck
            key={index}
            language={item.name}
            // isSelected={item.selected }
            // onPress={() => {

            //   setData(
            //     data.map(obj =>
            //       obj.id === item.id
            //         ? {...obj, selected: true}
            //         : {...obj, selected: false},
            //     ),
            //   );
            // }}
            isSelected={selectedLanguage === item.short}
            onPress={() => {
              setSelectedLanguage(item.short);
            }}
          />
        ))}
      </View>

      <JButton
        onPress={() => {
          handleSave();
        }}
        style={{
          marginBottom: RFPercentage(5),
          paddingHorizontal: RFPercentage(5),
        }}
        children={store.lang.save}
      />
    </JScreen>
  );
};

export default observer(ChangeLanguage);

const styles = StyleSheet.create({
  header: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginBottom: RFPercentage(2),
  },
});

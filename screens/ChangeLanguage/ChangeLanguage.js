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
  const store = useContext(StoreContext);
  const isFoucs = useIsFocused();
  const [data, setData] = useState([
    {id: 0, name: 'English (United Kingdom)', selected: false},
    {id: 1, name: 'اردو', selected: false},
    {id: 2, name:  'العربية', selected: false},
  ]);
  // console.log(selected)

  const _changeLanguage =  (lang) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${store.token?.token}`);

    var formdata = new FormData();
    formdata.append("languageName",lang ==='English (United Kingdom)'?'en':lang ==='اردو'?'ur':lang ==='العربية'&&'ar');
    console.log(formdata);
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
          // navigation.navigate('EAccountSetting',{name: lang}); // Store the selected language
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
  const handleSave = async () => {
    const selectedLanguage = data.find(item => item.selected);
    if (selectedLanguage) {
      const lang = selectedLanguage.name;
      if (lang === 'English (United Kingdom)') {
        store.setLang('en'); // Switch to 'en' language
      } else if (lang === 'اردو') {
        store.setLang('ur'); // Switch to 'ur' language
      } else if (lang === 'العربية') {
        store.setLang('ar'); // Switch to 'ar' language
      }
      
      try {
        await AsyncStorage.setItem('selectedLanguage', lang);
        _changeLanguage(lang);
       
      } catch (error) {
        console.log('Error storing language:', error);
      }
    }
   
  };
  const _getSelectedLanguage = async () => {
    try {
      const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (selectedLanguage) {
        // Update the selected language in the data state
        setData((prevData) =>
          prevData.map((item) =>
            item.name === selectedLanguage
              ? { ...item, selected: true }
              : { ...item, selected: false }
          )
        );
      }
    } catch (error) {
      console.log('Error retrieving language:', error);
    }
  };
  useEffect(() => {
    _getSelectedLanguage();
  }, [isFoucs])
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
            isSelected={item.selected}
            onPress={() => {
              setData(
                data.map(obj =>
                  obj.id === item.id
                    ? {...obj, selected: true}
                    : {...obj, selected: false},
                ),
              );
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

import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import JScreen from '../../customComponents/JScreen';

import {StoreContext} from '../../mobx/store';
import {observer} from 'mobx-react';
import JText from '../../customComponents/JText';
import JGradientHeader from '../../customComponents/JGradientHeader';
import colors from '../../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JIcon from '../../customComponents/JIcon';
import JNotification from '../../customComponents/JNotification';
import JChevronIcon from '../../customComponents/JChevronIcon';
import { FlatList } from 'react-native-gesture-handler';
import { useState } from 'react';
import url from '../../config/url';
import { useEffect } from 'react';

function Notification ({navigation, route}) {
  const store = useContext(StoreContext);
  const [data,setData]=useState();
  const [loader,setLoader]=useState(true);
  const params = route.params || {};
  const {id} = params;
  // console.log(id)



  const _notify = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${store.token?.token}`,
    );

    fetch(`${url.baseUrl}/get-notification`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setData(result);
       
      })

      .catch(error => {
        //  console.log('error', error);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    _notify();
  }, [loader]);
  // console.log(data[0]?.title)
  return (
    <JScreen  
    
    onTryAgainPress={()=> _notify()}
    // style={{marginHorizontal: RFPercentage(2),}}
    header={ 
    <JGradientHeader 
      left={
        <JChevronIcon />
      }
      center={
        <JText 
        fontColor={colors.white[0]}
        fontWeight="bold"
        fontSize={RFPercentage(2.5)}>
        {store.lang.notification}
        </JText>}
        />
        }>
          <FlatList
          data={data}
          renderItem={({item,index})=>
     <JNotification item={item}/>}
     />
      <JText>{id}</JText>
    </JScreen>
  );
}

export default observer(Notification);
const styles = StyleSheet.create({});

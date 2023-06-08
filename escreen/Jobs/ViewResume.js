import { ScrollView, Dimensions, ActivityIndicator, Button,Linking } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import JScreen from '../../customComponents/JScreen'
import JGradientHeader from '../../customComponents/JGradientHeader'
import JText from '../../customComponents/JText'
import colors from '../../config/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import JChevronIcon from '../../customComponents/JChevronIcon'
import { baseUrl } from '../../ApiUrls'
import { useRoute } from '@react-navigation/native'
import Pdf from 'react-native-pdf';
import JButton from '../../customComponents/JButton'
import { View } from 'react-native-animatable'
import { StoreContext } from '../../mobx/store'
import url from '../../config/url'
import { observer } from 'mobx-react'



const ViewResume = () => {
    const store = useContext(StoreContext);
    const [error, setError] = useState(false);
   
  return (
    <JScreen>
      <JGradientHeader
        center={
          <JText
            fontColor={colors.white[0]}
            fontWeight="bold"
            fontSize={RFPercentage(2.5)}>
            {store.lang.test_cV}
          </JText>
        }
        left={JChevronIcon}
      />

      {store.pdfApiLoader === true ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex:1 }}>
        <ScrollView 
         
           showsVerticalScrollIndicator={false}>
          <Pdf
            trustAllCerts={false}
            source={{uri: store.pdf}}
            onLoadComplete={(numberOfPages, filePath) => {
              // console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              // console.log(`Current page: ${page}`);
            }}
            onError={error => {
              // console.log(error);
            }}
            onPressLink={uri => {
              // console.log(`Link pressed: ${uri}`);
            }}
            style={{
              alignSelf: 'center',
              backgroundColor: '#ffff',
              width: Dimensions.get('window').width/1.1,
              height: Dimensions.get('window').height/1.5,
              marginTop:RFPercentage(5),
            // width:'100%',
            // height:'80%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          />
         
        </ScrollView>
        <JButton
            // isValid={isValid}
            onPress={() => {
              Linking.openURL(store.pdf);
            }}
            style={{
            //   width: '46%',
            padding:RFPercentage(1),
              position:'absolute',
              bottom:20
            }}
            children={store.lang.downloadResume}
          /></View>
      )}
    </JScreen>
  );
}

export default observer(ViewResume)
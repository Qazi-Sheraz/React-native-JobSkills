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
    const {params}= useRoute()
    // console.log(params)
    const store = useContext(StoreContext);
    const [error, setError] = useState(false);
    const [resume, setResume] = useState();
    const [loader, setLoader] = useState(true);
    const _viewResume = (id) => {
        var myHeaders = new Headers();
        myHeaders.append(
          'Authorization',
          `Bearer ${store.token.token}`,
        );
    
        fetch(`${url.baseUrl}/employer/resume-view/${params.id}`, {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        })
        
          .then(response => response.json())
          .then(result => {
            // console.log(result);
           setResume(result)          })
    
          .catch(error => {
             console.log('error', error);
            alert('error', error);
          })
          .finally(() => {
            setLoader(false);
          });
      };
      useEffect(() => {
        _viewResume();
      }, [loader]);

    //   const downloadPDF = () => {
    //     const fileURL = 'https://www.example.com/sample.pdf'; // Replace with your PDF file URL
    //     const filePath = RNFS.DocumentDirectoryPath + '/sample.pdf'; // Replace with the desired file name and path
      
    //     RNFetchBlob.config({
    //       fileCache: true,
    //       addAndroidDownloads: {
    //         useDownloadManager: true,
    //         notification: true,
    //         title: 'Sample PDF',
    //         path: filePath,
    //         description: 'Downloading PDF...',
    //         mime: 'application/pdf',
    //         mediaScannable: true,
    //         notificationOpenOnClick: true,
    //       },
    //     })
    //       .fetch('GET', fileURL, {})
    //       .then((res) => {
    //         console.log('File downloaded to:', res.path());
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };
      
  return (
    <JScreen isError={error} onTryAgainPress={() => _viewResume()}>
      <JGradientHeader
        center={
          <JText
            fontColor={colors.white[0]}
            fontWeight="bold"
            fontSize={RFPercentage(2.5)}>
            {'Test CV'}
          </JText>
        }
        left={JChevronIcon}
      />

      {loader == true ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex:1 }}>
        <ScrollView 
         
           showsVerticalScrollIndicator={false}>
          <Pdf
            trustAllCerts={false}
            source={{uri: resume?.data}}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
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
              Linking.openURL(resume?.data);
            }}
            style={{
            //   width: '46%',
            padding:RFPercentage(1),
              position:'absolute',
              bottom:20
            }}
            children={'Download Resume'}
          /></View>
      )}
    </JScreen>
  );
}

export default observer(ViewResume)
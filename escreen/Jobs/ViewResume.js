import { ScrollView, Dimensions, ActivityIndicator, Button } from 'react-native'
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
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQyOTYxYTYzYTU0NmZjNjNhZGY4MWFiNmI0N2I4MDNhNzMwMmMxZWRhNDMyMDk5ZGM1ZmNlMjNiZDUyYzY4ODBlN2I4ZDdlZDQ5MWI2YzMiLCJpYXQiOjE2ODAyMTI2NzQuOTE2NzE5LCJuYmYiOjE2ODAyMTI2NzQuOTE2NzIzLCJleHAiOjE3MTE4MzUwNzQuOTA5NzQxLCJzdWIiOiI4NCIsInNjb3BlcyI6W119.aay7JchvkClUeAV79bQQ4fgTa8gRkgoM01y82G7eC1-JrtLnZTbnhQX4q0FJ_OhhDDxcoK00IMTpwmE1mKHNyVxwrw8yrAM8fRoXk0nRJOtVfNBVZ8R88uv8MBqHcREPjPRV3b-UmlaiC8Yv-2tOk4Kd4E79JfAkdyHaaFVmL8YHayifKmKBkECTY8SyaehOlFSn2cvw951aq2T0m_U1xcZsm2IL0gAOdVO_rdB4Ch0AOcEOpCyoCv8QZH7ZKrB26gSVv6IBtbLc_e_dYtV1OJCok-W8JFGiGafhQhc5RRFqTdot6R5WwfiwkqOf2tVNoLNNE06G7lPRzfpNhx7k6qV9OTYl2otef_yBhKr95gO9nr_L5WbjuazUHwYEBEqb53LwVu4-F0ncsr7epuL9oeL_XHa2t71hBqJRXuxS2djKwlKe9dkq6yPBNJQH7SNjAFlF4oDNqH-fqzmu41iKnmRBCxMGycwRUAqXbXoo6v3YJWqtTe6v6tHgTH4UdhQ6h3NrIwzozvNMLK6tMlHEunlZcMuPEUhvQRaGRu2ZQN54KowDDLEV9XmMbbXH2TkTA1LSEKQp-gA1D9w1s7-JHNHs2-rBi7-Vj_TLx5Yzoa-5ry55QIejufts2R48a4ino_lOgeG9a7W4dpPns69cUCL79g6ffe1cJyUYk2sr3mc',
        );
    
        fetch(`${baseUrl}/employer/resume-view/${params.id}`, {
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
            //   handleSubmit();
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

export default ViewResume
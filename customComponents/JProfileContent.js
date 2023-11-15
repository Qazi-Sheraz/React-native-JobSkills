import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../config/colors';
import JText from './JText';

import Feather from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import {useState} from 'react';
import {StoreContext} from '../mobx/store';
import {useContext} from 'react';
import {_getProfile} from '../functions/Candidate/MyProfile';
import {JToast} from '../functions/Toast';
export default function JProfileContent({src, name, email, jd}) {
  const store = useContext(StoreContext);
  const [singleFile, setSingleFile] = useState('');
  const [loader, setLoader] = useState(false);

  const _uploadImage = res => {
    setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var formdata = new FormData();

    formdata.append('image', {
      uri: res[0].uri,
      size: res[0].size,
      name: res[0].name,
      type: res[0].type,
    });
    console.log('FDFDFDFDFDF', formdata);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(
      'https://dev.jobskills.digital/api/update-profile-picture',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('result', result)
        setSingleFile(res[0])
        store.setUserAvatar(res[0]?.uri)
        _getProfile(store)
        JToast({
          type: 'success',
          text1: result.message,
        });
        setLoader(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoader(false);
      });
  };
  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file

      console.log('URI : ' + res[0].uri);
      console.log('Type : ' + res[0].type);
      console.log('File Name : ' + res[0].name);
      console.log('File Size : ' + res[0].size);
      //Setting the state to show single file attributes

      if (res[0].size <= 2097152) {
        _uploadImage(res);
      } else {
        JToast({
          type: 'danger',
          text1: store.lang.image_sise,
        });
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        JToast({
          type: 'danger',
          text1: store.lang.selection_canceled,
          visibilityTime: 1500,
        });
        // alert(store.lang.selection_canceled);
      } else {
        //For Unknown Error
        JToast({
          type: 'danger',
          text1: 'Unknown Error: ' + JSON.stringify(err),
        });
      }
    }
  };

  return (
    <React.Fragment>
      <ImageBackground
        source={{uri: singleFile ? singleFile.uri : src}}
        style={{
          height: RFPercentage(20),
          width: RFPercentage(20),
          resizeMode: 'contain',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: RFPercentage(-10),
        }}
        onLoadStart={()=>setLoader(true)}
        onLoadEnd={()=>setLoader(false)}
        imageStyle={{
          borderRadius: RFPercentage(10),
          borderWidth: RFPercentage(0.5),
          borderColor: colors.white[0],
          backgroundColor: colors.white[0],
        }}>
        {loader ? (
          <ActivityIndicator
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute', //Here is the trick
              bottom: 0,
              alignSelf: 'flex-end',
            }}
            color={colors.purple[0]}
          />
        ) : (
          <TouchableOpacity
            onPress={selectOneFile}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute', //Here is the trick
              bottom: 1,
              alignSelf: 'flex-end',
            }}>
            <Feather
              name="upload"
              size={RFPercentage(3.5)}
              color={colors.purple[0]}
            />
          </TouchableOpacity>
        )}
      </ImageBackground>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: RFPercentage(1),
          marginHorizontal: RFPercentage(2),
        }}>
        <JText style={styles.names}>{name}</JText>

        {email && <JText style={styles.text}>{email}</JText>}
        {jd && <JText style={styles.text}>{jd}</JText>}
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  names: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: colors.purple[0],
    textAlign: 'center',
  },
  text: {
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

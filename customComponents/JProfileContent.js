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
export default function JProfileContent({src, name, email, jd}) {
  const store = useContext(StoreContext);
  const [singleFile, setSingleFile] = useState('');
  const [loader, setLoader] = useState(false);

  const _uploadImage = res => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);
    var formdata = new FormData();

    formdata.append('image', {
      uri: res[0].uri,
      name: res[0].name,
      filename: res[0].name,
      type: res[0].type,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setLoader(true);
    fetch(
      'https://dev.jobskills.digital/api/update-profile-picture',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setSingleFile(res[0]);
        _getProfile(store);
        alert(result.message);
        setLoader(false);
      })
      .catch(error => {
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

      // console.log('URI : ' + res[0].uri);
      // console.log('Type : ' + res[0].type);
      // console.log('File Name : ' + res[0].name);
      // console.log('File Size : ' + res[0].size);
      //Setting the state to show single file attributes

      _uploadImage(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
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
            color={colors.black[0]}
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
        }}>
        <JText style={{ fontSize:RFPercentage(3),fontWeight:'bold',color:colors.purple[0]}}>{name}</JText>

        {email && <JText style={styles.text}>{email}</JText>}
        {jd && <JText style={styles.text}>{jd}</JText>}
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});

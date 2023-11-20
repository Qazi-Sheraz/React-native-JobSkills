import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Image,
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
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import RNHeicConverter from 'react-native-heic-converter';
import RNFS from 'react-native-fs';
export default function JProfileContent({src, name, email, jd}) {
  const store = useContext(StoreContext);
  const [singleFile, setSingleFile] = useState('');
  // console.log('singleFile',singleFile)
  const [loader, setLoader] = useState(false);

  const _uploadImage = async ({resUri, image}) => {
    setLoader(true);
    // console.log('image', image);
    // console.log('singleFileApi',singleFile)
    // const fileUrl = `file://${res?.path}`.replace('.jpg', '.JPG');
    // const uri = resUri
    //   ? resUri
    //   : Platform.OS=='ios' && image
    //   ? image?.sourceURL
    //   : image?.path;
    // console.log('uri', uri);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var formdata = new FormData();

    formdata.append('image', {
      uri: image.uri,
      size: image.fileSize,
      type: image.type,
      name: image.fileName,
    });

    console.log('FDFDFDFDFDF', formdata._parts[0]);

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
        
        console.log('result======>>>>>>', result);
        setSingleFile(result.user?.avatar);
        store.setUserAvatar(result.user?.avatar);
        store.token?.user?.owner_type.includes('Candidate') &&
          _getProfile(store);
        JToast({
          type: 'success',
          text1: result.message,
        });
        setLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        setLoader(false);
      });
  };
  const selectOneFile = async () => {
    // Configuration options for the image picker

    // Launch the image library
    launchImageLibrary(
      {
        mediaType: 'photo', // Specify the media type (photo or video)
        quality:0.3,
        // includeBase64: true, // Image quality (0 to 1)
      },
      response => {
        // Check if the user selected an image
        console.log('Image Path: ', response?.assets[0]?.originalPath);
            console.log('Image Size: ', response?.assets[0]?.fileSize);
            console.log('Image sourceURL: ', response?.assets[0]?.uri);
            console.log('Image type: ',response?.assets[0]?.type);
            console.log('Image filename: ', response?.assets[0]?.fileName);
        if (response.didCancel) {
          console.log('Image selection cancelled');
        } else if (response?.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response?.assets[0]?.fileSize <= 500000) {
          // console.log('Selected Image URI: ', response.assets[0]);

          // const imageDate = response.assets[0]?.base64;
          // const imagePath = `${RNFS.TemporaryDirectoryPath}image.jpg`;

          // RNFS.writeFile(imagePath, imageDate, 'base64').then(() =>''
          //   // console.log('Image converted to jpg and saved at ' + imagePath),
          // );
          _uploadImage({resUri: null, image: response.assets[0]});
        // } else if (response?.assets[0]?.fileSize > 2097152) {
        } else if (response?.assets[0]?.fileSize > 500000) {
          console.log(response?.assets[0]?.fileSize)
          JToast({
            type: 'danger',
            text1: store.lang.image_sise,
          });
        }
      },
    );
  };
  // const selectOneFile = async () => {
  //   //Opening Document Picker for selection of one file
  //   // try {
  //   //   const res = await DocumentPicker.pick({
  //   //     type: [DocumentPicker.types.images],
  //   //     //There can me more options as well
  //   //     // DocumentPicker.types.allFiles
  //   //     // DocumentPicker.types.images
  //   //     // DocumentPicker.types.plainText
  //   //     // DocumentPicker.types.audio
  //   //     // DocumentPicker.types.pdf
  //   //   });
  //   //   //Printing the log realted to the file
  //   //   const normalizedUri = Platform.OS === 'ios' ? `file://${res[0].uri}` : res[0].uri;

  //   //   console.log('resizedImage : ' + resizedImage.uri);
  //   //   console.log('res : ' + res[0].uri);
  //   //   // console.log('URI : ' + normalizedUri);
  //   //   // console.log('Type : ' + res[0].type);
  //   //   // console.log('File Name : ' + res[0].name);
  //   //   // console.log('File Size : ' + res[0].size);
  //   //   //Setting the state to show single file attributes

  //   //   // if (res[0].size <= 2097152) {
  //   //   //   // _uploadImage(res);
  //   //   // } else {
  //   //   //   JToast({
  //   //   //     type: 'danger',
  //   //   //     text1: store.lang.image_sise,
  //   //   //   });
  //   //   // }
  //   // } catch (err) {
  //   //   //Handling any exception (If any)
  //   //   if (DocumentPicker.isCancel(err)) {
  //   //     //If user canceled the document selection
  //   //     JToast({
  //   //       type: 'danger',
  //   //       text1: store.lang.selection_canceled,
  //   //       visibilityTime: 1500,
  //   //     });
  //   //     // alert(store.lang.selection_canceled);
  //   //   } else {
  //   //     //For Unknown Error
  //   //     JToast({
  //   //       type: 'danger',
  //   //       text1: 'Unknown Error: ' + JSON.stringify(err),
  //   //     });
  //   //   }
  //   // }

  //   ImagePicker.openPicker({
  //     mediaType: 'photo',
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     console.log('Image Path: ', image.path);
  //     console.log('Image Size: ', image.size);
  //     console.log('Image sourceURL: ', image.sourceURL);
  //     console.log('Image type: ', image.mime);
  //     console.log('Image filename: ', image.filename);

  //     if (image.size <= 2097152) {
  //       const imageDate = image.path;
  //       const imagePath = `${RNFS.TemporaryDirectoryPath}image.jpg`;

  //       RNFS.writeFile(imagePath, imageDate, 'base64')
  //           .then(() => {
  //             console.log('Image converted to jpg and saved at ' + imagePath)
  //             setSingleFile(imagePath)
  //             // _uploadImage({imagePath});
  //         });

  //         // ? (
  //         //   RNHeicConverter?.convert({
  //         //     // options
  //         //     path: image?.sourceURL,
  //         //     extension:'base'
  //         //   }).then(res => {
  //         //     if (res.success) {
  //         //       // console.log('resssssss1', res);
  //         //       const fileUrl = `${res?.path}`;
  //         //       // const fileUrl = res?.path;
  //         //       setSingleFile(res?.path)
  //         //       _uploadImage({image:image, resUri:fileUrl ,singleFile});
  //         //     } else {
  //         //       // console.log('resssssssss2', res);
  //         //       _uploadImage({image, res});
  //         //     }
  //         //     //  _uploadImage({image ,imageUri}); // { success: true, path: "path/to/jpg", error, base64, }
  //         //   })
  //         //   )
  //         // : _uploadImage({image,res:null});
  //     } else {
  //       JToast({
  //         type: 'danger',
  //         text1: store.lang.image_sise,
  //       });
  //     }
  //   });
  // };
  const convertHeicToJpg = async image => {
    try {
      const result = await RNHeicConverter.convert({
        path: image,
      });
      console.log('res?', result.path);
    } catch (error) {
      console.error('Error converting HEIC to JPEG: ', error);
      return null;
    }
  };
  return (
    <React.Fragment>
      {/* <ImageBackground
        source={{uri: store.profileImage?store.profileImage: src}}
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
      </ImageBackground> */}
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: RFPercentage(-10),
        }}>
        {/* imageStyle={{
          
        }}> */}
        <Image
          source={{uri: singleFile ? singleFile : src}}
          style={{
            height: RFPercentage(20),
            width: RFPercentage(20),
            alignSelf: 'center',
            borderRadius: RFPercentage(10),
            borderWidth: RFPercentage(0.5),
            borderColor: colors.white[0],
            backgroundColor: colors.white[0],
          }}
        />
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
      </View>

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

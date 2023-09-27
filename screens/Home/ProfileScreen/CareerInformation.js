import {
  ScrollView,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import JScreen from '../../../customComponents/JScreen';
import JGradientHeader from '../../../customComponents/JGradientHeader';
import JText from '../../../customComponents/JText';
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../../../config/colors';
import { StoreContext } from '../../../mobx/store';
import Experience from './SubHeagings/Experience';
import Education from './SubHeagings/Education';
import JChevronIcon from '../../../customComponents/JChevronIcon';
import { observer } from 'mobx-react';
import url from '../../../config/url';
import { JToast } from '../../../functions/Toast';
import JModal from '../../../customComponents/JModal';
import CLCareerInfo from '../../../loaders/Candidate/CareerInfo/CLCareerInfo';
import { useIsFocused } from '@react-navigation/native';

const CareerInformation = ({ navigation }) => {
  const [deletLoader, setDeletLoader] = useState(false);
  const store = useContext(StoreContext);
  const isFocus = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState({
    experienceId: '',
    educationId: ''
  })

  const _getExperience = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    store.setExperienceApiLoader(true);
    fetch(
      `${url.baseUrl}/career-information`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('resultttt',result.canidateExperience);
        store.setEducationList(result.canidateEducation);
        store.setExperienceList(result.canidateExperience);
        store.setExperienceApiLoader(false);
      })
      .catch(error => {
        // console.log('error', error);
        JToast({
          type: 'danger',
          text1: store.lang.eror,
          text2: store.lang.error_while_getting_data,
        });
        store.setExperienceApiLoader(false);
      });
  };

  const _Edelete = () => {
    setDeletLoader(true)
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token.token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };
    // console.log(requestOptions);
    fetch(
      `${url.baseUrl}/candidate-experience-delete/${id?.experienceId}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          store.setExperienceList(store.experienceList?.filter(e => e.id?.experienceId !== id?.experienceId));
          JToast({
            type: 'danger',
            text1: store.lang.success,
            text2: result.message,
          });
          _getExperience()
          setModalVisible(false)
          setDeletLoader(false)
        }
      })
      .catch(error => {
        console.log('error', error)
        setDeletLoader(false)
      });
  };

  const _delete = () => {
    setDeletLoader(true)
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${store.token?.token}`);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };
    fetch(
      `${url.baseUrl}/candidate-education-delete/${id?.educationId}`,
      requestOptions,

    )
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result.success) {
          store.setEducationList(store.educationList?.filter(e => e.id?.educationId !== id?.educationId));
          JToast({
            type: 'danger',
            text1: store.lang.success,
            text2: result.message,
          });
          _getExperience();
          setDeletLoader(false)
          setModalVisible(false)
        }

      })
      .catch(error => {
        console.log('error', error)
        setDeletLoader(false)
      });
  };

  useEffect(() => {
    _getExperience();
  }, [isFocus]);

  return (
    <JScreen
      headerShown={true}
      header={
        <JGradientHeader
          center={
            <JText
              onPress={() => add()}
              fontColor={colors.white[0]}
              fontWeight="bold"
              fontSize={RFPercentage(2.5)}>
              {store.lang.career_information}
            </JText>
          }
          left={<JChevronIcon />}
        />
      }>
      {store.experienceApiLoader ? (
        <CLCareerInfo />

      ) : (
        <ScrollView
          style={{
            paddingHorizontal: RFPercentage(2),
            marginTop: RFPercentage(3),
          }}>
          <Experience
            _deleteExperience={(id) => {
              setModalVisible(true)
              setId({
                experienceId: id,
                educationId: ''
              })
            }}
          />
          <Education
            _deleteEducation={(id) => {
              setModalVisible(true)
              setId({
                experienceId: '',
                educationId: id
              })
            }}
          />
        </ScrollView>
      )}
      <JModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        loader={deletLoader}
        alertMsg={store.lang.delete}
        msg={store.lang.are_you_sure_to_delete}
        onPressYes={() => {
          id.educationId !== '' ? _delete() : _Edelete();
        }}
        onPressNo={() => {
          setId({
            experienceId: '',
            educationId: ''
          })
          setModalVisible(false)

        }}
      />
    </JScreen>
  );
};

export default observer(CareerInformation);



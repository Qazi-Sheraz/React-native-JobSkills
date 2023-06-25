import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import CGeneralInformation from './CGeneralInformation';
import CContactInformation from './CContactInformation';
import CExperienceInformation from './CExperienceInformation';
import CSkills from './CSkills';
import CSocialMediaLink from './CSocialMediaLink';
import { useRoute } from '@react-navigation/native';

export default function EditProfile({route}) {
  const selected = route.params.selected;
  const store = useContext(StoreContext);
  const {params}=useRoute();
  return selected === 1 ? (
    <CGeneralInformation
      user={store.myProfile.user[0]?.general_information}
      data={store.myProfile.data}
    />
  ) : selected === 0 ? (
    <CContactInformation
      user={params.phone}
      data={store.myProfile.data}
    />
  ) : selected === 2 ? (
    <CExperienceInformation
      user={store.myProfile.user[0]?.experience_information}
      data={store.myProfile.data}
    />
  ) : selected === 3 ? (
    <CSkills
      user={store.myProfile.user[0]?.skills}
      data={store.myProfile.data}
    />
  ) : (
    <CSocialMediaLink
      data={store.myProfile.data}
      user={store.myProfile.user[0].social_links}
    />
  );
}

const styles = StyleSheet.create({});

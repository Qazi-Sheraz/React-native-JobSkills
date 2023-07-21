
import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import JText from '../../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JRow from '../../../customComponents/JRow';
import Toast from 'react-native-toast-message';
import {useContext} from 'react';
import {StoreContext} from '../../../mobx/store';
import {observer} from 'mobx-react';
import colors from '../../../config/colors';
const CPrivacyPolicy = () => {
  const store = useContext(StoreContext);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{margin: RFPercentage(2)}}>
      <JText style={styles.header}>{store.lang.privacy_policy}</JText>
      <JText style={styles.headingText1}>{store.lang.Last_updated}</JText>
      <JText style={styles.pgText}>{store.lang.ptext1}</JText>
      <JText style={styles.headingText}>{store.lang.interpretation}</JText>
      <JText style={styles.pgText}>{store.lang.ptext2}</JText>
      <JText style={styles.headingText}>{store.lang.definitions}</JText>
      <JText style={styles.headingText1}>{store.lang.policy_purpose}</JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText}>
          {store.lang.ptext3}
          <JText
            onPress={() => Linking.openURL('https://www.jobskills.digital')}
            style={styles.pgText}>
            https://www.jobskills.digital{'\n'}
            {'\n'}
          </JText>
          {store.lang.ptext4}
        </JText>
      </View>
      <JText style={styles.headingText}>{store.lang.collectingText}</JText>
      <JText style={styles.headingText1}>{store.lang.ptext5}</JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText}>{store.lang.ptext6}</JText>
      </View>
      <JText style={styles.headingText}>{store.lang.usage_Data}</JText>
      <JText style={styles.pgText}>{store.lang.usage_Data}</JText>
      <JText style={styles.headingText}>
        {store.lang.third_party_social_media_Services}
      </JText>
      <JText style={styles.headingText1}>{store.lang.third_party_para}</JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          Google{'\n'}
          Facebook{'\n'}
          Twitter
        </JText>
      </View>
      <JText style={styles.pgText}>{store.lang.ptext7}</JText>
      <JText style={styles.headingText}>{store.lang.info_Collect}</JText>
      <JText style={styles.headingText1}>{store.lang.ptext8}</JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>{store.lang.picture_and_info}</JText>
      </View>
      <JText style={styles.pgText}>{store.lang.ptext9}</JText>
      <JText style={styles.headingText}>
        {store.lang.tracking_technologies_and_Cookies}
      </JText>
      <JText style={styles.headingText1}>{store.lang.tracking_para}</JText>

      <View style={styles.maginView}>
        <JText style={styles.headingText}>
          {store.lang.Cookies_or_Browser_Cookies}
        </JText>
        <JText style={styles.pgText1}>{store.lang.cookies_para}</JText>
        <JText style={styles.headingText}>{store.lang.flash_cookies}</JText>
        <JText style={[styles.pgText1,{marginVertical:0}]}>
          {store.lang.flash_cookies_para}</JText>
          <JText style={[styles.headingText,{textDecorationLine: 'underline',color:'skyblue',marginTop:0,textAlign:'justify'}]}
        onPress={() => {
          Linking.openURL('https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_');
        }}>https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_
        </JText>
        <JText style={styles.headingText}>{store.lang.web_beacons}</JText>
        <JText style={styles.pgText1}>{store.lang.web_beacons_para}</JText>
      </View>
      <JText style={styles.pgText}>{store.lang.cookies_can_be}</JText>
      <JText style={styles.headingText1}>
        {store.lang.we_use_both_session}
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>{store.lang.necessary_essential}</JText>
      </View>
      <JText style={styles.pgText}>{store.lang.For_more_information}</JText>
      <JText style={styles.headingText}>
        {store.lang.use_of_your_personal_data}
      </JText>
      <JText style={styles.headingText1}>{store.lang.the_company_may}</JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          {store.lang.to_provide_and_maintain}
        </JText>
      </View>
      <JText style={styles.headingText1}>
        {store.lang.we_may_share_your_personal}
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.headingText}>
          {store.lang.with_service_providers}
        </JText>
        <JText style={styles.pgText1}>
          {store.lang.we_may_share_your_personals}
        </JText>
        <JText style={styles.headingText}>
          {store.lang.for_business_transfers}
        </JText>
        <JText style={styles.pgText1}>
          {store.lang.share_or_transfer_your_personal}
        </JText>
        <JText style={styles.headingText}>{store.lang.with_affiliates}</JText>
        <JText style={styles.pgText1}>
          {store.lang.share_your_information_with_our_affiliates}
        </JText>
        <JText style={styles.headingText}>
          {store.lang.with_business_partners}
        </JText>
        <JText style={styles.pgText1}>
          {store.lang.information_with_our_business_partners}
        </JText>
        <JText style={styles.headingText}>{store.lang.with_other_users}</JText>
        <JText style={styles.pgText1}>
          {store.lang.personal_information_or_otherwise_interact}
        </JText>
        <JText style={styles.headingText}>{store.lang.with_your_consent}</JText>
        <JText style={styles.pgText1}>
          {store.lang.we_may_disclose_your_personal}
        </JText>
      </View>

      <JText style={styles.headingText}>{store.lang.retention_of_your_personal_data}</JText>
      <JText style={styles.pgText}>
        {store.lang.the_company_will_retain_your_personal_data}
      </JText>
      <JText style={styles.headingText}>{store.lang.transfer_of_your_personal_data}</JText>
      <JText style={styles.pgText}>
        {store.lang.your_information_including_personal_data}
      </JText>
      <JText style={styles.headingText}>
        {store.lang.disclosure_of_your_personal_dataBusiness_transactions}
      </JText>
      <JText style={styles.pgText}>
       {store.lang.if_the_company_is_involved_in_a_merger}
      </JText>
      <JText style={styles.headingText}>{store.lang.law_enforcement}</JText>
      <JText style={styles.pgText}>
        {store.lang.under_certain_circumstances}
      </JText>
      <JText style={styles.headingText}>{store.lang.other_legal_requirements}</JText>
      <JText style={styles.headingText1}>{store.lang.definitions}</JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          {store.lang.comply_with_a_legal_obligation}
        </JText>
      </View>
      <JText style={styles.headingText}>{store.lang.security_of_your_personal_data}</JText>
      <JText style={styles.pgText}>
        {store.lang.the_security_of_your_personal_data}
      </JText>
      <JText style={styles.headingText}>{store.lang.children_privacy}</JText>
      <JText style={styles.pgText}>
        {store.lang.our_Service_does_not_address}
      </JText>
      <JText style={styles.headingText}>{store.lang.links_to_other_websites}</JText>
      <JText style={styles.pgText}>
        {store.lang.our_service_may_contain_links_to_other_websites}
      </JText>
      <JText style={styles.headingText}>{store.lang.changes_to_this_privacy_policy}</JText>
      <JText style={styles.pgText}>
        {store.lang.we_may_update_our_privacy_policy}
      </JText>
      <JText style={styles.headingText}>{store.lang.contact_Us}</JText>
      <JText style={styles.pgText}>
        {store.lang.you_can_contact_us}
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          {store.lang.by_email}: contact@jobskills.digital
        </JText>
      </View>
    </ScrollView>
  );
};

export default observer(CPrivacyPolicy);

const styles = StyleSheet.create({
  header: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: colors.primary[0],
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(1),
    // textAlign:'justify',
  },
  headingText1: {
    fontWeight: '600',
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(1),
    // textAlign:'justify',
  },
  pgText: {
    marginVertical: RFPercentage(1),
    fontSize: RFPercentage(1.9),
    // textAlign:'justify',
  },
  pgText1: {
    marginVertical: RFPercentage(1),
    fontSize: RFPercentage(1.8),
    // textAlign:'justify',
    color: '#00000098',
  },
  maginView: {marginHorizontal: RFPercentage(2)},
});

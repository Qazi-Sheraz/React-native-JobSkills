import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import JText from '../../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JRow from '../../../customComponents/JRow'
import Toast from 'react-native-toast-message';
import { useContext } from 'react';
import { StoreContext } from '../../../mobx/store';
import { observer } from 'mobx-react';
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
            onPress={() =>
             Linking.openURL('https://www.jobskills.digital')
            }
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
      <JText style={styles.headingText}>{store.lang.third_party_social_media_Services}</JText>
      <JText style={styles.headingText1}>
      {store.lang.third_party_para}
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          Google{'\n'}
          Facebook{'\n'}
          Twitter
        </JText>
      </View>
      <JText style={styles.pgText}>{store.lang.ptext7}</JText>
      <JText style={styles.headingText}>
      {store.lang.info_Collect}
      </JText>
      <JText style={styles.headingText1}>
      {store.lang.ptext8}
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
        {store.lang.picture_and_info}
        </JText>
      </View>
      <JText style={styles.pgText}>
      {store.lang.ptext9}
      </JText>
      <JText style={styles.headingText}>
      {store.lang.tracking_technologies_and_Cookies}
      </JText>
      <JText style={styles.headingText1}>
      {store.lang.tracking_para}
      </JText>

      <View style={styles.maginView}>
        <JText style={styles.headingText}>{store.lang.Cookies_or_Browser_Cookies}</JText>
        <JText style={styles.pgText1}>
        {store.lang.cookies_para}
        </JText>
        <JText style={styles.headingText}>{store.lang.flash_cookies}</JText>
        <JText style={styles.pgText1}>
        {store.lang.flash_cookies_para}
          https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_
        </JText>
        <JText style={styles.headingText}>{store.lang.web_beacons}</JText>
        <JText style={styles.pgText1}>
        {store.lang.web_beacons_para}
        </JText>
      </View>
      <JText style={styles.pgText}>
        {store.lang.cookies_can_be}
      </JText>
      <JText style={styles.headingText1}>
        {store.lang.we_use_both_session}
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          {store.lang.necessary_essential}
        </JText>
      </View>
      <JText style={styles.pgText}>
        {store.lang.For_more_information}
      </JText>
      <JText style={styles.headingText}>{store.lang.use_of_your_personal_data}</JText>
      <JText style={styles.headingText1}>
        {store.lang.the_company_may}
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          {store.lang.to_provide_and_maintain}
        </JText>
      </View>
      <JText style={styles.headingText1}>
        {store.lang.we_may_share_your_personal}
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.headingText}>{store.lang.with_service_providers}</JText>
        <JText style={styles.pgText1}>
         {store.lang.we_may_share_your_personals}
        </JText>
        <JText style={styles.headingText}>{store.lang.for_business_transfers}</JText>
        <JText style={styles.pgText1}>
          {store.lang.share_or_transfer_your_personal}
        </JText>
        <JText style={styles.headingText}>{store.lang.with_affiliates}</JText>
        <JText style={styles.pgText1}>
          {store.lang.share_your_information_with_our_affiliates}
        </JText>
        <JText style={styles.headingText}>{store.lang.with_business_partners}</JText>
        <JText style={styles.pgText1}>
          {store.lang.information_with_our_business_partners}
        </JText>
        <JText style={styles.headingText}>{store.lang.with_other_users}</JText>
        <JText style={styles.pgText1}>
          {store.lang.personal_information_or_otherwise_interact}
        </JText>
        <JText style={styles.headingText}>With Your consent:</JText>
        <JText style={styles.pgText1}>
          We may disclose Your personal information for any other purpose with
          Your consent.
        </JText>
      </View>

      <JText style={styles.headingText}>Retention of Your Personal Data</JText>
      <JText style={styles.pgText}>
        The Company will retain Your Personal Data only for as long as is
        necessary for the purposes set out in this Privacy Policy. We will
        retain and use Your Personal Data to the extent necessary to comply with
        our legal obligations (for example, if we are required to retain your
        data to comply with applicable laws), resolve disputes, and enforce our
        legal agreements and policies.{'\n'}
        {'\n'}
        The Company will also retain Usage Data for internal analysis purposes.
        Usage Data is generally retained for a shorter period of time, except
        when this data is used to strengthen the security or to improve the
        functionality of Our Service, or We are legally obligated to retain this
        data for longer time periods.
      </JText>
      <JText style={styles.headingText}>Transfer of Your Personal Data</JText>
      <JText style={styles.pgText}>
        Your information, including Personal Data, is processed at the Company's
        operating offices and in any other places where the parties involved in
        the processing are located. It means that this information may be
        transferred to — and maintained on — computers located outside of Your
        state, province, country or other governmental jurisdiction where the
        data protection laws may differ than those from Your jurisdiction.{'\n'}
        {'\n'}
        Your consent to this Privacy Policy followed by Your submission of such
        information represents Your agreement to that transfer.{'\n'}
        {'\n'}
        The Company will take all steps reasonably necessary to ensure that Your
        data is treated securely and in accordance with this Privacy Policy and
        no transfer of Your Personal Data will take place to an organization or
        a country unless there are adequate controls in place including the
        security of Your data and other personal information.
      </JText>
      <JText style={styles.headingText}>
        Disclosure of Your Personal DataBusiness Transactions
      </JText>
      <JText style={styles.pgText}>
        If the Company is involved in a merger, acquisition or asset sale, Your
        Personal Data may be transferred. We will provide notice before Your
        Personal Data is transferred and becomes subject to a different Privacy
        Policy.
      </JText>
      <JText style={styles.headingText}>Law enforcement</JText>
      <JText style={styles.pgText}>
        Under certain circumstances, the Company may be required to disclose
        Your Personal Data if required to do so by law or in response to valid
        requests by public authorities (e.g. a court or a government agency).
      </JText>
      <JText style={styles.headingText}>Other legal requirements</JText>
      <JText style={styles.headingText1}>Definitions</JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          Comply with a legal obligation{'\n'}
          Protect and defend the rights or property of the Company{'\n'}
          Prevent or investigate possible wrongdoing in connection with the
          Service{'\n'}
          Protect the personal safety of Users of the Service or the public
          {'\n'}
          Protect against legal liability
        </JText>
      </View>
      <JText style={styles.headingText}>Security of Your Personal Data</JText>
      <JText style={styles.pgText}>
        The security of Your Personal Data is important to Us, but remember that
        no method of transmission over the Internet, or method of electronic
        storage is 100% secure. While We strive to use commercially acceptable
        means to protect Your Personal Data, We cannot guarantee its absolute
        security.
      </JText>
      <JText style={styles.headingText}>Children's Privacy</JText>
      <JText style={styles.pgText}>
        Our Service does not address anyone under the age of 13. We do not
        knowingly collect personally identifiable information from anyone under
        the age of 13. If You are a parent or guardian and You are aware that
        Your child has provided Us with Personal Data, please contact Us. If We
        become aware that We have collected Personal Data from anyone under the
        age of 13 without verification of parental consent, We take steps to
        remove that information from Our servers.{'\n'}
        {'\n'}
        If We need to rely on consent as a legal basis for processing Your
        information and Your country requires consent from a parent, We may
        require Your parent's consent before We collect and use that
        information.
      </JText>
      <JText style={styles.headingText}>Links to Other Websites</JText>
      <JText style={styles.pgText}>
        Our Service may contain links to other websites that are not operated by
        Us. If You click on a third party link, You will be directed to that
        third party's site. We strongly advise You to review the Privacy Policy
        of every site You visit.{'\n'}
        {'\n'}
        We have no control over and assume no responsibility for the content,
        privacy policies or practices of any third party sites or services.
      </JText>
      <JText style={styles.headingText}>Changes to this Privacy Policy</JText>
      <JText style={styles.pgText}>
        We may update Our Privacy Policy from time to time. We will notify You
        of any changes by posting the new Privacy Policy on this page.{'\n'}
        {'\n'}
        We will let You know via email and/or a prominent notice on Our Service,
        prior to the change becoming effective and update the "Last updated"
        date at the top of this Privacy Policy.{'\n'}
        {'\n'}
        You are advised to review this Privacy Policy periodically for any
        changes. Changes to this Privacy Policy are effective when they are
        posted on this page.
      </JText>
      <JText style={styles.headingText}>Contact Us</JText>
      <JText style={styles.pgText}>
        If you have any questions about this Privacy Policy, You can contact us:
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          By email: contact@jobskills.digital
        </JText>
      </View>
    </ScrollView>
  );
}

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
        color:'#00000098',
      },
      maginView:{marginHorizontal: RFPercentage(2)}
})
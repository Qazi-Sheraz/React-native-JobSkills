import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import JText from '../../../customComponents/JText';
import {RFPercentage} from 'react-native-responsive-fontsize';
import JRow from '../../../customComponents/JRow'
import Toast from 'react-native-toast-message';
import { useContext } from 'react';
import { StoreContext } from '../../../mobx/store';
import { observer } from 'mobx-react';
const CPrivacyPolicy = () => {
  const store = useContext(StoreContext);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{margin: RFPercentage(2)}}>
      <JText style={styles.headingText}>{store.lang.privacy_policy}</JText>
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
              Toast.show({
                type: 'success',
                text1: 'Link pressed',
              })
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
        Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies
        remain on Your personal computer or mobile device when You go offline,
        while Session Cookies are deleted as soon as You close Your web browser.
      </JText>
      <JText style={styles.headingText1}>
        We use both Session and Persistent Cookies for the purposes set out
        below:
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          Necessary / Essential Cookies{'\n'}
          {'\n'}
          Type: Session Cookies{'\n'}
          {'\n'}
          Administered by: Us{'\n'}
          {'\n'}
          Purpose: These Cookies are essential to provide You with services
          available through the Website and to enable You to use some of its
          features. They help to authenticate users and prevent fraudulent use
          of user accounts. Without these Cookies, the services that You have
          asked for cannot be provided, and We only use these Cookies to provide
          You with those services.{'\n'}
          {'\n'}
          Cookies Policy / Notice Acceptance Cookies{'\n'}
          {'\n'}
          Type: Persistent Cookies{'\n'}
          {'\n'}
          Administered by: Us{'\n'}
          {'\n'}
          Purpose: These Cookies identify if users have accepted the use of
          cookies on the Website.{'\n'}
          {'\n'}
          Functionality Cookies{'\n'}
          {'\n'}
          Type: Persistent Cookies{'\n'}
          {'\n'}
          Administered by: Us{'\n'}
          {'\n'}
          Purpose: These Cookies allow us to remember choices You make when You
          use the Website, such as remembering your login details or language
          preference. The purpose of these Cookies is to provide You with a more
          personal experience and to avoid You having to re-enter your
          preferences every time You use the Website.
        </JText>
      </View>
      <JText style={styles.pgText}>
        For more information about the cookies we use and your choices regarding
        cookies, please visit our Cookies Policy or the Cookies section of our
        Privacy Policy.
      </JText>
      <JText style={styles.headingText}>Use of Your Personal Data</JText>
      <JText style={styles.headingText1}>
        The Company may use Personal Data for the following purposes:
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.pgText1}>
          To provide and maintain our Service, including to monitor the usage of
          our Service.{'\n'}
          {'\n'}
          To manage Your Account: to manage Your registration as a user of the
          Service. The Personal Data You provide can give You access to
          different functionalities of the Service that are available to You as
          a registered user.{'\n'}
          {'\n'}
          For the performance of a contract: the development, compliance and
          undertaking of the purchase contract for the products, items or
          services You have purchased or of any other contract with Us through
          the Service.
          {'\n'}
          {'\n'}
          To contact You: To contact You by email, telephone calls, SMS, or
          other equivalent forms of electronic communication, such as a mobile
          application's push notifications regarding updates or informative
          communications related to the functionalities, products or contracted
          services, including the security updates, when necessary or reasonable
          for their implementation.{'\n'}
          {'\n'}
          To provide You with news, special offers and general information about
          other goods, services and events which we offer that are similar to
          those that you have already purchased or enquired about unless You
          have opted not to receive such information.{'\n'}
          {'\n'}
          To manage Your requests: To attend and manage Your requests to Us.
          {'\n'}
          {'\n'}
          For business transfers: We may use Your information to evaluate or
          conduct a merger, divestiture, restructuring, reorganization,
          dissolution, or other sale or transfer of some or all of Our assets,
          whether as a going concern or as part of bankruptcy, liquidation, or
          similar proceeding, in which Personal Data held by Us about our
          Service users is among the assets transferred.{'\n'}
          {'\n'}
          For other purposes: We may use Your information for other purposes,
          such as data analysis, identifying usage trends, determining the
          effectiveness of our promotional campaigns and to evaluate and improve
          our Service, products, services, marketing and your experience.
        </JText>
      </View>
      <JText style={styles.headingText1}>
        We may share Your personal information in the following situations:
      </JText>
      <View style={styles.maginView}>
        <JText style={styles.headingText}>With Service Providers:</JText>
        <JText style={styles.pgText1}>
          We may share Your personal information with Service Providers to
          monitor and analyze the use of our Service, to contact You.
        </JText>
        <JText style={styles.headingText}>For business transfers:</JText>
        <JText style={styles.pgText1}>
          We may share or transfer Your personal information in connection with,
          or during negotiations of, any merger, sale of Company assets,
          financing, or acquisition of all or a portion of Our business to
          another company.
        </JText>
        <JText style={styles.headingText}>With Affiliates:</JText>
        <JText style={styles.pgText1}>
          We may share Your information with Our affiliates, in which case we
          will require those affiliates to honor this Privacy Policy. Affiliates
          include Our parent company and any other subsidiaries, joint venture
          partners or other companies that We control or that are under common
          control with Us.
        </JText>
        <JText style={styles.headingText}>With business partners:</JText>
        <JText style={styles.pgText1}>
          We may share Your information with Our business partners to offer You
          certain products, services or promotions.
        </JText>
        <JText style={styles.headingText}>With other users:</JText>
        <JText style={styles.pgText1}>
          when You share personal information or otherwise interact in the
          public areas with other users, such information may be viewed by all
          users and may be publicly distributed outside. If You interact with
          other users or register through a Third-Party Social Media Service,
          Your contacts on the Third-Party Social Media Service may see Your
          name, profile, pictures and description of Your activity. Similarly,
          other users will be able to view descriptions of Your activity,
          communicate with You and view Your profile.
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
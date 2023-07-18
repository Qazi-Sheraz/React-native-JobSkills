import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import JText from '../../../customComponents/JText'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { StoreContext } from '../../../mobx/store'
import colors from '../../../config/colors'

const CTermsConditions = () => {
  const store = useContext(StoreContext);
  return (
    <ScrollView
            showsVerticalScrollIndicator={false}
            style={{margin: RFPercentage(2)}}>
            <JText style={styles.header}>{store.lang.terms_and_conditions}</JText>
            <JText style={styles.pgText}>{store.lang.welcome_to_jobskills_digital}</JText>
            <JText style={styles.pgText}>
              {store.lang.these_terms_and_conditions_outline}</JText>
              <JText onPress={() => {
                  Linking.openURL('https://www.jobskills.digital');
                }}
                style={[styles.headingText,{textDecorationLine: 'underline',color:'skyblue',marginTop: RFPercentage(0),}]}>https://www.jobskills.digital.</JText>
                <JText style={styles.pgText}>
              {store.lang.by_accessing_this_website}
            </JText>
            <JText style={styles.headingText}>{store.lang.cookies}</JText>
            <JText style={styles.pgText}>{store.lang.employ_the_use_of_cookies} </JText>
            <JText style={styles.headingText}>{store.lang.license}</JText>
            <JText style={styles.pgText}>
              {store.lang.unless_otherwise_stated}
            </JText>
            <JText style={styles.headingText1}>{store.lang.you_must_not}</JText>
            <JText style={styles.pgText1}>{store.lang.republish_material}</JText>
            <JText style={styles.pgText}>{store.lang.this_agreement_shall_begin_on_the_date_hereof}</JText>
            <JText style={styles.headingText1}>{store.lang.you_warrant_and_represent_that}</JText>
            <JText style={styles.pgText1}>{store.lang.you_are_entitled_to_post_the_comments}</JText>
            <JText style={styles.pgText}>{store.lang.you_hereby_grant_jobSkills}</JText>
            <JText style={styles.headingText}>{store.lang.hyperlinking_to_our_content}</JText>
            <JText style={styles.headingText1}>{store.lang.the_following_organizations}</JText>
            <JText style={styles.pgText1}>{store.lang.government_agencies}</JText>
            <JText style={styles.pgText}>{store.lang.these_organizations_may_link_to_our_home_page} </JText>
            <JText style={styles.headingText1}>
              {store.lang.we_may_consider_and_approve}
            </JText>
            <JText style={styles.pgText1}>{store.lang.commonly_known_consumer} </JText>

            <JText style={styles.pgText}>
              We will approve link requests from these organizations if we
              decide that: (a) the link would not make us look unfavorably to
              ourselves or to our accredited businesses; (b) the organization
              does not have any negative records with us; (c) the benefit to us
              from the visibility of the hyperlink compensates the absence of
              JobSkills; and (d) the link is in the context of general resource
              information.{'\n'}
              {'\n'}
              These organizations may link to our home page so long as the link:
              (a) is not in any way deceptive; (b) does not falsely imply
              sponsorship, endorsement or approval of the linking party and its
              products or services; and (c) fits within the context of the
              linking party’s site.{'\n'}
              {'\n'}
              If you are one of the organizations listed in paragraph 2 above
              and are interested in linking to our website, you must inform us
              by sending an e-mail to JobSkills. Please include your name, your
              organization name, contact information as well as the URL of your
              site, a list of any URLs from which you intend to link to our
              Website, and a list of the URLs on our site to which you would
              like to link. Wait 2-3 weeks for a response.
            </JText>
            <JText style={styles.headingText1}>
              Approved organizations may hyperlink to our Website as follows:
            </JText>

            <JText style={styles.pgText1}>
              By use of our corporate name; or{'\n'}
              By use of the uniform resource locator being linked to; or{'\n'}
              By use of any other description of our Website being linked to
              that makes sense within the context and format of content on the
              linking party’s site.
            </JText>
            <JText style={styles.pgText}>
              No use of JobSkills's logo or other artwork will be allowed for
              linking absent a trademark license agreement.
            </JText>
            <JText style={styles.headingText}>iFrames</JText>
            <JText style={styles.pgText}>
              Without prior approval and written permission, you may not create
              frames around our Webpages that alter in any way the visual
              presentation or appearance of our Website.
            </JText>
            <JText style={styles.headingText}>Content Liability</JText>
            <JText style={styles.pgText}>
              We shall not be hold responsible for any content that appears on
              your Website. You agree to protect and defend us against all
              claims that is rising on your Website. No link(s) should appear on
              any Website that may be interpreted as libelous, obscene or
              criminal, or which infringes, otherwise violates, or advocates the
              infringement or other violation of, any third party rights.
            </JText>
            <JText style={styles.headingText}>Your Privacy</JText>
            <JText style={styles.pgText}>Please read Privacy Policy</JText>
            <JText style={styles.headingText}>Reservation of Rights</JText>
            <JText style={styles.pgText}>
              We reserve the right to request that you remove all links or any
              particular link to our Website. You approve to immediately remove
              all links to our Website upon request. We also reserve the right
              to amen these terms and conditions and it’s linking policy at any
              time. By continuously linking to our Website, you agree to be
              bound to and follow these linking terms and conditions.
            </JText>
            <JText style={styles.headingText}>
              Removal of links from our website
            </JText>
            <JText style={styles.pgText}>
              If you find any link on our Website that is offensive for any
              reason, you are free to contact and inform us any moment. We will
              consider requests to remove links but we are not obligated to or
              so or to respond to you directly.{'\n'}
              {'\n'}
              We do not ensure that the information on this website is correct,
              we do not warrant its completeness or accuracy; nor do we promise
              to ensure that the website remains available or that the material
              on the website is kept up to date.
            </JText>
            <JText style={styles.headingText}>Disclaimer</JText>
            <JText style={styles.headingText1}>
              To the maximum extent permitted by applicable law, we exclude all
              representations, warranties and conditions relating to our website
              and the use of this website. Nothing in this disclaimer will:
            </JText>

            <JText style={styles.pgText}>
              limit or exclude our or your liability for death or personal
              injury;{'\n'}
              limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;{'\n'}
              limit any of our or your liabilities in any way that is not
              permitted under applicable law; or{'\n'}
              exclude any of our or your liabilities that may not be excluded
              under applicable law.
            </JText>
            <JText style={styles.pgText}>
              The limitations and prohibitions of liability set in this Section
              and elsewhere in this disclaimer: (a) are subject to the preceding
              paragraph; and (b) govern all liabilities arising under the
              disclaimer, including liabilities arising in contract, in tort and
              for breach of statutory duty.{'\n'}
              {'\n'}
              As long as the website and the information and services on the
              website are provided free of charge, we will not be liable for any
              loss or damage of any nature.
            </JText>
          </ScrollView>
  )
}

export default CTermsConditions

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
  // textAlign:'justify'
},
headingText1: {
  fontWeight: '600',
  fontSize: RFPercentage(2),
  marginTop: RFPercentage(1),
},
pgText: {
  marginVertical: RFPercentage(1),
  fontSize: RFPercentage(1.9),
  // textAlign:'justify',
},
pgText1: {
  marginVertical: RFPercentage(1),
  fontSize: RFPercentage(1.7),
  // textAlign:'justify'
},})
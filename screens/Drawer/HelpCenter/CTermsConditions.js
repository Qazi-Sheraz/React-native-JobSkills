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
                style={[styles.headingText,{textDecorationLine: 'underline',color:'skyblue',marginTop: RFPercentage(0)}]}>https://www.jobskills.digital.</JText>
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

            <JText style={styles.pgText}>{store.lang.we_will_approve_link_requests_from_these_organizations}
            </JText>
            <JText style={styles.headingText1}>
             {store.lang.approved_organization_may_hyperlink_to_our_website_as_follows}
            </JText>

            <JText style={styles.pgText1}>
              {store.lang.by_use_of_our_corporate_name}
            </JText>
            <JText style={styles.pgText}>
              
              {store.lang.no_use_of_JobSkills_logo}
            </JText>
            <JText style={styles.headingText}>{store.lang.iFrames}</JText>
            <JText style={styles.pgText}>
              {store.lang.without_prior_approval_and_written_permission}
            </JText>
            <JText style={styles.headingText}>{store.lang.content_liability}</JText>
            <JText style={styles.pgText}>
              {store.lang.we_shall_not_be_hold_responsible}
            </JText>
            <JText style={styles.headingText}>{store.lang.your_privacy}</JText>
            <JText style={styles.pgText}>{store.lang.please_read_privacy_policy}</JText>
            <JText style={styles.headingText}>{store.lang.reservation_of_rights}</JText>
            <JText style={styles.pgText}>
              {store.lang.we_reserve_the_right_to_request_that_you_remove_all_links}
            </JText>
            <JText style={styles.headingText}>
              {store.lang.removal_of_links_from_our_website}
            </JText>
            <JText style={styles.pgText}>
              {store.lang.if_you_find_any_link_on_our_website}
            </JText>
            <JText style={styles.headingText}>{store.lang.disclaimer}</JText>
            <JText style={styles.headingText1}>
              {store.lang.to_the_maximum_extent_permitted}
            </JText>

            <JText style={styles.pgText}>
              {store.lang.limit_or_exclude_our_or_your_liability}
            </JText>
            <JText style={styles.pgText}>
              {store.lang.limitations_and_prohibitions_of_liability_set_in_this_section}
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
import {StyleSheet, View} from 'react-native';
import React from 'react';
import JGradientScreen from '../../customComponents/JGradientScreen';
import JSkip from '../../customComponents/JSkip';
import JLogoImage from '../../customComponents/JLogoImage';
import JButton from '../../customComponents/JButton';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import JText from '../../customComponents/JText';
import colors from '../../config/colors';

export default function GetStart() {
  return (
    <JGradientScreen>
      <JSkip
        containerStyle={styles.skip}
        children="Skip"
        onPress={() => alert('Skip')}
      />

      <JLogoImage
        height={heightPercentageToDP(17)}
        width={widthPercentageToDP(17)}
        imageStyle={styles.img}
      />

      <View style={styles.textContainer}>
        <JText
          fontSize={RFPercentage(4)}
          fontWeight="bold"
          fontColor={colors.white[0]}
          children="JobSkills"
        />
        <JText
          style={styles.text}
          fontSize={RFPercentage(2.5)}
          fontWeight="bold"
          fontColor={colors.white[0]}
          children="The Right Employee in The Right Position"
        />
        <JText
          style={styles.text}
          fontWeight="600"
          fontSize={RFPercentage(2.5)}
          fontColor={colors.white[0]}
          children="we are launching soon...!"
        />
        <JText
          style={styles.text}
          fontWeight="600"
          fontSize={RFPercentage(2.5)}
          fontColor={colors.white[0]}
          children="This project is owned by Fajer Technology"
        />
        <JText
          style={styles.text}
          fontSize={RFPercentage(2)}
          fontColor={colors.white[0]}
          children="Looking for job or to hire great candidates efficiently? JobSkills Solutions gives access to most advanced features! Respond to candidates as soon as they apply for jobs or respond to letters. Easily contact the right people for open roles. Conduct assessments, contact, recruit, and prepare candidates on the go."
        />
      </View>
      <JButton
        style={styles.button}
        children="Get Start"
        onPress={() => alert('Get Start')}
      />
    </JGradientScreen>
  );
}

const styles = StyleSheet.create({
  skip: {flex: 0.1},
  img: {
    flex: 0.1,

    alignSelf: 'center',
  },
  textContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP(5),
  },
  text: {
    marginTop: RFPercentage(1),
    textAlign: 'center',
  },
  button: {flex: 0.05, margin: RFPercentage(2)},
});

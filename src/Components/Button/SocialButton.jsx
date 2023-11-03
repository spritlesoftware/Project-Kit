import React from 'react';
import {Button, IconButton} from 'react-native-paper';
import Google from '../../Assets/images/google.svg';
import Facebook from '../../Assets/images/facebook.svg';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../Utils/colors';
import {moderateScale} from 'react-native-size-matters';

const SocialButton = props => {
  return (
    <View style={styles.socialContainer}>
      <IconButton
        mode="outlined"
        icon={() => <Google width={30} height={30} />}
        style={styles.btn}
        contentStyle={styles.btnText}
        size={40}
        onPress={() => console.log('Pressed')}></IconButton>
      <IconButton
        mode="outlined"
        icon={() => <Facebook width={30} height={30} />}
        iconColor={colors.APP_PRIMARY}
        style={styles.btn}
        contentStyle={styles.btnText}
        size={40}
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
  },

  btn: {
    borderColor: colors.GRAY2,
  },
});

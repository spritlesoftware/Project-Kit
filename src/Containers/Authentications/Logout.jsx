import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomButton from '../../Components/Button/CustomButton';
import {colors} from '../../Utils/colors';

const Logout = ({navigation}) => {
  return (
    <View style={styles.center}>
      <CustomButton
        title={'Logout'}
        onPress={() => navigation.replace('Login')}
      />
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
});

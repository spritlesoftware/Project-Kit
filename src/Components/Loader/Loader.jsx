import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {colors} from '../../Utils/colors';

const Loader = props => {
  return (
    <View style={[styles.loadingView, props.customStyle]}>
      <ActivityIndicator size="large" color={colors.RED_BORDER} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    position: 'absolute',
    // backgroundColor: colors.TRANSPARENT_BLACK,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
export default Loader;

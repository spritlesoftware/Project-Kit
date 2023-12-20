import {View, StyleSheet} from 'react-native';
import React from 'react';
import TopTab from '../../Components/Tab/TopTab';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {moderateScale} from 'react-native-size-matters';
import {Text} from 'react-native-paper';
import CalendarComponent from './Calendar';
import EventList from './EventList';

const DatePickerHome= () => {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.headerTitle}>
        Event Calendar
      </Text>
      <TopTab
        name1={'Calendar'}
        component1={CalendarComponent}
        name2={'Events'}
        component2={EventList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  headerTitle: {
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    marginLeft: moderateScale(10),
    marginTop: moderateScale(5),
    paddingVertical: moderateScale(10),
    fontSize: moderateScale(25),
    alignSelf: 'center',
    paddingTop:20
  },
});

export default DatePickerHome;

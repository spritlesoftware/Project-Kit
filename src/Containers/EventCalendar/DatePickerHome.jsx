import {View, StyleSheet} from 'react-native';
import React from 'react';
import TopTab from '../../Components/Tab/TopTab';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {moderateScale} from 'react-native-size-matters';
import {Text} from 'react-native-paper';
import CalendarComponent from './Calendar';
import EventList from './EventList';
import { DatePickerTopTab } from '../../Functions/EventCalendar/DatepickerTopTab';

const DatePickerHome= () => {
  const {tabData , isLoading} = DatePickerTopTab()
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.headerTitle}>
        Event Calendar
      </Text>
      <TopTab data={tabData} isLoading={isLoading} />
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

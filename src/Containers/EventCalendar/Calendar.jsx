import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {StyleSheet, Text, View, TextStyle} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../Utils/colors';
import {TouchableRipple} from 'react-native-paper';
import {useAppContext} from '../../Context/ContextProvider';
import { fonts } from '../../Utils/fonts';

const RANGE = 20;

function CalendarComponent({navigation}) {
  const horizontalView = true;
  const {isMarkedDate, events ,fonts,selectedDate , setSelectedDate} = useAppContext();

  //function to add the marked dates after it's saved
  function markedDates() {
    const result = {};

    for (let i = 0; i < isMarkedDate.length; i++) {
      const date = isMarkedDate[i];
      result[date] = {
        selected: selectedDate === date,
        selectedTextColor: 'white',
        marked: true,
        dotColor: colors.APP_PRIMARY,
        selectedColor: colors.APP_PRIMARY,
      };
    }

    return result;
  }

  const marked = useMemo(() => {
    return {
      [selectedDate]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#0C2461',
        selectedTextColor: 'white',
      },
      ...markedDates(),
    };
  }, [selectedDate, isMarkedDate]);

  const onDayPress = useCallback(day => {
    setSelectedDate(day.dateString);
  }, []);

  //formatting the date into mpore readable format
  const dateObject = new Date(selectedDate);
  const formattedDate = dateObject?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          borderWidth: 0.8,
          padding: 15,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          margin: 20,
          borderRadius: 10,
        }}>
        <View>
          <Text style={{color: colors.BLACK , fontFamily:fonts.MEDIUM}}>
            Selected Date : {selectedDate && formattedDate}
          </Text>
        </View>
        <TouchableRipple
          onPress={() => {
            selectedDate &&
              navigation.navigate('NewEvent', {formattedDate:formattedDate});
          }}>
          <AntDesign name="pluscircle" color={'#0C2461'} size={25} />
        </TouchableRipple>
      </View>
      <CalendarList
        pastScrollRange={RANGE}
        futureScrollRange={RANGE}
        onDayPress={onDayPress}
        markedDates={marked}
        renderHeader={!horizontalView ? renderCustomHeader : undefined}
        calendarHeight={!horizontalView ? 390 : undefined}
        theme={theme}
        horizontal={horizontalView}
        pagingEnabled={true}
        staticHeader={true}
        showScrollIndicator={false}
      />
    </View>
  );
}

//cxalendar theme
const theme = {
  arrowColor: colors.APP_PRIMARY,
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: '600',
          color: '#48BFE3',
          fontFamily:fonts.MEDIUM
        },
      },
    },
  },
  'stylesheet.day.basic': {
    today: {
      color: colors.APP_PRIMARY,
      borderWidth: 0.4,
      borderRadius: 25,
    },
    todayText: {
      color: colors.APP_PRIMARY,
    },
  },
};

//rendering custom header
function renderCustomHeader(date) {
  const header = date.toString('MMMM yyyy');
  const [month, year] = header.split(' ');
  const textStyle = {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    fontFamily:fonts.BOLD
  };

  return (
    <View style={styles.header}>
      <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
      <Text style={[styles.year, textStyle]}>{year}</Text>
    </View>
  );
}

export default CalendarComponent;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  month: {
    marginLeft: 5,
  },
  year: {
    marginRight: 5,
  },
});

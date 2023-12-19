import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {StyleSheet, Text, View, TextStyle} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../Utils/colors';
import {TouchableRipple} from 'react-native-paper';
import {useAppContext} from '../../Context/ContextProvider';

const RANGE = 20;

function CalendarComponent({navigation}) {
  const horizontalView = true;
  const [selected, setSelected] = useState();
  const {isMarkedDate, events} = useAppContext();

  function markedDates() {
    const result = {};

    for (let i = 0; i < isMarkedDate.length; i++) {
      const date = isMarkedDate[i];
      result[date] = {
        selected: selected === date,
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
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#0C2461',
        selectedTextColor: 'white',
      },
      ...markedDates(),
    };
  }, [selected, isMarkedDate]);

  const onDayPress = useCallback(day => {
    setSelected(day.dateString);
  }, []);
  const dateObject = new Date(selected);
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
          <Text style={{color: colors.BLACK}}>
            Selected Date : {selected && formattedDate}
          </Text>
        </View>
        <TouchableRipple
          onPress={() => {
            selected &&
              navigation.navigate('NewEvent', {selectedDate: selected , formattedDate:formattedDate});
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

const theme = {
  arrowColor: colors.APP_PRIMARY,
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: '600',
          color: '#48BFE3',
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

function renderCustomHeader(date) {
  const header = date.toString('MMMM yyyy');
  const [month, year] = header.split(' ');
  const textStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
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

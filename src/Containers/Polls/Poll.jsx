import {View, Text} from 'react-native';
import {colors} from '../../Utils/colors';
import {PollData} from '../../Data/PollData';
import RNPoll, {IChoice} from 'react-native-poll';
import {fonts} from '../../Utils/fonts';
import {ScrollView} from 'react-native';

export default function Poll() {
  return (
    <ScrollView style={{backgroundColor: colors.WHITE, flex: 1, padding: 20}}>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          color: 'black',
          fontFamily: fonts.BOLD,
         
        }}>
        Polls
      </Text>
      {PollData.map(each => {
        return (
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: fonts.BOLD,
                marginTop: 30,
                color: colors.BLACK,
              }}>
              {each.question}
            </Text>
            <RNPoll
              totalVotes={100}
              choices={each.options}
              onChoicePress={selectedChoice =>
                console.log('SelectedChoice: ', selectedChoice)
              }
            />
          </View>
        );
      })}
    </ScrollView>
  );
}

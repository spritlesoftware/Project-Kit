import * as React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  TouchableRipple,
} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';
import {colors} from '../../Utils/colors';
import InputField from '../TextInput/InputField';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../Button/CustomButton';
import {dateFormatter, groupChatList} from '../../Data/GroupChatList';
import {user_1} from '../../Data/ChatRoom';
import {useNavigation} from '@react-navigation/native';

const PopupModal = props => {
  const [visible, setVisible] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [groupDescription, setGroupDescription] = React.useState('');
  const navigation = useNavigation();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleGroupCreation = item => {
    const data = {
      user_id: groupChatList.length + 1,
      name: item,
      last_msg: groupDescription,
      modified_date: dateFormatter(user_1[0].createdAt),
      profile_pic:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUAngMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EADYQAAEEAQIFAwIEAwkBAAAAAAEAAgMRBBIhBRMxQVEGYXEikRQjMoEVUmIWNEKCobHR4fEH/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIhEAAgICAgICAwAAAAAAAAAAAAECERIhAzETQQRRBWFx/9oADAMBAAIRAxEAPwCIQnvScIhe9Wn0SgNKY7QmhoPT7JC1tbKTTaA1MLIDGHdU12O0jorWlGlAiiMZsZOkE2nubQospWy1IWg9UqGUCyOR2kX8KvNhNNkNtawiYP0hNe3bogDmp8AjcbhU5MYtO4XVlhr6owfhNdgwytst02ixYJnImI9D0VaSCiV2H8KjBsbqGfhYIss29kZEvi0cgYd9qThiPcLG/sugPC2vNNaR7qfH4cYSCRY7ilWRPjOX/CPuiw2mSYj2mi0hdpLgsLgWg2Omyr5uM0NAI3pGQ/GciMc+FO3h7nC+i0ZYg09EjZKFJ2RijtH2wWQmmUBt1Z8KxJGXsLQaJUbcUkaXfUfKxcjqULImzDSXOG39O6UZMZAq7PYq1BA2Ikhu589FNojraJoSyl6Rp44e3RSa/UNm/wCqeSANVWPZOe0g/S2lBK2ZtE2QfATy+yXH6HtlYfI+QkP5mzC1PbjPezc0T5UkcDGg2UZ2HjrsWPHNAPLR/mBSyQxgfRIHe1brL4px3hvDyWSZMfMY3UWat/j5WV/b7g/JaQ2fmHq3l9EkndtlPkhjionSadO4UTsmNjvrcP2C53G9Z8OkOl036n6QTt+5vstueEzxCSMWxw2rurMl+h/47F6GZqcJ4H9JGrFnwQ29Tad8pcVskVhjhfugVs1udjtJBI+VRzuJxw22KnlMmyZhAWEMvzW6xJWOJJ6JpClLVGjJxt+j6YwNt91TdxNxJLgDaIsNhAL5G0e1p7YcRhLZI7Pm09EbKs2e14rlt+ypPns7NWnPDhEWzY+FCMeF3+FUiWmd+NPak5tG9xSqywyu+uJ5a4Hoo74htpbFt2rqsLOmkXxJH3dVdyn/AE1YIP7rGyncQcCOSAP6eqfhSFpvIY5tb/pO6YjYa3UaFX9kpaWGxSzJuIRk6YySO46KLEHPefzdJd2aSpZalW12bGzhZpefeuvVGTizPw+HSvj30ve0Cht0Hv8A7Lt4sUQyU2UA+2xXnHr3gj4M/JyBq5ejnA9GNBdVfJN0mqFJs4lzi5xc4kuO5JNkpLRSRWYi2V2/p/iOZJwqJpe/RH9DacaoLh13vpXFe7gMZ07Oc4gnxf8A0gN+iw7KkN63E/uonZbh0cVYkwHu7hVnYpaSCCqTRLyGSZ7/ADaruznKx+Da/wBvlNbwzX+g3SdolqTK5z31Sacskb2pZcHl9QVCcWxsCq0S8hoyq6p4zWgdyon4jx2TRhyn/wARoWz1kC09rUNCWaaLGj5kzqF/dcWR34j2sTtFrE4xxos4frwtTX8zSXEdBSp4Xq2VuK9s8DHzAUx4NX8hVjJqycop0zpHY7XAjSPsqjuGP1FzJ3MPs0LF4V6qkjyAziI5sLnbubsWf8heiQYMeRhtyMd3Nie3U147hZck5cfZtxRhydM5FuBlslDxlk1/M21yf/0+HiMeBjyukidim4pC3ZxJIcAR3H03svSZMdzZCCwivZYHrjhf8T9NZcLQ50sbebE1jbcXN7D536IhzpsufxZKLaPCUJ743sJD2OaQaIIqimLr7OAt8L4fPxTOixMcW+Q9ezQOpK9XxMH8Jhw4sQIZEwMBI3Nd15fwTjWZwTIdNgGNr3gNcXxh23jdeocB9TYHGMaFpmijznN/MgO31DrXnyona/hvxKL7exX45CryR12WvM5gv6m/dZ8zgUIHRS0t/lCNh0FJZHi9lEX+6pGVhJpPUWoCGg/SAPhK9/uonO91aJbBxCYXprnJhdumQ2ej5crcPHe8sJk020dj7/C5mD1C+bmR58LZY3dNO2lY8GVNEwtbI6j21EBROe1x2q/CwhwpdnRyfIbqtF7PmhljfHAS1urUA40Fj6tJ32UheAdxSgmGrdrrW6VHLKV7JNTT3W3wP1XxTgkXIxJ/yS4OMbxqb+w7X3XMF5YaKcJr6olBSVMUZtO0enY/rKLKLDlRiJzh9RZ0B+PCvR8UwJHf3lhJF77LyqPIoADorTZ9YFuIpcsviQ9aPQh+Q5EqezqPXuZwfN9L5kcsreY2nwECzzB0r5sj4K8XK3vU3EWzPGIzUeU63Od3NCq+5CwFrCGCqzHl5XySyYtpzXFjg5pIcDYINEFMQrszOo4Px2fImbBkOaDp2fdFxW43JeD+s/dcJgBrsyEPdTdQXU873VJWRJ0zUOS49SmGdZ/P90vOvuniTmWzLfdMMqqOkTDMihZFp0qYZPdVXSJvMVUTkSHLkB3CgyOJshrmA6j4UDZtQsStWRmy82dzg7UOgKTdFRVvZuY3GopfpkaW0CbJ2VtuXE4fPhcja0MSX8mi7cdPYKYuypR+jZfJE67coHSNb0NqiZW+U0zeFZnRfbkaT1Tzl6WuN7VazOaO6ZPNcTgB1HVJsdMpyvMkjnuNlxspiELI3BCEIAtcPaHZTC79LfqWu+YDusKFxa/Y1spy938xWkejOatmmMgeU5uQsmz5Sh7hvZVWTibHPBTTKFlc1/lLz3BFhgzT5qbzFm89yOc/yiwwIedQAAB82o3GzskSLJs2BSxOa02SokqQFsuAATOYK91XspFWROJI99nboml500moSsoEIQkAIQhADmGnBTBwJoFV0tppiaJ7RaiDyB5RzCnYUSJHJmso1+U7Ch6RxTS9ITaVhQiEIUjBCEIAEiEIAEIQgAQhCABCEIAEqEIARCEIAEIQmAIQhAH/2Q==',
      msg_read: false,
      active: true,
      last_seen: '',
    };
    groupChatList.unshift(data);
    navigation.replace('Groups');
  };

  return (
    <View style={{}}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            <Text variant="headlineSmall" style={styles.titleText}>
              Group Creation
            </Text>
            <TouchableOpacity onPress={hideModal}>
              <Cancel
                style={styles.cancel}
                name="cancel"
                size={30}
                color={colors.BLACK}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.selected} variant="labelLarge">
            Selected Contacts: {props.selectedCount}
          </Text>
          <InputField
            placeholder={'Enter group name'}
            label={'Group Name'}
            value={groupName}
            onChangeText={val => setGroupName(val)}
          />
          <View style={{marginBottom: moderateScale(10)}} />
          <InputField
            placeholder={'Enter group description'}
            label={'Group Description'}
            value={groupDescription}
            onChangeText={val => setGroupDescription(val)}
          />
          <View style={styles.btnContainer}>
            <CustomButton
              title="Create"
              onPress={() => handleGroupCreation(groupName)}
            />
          </View>
        </Modal>
      </Portal>
      <TouchableRipple
        style={[
          styles.btnText,
          {
            opacity: props.selectedCount <= 0 ? 0.2 : 1,
          },
        ]}
        onPress={showModal}
        disabled={props.selectedCount <= 0 ? true : false}>
        <Text style={styles.label}>Create Group</Text>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(300),
    height: moderateScale(350),
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
    padding: moderateScale(20),
    borderRadius: moderateScale(20),
  },

  btnText: {
    top: moderateScale(25),
    marginRight: moderateScale(10),
    alignSelf: 'flex-end',
  },

  label: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(15),
  },

  cancel: {
    marginBottom: moderateScale(5),
  },

  titleText: {
    fontFamily: fonts.BOLD,
    marginBottom: moderateScale(10),
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selected: {
    fontFamily: fonts.BOLD,
    marginBottom: moderateScale(20),
    marginTop: moderateScale(20),
    fontSize: moderateScale(15),
  },

  btnContainer: {
    alignSelf: 'center',
  },
});

export default PopupModal;

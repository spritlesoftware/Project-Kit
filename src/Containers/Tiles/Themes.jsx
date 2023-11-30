import {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../Utils/colors';
import {useAppContext} from '../../Context/ContextProvider';
import {Poppins, Inter, DMSans, Montserrat} from '../../Theme/Typography';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableRipple} from 'react-native-paper';
export default function Themes() {
  const {fonts, setFont} = useAppContext();
  const [isSelected, setIsSelected] = useState('DMSans');
  const [isOpen, setIsOpen] = useState(false);
  const fontTypes = [
    {name: 'DMSans', font: DMSans},
    {name: 'Poppins', font: Poppins},
    {name: 'Inter', font: Inter},
    {name: 'Montserrat', font: Montserrat},
  ];

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View
        style={{
          borderWidth: 1,
          height: 120,
          backgroundColor: colors.APP_PRIMARY,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.MEDIUM,
            color: colors.WHITE,
            fontSize: 25,
            padding: 10,
            textAlign: 'center',
            marginTop: 20,
          }}>
          Themes
        </Text>
      </View>
      <TouchableRipple
        onPress={() => {
          setIsOpen(prev => !prev);
        }}
        rippleColor="rgba(12,36,97, .32)">
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 20,
            borderBottomWidth: 0.5,
            borderColor: colors.GRAY1,
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <FontAwesome
              name="font"
              color={colors.APP_PRIMARY}
              size={15}
              style={{marginRight: 15, marginTop: 4}}
            />
            <Text
              style={{
                fontFamily: fonts.REGULAR,
                color: colors.BLACK,
                fontSize: 17,
                textAlign: 'left',
              }}>
              Change Font
            </Text>
          </View>

          <View>
            <FontAwesome
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              color={colors.GRAY3}
              size={12}
            />
          </View>
        </View>
      </TouchableRipple>

      <View style={{display: isOpen ? 'flex' : 'none'}}>
        {fontTypes.map(({name, font}) => {
          return (
            <TouchableRipple
              onPress={() => {
                setIsSelected(name);
                setFont(font);
              }}
              rippleColor="rgba(12,36,97, .32)">
              <Text
                style={{
                  fontFamily: fonts.REGULAR,
                  color: isSelected == name ? colors.APP_PRIMARY : colors.GRAY6,
                  fontSize: 15,
                  padding: 12,
                  marginLeft: 38,
                  textAlign: 'left',
                  backgroundColor: null,
                  // isSelected == name ? colors.APP_PRIMARY : null,
                  // borderRadius: 15,
                }}>
                {name}
              </Text>
            </TouchableRipple>
          );
        })}
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          padding: 20,
          borderTopColor: colors.GRAY10,
          borderTopWidth: 0.5,
          width: '100%',
        }}>
        <Text
          style={{
            fontFamily: fonts.MEDIUM,
            color: colors.APP_PRIMARY,
            textAlign: 'center',
            fontSize: 17,
          }}>
          KitBox
        </Text>
      </View>
    </View>
  );
}

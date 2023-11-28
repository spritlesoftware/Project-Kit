import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
  } from 'accordion-collapse-react-native';
  import { useState,useContext } from 'react';
  import { AppContext } from '../../Navigations/StackNavigator';
  import { View,Text,TouchableOpacity } from 'react-native';
  import { colors } from '../../Utils/colors';
export default function Themes(){
    const {fonts, setFont} = useContext(AppContext);
  const [isSelected, setIsSelected] = useState('Poppins');
    return(
        <View style={{flex: 1, padding: 30, marginTop: 30}}>
        <Text
          style={{
            fontFamily: fonts.MEDIUM,
            color: colors.BLACK,
            fontSize: 20,
            padding: 10,
            textAlign: 'left',
          }}>
          Themes
        </Text>
        <Collapse>
          <CollapseHeader style={{width:"100%",borderTopWidth:.5,borderBottomWidth:.5, borderColor:colors.GRAY2}}>
            <Text
              style={{
                fontFamily: fonts.REGULAR,
                color: colors.BLACK,
                fontSize:17,
                padding: 10,
                textAlign: 'center',
              }}>
              Change Font
            </Text>
          </CollapseHeader>
          <CollapseBody>
            <TouchableOpacity
              onPress={() => {
                setIsSelected('Poppins');
                setFont({
                  BOLD: 'Poppins-SemiBold',
                  LIGHT: 'Poppins-Light',
                  MEDIUM: 'Poppins-Medium',
                  REGULAR: 'Poppins-Regular',
                  SEMIBOLD: 'Poppins-SemiBold',
                });
              }}>
              <Text
                style={{
                  fontFamily: fonts.REGULAR,
                  color: isSelected == 'Poppins' ? colors.WHITE : colors.BLACK,
                  fontSize: 15,
                  padding: 10,
                  textAlign: 'center',
                  backgroundColor:
                    isSelected == 'Poppins' ? colors.APP_PRIMARY : null,
                  borderRadius: 15,
                }}>
                Poppins
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsSelected('Inter');
                setFont({
                  BOLD: 'Inter-SemiBold',
                  LIGHT: 'Inter-Light',
                  MEDIUM: 'Inter-Medium',
                  REGULAR: 'Inter-Regular',
                  SEMIBOLD: 'Inter-SemiBold',
                });
              }}>
              <Text
                style={{
                  fontFamily: fonts.REGULAR,
                  color: isSelected == 'Inter' ? colors.WHITE : colors.BLACK,
                  textAlign: 'center',
                  fontSize: 15,
                  padding: 10,
                  borderRadius: 15,
                  backgroundColor:
                    isSelected == 'Inter' ? colors.APP_PRIMARY : null,
                }}>
                Inter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsSelected('Montserrat');
                setFont({
                  BOLD: 'Montserrat-SemiBold',
                  LIGHT: 'Montserrat-Light',
                  MEDIUM: 'Montserrat-Medium',
                  REGULAR: 'Montserrat-Regular',
                  SEMIBOLD: 'Montserrat-SemiBold',
                });
              }}>
              <Text
                style={{
                  fontFamily: fonts.REGULAR,
                  color: isSelected == 'Montserrat' ? colors.WHITE : colors.BLACK,
                  fontSize: 15,
                  padding: 10,
                  backgroundColor:
                    isSelected == 'Montserrat' ? colors.APP_PRIMARY : null,
                  borderRadius: 15,
                  textAlign: 'center',
                }}>
                Montserrat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsSelected('DMSans');
                setFont({
                  BOLD: 'DMSans-SemiBold',
                  LIGHT: 'DMSans-Light',
                  MEDIUM: 'DMSans-Medium',
                  REGULAR: 'DMSans-Regular',
                  SEMIBOLD: 'DMSans-SemiBold',
                });
              }}>
              <Text
                style={{
                  fontFamily: fonts.REGULAR,
                  color: isSelected == 'DMSans' ? colors.WHITE : colors.BLACK,
                  textAlign: 'center',
                  fontSize: 15,
                  padding: 10,
                  borderRadius: 15,
                  backgroundColor:
                    isSelected == 'DMSans' ? colors.APP_PRIMARY : null,
                }}>
                DMSans
              </Text>
            </TouchableOpacity>
          </CollapseBody>
        </Collapse>
      </View>
    )
}
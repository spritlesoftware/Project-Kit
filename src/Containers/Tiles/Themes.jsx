import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
  } from 'accordion-collapse-react-native';
  import { useState,useContext } from 'react';
  import { View,Text,TouchableOpacity } from 'react-native';
  import { colors } from '../../Utils/colors';
  import { useAppContext } from '../../Context/ContextProvider';
  import { Poppins,Inter,DMSans,Montserrat } from '../../Theme/Typography';
export default function Themes(){
    const {fonts, setFont} = useAppContext()
  const [isSelected, setIsSelected] = useState('Poppins');
  const fontTypes = [
    {name:"Poppins",font:Poppins},
    {name:"Inter",font:Inter},
    {name:"Montserrat",font:Montserrat},
    {name:"DMSans",font:DMSans},
     ]
  
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
          {
           fontTypes.map(({name,font})=>{
            return(
              <TouchableOpacity
              onPress={() => {
                setIsSelected(name);
                setFont(font);
              }}>
              <Text
                style={{
                  fontFamily: fonts.REGULAR,
                  color: isSelected == name ? colors.WHITE : colors.BLACK,
                  fontSize: 15,
                  padding: 10,
                  textAlign: 'center',
                  backgroundColor:
                    isSelected == name ? colors.APP_PRIMARY : null,
                  borderRadius: 15,
                }}>
                {name}
              </Text>
            </TouchableOpacity>
            )
           })
          }
          </CollapseBody>
        </Collapse>
      </View>
    )
}
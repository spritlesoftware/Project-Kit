import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/colors';

const FileTransfer = props => {
  var fileType = '';
  var name = '';
  if (props.filePath !== undefined) {
    name = props.filePath.split('/').pop();
    fileType = props.filePath.split('.').pop();
  }

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: props.isFooter && moderateScale(50),
          minWidth: props.isFooter ? '' : moderateScale(200),
        },
      ]}>
      <View style={styles.frame}>
        <Image
          source={
            fileType === 'pdf'
              ? require('../../Assets/images/pdf.png')
              : require('../../Assets/images/png.png')
          }
          style={{height: 60, width: 60}}
        />
        {props.isFooter ? (
          ''
        ) : (
          <View>
            <Text style={styles.text}>{name.replace(/%20| /g, '')}</Text>
            <Text style={styles.textType}>{fileType.toUpperCase()}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default FileTransfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    borderRadius: 15,
    padding: 5,
  },
  text: {
    color: 'black',
    marginTop: 10,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 5,
    marginRight: 5,
    width: moderateScale(130),
  },
  textType: {
    color: 'black',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  frame: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    marginTop: -4,
  },
});

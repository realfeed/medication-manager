import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select'
import { range } from 'lodash'

import Colors from '../styles/Colors'
import Padding from '../styles/Padding'
import Picker from '../styles/Picker'

interface Props {
  prescription: number
  onChange: (prescription: number) => void
  onDelete: () => void
}

const items = range(96).map(i => ({ label:`${moment().minutes(i%2 * 30).seconds(0).hours(i/2).format('hh:mm A')}`, value:i/2 }))

const PrescriptionComponent = (props: Props) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        style={Picker}
        value={props.prescription}
        onValueChange={value => value && props.onChange(value)}
        items={items}
      />
      <Icon.Button
        style={styles.button}
        iconStyle={styles.buttonIcon}
        name='minus-circle'
        backgroundColor='#fff0'
        color={Colors.black}
        onPress={props.onDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: Padding.half,
  },
  buttonIcon: {
    marginRight: 0,
  }
});

export default PrescriptionComponent;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select'
import { range } from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation, NavigationContainerProps } from 'react-navigation';

import PrescriptionComponent from '../components/PrescriptionComponent'
import Drug from '../models/Drug'
import Colors from '../styles/Colors'
import { paddedBlackText } from '../styles/Typography'
import Padding from '../styles/Padding';
import Picker from '../styles/Picker'

interface Props extends NavigationContainerProps {
  drug: Drug
  onDrugUpdate: (drug: Drug) => void
}

const DrugComponent = (props: Props) => {
  const { drug, onDrugUpdate, navigation } = props

  const onPrescriptionDelete = (index: number) => () => {
    const prescriptions = [ ...drug.prescriptions.filter((_, i) => i !== index) ]
    onDrugUpdate({ ...drug, prescriptions })
  }

  const onPrescriptionUpdate = (index: number) => (value: number) => {
    const prescriptions = [ ...drug.prescriptions ]
    prescriptions[index] = value
    onDrugUpdate({ ...drug, prescriptions })
  }

  const onPrescriptionAdd = () => {
    const prescriptions = [ ...drug.prescriptions, 6 ]
    onDrugUpdate({ ...drug, prescriptions })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{ drug.name }</Text>
        <Icon.Button
          style={styles.button}
          iconStyle={styles.buttonIcon}
          name='history'
          backgroundColor='#fff0'
          color={Colors.black}
          onPress={() => navigation && navigation.navigate('History', {drug: drug})}
        />
      </View>
      <View style={styles.stock}>
        <Text style={styles.stockLabel} >Stock (doses)</Text>
        <RNPickerSelect
          style={Picker}
          value={drug.stock}
          onValueChange={(stock) => onDrugUpdate({ ...drug, stock })}
          items={ range(200).map(i => ({ label:`${i}`, value:i })) }
        />
      </View>
      { drug.prescriptions.map((prescription, i) =>
        <PrescriptionComponent
          key={i}
          prescription={prescription}
          onChange={onPrescriptionUpdate(i)}
          onDelete={onPrescriptionDelete(i)}
        />
      ) }
      <Icon.Button
        style={styles.button}
        iconStyle={styles.buttonIcon}
        name='plus-circle'
        backgroundColor='#fff0'
        color={Colors.black}
        onPress={onPrescriptionAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Padding.full,
    margin: Padding.half,
    marginBottom: 0,
    backgroundColor: Colors.lightGrey,
    borderRadius: Padding.half,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...paddedBlackText.largeTitleObject,
    flex: 1,
  },
  stock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockLabel: {
    ...paddedBlackText.bodyObject,
    flex: 1,
  },
  stockInput: {
    flex: 0,
    width: '50%',
    padding: Padding.half,
    backgroundColor: Colors.white,
  },
  button: {
    padding: Padding.half,
    textAlign: 'center',
  },
  buttonIcon: {
    marginRight: 0,
  }
});

export default withNavigation(DrugComponent);

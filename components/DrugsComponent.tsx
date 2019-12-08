import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import DrugComponent from './DrugComponent'
import Drug from '../models/Drug'
import Colors from '../styles/Colors'

interface Props {
  drugs: Drug[]
  onDrugsUpdate: (drugs: Drug[]) => void
}

const DrugsComponent = (props: Props) => {
  const onDrugUpdate = (index: number) => (updatedDrug: Drug) => {
    const updatedDrugs = [...props.drugs]
    updatedDrugs[index] = updatedDrug
    props.onDrugsUpdate(updatedDrugs)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          { props.drugs.map((drug, i) => <DrugComponent key={i} drug={drug} onDrugUpdate={onDrugUpdate(i)} />) }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  scrollView: {
  },
});

export default DrugsComponent;

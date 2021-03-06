import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { withNavigation, NavigationContainerProps } from 'react-navigation';

import useDrugs from '../hooks/useDrugs'
import DrugComponent from './DrugComponent'
import Drug from '../models/Drug'
import Colors from '../styles/Colors'

const DrugsComponent = (props: NavigationContainerProps) => {
  const [drugs, setDrugs] = useDrugs()

  const onDrugUpdate = (index: number) => (updatedDrug: Drug) => {
    const updatedDrugs = [...drugs]
    updatedDrugs[index] = updatedDrug
    setDrugs(updatedDrugs)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          { drugs.map((drug, i) => <DrugComponent key={i} drug={drug} onDrugUpdate={onDrugUpdate(i)} />) }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

DrugsComponent.navigationOptions = () => ({
  title: 'Medication'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  scrollView: {
  },
});

export default withNavigation(DrugsComponent);

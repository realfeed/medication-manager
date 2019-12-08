import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import { withNavigation, NavigationContainerProps } from 'react-navigation';

import HistoryComponentItem from './HistoryComponentItem'
import Drug from '../models/Drug'
import Colors from '../styles/Colors'

interface Props extends NavigationContainerProps {}

const HistoryComponent = (props: Props) => {
  const { navigation } = props
  if (navigation === undefined ) { return <View/> }
  const drug = navigation.getParam('drug') as Drug

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          { drug.history.reverse().map((item, i) => <HistoryComponentItem key={i} item={item} />) }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

HistoryComponent.navigationOptions = () => ({
  title: 'Medication History'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  scrollView: {
  },
});

export default withNavigation(HistoryComponent);

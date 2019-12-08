import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import moment from 'moment'

import { DrugHistory } from '../models/Drug'
import Colors from '../styles/Colors'
import { paddedBlackText } from '../styles/Typography'
import Padding from '../styles/Padding';

interface Props {
  item: DrugHistory
}

const HistoryComponentItem = (props: Props) => {
  const { item } = props

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{ moment(item.time) }</Text>
      <Text style={styles.result}>{ item.result }</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    ...paddedBlackText.bodyObject,
    flex: 1,
  },
  result: {
    ...paddedBlackText.bodyObject,
  }
});

export default HistoryComponentItem;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import {requestNotifications} from 'react-native-permissions';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import React from 'react';

import HistoryComponent from './components/HistoryComponent'
import DrugsComponent from './components/DrugsComponent'

const MainNavigator = createStackNavigator({
  Home: {screen: DrugsComponent},
  History: {screen: HistoryComponent},
});

const App = () => {
  React.useEffect(
    () => {
      console.log('requesting notification permission')
      requestNotifications(['alert', 'badge', 'sound', 'criticalAlert']).then(console.log);
    },
    []
  )

  const Navigator = createAppContainer(MainNavigator)

  return <>
    <Navigator />
  </>
};

export default App;

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

import React from 'react';

import Drugs from './containers/Drugs'

const App = () => {
  React.useEffect(
    () => {
      console.log('requesting notification permission')
      requestNotifications(['alert', 'badge', 'sound', 'criticalAlert']).then(console.log);
    },
    []
  )

  return (
    <>
      <Drugs />
    </>
  );
};

export default App;

import {AppRegistry} from 'react-native';
import { useEffect } from 'react'
import { notifications } from 'react-native-firebase'

import useAsyncStorage from './useAsyncStorage'
import Drug from '../models/Drug'
import { receive, set } from '../notifications/actions'

export const DRUGS_KEY = 'drugs'

const DRUG_DEFAULT = [
  {
    name: 'Olanzapine',
    stock: 10,
    prescriptions: [6, 18],
    history: []
  },
  {
    name: 'Depacote',
    stock: 10,
    prescriptions: [6, 18],
    history: []
  },
] as Drug[]

const useDrugs = (): [Drug[], (value: Drug[]) => void] => {
  const [drugs, setStoredValue] = useAsyncStorage(DRUGS_KEY, DRUG_DEFAULT);

  useEffect(
    () => {
      // when open
      const removeNotificationOpenedListener = notifications()
        .onNotificationOpened((notificationOpen) => receive(notificationOpen, drugs, setStoredValue));

      // when opened
      notifications().getInitialNotification()
        .then(notificationOpen => notificationOpen && receive(notificationOpen, drugs, setStoredValue))
        .catch(console.log)

      // in background
      AppRegistry.registerHeadlessTask('RNFirebaseBackgroundNotificationAction', () => receive); // <-- Add this line

      return () => removeNotificationOpenedListener()
    },
    []
  )

  const setValue = (value: Drug[]) => {
    setStoredValue(value)
    set(value)
  }

  return [drugs, setValue];
}

export default useDrugs

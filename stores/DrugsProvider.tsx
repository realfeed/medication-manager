import { useEffect, createContext, Dispatch, useReducer } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { notifications } from 'react-native-firebase'

import Drug from '../models/Drug'

const DRUG_DEFAULT = [
  {
    name: 'Olanzapine',
    stock: 10,
    prescriptions: [6, 18]
  },
  {
    name: 'Depacote',
    stock: 10,
    prescriptions: [6, 18]
  },
]

export interface DrugReplaceAction {
  type: 'replace',
  drugs: Drug[]
}
export interface DrugUpdateAction {
  type: 'update',
  index: number,
  drug: Drug
}
export interface DrugCreateAction {
  type: 'create',
  drug: Drug
}
export interface DrugDeleteAction {
  type: 'delete',
  index: number
}
type DrugAction = DrugReplaceAction | DrugCreateAction | DrugUpdateAction | DrugDeleteAction

const reducer = (drugs: Drug[], action: DrugAction) => {
  switch (action.type) {
    case 'replace':
      return action.drugs
    case 'create':
      return [
        ...drugs,
        action.drug
      ]
    case 'update':
      const updatedDrugs = [...drugs]
      updatedDrugs[action.index] = action.drug
      return updatedDrugs
    case 'delete':
      return [...drugs].filter((_, index) => index !== action.index)
    default:
      return drugs
  }
}

interface IDrugContext { drugs: Drug[]; dispatch: Dispatch<DrugAction> }
export const DrugContext = createContext<IDrugContext>({ drugs: DRUG_DEFAULT, dispatch: (action: DrugAction) => null, });

export const DrugsProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [drugs, dispatch] = useReducer(reducer, DRUG_DEFAULT)
  const key = 'drugs'

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(value => {
        if (value === null) return DRUG_DEFAULT;
        return JSON.parse(value);
      })
      .then(drugs => dispatch({ type: 'replace', drugs }))
  }, [key]);

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(drugs));

    // Build notification
    const notification = new notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle('My notification title')
      .setBody('My notification body')
      .setData({
        key1: 'value1',
        key2: 'value2',
      });

    // Create date for 1 minute in the future
    const date = new Date();
    date.setMinutes(date.getMinutes() + 1);

    // Schedule notification
    console.log('scheduling', notification)
    notifications().scheduleNotification(notification, {
      fireDate: date.getTime(),
    })
  }, [drugs])

  return <DrugContext.Provider value={{ drugs, dispatch }}>{children}</DrugContext.Provider>
}

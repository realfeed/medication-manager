import { notifications } from 'react-native-firebase'
import { NotificationOpen } from 'react-native-firebase/notifications'
import AsyncStorage from "@react-native-community/async-storage";
import moment, { Moment } from 'moment'
import * as R from 'ramda'

import { DRUGS_KEY } from '../hooks/useDrugs'
import Drug from '../models/Drug'

const notification_set = (name: string, time: Moment, index: number) => {
  const day = moment(time)
  day.hours(0)
  day.minutes(0)
  day.seconds(0)
  day.milliseconds(0)
  return `${name}_${day}_${index}`
}

const notification_id = (name: string, time: Moment, index: number) => {
  return `${notification_set(name, time, index)}_${time}`
}

export const set = async (drugs: Drug[]) => {
  // Build notification
  const taken = new notifications.Android.Action('taken', 'ic_launcher', 'Taken');
  taken.setShowUserInterface(false);
  const notTaking = new notifications.Android.Action('not_taking', 'ic_launcher', 'Not Taking');
  notTaking.setShowUserInterface(false);
  // const remoteInput = new notifications.Android.RemoteInput('inputText').setLabel('Message');
  // notTaking.addRemoteInput(remoteInput)

  // cancel all future pending notifications
  const futureIds = await notifications().getScheduledNotifications()
  futureIds
    .filter(n => moment.unix(parseInt(n.data.time)) > moment())
    .map(n => n.notificationId)
    .forEach(id => notifications().cancelNotification(id))

  // seems a little over complicated....
  const midnight = moment()
  midnight.add(1, 'day')
  midnight.hours(0)
  midnight.minutes(1)
  midnight.seconds(0)

  drugs.forEach(drug => {
    const schedule = (time: Moment, index: number) => {
      const set = notification_set(drug.name, time, index)
      const id = notification_id(drug.name, time, index)

      const notification = new notifications.Notification()
      .setNotificationId(id)
      .setTitle(`Time to take ${drug.name}`)
      .setData({
        drug,
        id,
        set,
        time: time.unix()
      })
      .android.addAction(taken)
      .android.addAction(notTaking)

      // Schedule notification
      notifications().scheduleNotification(notification, {
        fireDate: time.unix() * 1000,
        // // i need a repeat interval to make them add???
        // // so just added two for each prescription
        // repeatInterval: 'minute'
      })
    }

    // moments for prescriptions
    drug.prescriptions
      .map(prescription => {
        const take_time = moment()
        take_time.hours(Math.floor(prescription))
        take_time.minutes((prescription - Math.floor(prescription)) * 60)
        take_time.seconds(0)
        return take_time
      })
      // for the next three days
      .map(time => R.range(0, 3).map(i => moment(time).add(i, 'days')))
      .reduce((a, b) => [...a, ...b], [])
      // remove past times
      .filter(time => time.isAfter(moment()))
      // for time and next half hour (repeats every hour, so this creates a notification every 30 mins)
      .map((start, i) => R.range(0, 8).map(j => [moment(start).add(j*30, 'minutes'), i] as [Moment, number]))
      .reduce((a, b) => [...a, ...b], [])
      // .map(([time, i], j) => { console.log(j, time); return [time, i] as [Moment, number] })
      .map(([time, i]) => schedule(time, i))
  })

  // console.log('scheduled', (await notifications().getScheduledNotifications()).map(n => n.notificationId).length)
}

export const receive = async (notificationOpen: NotificationOpen, drugs?: Drug[], setDrugs?: (drugs: Drug[]) => void) => {
  const action = notificationOpen.action;
  const notification = notificationOpen.notification;
  const _drugs = drugs !== undefined ? drugs : await AsyncStorage.getItem(DRUGS_KEY)
    .then(value => {
      if (value === null) return [] as Drug[]
      return JSON.parse(value) as Drug[]
    })
  const _setDrugs = setDrugs || (async (drugs: Drug[]) => await AsyncStorage.setItem(DRUGS_KEY, JSON.stringify(drugs)))

  const index = _drugs.findIndex(drug => drug.name === notification.notificationId.split('_')[0])
  if (index) {
    const stock = _drugs[index].stock - 1
    _drugs[index] = { ..._drugs[index], stock }
    _setDrugs(_drugs)
  }
  set(_drugs)

  // clear notifications from this set
  const setIds = await notifications().getScheduledNotifications()
  setIds
    .filter(n => notification.data.set === n.data.set)
    .map(n => n.notificationId)
    .forEach(id => {
      notifications().cancelNotification(id)
      notifications().removeDeliveredNotification(id)
    })
}

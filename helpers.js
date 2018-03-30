import {AsyncStorage, StyleSheet} from "react-native";
import {Permissions, Notifications} from "expo";


const NOTIFICATION_KEY =  "FlashCards:studiedToday";

async function saveDecksInStorage(decks) {
  await AsyncStorage.setItem('FlashCards:decks', JSON.stringify(decks));
}

async function loadDecksFromStorage() {
  try {
    let data = await AsyncStorage.getItem('FlashCards:decks');
    return (data && JSON.parse(data)) || {1:{id:1, title:"Example Deck", cards:[{question:"Example Question", answer: "example answer"}]}}
  } catch (e) {
    console.warn("Couldn't load decks from storage");
    return {};
  }
}


function createNotification () {
  return {
    title: 'Study!',
    body: `You haven't studied today!`,
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}



function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function setLocalNotification() {

  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setMinutes(0)
              tomorrow.setHours(20)
              tomorrow.setMintutes(0)

              Notifications.presentLocalNotificationAsync(createNotification())

              Notifications.scheduleLocalNotificationsAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'minute',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}



const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  centeredContainer: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center"
  },
  topButtonContainer: {
    padding: 10,
    flexDirection: 'column',
    alignItems: "flex-end"
  },
  topButton: {
    color: "#618cff"
  }
});


export {
  sharedStyles,
  saveDecksInStorage,
  loadDecksFromStorage,
  setLocalNotification,
  clearLocalNotification
}
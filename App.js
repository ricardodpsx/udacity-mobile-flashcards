import React from 'react';
import { StackNavigator } from 'react-navigation';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from 'redux'
import rootReducer from "./reducer";
import DeckList from "./components/DeckList";
import DeckView from "./components/DeckView"
import CardsQuiz from "./components/CardsQuiz";
import AddCard from "./components/AddCard";
import AddDeck from "./components/AddDeck";
import thunk from 'redux-thunk';
import {loadAllDecks} from "./actions";
import {setLocalNotification} from "./helpers";
import {View} from 'react-native';

const Stack = StackNavigator({
  DeckList: {
    screen: DeckList
  },
  DeckView: {
    screen: DeckView
  },
  CardsQuiz: {
    screen: CardsQuiz
  },
  AddCard: {
    screen: AddCard
  },
  AddDeck: {
    screen: AddDeck
  }
});

const store = createStore(rootReducer,applyMiddleware(thunk));

export default class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadAllDecks());
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
        <Stack />
        </View>
      </Provider>
    );
  }
}

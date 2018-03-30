import {receiveDecks, saveDeck, updateDeck} from "./actions";
import {combineReducers} from "redux";
import uuid from 'uuid/v1';

function decks(decks = {}, action) {

  switch (action.type) {
    case receiveDecks.name:
      return action.decks;

    case updateDeck.name:
      return {...decks, [action.deck.id]: action.deck}

    case saveDeck.name:
      let id = uuid();
      return {...decks, [id]:{id, title: action.title, cards: []}}
  }

  return decks;
}



export default combineReducers({decks});
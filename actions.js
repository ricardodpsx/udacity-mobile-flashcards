import {loadDecksFromStorage, saveDecksInStorage} from "./helpers";

function selectDeck(deck) {
  return {type:selectDeck.name, deck}
}

function loadAllDecks() {
  return async(dispatch) => {
    dispatch(receiveDecks(await loadDecksFromStorage()))
  }
}

function receiveDecks(decks) {
  return {type: receiveDecks.name, decks}
}


function updateDeck(deck) {
  return async (dispatch, getState) => {
    dispatch({type: updateDeck.name, deck});
    await saveDecksInStorage(getState().decks);
  }
}

function saveDeck(title) {
  return async (dispatch, getState) => {
    dispatch({type: saveDeck.name, title});
    await saveDecksInStorage(getState().decks);
  }
}

export {
  selectDeck,
  updateDeck,
  saveDeck,
  receiveDecks,
  loadAllDecks
}
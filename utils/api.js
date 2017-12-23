import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

const initialContent = {};

function initStorage() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialContent));
  return initialContent
}

export function fetchDecksResults() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((result) => result === null ? initStorage() : JSON.parse(result))
}

export function getDeck(title) {
  return fetchDecksResults().then((decks) => decks[title])
}

export function submitDeck(title) {
  const deck = {
    title,
    questions: []
  }
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }))
}

export function addCardToDeck(title, card) {
  getDeck(title).then((deck) => {
    return AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [deck.title]: {
          questions: deck.questions.concat(card)
        }
        })
      )
  })
}

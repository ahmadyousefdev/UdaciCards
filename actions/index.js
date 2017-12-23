export const DECKS_RECEIVE = 'DECKS_RECEIVE';
export const CARD_ADD = 'CARD_ADD';
export const DECK_ADD = 'DECK_ADD';

export function receiveDecks(decks) {
  return {
    type: DECKS_RECEIVE,
    decks
  }
}

export function addDeck(title) {
  return {
    type: DECK_ADD,
    title
  }
}

export function addCard(title, card) {
  return {
    type: CARD_ADD, title,
    card
  }
}

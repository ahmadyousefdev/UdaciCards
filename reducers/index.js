/**
 * As a reminder, the AsyncStorage looks like this:
 * 
 * {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  }
 *}
 * 
 * So, The Reducer should put add the new entries and receive the entries
 * in the same ways as above.
 */

import {DECKS_RECEIVE, CARD_ADD, DECK_ADD} from '../actions'

export default function reducer(state = {}, action) {
    const {title, card, decks} = action;
    switch (action.type) {
        case DECKS_RECEIVE:
            return {
                ...state,
                ...decks
            };
        case DECK_ADD:
            return {
                ...state,
                [title]: {
                    title,
                    questions: [],
                }
            };
        case CARD_ADD:
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: [...state[title]['questions'].slice(), card]
                }
            };
        default:
            return state
    }
}

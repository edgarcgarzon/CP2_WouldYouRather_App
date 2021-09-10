import { RECEIVE_QUESTIONS } from "../actions/questions";
import { ADD_ANSWER, ADD_QUESTION } from "../actions/share";

export default function quesitons(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...state, ...action.questions, }
    case ADD_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      }
    default:
      return state
  }
}
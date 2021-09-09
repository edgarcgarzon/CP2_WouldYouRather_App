import { RECEIVE_QUESTIONS } from "../actions/questions";
import { ADD_ANSWER } from "../actions/share";

export default function tweets(state = {}, action) {
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
        default:
            return state
    }
}
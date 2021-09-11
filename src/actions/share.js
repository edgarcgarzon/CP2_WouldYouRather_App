import { getInitialData } from '../utils/api'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA"
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'


export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveQuestions(questions))
        dispatch(receiveUsers(users))
      })
  }
}

export function addVotes(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleAddAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(addVotes(authedUser, qid, answer))
    return _saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        console.log('Save new vote to question', qid)
      })
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author, saveCallback) {
  return (dispatch) => {  
    dispatch(showLoading())
    return _saveQuestion({ optionOneText, optionTwoText, author })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(hideLoading())
        saveCallback()
      })
  }
}
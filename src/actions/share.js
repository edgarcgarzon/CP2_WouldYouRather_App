import{getInitialData} from '../utils/api'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { _saveQuestionAnswer } from "../utils/_DATA"

export const ADD_ANSWER = 'ADD_ANSWER'


export function handleInitialData(){
    return (dispatch)=>{
        return getInitialData()
        .then(({users, questions})=>{
            dispatch(receiveQuestions(questions))
            dispatch(receiveUsers(users))
        })
    }
}

export function addVotes(authedUser, qid, answer){
    return {
        type: ADD_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function handleAddAnswer(authedUser, qid, answer){
    return (dispatch) =>{
        dispatch(addVotes(authedUser, qid, answer))
        return _saveQuestionAnswer({authedUser, qid, answer})
        .then(() =>{
            console.log('Save new vote to question', qid)
        })
    }
}
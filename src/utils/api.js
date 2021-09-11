import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

//simulate an API log-in service
export function logIn(id){
  return new Promise((res, rej) =>{
    setTimeout(() => res(id), 2000)
  })
}

//simulate an API log-out service
export function logOut(id){
  return new Promise((res, rej) =>{
    setTimeout(()=> res(id), 1000)
  })
}
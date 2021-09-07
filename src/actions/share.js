import{getInitialData} from '../utils/api'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { setAuthedUser } from './authedUser'


export function handleInitialData(){
    return (dispatch)=>{
        return getInitialData()
        .then(({users, questions})=>{
            dispatch(receiveQuestions(questions))
            dispatch(receiveUsers(users))
        })
    }
}
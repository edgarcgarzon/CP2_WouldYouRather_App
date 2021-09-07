import './App.css';
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/share';
import Home from './Home'
import Question from './Question'
import Board from './Board'
import Nav from './Nav'
import NewQuestion from './NewQuestion';

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render() {

    const {authedUser} = this.props
    console.log(this.props)

    return (
      <Router>
        <Nav authedUser={authedUser}/>
        <div>
          <Route path='/' exact component={Home}/>
          <Route path='/questions/:id' exact component={Question}/>
          <Route path='/leaderboard' exact component={Board}/>
          <Route path='/newquestion' exact component={NewQuestion}/>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return{
    authedUser:state.authedUser !==null? state.users[state.authedUser] : null
}}

export default connect(mapStateToProps)(App)




import './App.css';
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/share';
import Home from './Home'
import Question from './Question'
import Board from './Board'
import Nav from './Nav'

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
        <Route path='/' exact Component ={Home}/>
        <Route path='/questions/:id' exact Component ={Question}/>
        <Route path='/leaderboard' exact Component ={Board}/>
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




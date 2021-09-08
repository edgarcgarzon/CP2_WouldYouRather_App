import './App.css';
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/share';
import Home from './Home'
import Question from './Question'
import Board from './Board'
import Nav from './Nav'
import NewQuestion from './NewQuestion';
import Login  from './Login';

class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  filterComponent = (component) =>{
    return this.props.authedUser === null ? null : component
  }

  render() {

    const {authedUser} = this.props
    
    return (
      <Router>
        <Nav authedUser={authedUser}/>
        <div>
          <Route path='/' exact component={this.filterComponent(Home)}/>
          <Route path='/questions/:id' exact component={this.filterComponent(Question)}/>
          <Route path='/leaderboard' exact component={this.filterComponent(Board)}/>
          <Route path='/newquestion' exact component={this.filterComponent(NewQuestion)}/>
          <Route component={Login}/>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    authedUser:state.authedUser !==null? state.users[state.authedUser] : null
}}

export default connect(mapStateToProps)(App)




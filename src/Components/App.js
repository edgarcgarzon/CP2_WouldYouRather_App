import './App.css';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/share';
import Home from './Home'
import Question from './Question'
import QuestionBoard from './QuestionBoard'
import Nav from './Nav'
import NewQuestion from './NewQuestion';
import Login from './Login';
import LeaderBoard from './LeaderBoard';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {

    const { authedUser } = this.props

    return (
      <Router>
        <Nav authedUser={authedUser} />
        {this.props.authedUser === null
          ? <Login/>
          :
          <div>
            <Route path='/' exact component={Home} />
            <Route path='/questions/:id' exact component={Question} />
            <Route path='/leaderboard' exact component={LeaderBoard} />
            <Route path='/newquestion' exact component={NewQuestion} />
            <Route component={Login} />
          </div>
        }
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser !== null ? state.users[state.authedUser] : null
  }
}

export default connect(mapStateToProps)(App)




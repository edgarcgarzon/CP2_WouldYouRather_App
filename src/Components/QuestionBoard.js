import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import compose from 'recompose/compose'
import QuestionBoardItem from './QuestionBoardItem'
import {
  Tabs,
  Tab,
  Grid,
} from '@material-ui/core';

export class QuestionBoard extends Component {

  constructor(props) {
    super(props)
    this.state = { tab: "Unanswered Questions" }
  }

  viewPull = (id) => {
    this.props.history.push(`/questions/${id}`)
  }

  tabChangeHandler = (e, newValue) => {
    this.setState({ tab: newValue })
  }

  questionAnswered(question, authedUser) {
    return question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
  }

  display

  render() {

    const questions = Object.values(this.props.questions)

    return (
      <div>
        <Tabs
          value={this.state.tab}
          disabled={true}
          indicatorColor="primary"
          textColor="primary"
          centered
          style={{ marginBottom: 20 }}
          onChange={this.tabChangeHandler}
        >
          <Tab label="Unanswered Questions" value={"Unanswered Questions"} />
          <Tab label="Answered Questions" value={"Answered Questions"} />
        </Tabs>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {questions.map((question) => {

            const displayQuestion = this.state.tab == "Answered Questions"
              ? this.questionAnswered(question, this.props.authedUser)
              : !this.questionAnswered(question, this.props.authedUser)
            return (
              displayQuestion && (
                <Grid item key={question.id + 1}>
                  <QuestionBoardItem key={question.id} question={question} user={this.props.users[question.author]} viewPull={this.viewPull} />
                </Grid>)
            )
          })}

        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ users, questions, authedUser }) => ({
  users,
  questions,
  authedUser
})

export default compose(
  connect(mapStateToProps)
)(withRouter(QuestionBoard))

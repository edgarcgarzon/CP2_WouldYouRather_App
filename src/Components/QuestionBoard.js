import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import compose from 'recompose/compose'
import QuestionBoardItem from './QuestionBoardItem'

export class QuestionBoard extends Component {

    viewPull = (id) => {
        this.props.history.push(`/questions/${id}`)
    }

    render() {

        const questions = Object.values(this.props.questions)
        return (
            <div>
                {questions.map((question) => (
                    <QuestionBoardItem  key={question.id} question={question} user={this.props.users[question.author]} viewPull={this.viewPull} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = ({users, questions}) => ({
    users,
    questions
})

export default compose(
    connect(mapStateToProps)
)(withRouter(QuestionBoard))

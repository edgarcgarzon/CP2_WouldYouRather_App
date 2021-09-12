import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionBoard from './QuestionBoard'

export class Home extends Component {
    render() {
        return (
            <div>
                <QuestionBoard/>
            </div>
        )
    }
}

const mapStateToProps = ({users, questions}) => ({
    users,
    questions: Object.values(questions)
})

export default connect(mapStateToProps)(Home)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionStats from './QuestionStats'

export class LeaderBoard extends Component {

    render() {
        return (
            <div>
                <QuestionStats user={this.props.users["sarahedo"]}/>
            </div>
        )
    }
}

const mapStateToProps = ({users}) => ({
    users
})


export default connect(mapStateToProps)(LeaderBoard)

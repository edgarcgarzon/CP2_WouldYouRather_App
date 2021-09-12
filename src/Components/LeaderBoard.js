import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionStats from './QuestionStats'

export class LeaderBoard extends Component {

    score = (user) => (
      Object.values(user.answers).length + Object.values(user.questions).length
    )

    render() {
        return (
            <div>
            {Object.values(this.props.users)
                .sort((a,b) => this.score(b) - this.score(a))
                .map((user) => (
                    <QuestionStats key={user.id} user={user}/>
                ))
            }
                
            </div>
        )
    }
}

const mapStateToProps = ({users}) => ({
    users
})


export default connect(mapStateToProps)(LeaderBoard)

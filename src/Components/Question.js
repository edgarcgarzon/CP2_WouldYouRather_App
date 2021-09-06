import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Question extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                Question
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})



export default connect(mapStateToProps)(Question)

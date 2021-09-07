import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class NewQuestion extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                New Question
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(NewQuestion)

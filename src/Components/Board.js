import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Board extends Component {

    render() {
        return (
            <div>
               Board
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(Board)

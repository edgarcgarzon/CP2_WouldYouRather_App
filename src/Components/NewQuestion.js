import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import compose from 'recompose/compose'
import {
  TextField,
  Grid,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Divider,
  Button

} from '@material-ui/core';
import { handleAddQuestion } from '../actions/share';

const useStyles = (theme) => ({
  root: {
    minWidth: 500,
    margin: 10
  },
  details: {
    display: 'flex',

  },
  content: {
    display: 'block',
    minWidth: 300
  },
});

export class NewQuestion extends Component {

  constructor(props){
    super(props)
    this.state={
      optionOne:'',
      optionTwo:'',
      buttonDisable:true
    }
  }

  handleOption = (option, value) =>{
    this.setState((state)=>({
      [option]: value,
      buttonDisable: state.optionOne === '' || state.optionTwo === ''
    }))
  }

  onSubmit = () => {
    this.setState({buttonDisable:true})
    this.props.dispatch(handleAddQuestion(
        this.state.optionOne, 
        this.state.optionTwo, 
        this.props.authedUser, 
        ()=>{
          this.props.history.push(`/`)
        }
    ))
    
  }

  render() {

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6}>
          <Card className={this.props.classes.root}>
            <CardHeader
              title={`Create New Question`}
              titleTypographyProps={{ variant: 'h5' }}
              style={{ backgroundColor: "#e0e0e0", maxHeight: 10, textAlign: 'center' }}
            />
            <CardContent className={this.props.classes.content}>
              <Typography variant="body2" color="textSecondary" style={{ marginBottom: 10 }}>
                Complete the question
              </Typography>
              <Typography variant="h6" style={{ marginBottom: 10 }}>
                Would you rather ...
              </Typography>
              <TextField
                label="Enter option one text here"
                fullWidth
                variant="outlined"
                size={'small'}
                value={this.state.optionOne}
                onChange={(e)=>this.handleOption("optionOne", e.target.value)}
              />
              <Divider variant="middle" style={{ margin: 15 }} />
              <TextField
                label="Enter option two text here"
                fullWidth
                variant="outlined"
                size={'small'}
                value={this.state.optionTwo}
                onChange={(e)=>this.handleOption("optionTwo", e.target.value)}
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth={true} 
                size={'medium'} 
                style={{ marginTop: 20 }} 
                onClick={this.onSubmit}
                disabled={this.state.buttonDisable}>
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({authedUser}) => ({
  authedUser
})

export default compose(
  connect(mapStateToProps),
  withStyles(useStyles),
)(withRouter(NewQuestion))

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Redirect} from "react-router-dom";
import compose from 'recompose/compose'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Grid
} from '@material-ui/core';
import { handleAddAnswer } from '../actions/share';


const useStyles = (theme) => ({
  root: {
    maxWidth: 500,
    margin: 10
  },
  details: {
    display: 'flex',

  },
  content: {
    display: 'block',
    minWidth: 300
  },
  cover: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    marginTop: 45,
    marginLeft: 15,
    marginRight: 15

  },
  formControl: {
    margin: 0,
  },
  group: {
    margin: 0,
  },
});

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export class Question extends Component {

  constructor(props) {
    super(props)
    this.state = { answer: "optionOne" };
  }

  handleChange = event => {
    this.setState({ answer: event.target.value });
  };

  onSubmit = event => {
    const { question, authedUser, dispatch } = this.props
    dispatch(handleAddAnswer(authedUser, question.id, this.state.answer))
  }



  render() {

    const { user, question, authedUser } = this.props
    let stats = {}
    if (this.props.questionAnswered) {
      stats["questionOneVotes"] = question.optionOne.votes.length
      stats["questionTwoVotes"] = question.optionTwo.votes.length
      stats["QuestionTotal"] = stats.questionOneVotes + stats.questionTwoVotes
      stats["questionOneVotesPerc"] = (stats.questionOneVotes / stats.QuestionTotal) * 100
      stats["questionTwoVotesPerc"] = (stats.questionTwoVotes / stats.QuestionTotal) * 100
    }

    if(question === undefined){
      return <Redirect to='/404' />    
    }

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={6}>
          <Card className={this.props.classes.root}>
            <CardHeader
              title={`${user.name} asks:`}
              titleTypographyProps={{ variant: 'body1' }}
              style={{ backgroundColor: "#e0e0e0", maxHeight: 10 }}
            />
            <div className={this.props.classes.details}>
              <CardMedia
                className={this.props.classes.cover}
                component="img"
                height="140"
                image={`${user.avatarURL}`}
                title={`${user.name}`}
              />
              <Divider orientation="vertical" variant="middle" flexItem />
              <CardContent className={this.props.classes.content}>
                <Typography variant="h6" style={{ marginBottom: 10 }}>
                  Would you rather
                </Typography>
                {this.props.questionAnswered === false
                  ? <FormControl component="fieldset" className={this.props.classes.formControl} >
                    <RadioGroup
                      aria-label="Gender"
                      name="gender1"
                      className={this.props.classes.group}
                      value={this.state.answer}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel value="optionOne" control={<Radio color="primary" style={{ transform: "scale(0.8)" }} />}
                        label={<Typography variant="body1" color="textPrimary">{`${question.optionOne.text}`}</Typography>}
                        style={{ height: 30 }}
                      />
                      <FormControlLabel value="optionTwo" control={<Radio color="primary" style={{ transform: "scale(0.8)" }} />}
                        label={<Typography variant="body1" color="textPrimary">{`${question.optionTwo.text}`}</Typography>}
                        style={{ height: 30 }}
                      />
                    </RadioGroup>
                    <Button variant="contained" color="primary" fullWidth={true} size={'small'} style={{ marginTop: 5 }} onClick={this.onSubmit}>
                      Submit
                    </Button>
                  </FormControl>
                  : <div>
                    <Typography variant="body1" color="textPrimary">
                      {`${question.optionOne.text}`}
                    </Typography>
                    <LinearProgressWithLabel value={stats.questionOneVotesPerc} style={{ height: 10, borderRadius: 5, }} />
                    <Typography variant="body2" color="textSecondary">
                      {`${stats.questionOneVotes} of out ${stats.QuestionTotal} votes`}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      {`${question.optionTwo.text}`}
                    </Typography>
                    <LinearProgressWithLabel value={stats.questionTwoVotesPerc} style={{ height: 10, borderRadius: 5, }} />
                    <Typography variant="body2" color="textSecondary">
                      {`${stats.questionTwoVotes} of out ${stats.QuestionTotal} votes`}
                    </Typography>
                  </div>}
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.match.params

  if(questions[id]===undefined){
    return{}
  }
  console.log(questions[id])

  return {
    question: questions[id],
    user: users[questions[id].author] ,
    questionAnswered: users[authedUser].answers[id] !== undefined,
    authedUser
  }
}



export default compose(
  connect(mapStateToProps),
  withStyles(useStyles),
)(withRouter(Question))

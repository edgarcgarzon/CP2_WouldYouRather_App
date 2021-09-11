import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Grid
} from '@material-ui/core';


const useStyles = (theme) => ({
  root: {
    maxWidth: 500,
    margin: 10,
    padding: 5
  },
  details: {
    display: 'flex',
    },
  content: {
    display: 'block',
    minWidth: 250
  },
  score: {
    display: 'table',
    padding:0,
    margin:0,
    alignItems:"center",
    minWidth:100
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
  avatar: {
    backgroundColor: `${theme.palette.text.primary}`,
    border: `1px solid ${theme.palette.text.primaryColor}`,
    color: "white",
    width:60,
    height:60,
    verticalAlign:'middle',
    display:"tableCell"
  }
});

export class UserStats extends Component {

  render() {
    const { user } = this.props
    const answersNr =  Object.values(user.answers).length
    const questionNr =  Object.values(user.questions).length

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

                <Typography variant="h5" style={{ marginBottom: 10 }}>
                  {user.name}
                </Typography>
                <div style={{ display: "flex" }}>
                  <Typography variant="body2" style={{ margin: 10, width: 200 }}>
                    Answered questions
                  </Typography>
                  <Typography variant="body2" style={{ margin: 10 }}>
                  {answersNr}
                  </Typography>
                </div>
                <Divider variant="middle" style={{ margin: 0 }} />
                <div style={{ display: "flex" }}>
                  <Typography variant="body2" style={{ margin: 10, width: 200  }}>
                    Created Questions
                  </Typography>
                  <Typography variant="body2" style={{ margin: 10 }}>
                    {questionNr}
                  </Typography>
                </div>
              </CardContent>
              <Divider orientation="vertical" variant="middle" flexItem style={{ margin: 0, marginRight:5 }}  />
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                <Avatar className={this.props.classes.avatar}>
                <Typography variant="h5" style={{ margin: 0}}>
                  {answersNr + questionNr}
                </Typography>
                </Avatar>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
      </Grid>
    )
  }
}


export default withStyles(useStyles)(UserStats)

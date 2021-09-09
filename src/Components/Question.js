import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import compose from 'recompose/compose'
import {
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
    Radio


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

export class Question extends Component {

    constructor(props){
        super(props)
        this.state = {value: "optionOne"};
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
      };

    onSubmit = event =>{
        const { question, authedUser, dispatch } = this.props
        dispatch(handleAddAnswer(authedUser, question.id, this.state.value))
    }

    render() {

        const { user, question, authedUser } = this.props

        return (
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
                        <Typography variant="body1" >
                            Would you rather
                        </Typography>
                        <FormControl component="fieldset" className={this.props.classes.formControl} >
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                className={this.props.classes.group}
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="optionOne" control={<Radio color="primary" style={{transform: "scale(0.8)"}}/>} 
                                    label={<Typography variant="body2" color="textSecondary">{`${question.optionOne.text}`}</Typography>}
                                    style={{ height: 30 }}
                                />
                                <FormControlLabel value="optionTwo" control={<Radio color="primary" style={{ transform: "scale(0.8)" }} />}
                                    label={<Typography variant="body2" color="textSecondary">{`${question.optionTwo.text}`}</Typography>}
                                    style={{ height: 30 }}
                                />
                            </RadioGroup>
                            <Button variant="contained" color="primary" fullWidth={true} size={'small'} style={{ marginTop: 5 }} onClick={this.onSubmit}>
                                Submit
                            </Button>
                        </FormControl>

                    </CardContent>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
    const { id } = props.match.params
    return {
        question: questions[id],
        user: users[questions[id].author],
        authedUser
    }
}



export default compose(
    connect(mapStateToProps),
    withStyles(useStyles),
)(withRouter(Question))

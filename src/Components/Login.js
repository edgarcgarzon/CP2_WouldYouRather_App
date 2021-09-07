import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Button,
    Grid,
    Paper,
    Typography,
    FormControl,
    Select,
    MenuItem
} from "@material-ui/core";
import { handleSetAuthedUser } from '../actions/authedUser';
import {Redirect} from 'react-router-dom'

export class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            logUserReq:''
        }
    }

    handleChange = (event) => {
        this.setState({logUserReq:event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(handleSetAuthedUser(this.state.logUserReq))
    }

    render() {

        
        if(this.props.authedUser){
            return <Redirect to='/' />    }

        return (
            <div>
                <Grid container spacing={0} justify="center" direction="row">
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            spacing={2}
                            className="login-form"
                        >
                            <Paper
                                variant="elevation"
                                elevation={2}
                                className="login-background"
                            >
                                <Grid item>
                                    <Typography variant="h5">
                                        Sign in
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        Please sign in to continue
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <form onSubmit={this.handleSubmit}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <FormControl style={{minWidth: 200}}>
                                                    <Select
                                                        value={this.state.logUserReq}
                                                        className="button-block"
                                                        onChange={this.handleChange}
                                                    >
                                                        {this.props.users.map((user) => (
                                                            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    className="button-block"
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = ({users, authedUser}) => ({
    users: Object.values(users),
    authedUser

})



export default connect(mapStateToProps)(Login)

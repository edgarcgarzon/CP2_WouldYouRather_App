import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from "react-router-dom";
import compose from 'recompose/compose'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { UnsetAuthedUser } from '../actions/authedUser';



const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        display: 'flex',
        alignItems: 'center',
    }
});

class Nav extends Component {

    constructor(props) {
        super(props);
      }

    handleLogin = (event) => {
        this.props.history.push(`/login`)
    };

    handleLogout = (event) => {
        this.props.dispatch(UnsetAuthedUser())
        this.props.history.push('/login')
    };

    render() {
        const { authedUser } = this.props
        const disabledTab = (this.props.authedUser === null )

        return (
            <div className={this.props.classes.root}>
                <AppBar position="static">
                    <Toolbar className={this.props.classes.appbar}>
                        <Typography variant="h6" className={this.props.classes.title}>
                            Would You Rather APP
                        </Typography>
                        {authedUser !== null
                            ? (<div className={this.props.classes.appbar}>
                                <Typography variant="subtitle2" style={{ marginRight: 12 }}>
                                    {`Hello, ${authedUser.name}`}
                                </Typography>
                                <Avatar alt={`${authedUser.name}`} src={`${authedUser.avatarURL}`} style={{ marginRight: 12 }} />
                                <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                            </div>)
                            : (<Button color="inherit" onClick={this.handleLogin}>Login</Button>)
                        }
                    </Toolbar>
                </AppBar>
                <Tabs
                    value={this.props.authedUser === null? false : this.props.location.pathname}
                    disabled={true}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Home" component={Link} to="/" value="/" disabled={disabledTab}/>
                    <Tab label="New Question" component={Link} to="/newquestion" value="/newquestion" disabled={disabledTab}/>
                    <Tab label="Leaderboard" component={Link} to="/leaderboard" value="/leaderboard" disabled={disabledTab}/>
                </Tabs>
            </div>
        )
    }
}

export default compose(
    connect(),
    withStyles(useStyles),
)(withRouter(Nav))
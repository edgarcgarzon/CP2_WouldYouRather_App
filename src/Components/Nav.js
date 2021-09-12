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
import LoadingBar from 'react-redux-loading'



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

    tabsValues = ['/', '/add', '/leaderboard']

    filterTabsName = () => {
        return (this.props.authedUser === null)
        ? false 
        : this.tabsValues.includes(this.props.location.pathname) ? this.props.location.pathname : false
    }
    
    handleLogin = (event) => {
        this.props.history.push(`/`)
    };

    handleLogout = (event) => {
        this.props.dispatch(UnsetAuthedUser())
        this.props.history.push('/')
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
                <LoadingBar />
                <Tabs
                    value={this.filterTabsName()}
                    disabled={true}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Home" component={Link} to="/" value="/" disabled={disabledTab}/>
                    <Tab label="New Question" component={Link} to="/add" value="/add" disabled={disabledTab}/>
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
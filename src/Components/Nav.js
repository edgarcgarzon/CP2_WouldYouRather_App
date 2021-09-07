import React, { Component } from 'react'
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
        //TODO: implement
    };

    handleLogout = (event) => {
        //TODO: implement
    };

    handleTabChange = (e, value) =>{
        this.setState({tab:value})
    }

    render() {
        const { authedUser } = this.props

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
                                <Button color="inherit" onClick={this.handleLogin}>Logout</Button>
                            </div>)
                            : (<Button color="inherit" onClick={this.handleLogout}>Login</Button>)
                        }
                    </Toolbar>
                </AppBar>
                <Tabs
                    value={this.props.location.pathname}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Home" component={Link} to="/" value="/"/>
                    <Tab label="New Question" component={Link} to="/newquestion" value="/newquestion"/>
                    <Tab label="Leaderboard" component={Link} to="/leaderboard" value="/leaderboard"/>
                </Tabs>
            </div>
        )
    }
}

export default compose(
    withStyles(useStyles),
)(withRouter(Nav))
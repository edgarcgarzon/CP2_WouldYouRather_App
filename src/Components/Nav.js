import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
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
}));

export default function Nav({authedUser}) {
  const classes = useStyles();


  const handleLogin = (event) => {
    //TODO: implement
  };

  const handleLogout = (event) => {
    //TODO: implement
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appbar}>
          <Typography variant="h6" className={classes.title}>
            Would You Rather APP
          </Typography>
          {authedUser !== null
            ?(<div className={classes.appbar}>
                <Typography variant="subtitle2" style={{ marginRight: 12 }}> 
                {`Hello, ${authedUser.name}`}
                </Typography>
                <Avatar alt={`${authedUser.name}`} src={`${authedUser.avatarURL}`} style={{ marginRight: 12 }}/>
                <Button color="inherit" onClick={handleLogin}>Logout</Button>
            </div>) 
            :(<Button color="inherit" onClick={handleLogout}>Login</Button>)
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
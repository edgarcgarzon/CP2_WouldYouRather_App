import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,

    Typography,

} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        margin: 10
    },
    details: {
        display: 'flex',

    },
    content:{
      display: 'block',
      minWidth: 300
    },
    cover: {
        width: 80,
        height: 80,
        borderRadius: '50%',
        marginTop:20,
        marginLeft:15,
        marginRight:15

    },

}));

export default function QuestionBoardItem({ user, question, viewPull }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Card className={classes.root}>
            <CardHeader
                title={`${user.name} asks:`}
                titleTypographyProps={{ variant: 'body1' }}
                style={{ backgroundColor: "#e0e0e0", maxHeight: 10 }}
            />
            <div className={classes.details}>
                <CardMedia
                    className={classes.cover}
                    component="img"
                    height="140"
                    image={`${user.avatarURL}`}
                    title={`${user.name}`}
                />
                <Divider orientation="vertical" variant="middle" flexItem />
                <CardContent className={classes.content}>
                    <Typography variant="body1" >
                        Would you rather
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginBottom: 12 }}>
                        {`...${question.optionOne.text} ...`}
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth={true} size={'small'} onClick={()=> viewPull(question.id)}>
                        View Pull
                    </Button>
                </CardContent>
            </div>
        </Card>
    );
}

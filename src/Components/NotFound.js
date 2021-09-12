import { Typography, Grid } from '@material-ui/core'
import React, { Component } from 'react'

export default class NotFound extends Component {
    render() {
        return (
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
                <Typography variant='h2' style={{margin:50}}> 
                    404 - Page not found ;-(
                </Typography>
            </Grid>
        )
    }
}

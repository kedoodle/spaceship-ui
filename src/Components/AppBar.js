import React from "react";
import {
    Button,
    Grid,
    Typography
} from "@material-ui/core";

export default function AppBar(props) {
    const { signOut, name } = props;

    return (
        <Grid container justify="space-between">
            <Grid itemScope>
                <Typography variant="h4" component="h1">
                    {name} <span aria-hidden="true" role="img">🚀</span>
                </Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={signOut}>Sign out</Button>
            </Grid>
        </Grid>
    );
}
import React from "react";
import {
    Typography
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors"

import { formatAud } from "../utils/Formatter"

const theme = createMuiTheme({
    palette: {
        primary: { main: green[500] },
        secondary: { main: red[500] }
    }
});

export const Summary = (props) => {
    const data = props.data;

    const balance = parseFloat(data["aud_balance"]);
    const audReturn = parseFloat(data["aud_market_return"]);
    const isPositiveReturn = audReturn > 0;
    return (
        <>
            <Typography color="textSecondary">
                Balance
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                {formatAud(balance)}
            </Typography>
            <Typography color="textSecondary">
                Returns
            </Typography>
            <ThemeProvider theme={theme}>
                <Typography color={isPositiveReturn ? "primary" : "secondary"}>
                    {formatAud(audReturn)}
                </Typography>
            </ThemeProvider>
        </>
    );
}
import React, { useContext } from "react";
import {
    Typography
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors"

import { formatAud } from "../utils/Formatter"
import AccountBalanceGraph from "./AccountBalanceGraph";
import { Context } from "../utils/Store";

const theme = createMuiTheme({
    palette: {
        primary: { main: green[500] },
        secondary: { main: red[500] }
    }
});

export default function BalanceSummary() {
    const [state] = useContext(Context);
    const accountBalances = state.accountBalances;
    const investmentSummary = state.investmentSummary;

    const balance = investmentSummary && parseFloat(investmentSummary["aud_balance"]);
    const audReturn = investmentSummary && parseFloat(investmentSummary["aud_market_return"]);

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
            <div style={{ height: 200 }}>
                <AccountBalanceGraph data={accountBalances}/>
            </div>
        </>
    );
}

import React, { useEffect, useState } from "react";
import {
    Typography
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors"

import { getAccountBalances, getInvestmentSummary } from "../services/Api"
import { formatAud } from "../utils/Formatter"
import AccountBalanceGraph from "./AccountBalanceGraph";

const theme = createMuiTheme({
    palette: {
        primary: { main: green[500] },
        secondary: { main: red[500] }
    }
});

export default function BalanceSummary() {
    const [accountBalanceData, setAccountBalanceData] = useState(null);
    const [investmentSummaryData, setInvestmentSummaryData] = useState(null);
    const [loaded, setLoaded] = useState(null);

    function getData() {
        Promise.all([getAccountBalances(), getInvestmentSummary()])
            .then(values => {
                setAccountBalanceData(values[0]["graph_data"]);
                setInvestmentSummaryData(values[1]);
                setLoaded(true);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const balance = loaded && parseFloat(investmentSummaryData.aud_balance);
    const audReturn = loaded && parseFloat(investmentSummaryData["aud_market_return"]);

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
                <AccountBalanceGraph data={accountBalanceData}/>
            </div>
        </>
    );
}

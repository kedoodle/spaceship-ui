import React, { useContext } from "react";
import {
    Typography
} from "@material-ui/core";
import moment from "moment";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors"

import { formatAud } from "../utils/Formatter"
import UnitPriceGraph from "./UnitPriceGraph";
import { Context } from "../utils/Store";

const theme = createMuiTheme({
    palette: {
        primary: { main: green[500] },
        secondary: { main: red[500] }
    }
});

export default function UnitPriceSummary() {
    const [state] = useContext(Context);
    const unitPrices = state["unitPrices"];

    const latestData = unitPrices && unitPrices[unitPrices.length - 1]
    const date = latestData && moment(latestData.date).format("dddd D MMMM");
    const unitPrice = latestData && parseFloat(latestData.aud_price);

    return (
        <>
            <Typography color="textSecondary">
                Unit Price as at {date}
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                {formatAud(unitPrice, 20)}
            </Typography>
            <Typography color="textSecondary">
            Lorem
            </Typography>
            <ThemeProvider theme={theme}>
                <Typography color={true ? "primary" : "secondary"}>
                    ipsum
                </Typography>
            </ThemeProvider>
            <div style={{ height: 200 }}>
                <UnitPriceGraph data={unitPrices}/>
            </div>
        </>
    );
}

import React from "react";
import {
    Box,
    Grid,
    Paper
} from "@material-ui/core"

import BalanceSummary from "./BalanceSummary"
import UnitPriceSummary from "./UnitPriceSummary"

export default function Dashboard() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper>
                        <Box p={3}>
                            <BalanceSummary />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Box p={3}>
                            {<UnitPriceSummary />}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

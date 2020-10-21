import React from "react";
import {
    Box,
    Grid,
    Paper
} from "@material-ui/core"

import {
    getUnitPrices
} from "../services/Api"
import Summary from "./Summary"
import { UnitPrice } from "./UnitPrice"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    };

    componentDidMount() {
        const promises = [
            getUnitPrices()
        ]

        Promise.all(promises)
            .then(data => {
                this.setState({
                    data: {
                        unitPrices: data[0]["unit_prices"]
                    }
                });
            });
    }

    render() {
        const { data } = this.state;
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper>
                            <Box p={3}>
                                <Summary />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <Box p={3}>
                                {data && <div style={{ height: 500 }}><UnitPrice data={data.unitPrices} /></div>}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Dashboard;

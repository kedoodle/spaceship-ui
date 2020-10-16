import React from "react";

import {
    getInvestmentSummary,
    getUnitPrices
} from "../Service/Api"
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
            getInvestmentSummary(),
            getUnitPrices()
        ]

        Promise.all(promises)
            .then(data => {
                this.setState({
                    data: {
                        investmentSummary: data[0],
                        unitPrices: data[1]["unit_prices"]
                    }
                });
            });
    }

    render() {
        const { data } = this.state;

        return (
            <>
                {/* {data && data.investmentSummary["aud_balance"]} */}
                {data && <div style={{ height: 500 }}><UnitPrice data={data.unitPrices} /></div>}
            </>
        );
    }
}

export default Dashboard;

import React from "react";

import {
    getAccountBalances,
    getInvestmentSummary,
    getUnitPrices
} from "../services/Api"
import { Summary } from "./Summary"
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
            getAccountBalances(),
            getInvestmentSummary(),
            getUnitPrices()
        ]

        Promise.all(promises)
            .then(data => {
                this.setState({
                    data: {
                        accountBalances: data[0]["graph_data"],
                        investmentSummary: data[1],
                        unitPrices: data[2]["unit_prices"]
                    }
                });
            });
    }

    render() {
        const { data } = this.state;
        return (
            <>
                {data && console.log(data.accountBalances)}
                {data && <Summary data={data.investmentSummary} />}
                {data && <div style={{ height: 500 }}><UnitPrice data={data.unitPrices} /></div>}
            </>
        );
    }
}

export default Dashboard;

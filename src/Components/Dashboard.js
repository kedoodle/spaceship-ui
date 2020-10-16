import React from "react";

import { getInvestmentSummary } from "../Service/Api"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    };

    componentDidMount() {
        const promises = [
            getInvestmentSummary()
        ]

        Promise.all(promises)
            .then(data => {
                console.log(data[0])
                this.setState({
                    data: {
                        investmentSummary: data[0]
                    }
                });
            });
    }

    render() {
        return (
            <>
                dashboard // authenticated space
                {this.state.data ? this.state.data.investmentSummary["aud_balance"] : null}
            </>
        );
    }
}

export default Dashboard;

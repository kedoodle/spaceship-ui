import React, { useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {
    Box,
    Container,
    Typography
} from "@material-ui/core";

import Login from "./components/Login"
import AppBar from "./components/AppBar"
import Dashboard from "./components/Dashboard"
import { getAccountBalances, getInvestmentHistory, getInvestmentSummary, getUnitPrices, getUser } from "./services/Api"
import { clearTokens, setTokens } from "./utils/Auth";
import { Actions, Context } from "./utils/Store";

export default function App() {
    const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("auth") && true);
    const [state, dispatch] = useContext(Context);
    const user = state.user;

    const populateStore = () => {
        Promise.all([getAccountBalances(), getInvestmentHistory(), getInvestmentSummary(), getUnitPrices(), getUser()])
            .then(values => {
                dispatch({type: Actions.SET_ACCOUNT_BALANCES, payload: values[0]["graph_data"]});
                dispatch({type: Actions.SET_INVESTMENT_HISTORY, payload: values[1]});
                dispatch({type: Actions.SET_INVESTMENT_SUMMARY, payload: values[2]});
                dispatch({type: Actions.SET_UNIT_PRICES, payload: values[3]["unit_prices"]});
                dispatch({type: Actions.SET_USER, payload: values[4]});
        });
    }

    useEffect(() => {
        authenticated && populateStore()
    }, [authenticated]);

    const name = user && user["contact"]["first_name"]

    function signIn(tokens) {
        setTokens(tokens);
        setAuthenticated(true);
    }

    function signOut() {
        clearTokens();
        setAuthenticated(false);
    }

    return (
        <Box pt={10}>
            <Container>
                {authenticated ?
                    <>
                        <AppBar signOut={signOut} name={name} />
                        <Box mt={2}>
                            <Router>
                                <Switch>
                                    <Route exact path="/">
                                        <Dashboard />
                                    </Route>
                                </Switch>
                            </Router>
                        </Box>
                    </>
                    :
                    <>
                        <Typography align="center" variant="h4" component="h1" gutterBottom>
                            Spaceship UI <span aria-hidden="true" role="img">🚀</span>
                        </Typography>
                        <Box mt={2}>
                            <Login signIn={signIn} />
                        </Box>
                    </>
                }
            </Container>
        </Box>
    );
}

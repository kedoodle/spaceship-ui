import React, { useEffect, useState } from "react";
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
import { getUser } from "./services/Api"
import { clearTokens, getTokens, setTokens } from "./utils/Auth";

function App() {
    const [authenticated, setAuthenticated] = useState(getTokens());
    const [userData, setUserData] = useState(null);

    function signIn(tokens) {
        setTokens(tokens);
        setAuthenticated(true);
    }

    function signOut() {
        clearTokens();
        setAuthenticated(false);
    }

    useEffect(() => {
        authenticated && getUser().then(data => setUserData(data));
    }, [authenticated]);

    const name = userData && userData["contact"]["first_name"]

    return (
        <Box pt={10}>
            <Container>
                {authenticated ?
                    <>
                        {userData && <AppBar signOut={signOut} name={name} />}
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

export default App;

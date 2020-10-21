import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Typography
} from "@material-ui/core";

import Login from "./components/Login"
import { clearTokens } from "./utils/Auth";
import Dashboard from "./components/Dashboard"

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            authenticated: null
        }
    }

    componentDidMount() {
        const auth = localStorage.getItem("auth")
        if (auth) {
            this.setAuthenticated()
        }
    }

    setAuthenticated = () => {
        this.setState({
            authenticated: true
        })
    }

    signOut = () => {
        clearTokens();
        this.setState({
            authenticated: false
        })
    }

    render() {
        const authenticated = this.state.authenticated;

        return (
            <Box mt={2}>
                <Container>
                    <Typography align="center" variant="h4" component="h1" gutterBottom>
                        Spaceship UI <span aria-hidden="true" role="img">🚀</span>
                    </Typography>
                    {authenticated ?
                        <>
                            <Container maxWidth="xs">
                                <Button fullWidth variant="contained" onClick={this.signOut}>Log out</Button>
                            </Container>
                            <Box mt={4}>
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
                        <Login setAuthenticated={this.setAuthenticated} />
                    }
                </Container>
            </Box>
        );
    }
}

export default App;

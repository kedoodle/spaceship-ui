import React from "react";
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

import { getUser } from "./services/Api"
import { clearTokens } from "./utils/Auth";
import Login from "./components/Login"
import AppBar from "./components/AppBar"
import Dashboard from "./components/Dashboard"

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            authenticated: null,
            data: null
        }
    }

    componentDidMount() {
        const auth = localStorage.getItem("auth")
        if (auth) {
            this.onAuthenticate()
        }
    }

    onAuthenticate = () => {
        this.setState({
            authenticated: true
        })
        getUser().then(data => this.setState({data: data}))
    }

    signOut = () => {
        clearTokens();
        this.setState({
            authenticated: false
        })
    }

    render() {
        const { authenticated, data } = this.state;
        const name = data && data["contact"]["first_name"]

        return (
            <Box pt={10}>
                <Container>
                    {authenticated ?
                        <>
                            {data && <AppBar signOut={this.signOut} name={name} />}
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
                                <Login onAuthenticate={this.onAuthenticate} />
                            </Box>
                        </>
                    }
                </Container>
            </Box>
        );
    }
}

export default App;

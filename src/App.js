import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {
    Button,
    Container,
    Typography
} from "@material-ui/core";

import Login from "./Components/Login"
import { clearTokens } from "./Service/Auth";
import Dashboard from "./Components/Dashboard"

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
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Spaceship UI <span aria-hidden="true" role="img">🚀</span>
                </Typography>
                {authenticated ?
                    <>
                        <Button variant="contained" onClick={this.signOut}>Sign out</Button>
                        <Router>
                            <Switch>
                                <Route exact path="/">
                                    <Dashboard />
                                </Route>
                            </Switch>
                        </Router>
                    </>
                    :
                    <Login setAuthenticated={this.setAuthenticated} />
                }
            </Container>
        );
    }
}

export default App;

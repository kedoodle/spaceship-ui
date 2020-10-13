import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Login from "./Components/Login"
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

    render() {
        const authenticated = this.state.authenticated;

        if (authenticated) {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                    </Switch>
                </Router>
            );
        }

        return (
            <Login setAuthenticated={this.setAuthenticated} />
        );
    }
}

export default App;

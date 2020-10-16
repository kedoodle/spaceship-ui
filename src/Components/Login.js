import React from "react";
import {
    Button,
    TextField
} from "@material-ui/core";

import { login } from "../Service/Api"
import { setTokens } from "../Service/Auth"

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null
        }
    };

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { username, password } = this.state;
        if (!username || !password) {
            return;
        }

        login(username, password)
            .then(response => {
                if (response.status === 401) {
                    throw new Error("Credential mismatch")
                }
                return response.json()
            })
            .then(response => {
                const tokens = JSON.stringify(response["auth"]);
                setTokens(tokens);
                this.props.setAuthenticated();
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="username"
                        label="Email address"
                        type="email"
                        variant="filled"
                        onChange={this.handleChange}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        variant="filled"
                        onChange={this.handleChange}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </>
        );
    }
}

export default Login;

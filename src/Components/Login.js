import React from "react";
import {
    Button,
    Container,
    Grid,
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
            <Container maxWidth="xs">
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="username"
                                        size="small"
                                        type="email"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" fullWidth type="submit" variant="contained">
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default Login;

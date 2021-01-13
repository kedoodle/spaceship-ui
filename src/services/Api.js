import axios from "axios";
import {
    getAccessToken,
    getRefreshToken,
    setTokens
} from "../utils/Auth"

// Add bearer token to axios requests
axios.interceptors.request.use(
    config => {
        config.headers["Authorization"] = "Bearer " + getAccessToken()
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

// Use refresh token on axios 401 Unauthorized response and retry original request
axios.interceptors.response.use(
    response => response,
    error => {
        return new Promise(resolve => {
            if (error.response && error.response.status === 401) {
                const config = {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "x-s8-refresh-token": getRefreshToken()
                    }
                }
                const promise = fetch("/v0/external/user/token/refresh", config)
                    .then(response => response.json())
                    .then(response => {
                        const tokens = JSON.stringify(response["auth"])
                        setTokens(tokens)
                        return axios(error.config)
                    })
                resolve(promise)
            }
            return Promise.reject(error)
        })
    },
)

// Use fetch to avoid intercepts on first login
export async function login(username, password) {
    const config = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(username + ":" + password)
            }
        }
    return fetch("/v0/external/user/login", config)
}

export async function getUser() {
    const response = await axios.get("/v0/external/user")
    return response.data
}

export async function getAccountBalances() {
    const response = await axios.get("/v0/external/saver/account/graph")
    return response.data
}

export async function getInvestmentHistory() {
    const response = await axios.get("/v0/external/saver/account/investment-history")
    return response.data
}

export async function getInvestmentSummary() {
    const response = await axios.get("/v0/external/saver/account/investment-summary")
    return response.data
}

export async function getUnitPrices(portfolio="UNIVERSE", date="1970-01-01") {
    const response = await axios.get(`/v0/external/saver/unit-price/graph?portfolio=${portfolio}&date=${date}`)
    return response.data
}

export function setTokens(auth) {
    localStorage.setItem("auth", auth);
}

export function getAccessToken() {
    const auth = JSON.parse(localStorage.getItem("auth"))
    return auth["auth_token"];
}

export function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem("auth"))
    return auth["refresh_token"];
}

export function clearTokens() {
    localStorage.removeItem("auth");
}

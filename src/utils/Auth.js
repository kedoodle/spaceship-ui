export function setTokens(auth) {
    sessionStorage.setItem("auth", auth);
}

export function getAccessToken() {
    const auth = JSON.parse(sessionStorage.getItem("auth"))
    return auth["auth_token"];
}

export function getRefreshToken() {
    const auth = JSON.parse(sessionStorage.getItem("auth"))
    return auth["refresh_token"];
}

export function clearTokens() {
    sessionStorage.removeItem("auth");
}

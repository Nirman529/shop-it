let Auth = {
    headers: {
        Authorization: "Bearer ".concat(localStorage.getItem('token'))
    }
}
export default Auth
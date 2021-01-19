const initialState = {
    isAuthenticated: false,
    uid: ''
}


const AuthReducer = (auth = initialState, action) => {
    switch (action.type) {
        case "AUTHENTICATED":
            return {
                ...auth,
                isAuthenticated: true,
                uid: action.payload
            }

        case "NOT_AUTHENTICATED":
            return {
                ...auth,
                isAuthenticated: false,
                uid: ''
            }

        default:
            return auth

    }
}

export default AuthReducer
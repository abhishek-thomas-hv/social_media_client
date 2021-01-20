const initialState = ''

const UsersReducer = (users = initialState, action) => {
    switch (action.type) {
        case "GET_USERS":
            return action.payload

        default:
            return users

    }
}

export default UsersReducer
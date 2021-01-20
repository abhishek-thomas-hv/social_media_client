const initialState = {

}

const ProfileReducer = (profile = initialState, action) => {
    switch (action.type) {
        case "GET_PROFILE":
            return action.payload

        case "EDIT_PROFILE":
            return action.payload

        default:
            return profile
    }
}

export default ProfileReducer
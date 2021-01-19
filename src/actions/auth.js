import { SignUp, Login, getUserIdApi, logoutApi } from '../api/index'

export const SignUpFormSubmit = async (details) => {
    try {
        const user = await SignUp(details);
        return user
    }
    catch (e) {
        return e.response.data
    }
}


export const LoginFormSubmit = async (details) => {
    try {
        const user = await Login(details);
        return user
    }

    catch (e) {
        return e.response.data
    }
}

export const getUserId = async () => {
    try {
        const userId = await getUserIdApi();
        return userId
    }
    catch (e) {
        return e.response.data
    }
}


export const logout = () => async (dispatch) => {
    try {
        await logoutApi();
        dispatch({ type: "NOT_AUTHENTICATED" })
    }
    catch (e) {
        console.log(e.response.data)
    }
}
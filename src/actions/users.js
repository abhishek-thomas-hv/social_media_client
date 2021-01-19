import { getUsersApi } from '../api/index'


export const getUsers = () => async (dispatch) => {

    try {
        const result = await getUsersApi()
        dispatch({ type: "GET_USERS", payload: result.data })
    }

    catch (e) {
        console.log(e)
    }

}
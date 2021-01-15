import {getProfileApi, editProfileApi,addFriendApi,acceptRequestApi,declineRequestApi} from '../api/index'
import {getUsers} from '../actions/users'

export const getProfile = () => async (dispatch) =>
{
    try
    {
        const result = await getProfileApi()
        dispatch({type:"GET_PROFILE",payload:result.data})
    }

    catch(e)
    {
        console.log("ERROR",e)
    }
}

export const editProfile = (details) => async (dispatch) =>
{
    try
    {
        const result = await editProfileApi(details)
        console.log(result.data)
        dispatch({type:"EDIT_PROFILE",payload:result.data})
    }

    catch(e)
    {
        console.log("ERROR",e)
    }
}

export const addFriend = (details) => async (dispatch) =>
{
    
    try
    {
        const result = await addFriendApi(details)
        // dispatch({type:"EDIT_PROFILE",payload:result.data})
        dispatch(getUsers())
    }

    catch(e)
    {
        console.log("ERROR",e)
    }
}

export const acceptRequest = (details) => async (dispatch) =>
{
    
    try
    {
        const result = await acceptRequestApi(details)
        dispatch({type:"EDIT_PROFILE",payload:result.data})
        dispatch(getUsers())
    }

    catch(e)
    {
        console.log("ERROR",e)
    }
}

export const declineRequest = (details) => async (dispatch) =>
{
    
    try
    {
        const result = await declineRequestApi(details)
        dispatch({type:"EDIT_PROFILE",payload:result.data})
        dispatch(getUsers())
    }

    catch(e)
    {
        console.log("ERROR",e)
    }
}
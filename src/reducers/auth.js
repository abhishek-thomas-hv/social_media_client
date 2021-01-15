const initialState = {
    isAuthenticated:false,
    uid:''}


const AuthReducer = (auth=initialState,action) =>
{
    switch(action.type)
    {
        case "AUTHENTICATED":
        return {isAuthenticated:true,uid:action.payload}

        case "NOT_AUTHENTICATED":
        return {isAuthenticated:false,uid:''}

        default:
            return auth
        
    }
}

export default AuthReducer
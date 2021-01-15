const initialState = null

const PostEditReducer = (post=initialState,action) =>
{
    switch(action.type)
    {
        case "ADD_EDIT_POST_ID":
        return action.payload

        case "REMOVE_EDIT_POST_ID":
        return null
        
        default:
        return post
    }
}

export default PostEditReducer
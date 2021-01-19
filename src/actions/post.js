import { getPostsApi, addPostApi, addCommentApi, addLikeApi, editPostApi, deletePostApi, removeLikeApi } from '../api/index'

export const getPosts = () => async (dispatch) => {
    try {
        const response = await getPostsApi();
        dispatch({ type: "GET_ALL", payload: response.data })
        return response
    }
    catch (e) {
        return e.response.data
    }
}


export const addPost = (details) => async (dispatch) => {

    try {
        const response = await addPostApi(details);
        dispatch({ type: "ADD_POST", payload: response.data })
        return response
    }
    catch (e) {

        return { "POST_ERROR": "There was an Error Adding your post" }
    }
}

export const editPost = (details) => async (dispatch) => {

    try {
        const response = await editPostApi(details);
        dispatch({ type: "EDIT_POST", payload: response.data })
        return response
    }
    catch (e) {

        return { "POST_ERROR": "There was an Error Editing your post 1" }
    }
}


export const deletePost = (id) => async (dispatch) => {
    try {
        await deletePostApi(id);
        const action = { type: "DELETE_POST", payload: id }
        dispatch(action)
    }
    catch (error) {
        console.log(error)
    }


}

export const addComments = (details) => async (dispatch) => {

    try {
        const response = await addCommentApi(details);
        dispatch({ type: "ADD_COMMENT_FOR_POST", payload: response.data })
        return response
    }
    catch (e) {

        return { "Creation_error": "There was an Error Adding your Comment" }
    }
}


export const addLike = (details) => async (dispatch) => {

    try {
        const response = await addLikeApi(details);
        dispatch({ type: "ADD_LIKE_FOR_POST", payload: response.data })
        return response
    }
    catch (e) {

        return { "Creation_error": "There was an Error Adding your Like" }
    }
}


export const removeLike = (details) => async (dispatch) => {

    try {
        const response = await removeLikeApi(details);
        dispatch({ type: "REMOVE_LIKE_FOR_POST", payload: response.data })
        return response
    }
    catch (e) {

        return { "Creation_error": "There was an Error Adding your Like" }
    }
}

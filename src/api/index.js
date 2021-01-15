
import axios from 'axios';

const url = 'http://localhost:5000/';

export const SignUp = (details) => axios.post(`${url}auth/signup`,details,{
    withCredentials: true,
  });

export const Login = (details) => axios.post(`${url}auth/login`,details,{
    withCredentials: true,
  });

export const getPostsApi = () => axios.get(`${url}post/getposts`,{
  withCredentials: true,
});

export const getUserIdApi = () => axios.get(`${url}auth/getuserid`,{
  withCredentials: true,
});


export const addPostApi = (details) => axios.post(`${url}post/addpost`,details,{
  withCredentials: true,
});

export const addCommentApi = (details) => axios.post(`${url}post/addcomment`,details,{
  withCredentials: true,
});

export const getCommentsApi = (postId) => axios.get(`${url}post/getcomments`,{
  params: {
    postId: postId.postId
  }
},{
  withCredentials: true,
});

export const addLikeApi = (details) => axios.post(`${url}post/addlike`,details,{
  withCredentials: true,
});

export const removeLikeApi = (details) => axios.post(`${url}post/removelike`,details,{
  withCredentials: true,
});

export const logoutApi = () => axios.get(`${url}auth/logout`,{
  withCredentials: true,
});


export const getProfileApi = () => axios.get(`${url}profile/getprofile`,{
  withCredentials: true,
});


export const editProfileApi = (profile) => axios.post(`${url}profile/editprofile`,profile,{
  withCredentials: true,
});


export const getUsersApi = () => axios.get(`${url}profile/getusers`,{
  withCredentials: true,
});


export const addFriendApi = (details) => axios.post(`${url}profile/addfriend`,details,{
  withCredentials: true,
});


export const acceptRequestApi = (details) => axios.post(`${url}profile/acceptrequest`,details,{
  withCredentials: true,
});

export const declineRequestApi = (details) => axios.post(`${url}profile/declinerequest`,details,{
  withCredentials: true,
});

export const editPostApi = (details) => axios.post(`${url}post/editpost`,details,{
  withCredentials: true,
});


export const deletePostApi = (id) => axios.delete(`${url}post/deletepost/${id}`,{
  withCredentials: true,
});


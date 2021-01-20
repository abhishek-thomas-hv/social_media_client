import { combineReducers } from 'redux'
import auth from './auth'
import post from './post'
import profile from './profile'
import users from './users'
import editpost from './editpost'

export default combineReducers({
    auth: auth,
    post: post,
    profile: profile,
    users: users,
    editpost: editpost
})
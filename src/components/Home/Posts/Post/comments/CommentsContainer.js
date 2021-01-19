import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComments } from '../../../../../actions/post'
import '../../../../../Assets/styles/styles.css'
import PropTypes from 'prop-types';
import Comments from './Comments'

function CommentsContainer({ postId, comments }) {

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        details.date = new Date()
        await dispatch(addComments(details))

        setDetails({
            ...details,
            text: '',
        })

    }


    const [details, setDetails] = useState({
        postId: postId,
        text: '',
        date: ''
    })



    return (
        <div>

            <Comments
                handleSubmit={handleSubmit}
                setDetails={setDetails}
                details={details}
                comments={comments}>

            </Comments>

        </div>
    )
}

CommentsContainer.propTypes = {

    postId: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape({
        comments: PropTypes.string,
        date: PropTypes.string,
        user: PropTypes.string,
        userProfilePicture: PropTypes.string
    })),

}


export default CommentsContainer

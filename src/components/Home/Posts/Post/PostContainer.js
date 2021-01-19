import React, { useState, useEffect, useRef } from 'react'
import { addLike, deletePost, removeLike } from '../../../../actions/post'
import { useDispatch, useSelector } from 'react-redux'
import materialize from 'materialize-css';
import '../../../../Assets/styles/styles.css'
import PropTypes from 'prop-types';
import Post from './Post'

const commentsVariants = {
    hidden:
    {
        y: "-10vw",
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            delay: 0.2
        }
    },
    exit:
    {
        opacity: 0,
        transition:
        {
            type: 'spring',
            duration: 1
        }
    }
}

function PostContainer({ post, formRef }) {


    const dispatch = useDispatch()
    const [comments, setComments] = useState(false)
    const store = useSelector(state => state.auth)

    const commentsRef = useRef(null)
    const postRef = useRef(null)

    const [counter, setCounter] = useState(0)

    const [liked, setliked] = useState(null)

    const handleLike = async () => {
        const details = {
            _id: post._id,
        }
        await dispatch(addLike(details))
    }
    const handleDislike = async () => {
        const details = {
            _id: post._id,
        }
        await dispatch(removeLike(details))
    }


    const handleEdit = () => {
        dispatch({ type: "ADD_EDIT_POST_ID", payload: post._id })
        formRef.current.scrollIntoView({
            behavior: "smooth",
        });
    }

    const handleDelete = () => {
        dispatch(deletePost(post._id))
        dispatch({ type: "REMOVE_EDIT_POST_ID" })
    }

    useEffect(() => {
        var elems = document.querySelectorAll('.carousel');
        materialize.Carousel.init(elems, {
            fullWidth: true,
            numVisible: 5
        })

        return () => {

        }
    })


    useEffect(() => {

        if (post.likedUsers.includes(store.uid)) {
            setliked(true)
        }

        else {
            setliked(false)
        }



        return () => {

        }
    }, [post.likedUsers])

    useEffect(() => {


        var timeout = null

        if (counter === 0) {
            return
        }

        if (comments) {
            commentsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start"

            });
        }

        else {

            timeout = setTimeout(() => {
                postRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "start"

                });

            }, 600);
        }

        return () => {
            clearTimeout(timeout);
        }

    }, [comments]);



    return (
        <div>

            <Post
                post={post}
                postRef={postRef}
                store={store}
                handleLike={handleLike}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDislike={handleDislike}
                liked={liked}
                counter={counter}
                setComments={setComments}
                setCounter={setCounter}
                comments={comments}
                commentsRef={commentsRef}
                commentsVariants={commentsVariants}>

            </Post>

        </div>
    )
}

PostContainer.propTypes = {
    formRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    post: PropTypes.shape({
        _id: PropTypes.string,
        comments: PropTypes.array,
        date: PropTypes.string,
        description: PropTypes.string,
        images: PropTypes.array,
        likeCount: PropTypes.number,
        likedUsers: PropTypes.array,
        tags: PropTypes.array,
        title: PropTypes.string,
        uid: PropTypes.string,
        user: PropTypes.string,
        userProfilePicture: PropTypes.string
    }),

}


export default PostContainer

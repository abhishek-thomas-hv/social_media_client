import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import moment from 'moment'
import CommentsContainer from './comments/CommentsContainer'
import PropTypes from 'prop-types'

function Post({ post, postRef, store, handleEdit, handleDelete,
    handleDislike, liked, counter, setComments,
    handleLike, setCounter, comments, commentsRef, commentsVariants }) {
    return (
        <div>
            <div class="row" key={post.id} ref={postRef}>

                <div class="col s12 l10 offset-l2">
                    <div class="card">
                        <div class="row" style={{ "padding": "20px 0px 5px 20px" }}>

                            <img src={post.userProfilePicture} alt="" style={{ "border-radius": "50%" }} class="img-responsive-thumbnail" />
                            <div class="black-text text-responsive-thumbnail">
                                <p className="left">{post.user}</p>

                            </div>
                        </div>

                        <div class="card-image">

                            {post.images.length > 0 &&

                                <div class="carousel">
                                    {post.images.map((image, id) => {
                                        return (
                                            <a class="carousel-item" href={`#${id}`}><img src={image} class="" /></a>
                                        )
                                    }
                                    )
                                    }


                                </div>

                            }

                            {post.uid === store.uid && (<><a class="btn-floating halfway-fab  indigo"
                                onClick={() => { handleEdit() }}><i class="material-icons">edit</i></a>
                                <a class="btn-floating halfway-fab  red"
                                    onClick={() => { handleDelete() }}><i class="material-icons">delete</i></a></>)}


                        </div>

                        <div class="card-content">

                            <p class='grey-text'>{moment(post.date).fromNow()}</p>
                            {post.tags.map(tag => (
                                <div class="chip grey lighten-1 white-text hoverable" style={{ "margin": "15px 5px", "cursor": "pointer" }}>
                                    {tag}
                                </div>
                            ))}
                            <br></br>

                            <span class="black-text" style={{ "font-size": "20px" }}>{post.title}</span>
                            <hr className='grey-text text-lighten-2'></hr>
                            <p>{post.description}</p>
                        </div>

                        <div class="card-action">
                            <div className='row margin-remove'>
                                <p className='grey-text text-darken-1' style={{ "display": "inline" }}> {post.likeCount} Likes </p>
                                <span> &nbsp;&nbsp;&nbsp;</span>
                                <p className='grey-text text-darken-1' style={{ "display": "inline" }}> {post.comments.length} Comments </p>
                            </div>
                            <div className='row margin-remove'>
                                {!liked ? (
                                    <a class="btn-floating transparent"
                                        onClick={() => { handleLike() }}><i class="material-icons indigo-text">favorite_border</i></a>
                                ) :
                                    (<a class="btn-floating transparent"
                                        onClick={() => { handleDislike() }}><i class="material-icons indigo-text">favorite</i></a>)}

                                &nbsp;&nbsp;&nbsp;
                                     <a class={`btn-floating transparent `}
                                    onClick={() => {
                                        console.log("CLICKED")
                                        setCounter(counter + 1)
                                        setComments(!comments)

                                    }}><i class={`${comments ? 'indigo-text material-icons' : 'indigo-text material-icons-outlined'}`}>comment</i></a>
                            </div>


                            <div ref={commentsRef} >
                                <AnimatePresence>
                                    {comments && <motion.div className='row transparent'
                                        variants={commentsVariants}
                                        animate="visible"
                                        initial="hidden"
                                        exit="exit">
                                        <CommentsContainer postId={post._id} comments={post.comments}></CommentsContainer></motion.div>}
                                </AnimatePresence>
                            </div>


                        </div>


                    </div>
                </div>




            </div>

        </div>
    )
}

Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string,
        uid: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        tags: PropTypes.string,
        image: PropTypes.arrayOf(PropTypes.string),
        user: PropTypes.string,
        userProfilePicture: PropTypes.string,
        comments: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    comment: PropTypes.string,
                    user: PropTypes.string,
                    userProfilePicture: PropTypes.string,
                    date: PropTypes.string
                }
            )
        )
    }),
    store: PropTypes.objectOf(
        {

        }),
    handleLike: PropTypes.func,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
    handleDislike: PropTypes.func,
    liked: PropTypes.bool,
    counter: PropTypes.number,
    setComments: PropTypes.func,
    setCounter: PropTypes.func,
    comments: PropTypes.bool,
    setDetails: PropTypes.func,
    postRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    commentsRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),

}


export default Post

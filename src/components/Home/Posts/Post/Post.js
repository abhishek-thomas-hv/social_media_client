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
                            <div className='row margin-remove' style={{ "margin-bottom": "0px !important" }}>

                                <div className='col l6'>
                                    <div className='row'>
                                        <div className='col l6'>
                                            {!liked ? (
                                                <a class="btn-floating indigo right"
                                                    onClick={() => { handleLike() }}><i class="material-icons">thumb_up</i></a>
                                            ) :
                                                (<a class="btn-floating right red"
                                                    onClick={() => { handleDislike() }}><i class="material-icons  ">thumb_down</i></a>)}
                                        </div>

                                        <div className='col l6'>
                                            <p className='left'>{post.likeCount}</p>
                                        </div>

                                    </div>

                                </div>
                                <div className='col l6 right'>

                                    <div className='row'>
                                        <div className='col l6'>

                                            <a class={`btn-floating ${comments ? 'red darken-2' : 'indigo'} right`}
                                                onClick={() => {
                                                    console.log("CLICKED")
                                                    setCounter(counter + 1)
                                                    setComments(!comments)

                                                }}><i class="material-icons">comment</i></a>

                                        </div>

                                        <div className='col l6'>
                                            <p className='left'>{post.comments.length}</p>
                                        </div>
                                    </div>

                                </div>

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

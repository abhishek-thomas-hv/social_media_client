import React, { useState, useEffect } from 'react'
import defaultpost from '../../../../images/defaultpost.jpg';
import Comments from './comments/Comments'
import { addLike, deletePost, removeLike } from '../../../../actions/post'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import materialize from 'materialize-css';
import './styles.css'

function Post({ post, formRef }) {
    

    const dispatch = useDispatch()
    const [comments, setComments] = useState(false)
    const store = useSelector(state => state.auth)
    const postEdit = useSelector(state => state.editpost)

    const [liked, setliked] = useState(null)

    const handleLike = async () => {
        const details = {
            _id: post._id,
        }
        const result = await dispatch(addLike(details))
    }
    const handleDislike = async () => {
        const details = {
            _id: post._id,
        }
        const result = await dispatch(removeLike(details))
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
        var instances = materialize.Carousel.init(elems, {
            // fullWidth:true,
            numVisible: 1
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
    })

    return (
        <div>

            <div class="row" key={post.id}>

                <div class="col s12 l10 offset-l2">
                    <div class="card">
                        <div class="row" style={{"padding":"20px 0px 5px 20px"}}>

                                    <img src={post.userProfilePicture} alt="" style={{"border-radius":"50%"}} class="img-responsive-thumbnail" />
                                    <div class="black-text text-responsive-thumbnail">
                                        <p className="left">{post.user}</p>
                                        
                                    </div>
                            </div>
                            
                        <div class="card-image">
                         
                            {/* <img src="images/sample-1.jpg" /> */}
                            {post.images.length > 0 && <div class="carousel">
                                {post.images.map((image, id) => {
                                    return (
                                        <a class="carousel-item" href={`#${id}`}><img src={image} class="" /></a>
                                    )
                                }
                                )
                                }

                            </div>}
                            {post.uid === store.uid && (<><a class="btn-floating halfway-fab  indigo"
                            onClick={() => { handleEdit() }}><i class="material-icons">edit</i></a>
                            <a class="btn-floating halfway-fab  red"
                                onClick={() => { handleDelete() }}><i class="material-icons">delete</i></a></>)}


                        </div>

                        <div class="card-content">

                            <p class='grey-text'>{moment(post.date).fromNow()}</p>
                            {post.tags.map(tag => (
                                <div class="chip grey lighten-1 white-text hoverable" style={{"margin":"15px 5px","cursor":"pointer"}}>
                                {tag}
                              </div>
                            ))}
                            <br></br>

                            <span class="black-text" style={{"font-size":"20px"}}>{post.title}</span>
                            <hr className='grey-text text-lighten-2'></hr>
                            <p>{post.description}</p>
                        </div>

                        <div class="card-action">
                            <div className='row margin-remove' style={{"margin-bottom":"0px !important"}}>

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

                                            <a class={`btn-floating ${comments?'red darken-2':'indigo'} right`}
                                                onClick={() => { setComments(!comments) }}><i class="material-icons">comment</i></a>

                                            </div>

                                            <div className='col l6'>
                                            <p className='left'>{post.comments.length}</p>
                                            </div>
                                    </div>

                                </div>

                            </div>

    

                        {comments &&<div className='row'> <Comments postId={post._id} comments={post.comments}></Comments></div>}


                        </div>


                    </div>
                </div>




            </div>

        </div>
    )
}

export default Post

import React from 'react'
import PostContainer from './Post/PostContainer'
import { motion } from "framer-motion"
import PropTypes from 'prop-types'

function Posts({ details, clear, isSending, loaderRef, message, postStore, postsVariants, formRef,
    setDetails, handleFileSubmit, handleSubmit, fileError, fileInput, isActive, postEdit, imageVariant, formVariants }) {
    return (
        <>


            <div className="row"
            >

                <motion.form ref={formRef} className="col s10 offset-s1 l4 offset-l1 m6 offset-m3 center white"
                    onSubmit={(e) => handleSubmit(e)} style={{ "padding": "30px" }}
                    variants={formVariants}
                    animate="visible"
                    initial="hidden"
                >

                    <h6><u>{postEdit ? "Edit Post" : "Add Post"}</u></h6>

                    <div className="row">
                        <div className="input-field col s12">
                            <i class="material-icons prefix">title</i>
                            <input id="title" type="text" className='validate' value={details.title} required={true}
                                onChange={(e) => setDetails({ ...details, title: e.target.value })} />
                            <label for="title" className={`${isActive ? "active" : ""}`}>Title</label>
                            <span className="helper-text" data-error="Please Give Your Post Title" data-success=""></span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <i class="material-icons prefix">description</i>
                            <textarea id="textarea1" className="materialize-textarea" value={details.description} required={true}
                                onChange={(e) => setDetails({ ...details, description: e.target.value })}></textarea>
                            <label for="textarea1" className={`${isActive ? "active" : ""}`}>Describe Your Post</label>
                            <span className="helper-text" data-error="Please Describe your Post" data-success=""></span>
                        </div>
                    </div>


                    {/* <div class="chips chips-placeholder">
                    </div> */}

                    <div class="row">
                        <div className="input-field col s12">
                            <i class="material-icons prefix">local_offer</i>
                            <input id="tags" type="text" className="validate" value={details.tags}
                                onChange={(e) => setDetails({ ...details, tags: e.target.value.split(',') })} />
                            <label for="tags" className={`${isActive ? "active" : ""} validate`}>Tags seperated by Comma</label>
                        </div>
                    </div>




                    <div className="row">
                        <div className='col s12'>
                            <div className="image-upload ">
                                <label for="file-input">
                                    <motion.span className="material-icons pointer indigo-text text-darken-1" style={{ 'font-size': "5rem" }}
                                        variants={imageVariant}
                                        whileHover="hover">
                                        add_photo_alternate
                                    </motion.span>
                                </label>
                                <input id='file-input' type="file" className="" multiple={true} required={false} ref={fileInput}
                                    onChange={(e) => handleFileSubmit(e)}
                                >
                                </input>
                            </div>
                            <span style={{ 'color': "orangered" }}>{fileError}</span>

                        </div>
                    </div>

                    <div className='row'>

                        {details.images.map((image, id) => {
                            return (
                                <a class="" href='#none'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        var array = [...details.images];
                                        var index = array.indexOf(image)
                                        if (index !== -1) {
                                            array.splice(index, 1);
                                            setDetails({ ...details, images: array })
                                        }

                                    }}
                                ><img style={{ "margin": "5px" }} width={100} height={100} src={image} class="img-responsive hover-image" />

                                </a>
                            )
                        }
                        )
                        }

                    </div>

                    <div className='row'>

                        <div className='col l6 s6 '>
                            <button className='btn indigo right hoverable' style={{ 'margin-top': "15px" }}>Submit Post</button>
                        </div>
                        <div className='col l6 s6 '>
                            <button onClick={(e) => clear()} style={{ 'margin-top': "15px" }} class="btn left red hoverable"><i class="material-icons left">close</i>Clear</button>
                        </div>

                    </div>



                    {isSending ? (
                        <div class='row' ref={loaderRef}>
                            <div class="bouncing center col s4 offset-s4">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>

                    )
                        : ''}

                    {message && (
                        <div className='container grey lighten-4 z-depth-2' style={{ "padding": '5px 10px' }}>
                            <p style={{ "font-size": "17px" }}><b>{message}</b></p>
                        </div>
                    )

                    }




                </motion.form>


                {postStore.length === 0 ? (

                    <div className='col l6 center  m6 offset-m3 '>
                        <div class="preloader-wrapper big active">
                            <div class="spinner-layer spinner-blue-only">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div><div class="gap-patch">
                                    <div class="circle"></div>
                                </div><div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                ) :
                    <motion.div className="col l5 offset-l1 transparent hide-on-med-and-down" style={{ "padding": '0px' }}
                        variants={postsVariants}
                        animate="visible"
                        initial="hidden">
                        {postStore.map(post =>
                            <PostContainer post={post} formRef={formRef}></PostContainer>
                        )}
                    </motion.div>}



            </div>

            <div className='row hide-on-large-only'>
                <div className="col l5 offset-l1 transparent m8 offset-m2 s10 offset-s1 " style={{ "padding": '0px' }}>
                    {postStore.map(post =>
                        <PostContainer post={post} formRef={formRef}></PostContainer>
                    )}
                </div>
            </div>

        </>
    )
}

Posts.propTypes = {
    details: PropTypes.shape({
        uid: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        tags: PropTypes.string,
        image: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    postStore: PropTypes.arrayOf(
        PropTypes.shape({
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
        }).isRequired
    ),
    clear: PropTypes.func,
    isSending: PropTypes.bool,
    message: PropTypes.string,
    handleSubmit: PropTypes.func,
    handleFileSubmit: PropTypes.func,
    setDetails: PropTypes.func,
    loaderRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    formRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    fileInput: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    fileError: PropTypes.string,
    isActive: PropTypes.bool,
    postEdit: PropTypes.string,

}

export default Posts

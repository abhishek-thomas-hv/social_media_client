import React, { useEffect, useState, useRef } from 'react'
import materialize from 'materialize-css';
import './styles.css'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, editPost } from '../../../actions/post'
import { getPosts } from '../../../actions/post'
import Post from './Post/Post'
import { motion } from "framer-motion"
import PropTypes from 'prop-types';

const imageVariant = {
    hover:{
      scale:1.2,
      textShadow:"0px 0px 8px rgb(255,255,255)",
      boxShadow:"0px 0px 8px rgb(255,255,255)",
      transition:{
        yoyo:Infinity,
        duration:0.3
      }
     }
  }

  
const butVaraints = {
    hover:{
      scale:1.2,
      textShadow:"0px 0px 8px rgb(255,255,255)",
      boxShadow:"0px 0px 8px rgb(255,255,255)",
      transition:{
        yoyo:Infinity,
        duration:0.3
      }
     }
  }

  const formVariants ={
    hidden:
    {
      x:"-15vw",
      opacity:0
    },
    visible:{
      x:0,
      opacity:1,
      transition:{
        type:"spring",
        delay:0.5
      }
    },
  }

  const postsVariants ={
    hidden:
    {
      x:"-25vw",
      opacity:0
    },
    visible:{
      x:0,
      opacity:1,
      transition:{
        type:"spring",
        delay:0.2
      }
    },
  }
  
function Posts() {


    const postStore = useSelector(state => state.post)

    const postEdit = useSelector(state => state.editpost)
    
    const [isSending, setIsSending] = useState(false)

    const [fileError, setFileError] = useState('')

    const [message, setMessage] = useState('')

    const [details, setDetails] = useState(
        {
            uid: '',
            title: '',
            description: '',
            date: '',
            tags: '',
            images: []
        })

    const [isActive, setIsActive] = useState(false)

    const dispatch = useDispatch()
    const store = useSelector(state => state.auth)

    const loaderRef = useRef(null)

    useEffect(() => {

        var elems = document.querySelectorAll('.collapsible');
        materialize.Collapsible.init(elems);
        var elems1 = document.querySelectorAll('.chips');
        materialize.Chips.init(elems1, {
            placeholder: 'Enter tags for Your post',
            secondaryPlaceholder: '+Tag',
            onChipAdd: function (event, chip) {

                console.log(chip.data, event)

            }
        });


        return () => {

            dispatch({ type: "REMOVE_EDIT_POST_ID" })

        }
    }, [])


    useEffect(() => {

        async function get() {
            await dispatch(getPosts())
        }

        get()


        if (postEdit) {
            const currentPost = postStore.find((p) => p._id === postEdit)
            setFileError('')
            setDetails({
                ...details,
                _id: currentPost._id,
                uid: currentPost.uid,
                title: currentPost.title,
                description: currentPost.description,
                date: currentPost.date,
                tags: currentPost.tags,
                images: currentPost.images
            })
            setIsActive(true)
        }
        return () => {

        }
    }, [dispatch, postEdit])

    const clear = () => {
        setDetails({
            uid: '',
            title: '',
            description: '',
            date: '',
            tags: '',
            images: []
        })
        setIsActive(false)
        dispatch({ type: "REMOVE_EDIT_POST_ID" })
        setFileError('')
        fileInput.current.value = ""
    }

    useEffect(() => {
        if(isSending)
        {
            loaderRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start"
    
              });
        }
        return () => {
            
        }
    }, [isSending])

    const handleSubmit = async (e) => {

        e.preventDefault()

        if(details.images.length===0)
        {
            setFileError('Please Select Atleast One File')
            return
        }

        setFileError('')
        

        setIsSending(true)

        if (postEdit) {

            setTimeout(async () => {


                const result = await dispatch(editPost(details))
                clear()
                setIsSending(false)
                formRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "start"
        
                  });
                if(result.POST_ERROR)
                {
                    setMessage('There was an error Editing Post')

                    setTimeout(() => {

                        setMessage('')
                        
                    }, 3000);
                }

                else
                {
                    setMessage('Post Successfully Edited')

                    setTimeout(() => {

                        setMessage('')
                        
                    }, 3000);
                }
                
            }, 1000);
        }

        else {

            setTimeout(async () => {

                details.date = new Date()
                const result = await dispatch(addPost(details))
                clear()
                setIsSending(false)
                formRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "start"
        
                  });
                if(result.POST_ERROR)
                {
                    setMessage('There was an error Adding Post')
                    setTimeout(() => {

                        setMessage('')
                        
                    }, 3000);
                }

                else
                {
                    setMessage('Post Successfully Added')

                    setTimeout(() => {

                        setMessage('')
                        
                    }, 3000);
                }
                
            }, 1000);
        }

    }

    const handleFileSubmit = async (e) => {

        var images = e.target.files

        const newImages = []

        for (const image of images) {
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = function () {
                newImages.push(reader.result)
                if (newImages.length === e.target.files.length) {
                    setDetails({ ...details, images: [...details.images, ...newImages] })
                }

            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };

        }

    }


    const formRef = useRef(null)
    const fileInput = useRef(null)


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
                            <span style={{'color':"orangered"}}>{fileError}</span>
                          
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
                    :''}

                    { message && (
                        <div className='container grey lighten-4 z-depth-2' style={{"padding":'5px 10px'}}>
                            <p style={{"font-size":"17px"}}><b>{message}</b></p>
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
                            <Post post={post} formRef={formRef}></Post>
                        )}
                    </motion.div>}
                    


            </div>

            <div className='row hide-on-large-only'>
                    <div className="col l5 offset-l1 transparent m8 offset-m2 s10 offset-s1 " style={{ "padding": '0px' }}>
                        {postStore.map(post =>
                            <Post post={post} formRef={formRef}></Post>
                        )}
                    </div>
            </div>


        </>
    )
}




export default Posts

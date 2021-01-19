import React, { useEffect, useState, useRef } from 'react'
import materialize from 'materialize-css';
import '../../../Assets/styles/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, editPost } from '../../../actions/post'
import { getPosts } from '../../../actions/post'
import Posts from './Posts';

const imageVariant = {
    hover: {
        scale: 1.2,
        textShadow: "0px 0px 8px rgb(255,255,255)",
        boxShadow: "0px 0px 8px rgb(255,255,255)",
        transition: {
            yoyo: Infinity,
            duration: 0.3
        }
    }
}


const butVaraints = {
    hover: {
        scale: 1.2,
        textShadow: "0px 0px 8px rgb(255,255,255)",
        boxShadow: "0px 0px 8px rgb(255,255,255)",
        transition: {
            yoyo: Infinity,
            duration: 0.3
        }
    }
}

const formVariants = {
    hidden:
    {
        x: "-15vw",
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            delay: 0.5
        }
    },
}

const postsVariants = {
    hidden:
    {
        x: "-25vw",
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            delay: 0.2
        }
    },
}

function PostsContainer() {


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
        if (isSending) {
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

        if (details.images.length === 0) {
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
                if (result.POST_ERROR) {
                    setMessage('There was an error Editing Post')

                    setTimeout(() => {

                        setMessage('')

                    }, 3000);
                }

                else {
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
                    block: "center",
                    inline: "center"

                });
                if (result.POST_ERROR) {
                    setMessage('There was an error Adding Post')
                    setTimeout(() => {

                        setMessage('')

                    }, 3000);
                }

                else {
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

            <Posts
                details={details}
                clear={clear}
                isSending={isSending}
                loaderRef={loaderRef}
                message={message}
                postStore={postStore}
                setDetails={setDetails}
                handleSubmit={handleSubmit}
                postsVariants={postsVariants}
                formRef={formRef}
                handleFileSubmit={handleFileSubmit}
                fileError={fileError}
                fileInput={fileInput}
                isActive={isActive}
                postEdit={postEdit}
                imageVariant={imageVariant}
                formVariants={formVariants}
            >

            </Posts>


        </>
    )
}



export default PostsContainer

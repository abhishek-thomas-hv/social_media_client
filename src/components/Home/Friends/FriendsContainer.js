import React, { useEffect, useState } from 'react'
import '../../../Assets/styles/styles.css'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../../actions/profile'
import { getUsers } from '../../../actions/users'
import Friends from './Friends'

function FriendsContainer() {

    const [option, setOption] = useState('list')

    const dispatch = useDispatch()

    useEffect(() => {

        async function get() {
            await dispatch(getProfile())
        }
        get()

        async function getSomeUsers() {
            await dispatch(getUsers())
        }
        getSomeUsers()


        return () => {

        }
    }, [dispatch])



    return (
        <>
            <Friends
                option={option}
                setOption={setOption}>

            </Friends>

        </>
    )
}

export default FriendsContainer

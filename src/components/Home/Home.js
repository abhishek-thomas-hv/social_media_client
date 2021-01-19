import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/auth'
import '../../Assets/styles/styles.css'
import MyRouter from './MyRouter'

function Home() {

    const dispatch = useDispatch()

    const handleLogout = () => {

        dispatch(logout())

    }

    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    }


    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }

    return (
        <div>

            <MyRouter
                openNav={openNav}
                closeNav={closeNav}
                handleLogout={handleLogout}
            >

            </MyRouter>

        </div >
    )
}

export default Home

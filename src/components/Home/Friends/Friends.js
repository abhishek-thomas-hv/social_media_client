import React from 'react'
import { AnimateSharedLayout } from "framer-motion"
import FriendsChild from './FriendsChild';

function Friends({ option, setOption }) {
    return (
        <div>
            <div class='row'>


                <div className='col l4 offset-l1 s10 offset-s1 white'>



                    <div class="collection" style={{ "padding": "40px" }}>


                        <a class={`collection-item ${option === 'list' && 'active'}`} style={{ "padding": "20px" }} onClick={() => setOption('list')}>
                            Friends List
            <span class="secondary-content"><i class="material-icons">
                                {option == 'list' ? 'send' : 'double_arrow'}</i></span>
                        </a>

                        <a class={`collection-item ${option === 'requests' && 'active'}`} style={{ "padding": "20px" }} onClick={() => setOption('requests')}>
                            Friend Requests
            <span class="secondary-content"><i class="material-icons">
                                {option == 'requests' ? 'send' : 'double_arrow'}</i></span>
                        </a>

                        <a class={`collection-item ${option === 'newFriends' && 'active'}`} style={{ "padding": "20px" }} onClick={() => setOption('newFriends')}>
                            Find New Friends
            <span class="secondary-content"><i class="material-icons">
                                {option == 'newFriends' ? 'send' : 'double_arrow'}</i></span>
                        </a>

                    </div>

                </div>


                <div className='col l5 offset-l1 hide-on-med-and-down'>
                    <AnimateSharedLayout type="crossfade">

                        {option === 'list' && <FriendsChild option='list'>

                        </FriendsChild>}


                        {option === 'requests' && <FriendsChild option='requests'>

                        </FriendsChild>}

                        {option === 'newFriends' && <FriendsChild option='newFriends'>

                        </FriendsChild>}

                    </AnimateSharedLayout>

                </div>


            </div>


            <div className='row hide-on-large-only' style={{ "margin-top": "50px" }}>

                <div className='col s12 m8 offset-m2'>

                    <FriendsChild option={option}>

                    </FriendsChild>

                </div>


            </div>

        </div>
    )
}

export default Friends
